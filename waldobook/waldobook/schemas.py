from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    sub: str


class User(UserBase):
    is_active: bool
    costume: str | None

    class Config:
        orm_mode = True


class TreasureQR(BaseModel):
    qr_secret: str


class TreasureBase(BaseModel):
    name: str
    description: str


class TreasureUUID(BaseModel):
    uuid: str


class Treasure(TreasureUUID, TreasureBase):
    is_active: bool

    class Config:
        orm_mode = True


class TreasureCreate(TreasureBase, TreasureQR):
    pass


class PlacementUUID(BaseModel):
    uuid: str


class PlacementBase(BaseModel):
    clue: str
    long: float
    lat: float


class Placement(PlacementUUID, PlacementBase):
    treasure: Treasure
    placed_by: User
    placed_at: datetime

    class Config:
        orm_mode = True


class PlacementCreate(PlacementBase, TreasureQR):
    pass


class Find(BaseModel):
    placement: Placement
    user: User
    found_at: datetime

    class Config:
        orm_mode = True


class Message(BaseModel):
    message: str
