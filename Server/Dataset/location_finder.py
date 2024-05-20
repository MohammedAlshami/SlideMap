import requests
def find_centroid(coordinates):
    """
    Calculate the centroid of a list of (x, y) coordinates.

    :param coordinates: List of tuples, where each tuple consists of (x, y) coordinates
    :return: A tuple (centroid_x, centroid_y) representing the centroid of the coordinates
    """
    if not coordinates:
        return None

    sum_x = sum(point[0] for point in coordinates)
    sum_y = sum(point[1] for point in coordinates)
    count = len(coordinates)

    centroid_x = sum_x / count
    centroid_y = sum_y / count

    return (centroid_x, centroid_y)

def get_coordinates(location_name, access_token):
    """
    Get the coordinates (latitude, longitude) of a location using Mapbox Geocoding API.

    :param location_name: Name of the location to get coordinates for.
    :param access_token: Your Mapbox Access Token.
    :return: A tuple (latitude, longitude) representing the coordinates of the location.
    """
    base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    endpoint = f"{location_name}.json"
    access_token_param = f"access_token={access_token}"
    url = f"{base_url}{endpoint}?{access_token_param}"

    response = requests.get(url)
    data = response.json()

    # Extracting the coordinates from the response
    if "features" in data and len(data["features"]) > 0:
        coordinates = data["features"][0]["geometry"]["coordinates"]
        longitude, latitude = coordinates
        return latitude, longitude
    else:
        print("Location not found.")
        return None
# # Example usage:
# locations = [(3.42328687859436, 101.79409958993118), (3.425499559962016, 101.75427261303894), (3.4286610163065494, 101.69588261542668), (3.4334970705954206, 101.71156612586562), (3.463036795829914, 101.66033056029403)]
# centroid = find_centroid(locations)
# print(f"The centroid of the given locations is: {centroid}")

location_name = "Batang Kali, Malaysia"
access_token = "pk.eyJ1IjoibXNoYW1pIiwiYSI6ImNsb2ZqMzFkbTBudTMycnFjM3QybW54MnAifQ.8SDg8QedEnsOGHU4AL9L4A"

locations = ["batang kali, malaysia", "genting highland, malaysia"]
locations =  [get_coordinates(location, access_token) for location in locations]
print(f"coordinats: {locations}")

centroid = find_centroid(locations)
print(f"The centroid of the given locations is: {centroid}")
