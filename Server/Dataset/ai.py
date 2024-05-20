from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
import requests
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import DBSCAN
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import Normalizer
import math
import subprocess
import sys
import subprocess
import shutil
from ultralytics import YOLO
import math
import subprocess
from PIL import Image; 
import geopandas
import json
from shapely.geometry import Polygon
from shapely.ops import transform
from shapely import affinity
import subprocess

from PIL import Image, ImageDraw
import matplotlib.pyplot as plt
from osgeo import ogr
from osgeo import osr

from osgeo import gdal
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as MatPolygon
import os
from typing import List, Tuple

import geopandas as gpd
from osgeo import ogr

import rasterio
from rasterio.coords import BoundingBox
from pyproj import Transformer
import pandas as pd
import geopandas as gpd
from shapely.geometry import MultiPolygon, Polygon, Point

# Load a pretrained YOLOv8n model
landslidemodel = YOLO('best.pt')
model = ChatOpenAI(temperature=0,model="gpt-3.5-turbo-0125", api_key="sk-proj-CotcYNaTewvyh5oOjquZT3BlbkFJRYxu0jiJuHYG29cHwAHL")

# Define your desired data structure.
class LandslideSummary(BaseModel):
    isLandslide: bool = Field(description="is the content related to natural disasters landslides/landslips")
    title_generated: str = Field(description="title to describe the incident")
    essay_summary: str = Field(description="summary of the incident")
    causalities: list[str] = Field(description="list of damages/causalities for the incident")
    estimated_location: str = Field(description="estimated exact address for the incident")
    
    
def summary_landslide_news(news_content):
        
    # Set up a parser + inject instructions into the prompt template.
    parser = JsonOutputParser(pydantic_object=LandslideSummary)

    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = prompt | model | parser

    output = chain.invoke({"query": news_content})
    return output


def get_coordinates(location_name, access_token="pk.eyJ1IjoibXNoYW1pIiwiYSI6ImNsb2ZqMzFkbTBudTMycnFjM3QybW54MnAifQ.8SDg8QedEnsOGHU4AL9L4A"):

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
def load_excel_sheet(file_path, sheet_name=0):
    """
    Loads an Excel sheet into a pandas DataFrame.
    
    :param file_path: str, the path to the Excel file.
    :param sheet_name: int or str, the name or index of the sheet to load (default is the first sheet).
    :return: DataFrame containing the data from the Excel sheet.
    """
    try:
        # Load the Excel file
        data = pd.read_excel(file_path, sheet_name=sheet_name)
        return data
    except Exception as e:
        print(f"Failed to load Excel file: {e}")
        return None
    
    

def preprocess_text(text):
    # Simple text processing: lowercasing and removing non-alphanumeric characters
    return text.lower().replace(r'[^a-z0-9\s]', '')

def combine_news_rows(df):
    if len(df) == 0:
        return df  # Return empty DataFrame if no data

    # Combine 'Title' and 'Snippet' for feature extraction
    df['combined_text'] = df['Title'] + ' ' + df['Snippet']
    df['combined_text'] = df['combined_text'].apply(preprocess_text)

    # Create a TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(max_df=0.8, min_df=1, stop_words='english', use_idf=True)

    # Normalizer and Vectorizer
    text_matrix = vectorizer.fit_transform(df['combined_text'])
    text_matrix = Normalizer().fit_transform(text_matrix)

    # DBSCAN model
    dbscan = DBSCAN(eps=0.5, min_samples=2, metric='cosine')

    # Fit the model
    clusters = dbscan.fit_predict(text_matrix)

    # Add cluster labels to the DataFrame
    df['cluster'] = clusters

    # Group by 'cluster' and aggregate fields into lists
    combined_df = df.groupby('cluster').agg({
        'Source': lambda x: list(x),
        'Title': lambda x: list(x),
        'Link': lambda x: list(x),
        'Snippet': lambda x: list(x),
        'Email': lambda x: list(x),
        'page_content': lambda x: list(x)
    }).reset_index(drop=True)

    return combined_df


