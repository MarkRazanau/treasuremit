from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_sub: str):
    return db.query(models.User).filter(models.User.sub == user_sub).first()


def get_treasures(db: Session):
    return (
        db.query(models.Placement)
        .join(models.Treasure)
        .filter(models.Treasure.is_active == True)
        .group_by(models.Placement.treasure_uuid)
        .order_by(func.max(models.Placement.placed_at))
        .all()
    )


def get_user_finds(db: Session, current_user: schemas.User):
    return db.query(models.Find).filter(models.Find.user_sub == current_user.sub).all()


def get_placement(db: Session, placement: schemas.PlacementUUID):
    return (
        db.query(models.Placement)
        .filter(models.Placement.uuid == placement.uuid)
        .first()
    )


def get_treasure(db: Session, treasure: schemas.TreasureUUID):
    return (
        db.query(models.Treasure).filter(models.Treasure.uuid == treasure.uuid).first()
    )


def get_treasure_by_qr(db: Session, treasure_qr: schemas.TreasureQR, is_active: bool):
    return (
        db.query(models.Treasure)
        .filter(models.Treasure.is_active == is_active)
        .filter(models.Treasure.qr_secret == treasure_qr.qr_secret)
        .first()
    )


def get_placement_by_treasure_qr(db: Session, treasure_qr: schemas.TreasureQR):
    return (
        db.query(models.Placement)
        .join(models.Treasure)
        .filter(models.Treasure.is_active == True)
        .filter(models.Treasure.qr_secret == treasure_qr.qr_secret)
        .order_by(models.Placement.placed_at)
        .first()
    )


def create_find(db: Session, user: schemas.User, placement: schemas.Placement):
    db_find = models.Find(placement_uuid=placement.uuid, user_sub=user.sub)
    db.add(db_find)
    db.commit()
    db.refresh(db_find)
    return db_find


def create_placement(
    db: Session,
    user: schemas.User,
    treasure: schemas.Treasure,
    placement_specs: schemas.PlacementCreate,
):
    db_placement = models.Placement(
        clue=placement_specs.clue,
        long=placement_specs.long,
        lat=placement_specs.lat,
        treasure_uuid=treasure.uuid,
        placed_by_sub=user.sub,
    )
    db.add(db_placement)
    db_treasure = (
        db.query(models.Treasure).filter(models.Treasure.uuid == treasure.uuid).first()
    )
    if not db_treasure:
        return None
    db_treasure.is_active = True
    db.commit()
    db.refresh(db_placement)
    return db_placement


def create_treasure(db: Session, treasure: schemas.TreasureCreate):
    db_treasure = models.Treasure(
        name=treasure.name,
        description=treasure.description,
        qr_secret=treasure.qr_secret,
    )
    db.add(db_treasure)
    try:
        db.commit()
        db.refresh(db_treasure)
        return db_treasure
    except IntegrityError:
        return None


def set_treasure_inactive(db: Session, treasure: schemas.Treasure):
    db_treasure = (
        db.query(models.Treasure).filter(models.Treasure.uuid == treasure.uuid).first()
    )
    if not db_treasure:
        return None
    db_treasure.is_active = False
    db.commit()
    db.refresh(db_treasure)
    return db_treasure
