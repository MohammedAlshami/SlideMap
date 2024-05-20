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
import shutil

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

# Load a pretrained YOLOv8n model
model = YOLO('best.pt')
def detect_landslide(coordinates, output_file="temp.tiff"):
    def calculate_bbox(center_coords, km_per_degree=111, area_km2=1):
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
            command = [
                "python", "tms2geotiff.py",
                "-s", "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                "-f", f"{lower_left_lat},{lower_left_lon}",
                "-t", f"{upper_right_lat},{upper_right_lon}",
                "-z", str(zoom_level),
               out_file_name
            ]

            # Run the command
            try:
                subprocess.run(command, check=True)
                create_tiles(out_file_name, tile[0], 1280, 1280)  # Example: tile size 1024x1024 pixels
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
            x, y = reproject_coordiantes((x, y))
            return x, y
        
        # Convert pixel coordinates to geographic coordinates
        geo_coords = [transform(x_pixel, y_pixel) for x_pixel, y_pixel in pixel_coords]
        
        # Close the TIFF file
        ds = None
        return geo_coords
    
    
    create_geotiff_with_area(coordinates, 18, output_file)
    results = model.predict("detection", imgsz=1280, conf=0.4, iou=0.4,save=True)
    for result in results:

        try:
            masks = result.masks.xy 
        except:
            continue
        detected_polys = []
        for poly in masks:
            poly_list = poly.tolist()
            print(poly_list)
            detected_coordinates = pixels_to_coordinates(result.path, poly.tolist())
            print(detected_coordinates)

            detected_polys.append(detected_coordinates)

    return detected_polys

# output_file = "centered_output.tiff"
# detect_landslide((48.283899402111906, -121.85009940788682), 16, output_file)

def create_tiles(input_file, tile_width, tile_height):
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
            output_filename = f"detection/tile_{i}_{j}.tif"
            gdal.Translate(output_filename, ds, format='GTiff', projWin=[ulx, uly, lrx, lry])
            print(f"Created {output_filename}")


detect_landslide((3.423866, 101.754364))
