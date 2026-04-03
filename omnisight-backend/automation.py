import time
import requests
import os
import random
from payout_logic import process_payout

AQI_THRESHOLD = 250


def fetch_aqi(city="Asansol"):
    API_KEY = os.getenv("AQI_API_KEY")

    try:
        if API_KEY:
            url = f"https://api.waqi.info/feed/{city}/?token={API_KEY}"
            response = requests.get(url)
            data = response.json()

            if data["status"] == "ok":
                return data["data"]["aqi"]

        print(" Using mock AQI data")
        return random.randint(100, 400)

    except Exception as e:
        print("Error fetching AQI:", e)
        return random.randint(100, 400)


def start_oracle():
    print(" Oracle started...")

    while True:
        aqi = fetch_aqi()

        if aqi is not None:
            print(f" Current AQI: {aqi}")

            if aqi > AQI_THRESHOLD:
                print(" AQI Threshold breached!")
                process_payout("AQI",aqi)

        # time.sleep(300) # 5 min timer 
        time.sleep(30)  # for faster demo