def process_text(row):
    # 'Source', 'Title', 'Link', 'Snippet', 'Email', 'page_content'
    
    text = str(row['Title']) + " " + str(row['Snippet'])
    
    output = summary_landslide_news(text[:16000])
    predicted_coordinates = get_coordinates(output.get("estimated_location", None))
    # Example function that processes text and returns multiple values
    # Replace the return statement with your actual function logic
    return pd.Series({
        'original_title': row["Title"],
        'Sources': row["Link"],
        "Snippet": row["Snippet"],
        "Scrapped_content": row["page_content"],
        'isLandslide': output["isLandslide"],        # Just examples
        'title_generated': output["title_generated"],
        'essay_summary': output["essay_summary"],
        'causalities': output["causalities"],             # First character
        'estimated_location': output.get("estimated_location", None),      # Number of spaces
        'predicted_coordinates': predicted_coordinates
    })

    
def detect_landslide(coordinates, output_file="temp.tiff"):

    def calculate_bbox(center_coords, km_per_degree=111, area_km2=1):
        print(center_coords)
        lat, lon = center_coords
        radius = (area_km2 ** 0.5) / km_per_degree
        return (lon - radius, lat - radius, lon + radius, lat + radius)

    def divide_bbox_into_tiles(bbox, rows, cols):
        min_lon, min_lat, max_lon, max_lat = bbox
        lon_step = (max_lon - min_lon) / cols
        lat_step = (max_lat - min_lat) / rows

        tiles = []
        for row in range(rows):
            for col in range(cols):
                lower_left_lon = min_lon + col * lon_step
                lower_left_lat = min_lat + row * lat_step
                upper_right_lon = lower_left_lon + lon_step
                upper_right_lat = lower_left_lat + lat_step
                tile_bbox = (lower_left_lon, lower_left_lat, upper_right_lon, upper_right_lat)
                tiles.append(tile_bbox)
        
        return tiles

    def create_tiles(input_file, num, tile_width, tile_height):
        ds = gdal.Open(input_file)
        band = ds.GetRasterBand(1)
        xsize = band.XSize
        ysize = band.YSize
        
        for i in range(0, xsize, tile_width):
            for j in range(0, ysize, tile_height):
                ulx = ds.GetGeoTransform()[0] + i * ds.GetGeoTransform()[1]
                uly = ds.GetGeoTransform()[3] + j * ds.GetGeoTransform()[5]
                lrx = ulx + tile_width * ds.GetGeoTransform()[1]
                lry = uly + tile_height * ds.GetGeoTransform()[5]
                output_filename = f"detection/tile_{i}_{j}_{num}.tif"
                gdal.Translate(output_filename, ds, format='GTiff', projWin=[ulx, uly, lrx, lry])
                print(f"Created {output_filename}")

    def create_geotiff_with_area(center_coords, zoom_level, output_file="temp.tiff", area_km2=4):
        if os.path.exists('detection'):
            shutil.rmtree('detection')
        os.makedirs('detection', exist_ok=True)
        """
        Create a GeoTIFF from a TMS based on center coordinates and area.
        
        :param center_coords: Tuple (latitude, longitude) of the center point.
        :param zoom_level: Integer representing the zoom level.
        :param output_file: String, name of the output file (e.g., 'output.tiff').
        :param area_km2: Area in square kilometers for the bbox around the center point.
        """
        # top_left_coords, bottom_right_coords = calculate_bbox(center_coords, area_km2)
        bbox = calculate_bbox(center_coords, area_km2=area_km2)
        tiles = divide_bbox_into_tiles(bbox, rows=2, cols=2)
        for tile in enumerate(tiles):
            out_file_name =  f"detection/{tile[0]}_{output_file}"
            lower_left_lon, lower_left_lat, upper_right_lon, upper_right_lat = tile[1]
            params = ["-f ", "-t "]
            if lower_left_lat <0 or upper_right_lat <0:
                params = ["--from=","--to="]
            command = [
                "python", "tms2geotiff.py",
                "-s", "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                f"{params[0]}{lower_left_lat},{lower_left_lon}",
                f"{params[1]}{upper_right_lat},{upper_right_lon}",
                "-z", str(zoom_level),
               out_file_name
            ]

            # Run the command
            try:
                subprocess.run(command, check=True)
                create_tiles(out_file_name, tile[0], 640, 640)  # Example: tile size 1024x1024 pixels
                # delete file
                os.remove(out_file_name)

                print(f"GeoTIFF generated successfully: {output_file}")
            except subprocess.CalledProcessError as e:
                print(f"An error occurred while generating GeoTIFF: {e}")
            
            
    def reproject_coordiantes(coordiantes, inEPSG=3857, outEPSG=4326):
        from osgeo import ogr
        from osgeo import osr

        InSR = osr.SpatialReference()
        InSR.ImportFromEPSG(inEPSG)       # WGS84/Geographic
        OutSR = osr.SpatialReference()
        OutSR.ImportFromEPSG(outEPSG)     # WGS84 UTM Zone 56 South

        Point = ogr.Geometry(ogr.wkbPoint)
        Point.AddPoint(coordiantes[0], coordiantes[1]) # use your coordinates here
        Point.AssignSpatialReference(InSR)    # tell the point what coordinates it's in
        Point.TransformTo(OutSR)     
        return (Point.GetX(),Point.GetY()) # project it to the out spatial reference
                
    def pixels_to_coordinates(tif_file_path, pixel_coords):
        # Open the TIFF file
        ds = gdal.Open(tif_file_path)
        if ds is None:
            print("Error: Could not open the TIFF file.")
            return None
        
        # Get the geotransformation
        geo_transform = ds.GetGeoTransform()
        
        # Define the transformation function
        def transform(x_pixel, y_pixel):
            # Apply transformation using float precision
            x = geo_transform[0] + (x_pixel + 0.5) * geo_transform[1] + (y_pixel + 0.5) * geo_transform[2]
            y = geo_transform[3] + (x_pixel + 0.5) * geo_transform[4] + (y_pixel + 0.5) * geo_transform[5]
            # x, y = reproject_coordiantes((x, y))
            return x, y
        
        # Convert pixel coordinates to geographic coordinates
        geo_coords = [transform(x_pixel, y_pixel) for x_pixel, y_pixel in pixel_coords]
        
        # Close the TIFF file
        ds = None
        return geo_coords
    
    
    
    if coordinates:
        create_geotiff_with_area(coordinates, 16, output_file)
        results = landslidemodel.predict("detection", imgsz=1280, conf=0.5, iou=0.5,save=False)
        detected_polys = []
        for result in results:

            try:
                masks = result.masks.xy 
            except:
                continue
            
            for poly in masks:
                poly_list = poly.tolist()
                print(poly_list)
                detected_coordinates = pixels_to_coordinates(result.path, poly.tolist())
                print(detected_coordinates)

                detected_polys.append(detected_coordinates)
        return detected_polys
    return []
