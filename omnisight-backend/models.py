from sqlalchemy import Column, Integer, String, Float
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    # MySQL requires a length for VARCHAR columns
    name = Column(String(100)) 
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    role = Column(String(50))

    # Fields for Actuarial Pricing
    city = Column(String(100), default="Asansol")
    avg_daily_income = Column(Float, default=500.0)  # Avg income for a delivery partner
    activity_tier = Column(String(20), default="silver") # gold, silver, bronze