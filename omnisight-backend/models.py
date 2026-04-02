from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from database import Base
from datetime import datetime

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

class Payout(Base):
    __tablename__ = "payouts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    disruption_type = Column(String(50)) # e.g., "Heavy Rain", "AQI"
    severity_level = Column(String(20))   # "Moderate", "Severe"
    payout_percentage = Column(Integer)  # 30 or 100
    timestamp = Column(DateTime, default=datetime.utcnow)
    status = Column(String(20), default="Released") # Released, Failed, Inprocess