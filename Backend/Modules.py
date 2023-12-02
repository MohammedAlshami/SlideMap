import concurrent.futures
import json
from ultralytics import YOLO

import subprocess
from osgeo import gdal
import json
import geopandas as gpd
from osgeo import gdal
from shapely.geometry import Polygon


def download_polygone(polygon):
    print(polygon)
    print("started")
    out_file = "Map/fina.tiff"

    command = (
        # 'python ./Map/tms2geotiff.py -s "https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2023_10_mosaic/gmap/{z}/{x}/{y}.png?api_key=PLAKae8a549eb2b24755bc1852bcc4d5ca23" -f'
        'python ./Map/tms2geotiff.py -s "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" -f'
        + str(polygon[1])
        + ","
        + str(polygon[0])
        + " -t "
        + str(polygon[3])
        + ","
        + str(polygon[2])
        + " -z 16 "
        + out_file
    )
    # Execute the command
    subprocess.run(command, shell=True)

    model = YOLO("Map/best.pt")
    x = model(out_file, conf=.2, line_thickness=0, boxes=False)

    data = [i.tolist() for i in x[0].masks.xy]

    my_tiff = out_file
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

    # Save the GeoDataFrame to a shapefile
    gdf.to_file("Map/o`utput_shapefile.json")
    gdf.to_file("Map/output_shapefile.shp")

    return load_json_file("Map/output_shapefile.json")


def load_json_file(file_path):
    try:
        with open(file_path, "r") as file:
            json_data = json.load(file)
            # print(json_data)
            return json_data
    except FileNotFoundError:
        print(f"Error: File not found at '{file_path}'.")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON in file '{file_path}': {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
