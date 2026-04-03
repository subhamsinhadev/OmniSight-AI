from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
from dotenv import load_dotenv
import hashlib
from database import SessionLocal
from database import get_db
from models import User
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session


load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

#  HASH PASSWORD (FIXED - NO 72 BYTE LIMIT)
def hash_password(password: str):
    hashed = hashlib.sha256(password.encode()).hexdigest()
    return pwd_context.hash(hashed)

#  VERIFY PASSWORD (MATCH WITH HASH LOGIC)
def verify_password(plain, hashed):
    plain_hashed = hashlib.sha256(plain.encode()).hexdigest()
    return pwd_context.verify(plain_hashed, hashed)

#  CREATE TOKEN
def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

#  GET CURRENT USER


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


#  ROLE BASED ACCESS
def require_role(role: str):
    def checker(user=Depends(get_current_user)):
        if user.role != role:
            raise HTTPException(status_code=403, detail="Forbidden: Access restricted")
        return user
    return checker