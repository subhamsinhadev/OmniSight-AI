"""
OmniSight AI — Generate Training Data for New Zones & Retrain
=============================================================
Generates realistic synthetic historical data for zones 6-20
(Delhi, Kolkata, Chennai) and retrains the XGBoost model.

City Risk Profiles:
  - Delhi:   High heat, air pollution, moderate flooding, urban congestion
  - Kolkata: Heavy monsoon flooding, river proximity, power outages
  - Chennai: Cyclone exposure, coastal flooding, waterlogging
"""

import numpy as np
import pandas as pd
from pathlib import Path
from datetime import datetime, timedelta
import sys
import io

if hasattr(sys.stdout, 'buffer'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'buffer'):
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

np.random.seed(42)

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
BASE = Path(__file__).resolve().parent.parent
ZONE_HISTORY = BASE / "omnisight-backend" / "model-risk-prediction" / "data" / "raw" / "zones" / "zone_history.csv"
SCORES_OUT   = BASE / "omnisight-backend" / "model-risk-prediction" / "data" / "processed" / "zone_risk_scores_latest.csv"
FEATURES_OUT = BASE / "omnisight-backend" / "model-risk-prediction" / "data" / "features" / "weekly_zone_features.csv"

# ---------------------------------------------------------------------------
# Zone profiles — city-specific parameters
# ---------------------------------------------------------------------------
ZONE_PROFILES = {
    # Delhi zones — hot, polluted, urban flooding
    "zone_6":  {"city": "Delhi",   "name": "Chandni Chowk",   "river_km": 3.2,  "coastal": 0.0,  "elev": 216, "base_risk": 72, "rain_mult": 0.7, "disruption_mult": 1.3},
    "zone_7":  {"city": "Delhi",   "name": "Connaught Place",  "river_km": 5.1,  "coastal": 0.0,  "elev": 220, "base_risk": 55, "rain_mult": 0.5, "disruption_mult": 1.0},
    "zone_8":  {"city": "Delhi",   "name": "Lajpat Nagar",    "river_km": 4.8,  "coastal": 0.0,  "elev": 218, "base_risk": 60, "rain_mult": 0.6, "disruption_mult": 1.1},
    "zone_9":  {"city": "Delhi",   "name": "Dwarka",          "river_km": 8.5,  "coastal": 0.0,  "elev": 225, "base_risk": 45, "rain_mult": 0.4, "disruption_mult": 0.8},
    "zone_10": {"city": "Delhi",   "name": "Rohini",          "river_km": 6.2,  "coastal": 0.0,  "elev": 222, "base_risk": 50, "rain_mult": 0.5, "disruption_mult": 0.9},
    # Kolkata zones — monsoon flooding, river delta
    "zone_11": {"city": "Kolkata", "name": "Salt Lake",       "river_km": 2.1,  "coastal": 0.35, "elev": 9,   "base_risk": 68, "rain_mult": 1.2, "disruption_mult": 1.2},
    "zone_12": {"city": "Kolkata", "name": "Howrah",          "river_km": 0.5,  "coastal": 0.45, "elev": 6,   "base_risk": 78, "rain_mult": 1.4, "disruption_mult": 1.5},
    "zone_13": {"city": "Kolkata", "name": "Park Street",     "river_km": 3.0,  "coastal": 0.3,  "elev": 11,  "base_risk": 50, "rain_mult": 0.9, "disruption_mult": 0.9},
    "zone_14": {"city": "Kolkata", "name": "Jadavpur",        "river_km": 4.5,  "coastal": 0.25, "elev": 8,   "base_risk": 58, "rain_mult": 1.0, "disruption_mult": 1.0},
    "zone_15": {"city": "Kolkata", "name": "Dum Dum",         "river_km": 3.8,  "coastal": 0.3,  "elev": 10,  "base_risk": 62, "rain_mult": 1.1, "disruption_mult": 1.1},
    # Chennai zones — cyclone coast, heavy monsoon
    "zone_16": {"city": "Chennai", "name": "T. Nagar",        "river_km": 2.5,  "coastal": 0.75, "elev": 15,  "base_risk": 58, "rain_mult": 1.1, "disruption_mult": 1.0},
    "zone_17": {"city": "Chennai", "name": "Adyar",           "river_km": 0.8,  "coastal": 0.9,  "elev": 7,   "base_risk": 70, "rain_mult": 1.3, "disruption_mult": 1.3},
    "zone_18": {"city": "Chennai", "name": "Anna Nagar",      "river_km": 3.5,  "coastal": 0.6,  "elev": 18,  "base_risk": 48, "rain_mult": 0.8, "disruption_mult": 0.85},
    "zone_19": {"city": "Chennai", "name": "Velachery",       "river_km": 1.2,  "coastal": 0.7,  "elev": 10,  "base_risk": 65, "rain_mult": 1.2, "disruption_mult": 1.2},
    "zone_20": {"city": "Chennai", "name": "Tambaram",        "river_km": 5.0,  "coastal": 0.5,  "elev": 22,  "base_risk": 40, "rain_mult": 0.6, "disruption_mult": 0.7},
}