# Load Dataset
file_path = r"C:\Users\USER\Desktop\FYP\SlideMap\Server\Dataset\Files\Enhanced_Dataset.xlsx"
dataset = load_excel_sheet(file_path)
print(dataset)


# we're going to only take the first 4 records
dataset = dataset.head(800)
print(dataset.columns)


# cluster similar news together
dataset = combine_news_rows(dataset)
print(dataset)





# estimate location using chatgpt
# Assuming 'df' is your DataFrame with 'Title' and 'Snippet'
dataset = dataset[['original_title', 'Sources', "Snippet","Scrapped_content", 'isLandslide', 'title_generated', 'essay_summary', 'causalities', 'estimated_location', 'predicted_coordinates']] = dataset.apply(
    lambda row: process_text(row), axis=1)

# detect landslides
dataset['predicted_polygons'] = dataset['predicted_coordinates'].apply(detect_landslide)
# print(dataset)
print(dataset.head())

print(dataset.dtypes)

print(dataset.describe())
def convert_to_geodataframe(df):
    dataset =pd.DataFrame()
    # Convert list of lists of tuples to MultiPolygon
    def polygons_to_multipolygon(polygons_list):
        return MultiPolygon([Polygon(polygon) for polygon in polygons_list])
    def tuple_to_point(coords_tuple):
        return Point(coords_tuple)
    # Apply conversion to the 'predicted_polygons' column
    dataset['geometry'] = df['predicted_polygons'].apply(polygons_to_multipolygon)
    dataset['predicted_coordinates'] = df['predicted_coordinates'].apply(tuple_to_point)

    # Create a GeoDataFrame
    gdf = gpd.GeoDataFrame(dataset, geometry='geometry')
    gdf.to_file("output.geojson", driver='GeoJSON')
    
    return gdf

