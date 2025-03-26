import requests

# Function to get latitude & longitude from an address
def get_coordinates(address):
    url = f"https://nominatim.openstreetmap.org/search?q={address}&format=json"
    response = requests.get(url, headers={"User-Agent": "DigiSanjeevaniApp"})
    
    if response.status_code == 200 and response.json():
        location = response.json()[0]
        return float(location["lat"]), float(location["lon"])
    
    return None, None

# Function to get nearby hospitals using Overpass API
def get_nearby_hospitals(lat, lon, radius=5000):
    overpass_url = "https://overpass-api.de/api/interpreter"
    
    query = f"""
    [out:json];
    node
      ["amenity"="hospital"]
      (around:{radius},{lat},{lon});
    out;
    """
    
    response = requests.get(overpass_url, params={"data": query}, headers={"User-Agent": "DigiSanjeevaniApp"})
    
    if response.status_code == 200:
        hospitals = response.json().get("elements", [])
        return [
            {
                "name": hospital.get("tags", {}).get("name", "Unknown Hospital"),
                "latitude": hospital["lat"],
                "longitude": hospital["lon"]
            }
            for hospital in hospitals
        ]
    
    return []
