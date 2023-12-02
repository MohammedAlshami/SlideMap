import requests

# Mapbox API key
mapbox_api_key = "pk.eyJ1IjoibXNoYW1pIiwiYSI6ImNsb2ZqMzFkbTBudTMycnFjM3QybW54MnAifQ.8SDg8QedEnsOGHU4AL9L4A"

# Example search query
search_query = "Bali, Batang Kali"

# Example coordinates (you can specify an area or bounding box)
coordinates = "101.7539,3.4233"

# Mapbox Search API endpoint
api_endpoint = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{search_query}.json"

# Parameters for the API request
params = {
    "access_token": mapbox_api_key,
    "proximity": coordinates,
}

# Make the API request
response = requests.get(api_endpoint, params=params)
data = response.json()
import json
output_file_path = "mapbox_search_results.json"
with open(output_file_path, "w") as output_file:
    json.dump(data, output_file, indent=2)
print(data)
# Extract relevant information from the API response
# (e.g., name, coordinates, address, etc.)

# Cross-check with news information and proceed accordingly
