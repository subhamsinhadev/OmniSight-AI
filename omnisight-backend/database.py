from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

if os.environ.get("RENDER"):
    SQLALCHEMY_DATABASE_URL = "sqlite:////tmp/omnisight.db"
else:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./omnisight.db"

# # This creates a local file named omnisight.db in your backend folder
# SQLALCHEMY_DATABASE_URL = "sqlite:///./omnisight.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    # check_same_thread is ONLY needed for SQLite
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()