import geopandas as gpd
from shapely.geometry import Polygon, MultiPolygon

def polygons_list_to_shapefile(multi_polygons_list, output_filename):
    """
    Convert a list of lists of polygons (where each polygon is represented as a list of coordinate tuples)
    into a shapefile. Each sub-list represents a separate feature consisting of one or more polygons.

    :param multi_polygons_list: List of lists, each containing lists of tuples for multiple polygons.
    :param output_filename: The filename for the output shapefile (without .shp extension).
    """
    # List to store each MultiPolygon geometry
    multi_geometries = []

    for polygons_list in multi_polygons_list:
        # List to store the Polygon objects for the current feature
        current_feature_polygons = []

        for poly_coords in polygons_list:
            # Create a polygon from coordinate tuples and append to the current feature list
            polygon = Polygon(poly_coords)
            current_feature_polygons.append(polygon)

        # Create a MultiPolygon object and append it to the list of geometries
        multi_polygon = MultiPolygon(current_feature_polygons)
        multi_geometries.append(multi_polygon)
    
    # Create a GeoDataFrame
    gdf = gpd.GeoDataFrame(geometry=multi_geometries)
    gdf.set_crs(epsg=3857, inplace=False)
    # Save to a shapefile
    gdf.to_file(f"{output_filename}.shp")



polygons_list_to_shapefile(dataset['predicted_polygons'].tolist(), 'detection_results')

dataset.to_excel('detection_results.xlsx')
dataset.to_json('detection_results.json')

# import pandas as pd
# import ast
# import geojson
# from geojson import Feature, Point, Polygon, MultiPolygon, FeatureCollection

# def safe_eval(coord):
#     try:
#         return ast.literal_eval(coord)
#     except Exception as e:  # Broaden to catch more potential exceptions
#         print(f"Error evaluating coordinate: {e}")
#         return None  # Return None or a default value that makes sense for your dataset



# print(dataset['predicted_coordinates'])

# # dataset['predicted_coordinates'] = dataset['predicted_coordinates'].apply(safe_eval)
# # dataset['predicted_polygons'] = dataset['predicted_polygons'].apply(safe_eval)

# print(dataset['predicted_coordinates'])
# # Creating a new DataFrame with the converted data
# df = pd.DataFrame({
#     'coordinates': dataset['predicted_coordinates'],
#     'polygons': dataset['predicted_polygons'],
#     'original_title': dataset["original_title"],
#     'summary': ['City in California'] * len(dataset)  # Adjust this line if summary varies per row
# })

