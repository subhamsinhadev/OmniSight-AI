def determine_payout_tier(disruption_type: str, value: float):
    """
    Implements Threshold Limits.
    AQI Example: 300-400 (Moderate/30%), >400 (Severe/100%).
    """
    if disruption_type == "AQI":
        if value >= 400:
            return {"level": "Severe", "percent": 100}
        elif value >= 300:
            return {"level": "Moderate", "percent": 30}
            
    elif disruption_type == "Rainfall":
        if value >= 50: # 50mm+ as per slide
            return {"level": "Severe", "percent": 100}
        elif value >= 20:
            return {"level": "Moderate", "percent": 30}
            
    return None # No threshold crossed

def calculate_payout_amount(avg_daily_income: float, tier_percent: int):
    # Parametric payouts are fixed amounts agreed upfront
    return (avg_daily_income * tier_percent) / 100