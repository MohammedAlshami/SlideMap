import requests
import json
import subprocess
from ultralytics import YOLO
from osgeo import gdal

import json
from ultralytics import YOLO

import subprocess
from osgeo import gdal
import json
import geopandas as gpd
from osgeo import gdal
from shapely.geometry import Polygon
crawled_data_sample = {
    "Location": "Father's Organic Farm, off Selangor State Route B66, Batang Kali, Selangor, Malaysia",
    "Coordinates": "101.75383525581202, 3.4234778808338056",
    "Landslide Name": "2022 Batang Kali landslide",
    "Date": "16 December 2022",
    "Time": "~2:00 am (MST)",
    "Landslide Type": "Landslide",
    "Severity and Magnitude": "450,000 m3 (16 million cu ft) of soil displaced",
    "Triggering Factors": "Heavy rainfall",
    "Affected Area": "Father's Organic Farm campsites",
    "Casualties": {
        "Number of Casualties": 31,
        "Participants": 92,
        "Deaths": 31,
        "Non-fatal injuries": 7,
    },
    "Infrastructure Damage": "Severe damage in Hilltop and Farmview sectors",
    "Response and Recovery Efforts": "",
    "Weather Conditions": "SAR operations halted after midnight due to bad weather",
    "Land Use Patterns": "Father's Organic Farm operated a campsite without a license, located near high-risk areas",
    "Historical Data": "Second deadliest disaster in Malaysian history after Highland Towers collapse in 1993",
    "Nearby Locations": "",
    "Casualties Details": {
        "Reported casualties by sectors": {
            "Hilltop": {"Victims": 42, "Deaths": 21},
            "Farmview": {"Victims": 12, "Deaths": 1},
            "Riverside": {"Victims": 26, "Deaths": 4},
            "Green House": {"Victims": 14, "Deaths": 0},
            "Total": {"Victims": 92, "Deaths": 26},
        },
        "List of Victims": [
            {
                "Group": "Mun Choong primary school camping group",
                "Number of Victims": 26,
            }
        ],
    },
}

def mapbox_search(location, coordinates=None):
    # Mapbox API key
    mapbox_api_key = "pk.eyJ1IjoibXNoYW1pIiwiYSI6ImNsb2ZqMzFkbTBudTMycnFjM3QybW54MnAifQ.8SDg8QedEnsOGHU4AL9L4A"

    # Mapbox Search API endpoint
    api_endpoint = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{location}.json"

    # Parameters for the API request
    params = {
        "access_token": mapbox_api_key,
    }

    # Add proximity if coordinates are provided
    if coordinates:
        params["proximity"] = coordinates

    # Make the API request
    response = requests.get(api_endpoint, params=params)
    data = response.json()

    # Extract relevant information from the API response
    # (e.g., name, coordinates, address, etc.)

    # Cross-check with news information and proceed accordingly

    # Save the API response to a JSON file

    return data


# Example usage:
search_query = crawled_data_sample["Location"]
coordinates = crawled_data_sample["Coordinates"]
result = mapbox_search(search_query, coordinates)
print(result)


from openai import OpenAI

client = OpenAI(api_key="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")

gpt_model = "gpt-3.5-turbo-16k"
gpt_role_prompt = """Given the Mapbox search data and news data, cross-check the information to estimate the likely location of the landslide.

         Output format is in json format: {"lat": lat, "lon": lon}

         negative prompt: don't return any text or anything, you only return a python dictionary in the following format [lat, lon]
        """


def gpt_details_Extraction(prompt):
    response = client.chat.completions.create(
        model=gpt_model,
        messages=[
            {
                "role": "system",
                "content": gpt_role_prompt,
            },
            {"role": "user", "content": f"{prompt}"},
        ],
    )
    return response.choices[0].message.content




prompt = f"""
find the most problable estimate of the landslide gps coordiante based on the following data (if not data found then say you coudln't)

    Mapbox Data: \n\n
    {crawled_data_sample}
    News Data:\n\n
    {result}

"""
print(prompt)
y = gpt_details_Extraction(prompt)
# json.dumps(y)

coordinates = json.loads(y)
print(coordinates)


import math