# def handle_polygons(poly_data):
#     if poly_data:
#         if isinstance(poly_data[0], list):  # Check if it's a list of lists
#             # Create a MultiPolygon if it contains more than one polygon
#             return MultiPolygon([Polygon(p) for p in poly_data])
#         else:
#             # It's a single polygon
#             return Polygon(poly_data)
#     return None
# def dataframe_to_geodataframe(df, coords_column, polygon_column, properties):
#     # List to hold the geometry data
#     geometry_data = []

#     # Iterate over DataFrame rows
#     for _, row in df.iterrows():
#         point_geometry = Point(row[coords_column])
#         if row[polygon_column]:
#             if all(isinstance(poly[0], tuple) for poly in row[polygon_column]):  # It's a Polygon
#                 polygon_geometry = Polygon(row[polygon_column])
#             else:  # It's a MultiPolygon
#                 polygon_geometry = MultiPolygon(row[polygon_column])
#         else:
#             polygon_geometry = None
        
#         geometry = polygon_geometry if polygon_geometry else point_geometry
#         geometry_data.append(geometry)

#     # Create a GeoDataFrame
#     gdf = gpd.GeoDataFrame(df[properties], geometry=geometry_data)

#     # Set the CRS for the GeoDataFrame
#     gdf.set_crs("EPSG:4326", inplace=True)  # Assuming the coordinates are latitude/longitude
#     return gdf


# df['geometry'] = df.apply(lambda row: handle_polygons(row['polygons']) if row['polygons'] else Point(row['coordinates']), axis=1)

# # Convert DataFrame to GeoDataFrame
# gdf = gpd.GeoDataFrame(df, geometry='geometry')

# # Set CRS
# gdf.set_crs("EPSG:4326", inplace=True)  # WGS 84

# # Save as Shapefile, ensuring non-supported data types are handled
# gdf.drop(columns=['polygons'], inplace=True)  # Dropping the polygons column which is no longer needed
# gdf.to_file("output_shapefile.shp")
# # # Convert DataFrame to GeoDataFrame
# # gdf = dataframe_to_geodataframe(new_df, 'coordinates', 'polygons', ['original_title', 'summary'])

# # # Save as Shapefile
# # gdf.to_file("output_shapefile.shp")


# # Additionally, if you want to save as GeoJSON:
# with open('output.geojson', 'w') as f:
#     f.write(gdf.to_json(indent=2))
# def dataframe_to_geojson(df, coords_column, polygon_column, properties):
#     features = []
#     for _, row in df.iterrows():
#         point_geometry = Point(row[coords_column])
#         # Handle MultiPolygon or Polygon based on the list depth
#         if row[polygon_column]:
#             if all(isinstance(poly[0], tuple) for poly in row[polygon_column]):  # Checks if it's a list of tuples (Polygon)
#                 polygon_geometry = Polygon(row[polygon_column])
#             else:  # MultiPolygon
#                 polygon_geometry = MultiPolygon(row[polygon_column])
#         else:
#             polygon_geometry = None
        
#         geometry = polygon_geometry if polygon_geometry else point_geometry
#         properties_data = {prop: row[prop] for prop in properties}
#         feature = Feature(geometry=geometry, properties=properties_data)
#         features.append(feature)
#     return FeatureCollection(features)

# # Convert DataFrame to GeoJSON
# geojson_data = dataframe_to_geojson(new_df, 'coordinates', 'polygons', ['title', 'summary'])

# # Print or output the GeoJSON data
# print(geojson.dumps(geojson_data, indent=2))
# with open('output.geojson', 'w') as f:
#     geojson.dump(geojson_data, f, indent=2)
    

# # convert_to_geodataframe(dataset)
# np.set_printoptions(threshold=sys.maxsize)
# dataset.to_csv('predicted_polygons_dataset.csv')
# landslide_news_content = """

# ASIA
# LOG IN
#  SUBSCRIBE
# E-paper
# Toggle navigation
# 2022 Batang Kali landslide was due to heavy rain: Malaysian DPM

