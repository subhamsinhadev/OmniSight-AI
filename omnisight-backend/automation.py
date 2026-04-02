from sqlalchemy.orm import Session
from models import User, Payout
from payout_logic import determine_payout_tier, calculate_payout_amount

def process_automated_triggers(db: Session, city: str, disruption_type: str, sensor_value: float):
    """
    1. Trigger fires from API
    2. Policy checked for active workers in zone
    3. Payout released automatically
    """
    tier = determine_payout_tier(disruption_type, sensor_value)
    if not tier:
        return "No threshold hit."

    # Find all active workers in the affected city
    # In production, check 'is_active_policy'
    eligible_workers = db.query(User).filter(User.city == city).all()
    
    payouts_processed = 0
    for worker in eligible_workers:
        # Calculate fixed payout based on tier
        payout_val = calculate_payout_amount(worker.avg_daily_income, tier["percent"])
        
        new_payout = Payout(
            user_id=worker.id,
            amount=payout_val,
            disruption_type=disruption_type,
            severity_level=tier["level"],
            payout_percentage=tier["percent"]
        )
        db.add(new_payout)
        payouts_processed += 1
        
    db.commit()
    return f"Success: {payouts_processed} payouts released at {tier['percent']}% level."