from database import SessionLocal
from models import User
from decimal import Decimal
from models import Payout
from datetime import datetime

def determine_payout_tier(disruption_type: str, value: float):
    """
    Implements Threshold Limits.
    """

    if disruption_type == "AQI":
        if value >= 300:
            return {"level": "Severe", "percent": 100}
        elif value >= 200:
            return {"level": "Moderate", "percent": 30}

    elif disruption_type == "Rainfall":
        if value >= 50:  # mm
            return {"level": "Severe", "percent": 100}
        elif value >= 20:
            return {"level": "Moderate", "percent": 30}

    return None


def calculate_payout_amount(avg_daily_income: float, tier_percent: int):
    return (avg_daily_income * tier_percent) / 100





def process_payout(disruption_type: str, value: float, user, db):
    try:
        print(f"⚡ Processing {disruption_type} for user {user.name}")

        tier = determine_payout_tier(disruption_type, value)

        if not tier:
            print("❌ No payout tier triggered")
            return False
        
        # ALWAYS re-fetch user in SAME SESSION
        db_user = db.query(User).filter(User.id == user.id).first()

        avg_income = user.avg_daily_income or 500

        raw_amount = (
            Decimal(avg_income) * Decimal(tier["percent"]) / Decimal(100)
        )

# 🔥 CAP LIMIT
        payout_amount = min(raw_amount, Decimal(200))

        print(f"Before: {user.balance}")
        user.balance = Decimal(user.balance or 0) + payout_amount
        print(f"After: {user.balance}")

        print(
            f"💰 Paid ₹{payout_amount} to {user.name} "
            f"({tier['level']} - {tier['percent']}%)"
        )

        payout_record = Payout(
            user_id=user.id,
            amount=payout_amount,
            disruption_type=disruption_type,
            severity_level=tier["level"],
            payout_percentage=tier["percent"],
            timestamp=datetime.now()
        )

        db.add(db_user)
        db.add(payout_record)
        db.commit()
        db.refresh(db_user)

        return True

    except Exception as e:
        print("Payout error:", e)
        db.rollback()
        return False