# The landslide occurred on Dec 16, 2022, at the Father’s Organic Farm campsite in Batang Kali, on the outskirts of the Malaysian capital Kuala Lumpur. PHOTO: LIANHE ZAOBAO FILE
# UPDATED OCT 19, 2023, 04:01 PM
# FacebookTelegram
# PETALING JAYA – The deadly Batang Kali landslide that occurred in December 2022 was triggered by a significant rainfall event, not man-made causes, Malaysian Deputy Prime Minister Zahid Hamidi said on Tuesday.

# He said the investigation into the incident found that it was caused by major cumulative rainfall over a period of five days before the landslide occurred.

# “In summary, the results of the forensic analysis found that the rainfall event was the main triggering factor as a result of the combination of the amount of major cumulative rainfall for a period of five days and the antecedent rainfall cumulative for 30 days before the collapse occurred, which was 118.6mm and 444.8mm, respectively,” Datuk Seri Zahid, who chaired the Central Disaster Management Committee, said in a statement.

# “This heavy rain caused the slope failure, resulting in the camping site covering the Hill View, Farm View and River Side areas being buried in soil, causing damage to property and loss of life.

# “The investigation did not find strong evidence showing anthropogenic activity as one of the contributing factors to this landslide event,”

# The landslide occurred on Dec 16, 2022, at the Father’s Organic Farm campsite in Batang Kali, on the outskirts of the Malaysian capital Kuala Lumpur.

# The incident took place during the wee hours and killed 31 people.

# ST Asian Insider: Malaysia Edition
# Get exclusive insights into Malaysia in weekly round-up
# Enter your e-mail
#  Sign up
# By signing up, I accept SPH Media's Terms & Conditions and Privacy Policy as amended from time to time.


# Yes, I would also like to receive SPH Media Group's SPH Media Limited, its related corporations and affiliates as well as their agents and authorised service providers. marketing and promotions.
# Following the tragedy, a special committee called the Landslide Working Group Committee (JKKTR) was established.

# Its aim was to carry out an investigation based on the National Slope Master Plan 2009-2023, according to a decision by Cabinet ministers, Dr Zahid said.

# The committee was led by the Slope Engineering Branch of the Public Works Department and was joined by other technical agencies such as the Department of Minerals and Geosciences Malaysia, and the Department of Survey and Mapping Malaysia.

# The Department of Irrigation and Drainage, Department of Meteorology Malaysia, Universiti Teknologi Malaysia and appointed professional bodies were also part of the committee.

# Dr Zahid said the forensic report prepared by JKKTR has been forwarded to the Works Ministry and the Selangor government to be declassified so that the results of the probe can be accessed by the public.

# “The Selangor government agreed to declassify the report on Oct 5, 2023. The report was submitted to the National Disaster Management Agency (Nadma) on Oct 12, 2023, for further action,” he said.

# The full report can be accessed at Nadma’s website – https://www.nadma.gov.my – from Wednesday. THE STAR/ASIA NEWS NETWORK


# MORE ON THIS TOPIC
# Malaysia search dog Blake, hero of Batang Kali landslide, dies after cancer bout
# I could not believe it, first responder says of number of people affected by Malaysia landslide
# Unlock unlimited access to ST exclusive content, insights and analyses


# ST ONE DIGITAL - ANNUAL
# $9.90 $4.95/month
# Get offer
# $59.40 for the first year and $118.80 per year thereafter.
# ST ONE DIGITAL - MONTHLY
# $9.90/month
# Subscribe today
# No lock-in contract
# Unlock more knowledge, unlock more benefits

# New feature: Stay up to date on important topics and follow your favourite writers with myST
# All subscriber-only content on ST app and straitstimes.com
# Easy access any time via ST app on one mobile device
# Join ST's Telegram channel and get the latest breaking news delivered to you.