# ---------------------------------------------------------------------------
# Generate weekly data for each zone
# ---------------------------------------------------------------------------
def generate_zone_data(zone_id: str, profile: dict) -> pd.DataFrame:
    """Generate ~112 weeks of realistic zone history data."""
    
    start_date = datetime(2024, 2, 1)
    n_weeks = 112  # Match Mumbai data length
    
    rows = []
    prev_risk = profile["base_risk"] * 0.3  # Start low
    
    for w in range(n_weeks):
        week_start = start_date + timedelta(weeks=w)
        month = week_start.month
        
        # Monsoon seasonality (Jun-Sep = high risk)
        is_monsoon = month in [6, 7, 8, 9]
        is_pre_monsoon = month in [4, 5]
        is_post_monsoon = month in [10, 11]
        is_winter = month in [12, 1, 2, 3]
        
        season_mult = 1.0
        if is_monsoon:
            season_mult = 1.8
        elif is_pre_monsoon:
            season_mult = 1.3
        elif is_post_monsoon:
            season_mult = 1.2
        
        # City-specific: Chennai has Oct-Dec NE monsoon
        if profile["city"] == "Chennai" and month in [10, 11, 12]:
            season_mult = 2.0
        
        # City-specific: Delhi has Jun-Jul extreme heat
        if profile["city"] == "Delhi" and month in [5, 6]:
            season_mult = max(season_mult, 1.5)
        
        rm = profile["rain_mult"]
        dm = profile["disruption_mult"]
        
        # Flood events
        flood_base = 1.5 * season_mult * rm
        flood_event_count = max(0, int(np.random.poisson(flood_base)))
        
        # Rainfall
        avg_rain = max(0, np.random.normal(80 * season_mult * rm, 40))
        max_rain = avg_rain + abs(np.random.normal(20, 15))
        
        # Curfew
        curfew_count = np.random.choice([0, 0, 0, 0, 1, 1, 2], p=[0.4, 0.15, 0.1, 0.1, 0.1, 0.1, 0.05])
        avg_curfew_hours = abs(np.random.normal(2.0, 1.5))
        
        # Power outages
        power_base = 2.0 * season_mult * dm
        power_outage_count = max(0, int(np.random.poisson(power_base)))
        avg_power_hours = abs(np.random.normal(3.0, 1.5))
        
        # Traffic disruption
        traffic_hours = max(2, np.random.normal(8.0 * dm, 3.0))
        disruption_days = min(12, max(0, int(np.random.poisson(5 * dm))))
        
        # Adjacent zone risk (builds up over time with some randomness)
        adjacent_risk = min(100, max(20, prev_risk + np.random.normal(2, 8)))
        
        # Historical risk score — blend of features
        feature_risk = (
            flood_event_count * 8 +
            avg_rain * 0.15 +
            max_rain * 0.1 +
            power_outage_count * 5 +
            traffic_hours * 1.5 +
            disruption_days * 2 +
            profile["coastal"] * 15 +
            (10 - min(10, profile["river_km"])) * 3 +
            (1 - profile["elev"] / 250) * 10
        )
        
        # Normalize to 0-100 with some noise
        hist_risk = np.clip(feature_risk * 0.5 + np.random.normal(0, 5), 30, 98)
        
        # Smoothing with previous week
        hist_risk = 0.3 * prev_risk + 0.7 * hist_risk
        hist_risk = round(np.clip(hist_risk, 30, 98), 6)
        
        prev_risk = adjacent_risk
        
        rows.append({
            "zone_id": zone_id,
            "week_start": week_start.strftime("%Y-%m-%d"),
            "flood_event_count_24m": flood_event_count,
            "avg_event_rainfall_mm": round(avg_rain, 3),
            "max_event_rainfall_mm": round(max_rain, 3),
            "curfew_count_qtr": curfew_count,
            "avg_curfew_hours": round(avg_curfew_hours, 3),
            "power_outage_count_month": power_outage_count,
            "avg_power_outage_hours": round(avg_power_hours, 3),
            "traffic_disruption_hours_week": round(traffic_hours, 3),
            "disruption_days_month": disruption_days,
            "proximity_river_km": profile["river_km"],
            "coastal_exposure_index": profile["coastal"],
            "elevation_m": profile["elev"],
            "adjacent_zone_risk_prev_week": round(adjacent_risk, 3),
            "historical_risk_score": hist_risk,
        })
    
    return pd.DataFrame(rows)


