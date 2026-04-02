def calculate_weekly_premium(city: str, activity_tier: str, avg_income: float):
    """
    Formula: (Probability) * (Avg Income Lost) * (Days Exposed)
    Based on Guidewire DEVTrails Actuarial Basics.
    """
    
    # 1. Probability of Disruption (Historical data mocks)
    # In a real app, this would come from a Weather/AQI API
    city_risk_map = {
        "Delhi": 0.15,    # High AQI risk
        "Mumbai": 0.12,   # High Rain risk
        "Asansol": 0.08,  # Moderate risk
        "Bangalore": 0.05 # Low risk
    }
    probability = city_risk_map.get(city, 0.10)

    # 2. Days Exposed (Weekly cycle)
    days_exposed = 7 

    # 3. Adjust for Activity Tier (Underwriting logic)
    # Gold users (high active days) might get a discount or different exposure
    tier_multiplier = {
        "gold": 0.9,   # 10% discount for consistent workers
        "silver": 1.0, 
        "bronze": 1.2   # Higher risk for irregular workers
    }
    multiplier = tier_multiplier.get(activity_tier, 1.0)

    # FINAL FORMULA
    # We assume a disruption causes a 100% loss of that day's income
    raw_premium = probability * avg_income * days_exposed * multiplier
    
    # Target Range: ₹20 - ₹50 per week (Guidewire Constraint)
    # We apply a 'Sustainability Cap' to keep it affordable for gig workers
    final_premium = max(20.0, min(50.0, raw_premium / 10)) 

    return round(final_premium, 2)

# Quick Test
# print(calculate_weekly_premium("Delhi", "silver", 600))