import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
DATABASE_URL = os.getenv("DATABASE_URL")

engine = None
if DATABASE_URL:
    engine = create_engine('postgresql://' + DATABASE_URL.split('://')[1])
else:
    engine = create_engine("sqlite:///./sql_app.db", connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
