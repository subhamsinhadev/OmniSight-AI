

def evaluate_claim(user, db, context):
    risk_score = 0
    reasons = []

    #  1. Sudden Location Jump
    if context.get("sudden_location_jump"):
        risk_score += 30
        reasons.append("Sudden GPS jump")

    #  2. No recent activity
    if not context.get("recent_activity"):
        risk_score += 20
        reasons.append("No delivery activity")

    #  3. Device Integrity
    if context.get("is_emulator"):
        risk_score += 40
        reasons.append("Emulator detected")

    if context.get("is_rooted"):
        risk_score += 30
        reasons.append("Rooted device")

    #  4. Suspicious cluster
    if context.get("suspicious_cluster"):
        risk_score += 25
        reasons.append("Cluster fraud pattern")

    #  5. Network mismatch (basic)
    if context.get("network_mismatch"):
        risk_score += 20
        reasons.append("Network vs location mismatch")

    #  FINAL LEVEL
    if risk_score < 30:
        level = "LOW"
    elif risk_score < 60:
        level = "MEDIUM"
    else:
        level = "HIGH"

    return {
        "risk_score": risk_score,
        "risk_level": level,
        "reasons": reasons
    }