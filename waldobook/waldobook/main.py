import io
import json
import os
from typing import List

import qrcode
from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.openapi.utils import get_openapi
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2AuthorizationCodeBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

script_dir = os.path.dirname(os.path.realpath(__file__))
waldobook_dir = os.path.dirname(script_dir)

# This makes swagger use id_token instead of access_token
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="OIDC Authenticated API",
        version="1.0.0",
        description="An API that uses OIDC id_token to authenticate",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"]["OAuth2AuthorizationCodeBearer"][
        "x-tokenName"
    ] = "id_token"
    app.openapi_schema = openapi_schema
    return app.openapi_schema


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.openapi = custom_openapi

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    tokenUrl="https://oidc.mit.edu/token",
    authorizationUrl="https://oidc.mit.edu/authorize",
    scopes={"phone": "", "openid": "", "address": "", "email": "", "profile": ""},
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


ALGORITHM = "RS256"
JWK_PUBLIC_KEY = os.getenv('JWK_PUBLIC_KEY')
MIT_OAUTH2_CLIENT_ID = os.getenv('MIT_OAUTH2_CLIENT_ID')


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, JWK_PUBLIC_KEY, audience=MIT_OAUTH2_CLIENT_ID, algorithms=[ALGORITHM]
        )
        sub: str = payload.get("sub") or ""
        if sub is None:
            raise credentials_exception
        user = schemas.UserBase(sub=sub)
    except JWTError:
        raise credentials_exception
    user = crud.get_user(db, user_sub=user.sub)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: schemas.User = Depends(get_current_user),
):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.get("/treasures", response_model=List[schemas.Placement])
async def treasures(
    db: Session = Depends(get_db), _: schemas.User = Depends(get_current_active_user)
):
    """
    Return list of active treasures and their most recent placements
    """
    return crud.get_treasures(db)


@app.get("/user/finds", response_model=List[schemas.Find])
async def user_finds(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_active_user),
):
    """
    Return list of the users finds
    """
    return crud.get_user_finds(db, current_user)


@app.get(
    "/placement/info",
    response_model=schemas.Placement,
    responses={status.HTTP_404_NOT_FOUND: {"model": schemas.Message}},
)
async def placement_info(
    placement_uuid: schemas.PlacementUUID = Depends(),
    db: Session = Depends(get_db),
    _: schemas.User = Depends(get_current_active_user),
):
    """
    Return placement info
    """
    return crud.get_placement(db, placement_uuid) or JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Placement not found"},
    )


@app.get(
    "/treasure/info",
    response_model=schemas.Treasure,
    responses={status.HTTP_404_NOT_FOUND: {"model": schemas.Message}},
)
async def treasure_info(
    treasure_uuid: schemas.TreasureUUID = Depends(),
    db: Session = Depends(get_db),
    _: schemas.User = Depends(get_current_active_user),
):
    """
    Return treasure info
    """
    return crud.get_treasure(db, treasure_uuid) or JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Treasure not found"},
    )


@app.post(
    "/treasure/find",
    response_model=schemas.Find,
    responses={status.HTTP_404_NOT_FOUND: {"model": schemas.Message}},
)
async def treasure_find(
    treasure_qr: schemas.TreasureQR,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_active_user),
):
    """
    - Accept a scanned treasure qr code string
    - If qr is invalid, return 404
    - If it is valid, add a find for the user and return find
    """
    placement = crud.get_placement_by_treasure_qr(db, treasure_qr)
    if placement is None:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "Treasure not found"},
        )
    return crud.create_find(db, current_user, schemas.Placement.from_orm(placement))


@app.post(
    "/treasure/hold",
    response_model=schemas.Treasure,
    responses={status.HTTP_404_NOT_FOUND: {"model": schemas.Message}},
)
async def treasure_hold(
    treasure_qr: schemas.TreasureQR,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(get_current_active_user),
):
    """
    - Accept a scanned treasure qr code string
    - If qr is invalid, return 404
    - If it is valid, set the treasure to inactive and return it
    """
    not_found_response = JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Treasure not found, or is already inactive"},
    )
    treasure = crud.get_treasure_by_qr(db, treasure_qr, is_active=True)
    if treasure is None:
        return not_found_response
    return (
        crud.set_treasure_inactive(db, schemas.Treasure.from_orm(treasure))
        or not_found_response
    )


@app.post(
    "/treasure/place",
    response_model=schemas.Placement,
    responses={status.HTTP_404_NOT_FOUND: {"model": schemas.Message}},
)
async def treasure_place(
    placement_specs: schemas.PlacementCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_active_user),
):
    """
    - Accept a scanned treasure qr code string and clue, lat, long
    - If qr is invalid, return 404
    - If it is valid, create a new placement for treasure, set as active, and return it
    """
    not_found_response = JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": "Treasure not found, or is currently active"},
    )
    treasure = crud.get_treasure_by_qr(
        db, schemas.TreasureQR(qr_secret=placement_specs.qr_secret), is_active=False
    )
    if treasure is None:
        return not_found_response
    return (
        crud.create_placement(db, current_user, treasure, placement_specs)
        or not_found_response
    )


@app.post(
    "/treasure/new",
    response_model=schemas.Treasure,
    responses={status.HTTP_400_BAD_REQUEST: {"model": schemas.Message}},
)
async def treasure_new(
    treasure: schemas.TreasureCreate,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(get_current_active_user),
):
    """
    - Accept a scanned treasure qr code string and clue, lat, long
    - If qr is invalid, return 404 (TODO w/ validation)
    - If it is valid, create a new treasure with treasure info and return it
    """
    return crud.create_treasure(db, treasure) or JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"message": "Treasure could not be created"},
    )


@app.get(
    "/treasure/qrgen",
    responses={200: {"content": {"image/png": {}}}},
    response_class=Response,
)
async def treasure_qrgen(_: schemas.User = Depends(get_current_active_user)):
    """
    Returns a qr code that is valid for the treasure hunt
    """
    img_byte_arr = io.BytesIO()
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,  # type: ignore
        box_size=10,
        border=4,
    )
    qr.add_data(json.dumps({"version": 0, "treasure_uuid": models.uuid_str()}))
    qr.make(fit=True)

    qr.make_image(fill_color="black", back_color="white").save(img_byte_arr)
    return Response(content=img_byte_arr.getvalue(), media_type="image/png")