# Malaysia Landslide Natural disasters
# FacebookTelegram
# THE STRAITS TIMES
# Available for
# iPhones and iPads
# Available in
# Google Play

 
# E-paper
# Facebook
# Instagram
# Twitter
# LinkedIn
# Newsletters
# RSS Feed
# Telegram
# Youtube
# TikTok
# SINGAPORE
# ASIA
# WORLD
# OPINION
# LIFE
# BUSINESS
# TECH
# SPORT
# VIDEOS
# PODCASTS
# MULTIMEDIA
# About Us
# Terms & Conditions
# Privacy Policy
# Need help? Reach us here.
# Advertise with us
# MCI (P) 066/10/2023. Published by SPH Media Limited, Co. Regn. No. 202120748H. Copyright © 2024 SPH Media Limited. All rights reserved.

# BACK TO THE TOP 
# """





# results= summary_landslide_news(landslide_news_content)
# print(results)



# coordinates =  get_coordinates(results["estimated_location"], access_token)
# print(coordinates)


# # print(landslide_news_check(landslide_news_content))

# import pandas as pd
# from tqdm import tqdm
# tqdm.pandas()  
# df = pd.read_excel(r"C:\Users\USER\Desktop\FYP\SlideMap\Server\Dataset\Files\Enhanced_Dataset_processed.xlsx")
# # column_name = "combined_text"
# # df['is_landslide'] = df[column_name].progress_apply(landslide_news_check)
# # df['is_landslide'] = df[column_name].progress_apply(landslide_news_check)

# # df.to_excel("landslide_check.xlsx")


# def apply_landslide_summary(df, column_name='page_content'):
#     """
#     Applies the landslide_news_check to a specified column of a DataFrame with a progress bar,
#     and expands the results into separate DataFrame columns.
    
#     Args:
#     df (pandas.DataFrame): DataFrame containing the news data.
#     column_name (str): Name of the column to apply the landslide check on.
    
#     Returns:
#     pandas.DataFrame: Updated DataFrame with new columns.
#     """
#     # Define a helper function to unpack results
#     def unpack_landslide_result(row):
#         row = row[:120000]
#         try:
#             result = summary_landslide_news(row)
#         except Exception as e:
#             return {"error": "error"}
#         if isinstance(result, dict):  # Ensure the result is a dictionary
#             return result
#         else:
#             raise ValueError("Expected a dictionary from landslide_news_check but got a different type.")

#     # Use apply to process the column and unpack results into separate columns
#     result_df = df[column_name].progress_apply(unpack_landslide_result).apply(pd.Series)
    
#     # Concatenate the original DataFrame with the new columns
#     df = pd.concat([df, result_df], axis=1)
#     return df


# # output = apply_landslide_summary(df)
# # output.to_excel("dataset_locations_keywords.xlsx")
# # print(output)
# import nltk
# import spacy
 
# # # essential entity models downloads
# # nltk.downloader.download('maxent_ne_chunker')
# # nltk.downloader.download('words')
# # nltk.downloader.download('treebank')
# # nltk.downloader.download('maxent_treebank_pos_tagger')
# # nltk.downloader.download('punkt')
# # nltk.download('averaged_perceptron_tagger')


# import locationtagger
 
# # initializing sample text
# sample_text = "India has very rich and vivid culture\
#        widely spread from Kerala to Nagaland to Haryana to Maharashtra. " \
#        "Delhi being capital with Mumbai financial capital.\
#        Can be said better than some western cities such as " \
#        " Munich, London etc. Pakistan and Bangladesh share its borders"
 
# # extracting entities.
# place_entity = locationtagger.find_locations(url = "https://www.straitstimes.com/asia/se-asia/2022-batang-kali-landslide-was-due-to-heavy-rain-malaysia-dpm-zahid-hamidi")
 
# # getting all countries
# print("The countries in text : ")
# print(place_entity.countries)
 
# # getting all states
# print("The states in text : ")
# print(place_entity.regions)
 
# # getting all cities
# print("The cities in text : ")
# print(place_entity.cities)

# print(place_entity)