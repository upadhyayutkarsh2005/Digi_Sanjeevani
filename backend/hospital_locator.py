import requests
import os

# Load API Key from Environment Variable (Recommended for Security)
GOOGLE_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

def get_nearest_hospitals(latitude, longitude, radius=5000):
    """
    Fetches nearby hospitals using Google Places API.
    """
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{latitude},{longitude}",
        "radius": radius,
        "type": "hospital",
        "key": GOOGLE_API_KEY
    }

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        hospitals = []
        
        for place in data.get("results", []):
            hospitals.append({
                "name": place.get("name"),
                "address": place.get("vicinity"),
                "rating": place.get("rating", "N/A"),
            })

        return hospitals
    else:
        return {"error": "Failed to fetch data from Google Places API"}
