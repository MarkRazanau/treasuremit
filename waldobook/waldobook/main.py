import io
import json
from typing import List

import qrcode
from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2AuthorizationCodeBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

from fastapi.openapi.utils import get_openapi


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="OIDC Authenticated API",
        version="1.0.0",
        description="An API that uses OIDC id_token to authenticate",
        routes=app.routes,
    )
    print(openapi_schema)
    openapi_schema["components"]["securitySchemes"]["OAuth2AuthorizationCodeBearer"][
        "x-tokenName"
    ] = "id_token"
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    tokenUrl="https://oidc.mit.edu/token",
    authorizationUrl="https://oidc.mit.edu/authorize",
    scopes={"phone": "", "openid": "", "address": "", "email": "", "profile": ""},
)

# oauth2_scheme.model.tokenName = "id_token"
# print(oauth2_scheme.model.json())


# client_id: baa96962-f4a6-4451-9c04-1fcf05c46c12
# client_secret: M5w0HVzW7szOSXGl2mk7kOykzShEkK7kc8pXZZKTCihNoCqAbEXSTU4Do92ysi9X_7SJMgSvQQIk2vxKhcaCzw
# config url: https://oidc.mit.edu/register/baa96962-f4a6-4451-9c04-1fcf05c46c12
# Registration access token: eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiYmFhOTY5NjItZjRhNi00NDUxLTljMDQtMWZjZjA1YzQ2YzEyIl0sImlzcyI6Imh0dHBzOlwvXC9vaWRjLm1pdC5lZHVcLyIsImp0aSI6IjE2ZmY0ZjE0LTQxMjctNDEyZC04ZjMwLTEwOTdjMjY3ZGY4MyIsImlhdCI6MTY3NDAzMjE1NX0.VGIc_BZA1w8SeBzHvLchquvNiNPldvBuIjRV6ELkTpUDsN3rQKROuANduo_N3khglUHGBad8y7XsUT1M9flfDIbGPTu6Kdx46lrPrEvnynasBWkgsGumHWSdZud2zawYC3WlyCFSBzPv0l-YKRB4e9e_GGrHs5v50gm01tGmBNtaFQYyqgUNw-QDf4feTaxE5h90eNrQ2_fh7fZQ0b0217PzkTl_GCpPQJl9cFgwO5DgInG54zmcUOKp8bte5-g7EdDYDFW5GEq4cNOWE-Z54Act92MSZYnWgsFl-tlG_xBtvH-MUaH-A75SxZL41rwRskIGZCnuxgBJ06FZ-UJMcg


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# @app.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = authenticate_user(fake_users_db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(status_code=400, detail="Incorrect username or password")
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username, "scopes": form_data.scopes},
#         expires_delta=access_token_expires,
#     )
#     return {"access_token": access_token, "token_type": "bearer"}
#
#

SECRET_KEY = """
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApkkVnbFUJXn6Za9zOoJp
mnlZFDocyOAKQFJli3PuYaMkCS1UI0BT2Mt0NkeFw84hiMhUvVEFpUPT4CytvVcc
NjSbCEBdm/TMCZj0hbISLtjO/CUi7NbyzINCw2KpXpxFFVt3sJmKidCREXy06mOr
CS66KE2t8oxnPpEWbma+fXLH13i1YSJMOePJvx3piAQVy76Os9NV8dPlWf5wyjSP
8OooSc/ZX6tq11IRfQPTKuGyNunLeWDHvY1rwsAtGO3iwcnthP3yMeAmhg69y+sB
cWn5/GGRbFh1sEk18Yl6d7X5zqSQWB/9a+UaeAplCJmD3tUEWDu9e+1nDdmwK6sX
twIDAQAB
-----END PUBLIC KEY-----
"""

# SECRET_KEY = "M5w0HVzW7szOSXGl2mk7kOykzShEkK7kc8pXZZKTCihNoCqAbEXSTU4Do92ysi9X_7SJMgSvQQIk2vxKhcaCzw"
ALGORITHM = "RS256"
# ALGORITHM = "HS256"
MIT_OAUTH2_CLIENT_ID = "baa96962-f4a6-4451-9c04-1fcf05c46c12"

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "is_active": False,
    }
}


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    print(token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print("before payload")
        payload = jwt.decode(
            token, SECRET_KEY, audience=MIT_OAUTH2_CLIENT_ID, algorithms=[ALGORITHM]
        )
        print(payload)
        sub: str = payload.get("sub") or ""
        if sub is None:
            raise credentials_exception
        user = schemas.UserBase(sub=sub)
    except JWTError as e:
        print(e)
        print("foo")
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