def create_bbox(latitude, longitude, area_size_km=15):
    # Earth radius in kilometers
    earth_radius_km = 6371.0

    # Convert latitude and longitude from degrees to radians
    lat_rad = math.radians(latitude)
    lon_rad = math.radians(longitude)

    # Calculate the distance in kilometers for one degree of latitude and longitude
    lat_degree_km = earth_radius_km * math.pi / 180.0
    lon_degree_km = earth_radius_km * math.pi / 180.0 * math.cos(lat_rad)

    # Calculate the half-size of the bounding box
    half_size_lat = area_size_km / (2 * lat_degree_km)
    half_size_lon = area_size_km / (2 * lon_degree_km)

    # Calculate the bounding box coordinates
    bbox = {
         latitude - half_size_lat,
         latitude + half_size_lat,
         longitude - half_size_lon,
         longitude + half_size_lon,
    }

    return bbox

# Example usage:
# coordinates = {"lat": 3.4234778808338056, "lon": 101.75383525581202}
bbox = create_bbox(coordinates["lat"], coordinates["lon"])
bbox = create_bbox(48.28262494278724, -121.84790539593104)


def split_bbox(bbox, n_splits):
    """
    Splits a bounding box into n_splits smaller bounding boxes.

    Args:
        bbox: A list of 4 numbers representing the bounding box in the format [x_min, y_min, x_max, y_max].
        n_splits: The number of splits to make.

    Returns:
        A list of n_splits lists of 4 numbers, each representing a smaller bounding box.
    """

    x_min, y_min, x_max, y_max = bbox
    w = x_max - x_min
    h = y_max - y_min

    split_width = w / n_splits
    split_height = h / n_splits

    smaller_bboxes = []
    for i in range(n_splits):
        for j in range(n_splits):
            x_min_new = x_min + i * split_width
            y_min_new = y_min + j * split_height
            x_max_new = x_min_new + split_width
            y_max_new = y_min_new + split_height
            smaller_bboxes.append([x_min_new, y_min_new, x_max_new, y_max_new])

    return smaller_bboxes
print("Bounding Box:")



import numpy as np
print(bbox)
print()
# import subprocess
target_crs = 'EPSG:3857'

bboxes = split_bbox(bbox, 6)
for i, bbox in enumerate(bboxes):

    out_file = f"outfile_{i}.tiff"
    command = (
        # 'python ./Map/tms2geotiff.py -s "https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2023_10_mosaic/gmap/{z}/{x}/{y}.png?api_key=PLAKae8a549eb2b24755bc1852bcc4d5ca23" -f'
        'python tms2geotiff.py -s "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" -f'
        + str(bbox[0])
        + ","
        + str(bbox[1])
        + " -t "
        + str(bbox[2])
        + ","
        + str(bbox[3])
        + " -z 18 "
        + "tiff/" + out_file
    )
    # Execute the command
    subprocess.run(command, shell=True)
    model = YOLO("best.pt")
    x = model("tiff/" + out_file, conf=.2, line_thickness=0, boxes=False)

    try:
     data = [i.tolist() for i in x[0].masks.xy]
    except:
        continue
    
    my_tiff = "tiff/" + out_file
    tif = gdal.Open(my_tiff)
    gt = tif.GetGeoTransform()

    x_min = gt[0]
    x_size = gt[1]
    y_min = gt[3]
    y_size = gt[5]

    # Extract polygons and convert pixels to coordinates
    polygons = []
    for polygon_data in data:
        coordinates = []
        for pixel in polygon_data:
            mx, my = pixel
            px = mx * x_size + x_min
            py = my * y_size + y_min
            coordinates.append((px, py))
        polygons.append(Polygon(coordinates))

    # Create a GeoDataFrame
    gdf = gpd.GeoDataFrame(geometry=gpd.GeoSeries(polygons))
    # # Set the coordinate reference system (CRS) based on your TIFF file
    # gdf.crs = {'init': 'epsg:4326'}  # Change 'epsg:4326' to the appropriate CRS
    gdf.crs = tif.GetProjection()

    # gdf = gdf.to_crs(target_crs)

    # Save the GeoDataFrame to a shapefile
    gdf.to_file(f"shape/{out_file}.shp")