def main():
    print("=" * 60)
    print("OmniSight AI — Zone Data Generator & Model Trainer")
    print("=" * 60)
    
    # Step 1: Load existing data
    print("\n[1/4] Loading existing zone history...")
    existing = pd.read_csv(ZONE_HISTORY)
    print(f"       Existing: {len(existing)} rows, zones: {existing['zone_id'].unique().tolist()}")
    
    # Step 2: Generate new zone data
    print("\n[2/4] Generating data for zones 6–20...")
    new_frames = []
    for zone_id, profile in ZONE_PROFILES.items():
        df = generate_zone_data(zone_id, profile)
        new_frames.append(df)
        print(f"       {zone_id} ({profile['name']}, {profile['city']}): {len(df)} weeks generated")
    
    new_data = pd.concat(new_frames, ignore_index=True)
    print(f"       Total new rows: {len(new_data)}")
    
    # Step 3: Combine and save
    print("\n[3/4] Merging with existing data and saving...")
    # Remove any existing zone_6+ data to avoid duplicates
    existing = existing[~existing["zone_id"].isin(ZONE_PROFILES.keys())]
    combined = pd.concat([existing, new_data], ignore_index=True)
    combined.to_csv(ZONE_HISTORY, index=False)
    print(f"       ✅ zone_history.csv updated: {len(combined)} total rows, {combined['zone_id'].nunique()} zones")
    
    # Step 4: Train XGBoost model
    print("\n[4/4] Training XGBoost model on all 20 zones...")
    train_model(combined)
    
    print("\n" + "=" * 60)
    print("✅ DONE — All 20 zones now have trained XGBoost baselines!")
    print("   Restart uvicorn and re-run generate_zone_heatmap.py")
    print("=" * 60)


def train_model(df: pd.DataFrame):
    """Train XGBoost on the combined dataset and output scores."""
    try:
        from xgboost import XGBRegressor
    except ImportError:
        print("       ⚠️  xgboost not installed. Run: pip install xgboost")
        print("       Generating scores from statistical baseline instead...")
        generate_statistical_scores(df)
        return
    
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import r2_score, mean_squared_error
    
    feature_cols = [
        "flood_event_count_24m", "avg_event_rainfall_mm", "max_event_rainfall_mm",
        "curfew_count_qtr", "avg_curfew_hours", "power_outage_count_month",
        "avg_power_outage_hours", "traffic_disruption_hours_week", "disruption_days_month",
        "proximity_river_km", "coastal_exposure_index", "elevation_m",
        "adjacent_zone_risk_prev_week",
    ]
    
    X = df[feature_cols].values
    y = df["historical_risk_score"].values
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = XGBRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.08,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        verbosity=0,
    )
    model.fit(X_train, y_train)
    
    preds_test = model.predict(X_test)
    r2 = r2_score(y_test, preds_test)
    rmse = mean_squared_error(y_test, preds_test) ** 0.5
    print(f"       XGBoost R² = {r2:.4f}, RMSE = {rmse:.2f}")
    
    # Score ALL rows
    df["predicted_score"] = np.clip(model.predict(X), 0, 100)
    
    # Build output CSV
    scored_utc = datetime.utcnow().isoformat() + "+00:00"
    out_rows = []
    for _, row in df.iterrows():
        score = round(float(row["predicted_score"]), 6)
        risk_bin = "high" if score >= 66 else ("medium" if score >= 33 else "low")
        out_rows.append({
            "zone_id": row["zone_id"],
            "week_start": row["week_start"],
            "risk_score_0_100": score,
            "risk_bin": risk_bin,
            "scored_utc": scored_utc,
        })
    
    out_df = pd.DataFrame(out_rows)
    SCORES_OUT.parent.mkdir(parents=True, exist_ok=True)
    out_df.to_csv(SCORES_OUT, index=False)
    print(f"       ✅ zone_risk_scores_latest.csv: {len(out_df)} rows, {out_df['zone_id'].nunique()} zones")
    
    # Summary per zone (latest week)
    latest = out_df.sort_values("week_start").groupby("zone_id").last().reset_index()
    print("\n       Latest Scores per Zone:")
    print(f"       {'Zone':<10} {'Score':>6}  {'Bin'}")
    print("       " + "-" * 30)
    for _, r in latest.iterrows():
        print(f"       {r['zone_id']:<10} {r['risk_score_0_100']:>6.1f}  {r['risk_bin']}")


def generate_statistical_scores(df: pd.DataFrame):
    """Fallback if XGBoost is not installed — use feature-weighted scoring."""
    scored_utc = datetime.utcnow().isoformat() + "+00:00"
    out_rows = []
    
    for _, row in df.iterrows():
        score = float(row["historical_risk_score"])
        risk_bin = "high" if score >= 66 else ("medium" if score >= 33 else "low")
        out_rows.append({
            "zone_id": row["zone_id"],
            "week_start": row["week_start"],
            "risk_score_0_100": round(score, 6),
            "risk_bin": risk_bin,
            "scored_utc": scored_utc,
        })
    
    out_df = pd.DataFrame(out_rows)
    SCORES_OUT.parent.mkdir(parents=True, exist_ok=True)
    out_df.to_csv(SCORES_OUT, index=False)
    print(f"       ✅ zone_risk_scores_latest.csv: {len(out_df)} rows (statistical baseline)")


if __name__ == "__main__":
    main()
