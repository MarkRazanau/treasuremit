import uuid

from sqlalchemy import (Boolean, Column, DateTime, Float, ForeignKey, Integer,
                        String, func)
from sqlalchemy.orm import relationship

from .database import Base


def uuid_str():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    sub = Column(String, primary_key=True, unique=True, index=True)
    is_active = Column(Boolean, default=True)


class Treasure(Base):
    __tablename__ = "treasures"

    uuid = Column(String, primary_key=True, default=uuid_str)
    name = Column(String, index=True)
    description = Column(String, index=True)
    qr_secret = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=False, index=True)


class Placement(Base):
    __tablename__ = "placements"

    uuid = Column(String, primary_key=True, default=uuid_str)
    clue = Column(String, index=True)
    long = Column(Float)
    lat = Column(Float)
    treasure_uuid = Column(String, ForeignKey("treasures.uuid"))
    placed_by_sub = Column(String, ForeignKey("users.sub"))
    placed_at = Column(DateTime, index=True, server_default=func.now())

    treasure = relationship("Treasure")
    placed_by = relationship("User")


class Find(Base):
    __tablename__ = "finds"

    id = Column(Integer, primary_key=True, index=True)
    placement_uuid = Column(String, ForeignKey("placements.uuid"))
    user_sub = Column(String, ForeignKey("users.sub"))
    found_at = Column(DateTime, index=True, server_default=func.now())

    placement = relationship("Placement")
    user = relationship("User")
