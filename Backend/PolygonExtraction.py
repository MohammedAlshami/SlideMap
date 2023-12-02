from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session

# Your client credentials
client_id = "sh-ca4fe4cf-0b1a-412e-8023-5ae43c5e3904"
client_secret = "A87QNKNWnnqDCnkQwn0oZ4473fJo6iml"

# Create a session
client = BackendApplicationClient(client_id=client_id)
oauth = OAuth2Session(client=client)

# Get token for the session
token = oauth.fetch_token(
    token_url="https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token",
    client_secret=client_secret,
# )

# evalscript = """
# //VERSION=3
# function setup() {
#   return {
#     input: ["DEM"],
#     output: { bands: 1 },
#   }
# }

# function evaluatePixel(sample) {
#   return [sample.DEM / 1000]
# }
# """

# request = {
#     "input": {
#         "bounds": {
#             "properties": {"crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"},
#             "bbox": [
#                 13.822174072265625,
#                 45.85080395917834,
#                 14.55963134765625,
#                 46.29191774991382,
#             ],
#         },
#         "data": [
#             {
#                 "type": "dem",
#                 "dataFilter": {
#                     "demInstance": "COPERNICUS_30",
#                 },
#                 "processing": {
#                     "upsampling": "BILINEAR",
#                     "downsampling": "BILINEAR",
#                 },
#             }
#         ],
#     },
#     "output": {
#         "width": 512,
#         "height": 512,
#         "responses": [
#             {
#                 "identifier": "default",
#                 "format": {"type": "image/png"},
#             }
#         ],
#     },
#     "evalscript": evalscript,
# }



data = {
    "bbox": [13, 45, 14, 46],
    "datetime": "2019-12-10T00:00:00Z/2019-12-10T23:59:59Z",
    "collections": ["sentinel-1-grd"],
    "limit": 5,
}

url = "https://sh.dataspace.copernicus.eu/api/v1/process"

def download_image(url, save_path):
    response = oauth.post(url, json=request)

    if response.status_code == 200:
        print(response.content)
        with open(save_path, "wb") as file:
            file.write(response.content)
        print(f"Image downloaded successfully and saved at {save_path}")
    else:
        print(f"Failed to download image. Status code: {response.status_code}")

    



url = "https://sh.dataspace.copernicus.eu/api/v1/catalog/1.0.0/search"
download_image(url, "test.png")
