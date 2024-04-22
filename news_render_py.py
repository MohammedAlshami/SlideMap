from flask import Flask, jsonify, request
import requests
from flask_cors import CORS


import pyrebase
firebaseConfig = {
  "apiKey": "AIzaSyBLv1DiRB6egmpaoIKfjODXZF5fYheQKIM",
  "authDomain": "realtimedatabasetest-f226a.firebaseapp.com",
  "databaseURL":
    "https://realtimedatabasetest-f226a-default-rtdb.asia-southeast1.firebasedatabase.app",
  "projectId": "realtimedatabasetest-f226a",
  "storageBucket": "realtimedatabasetest-f226a.appspot.com",
  "messagingSenderId": "348704796176",
  "appId": "1:348704796176:web:38994c5ab4d54b752ce495",
}

firebase = pyrebase.initialize_app(firebaseConfig)

def fetch_slidemapreport():
    # Get a reference to the database service
    db = firebase.database()

    # Retrieve data from the 'slidemapreport' table
    slidemapreport = db.child("SlideMapReports").get()
    # Prepare a list to store the retrieved data
    reports = []

    # Check if the retrieval was successful and collect data into the list
    
    if slidemapreport.each() is not None:
        for report in slidemapreport.each():
            reports.append(report.val())
    else:
        print("No data found.")
    return reports

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/', methods=['GET'])
def index():
    # Fetch JSON data from URL
    json_data = requests.get('https://raw.githubusercontent.com/MohammedAlshami/Datasets/main/generated_news.json').json()
    
    # Check if the index parameter is provided in the query string
    index = request.args.get('index', type=int)
    
    # If index is not provided or out of range, return an empty list
    if index is None or index < 0 or index >= len(json_data):
        return jsonify([])
    
    # Get the news item at the specified index
    news_item = json_data[index]
    
    # Split essay into paragraphs and remove newlines
    paragraphs = news_item['essay'].split('\n\n')
    paragraphs = [p.strip() for p in paragraphs if p.strip()]
    
    # Create a dictionary for the selected news item
    news_dict = {
        'title': news_item['title'],
        'paragraphs': paragraphs,
        'urls': news_item['urls'],
        'location': news_item['predicted_location'],
        'coordinates': news_item['predicted_coordinates'],
        
    }

    response = jsonify(news_dict)
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow access from all origins

    return response

@app.route('/all', methods=['GET'])
def all_news():
    # Fetch JSON data from URL
    json_data = requests.get('https://raw.githubusercontent.com/MohammedAlshami/Datasets/main/generated_news.json').json()

    # Transform the data to contain only the necessary information
    news_list = []
    for index, news_item in enumerate(json_data):
        # Extract the first sentence of the first paragraph
        first_sentence = news_item['essay'].split('.')[0]
        if news_item['predicted_coordinates'] is None:
                    continue

        # Create a dictionary for the news item
        news_dict = {
            'index': index,
            'title': news_item['title'],
            'first_sentence': first_sentence,
            'location': news_item['predicted_location'],
            'coordinates': news_item['predicted_coordinates'],
            'lat': news_item['predicted_coordinates'][0],
            'lon': news_item['predicted_coordinates'][1],
        }
        news_list.append(news_dict)

    return jsonify(news_list)
@app.route('/report', methods=['POST'])
def receive_report():
    try:
        # Get the JSON data from the request
        report_data = request.json
        
        # Extract the relevant fields
        landslide_name = report_data.get('landslideName')
        incident_date = report_data.get('incidentDate')
        size = report_data.get('size')
        casualties = report_data.get('casualties')
        images = report_data.get('images')
        geojson = report_data.get('geoJSON')

        # Print the extracted data
        print(f"Landslide Name: {landslide_name}")
        print(f"Incident Date: {incident_date}")
        print(f"Size: {size}")
        print(f"Casualties: {casualties}")
        print(f"Images: {images}")
        print(f"GeoJSON: {geojson}")

        # You can perform further processing here
        
        return jsonify({'message': 'Report received successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/reports', methods=['GET'])
def reports():
    return jsonify(fetch_slidemapreport())
if __name__ == '__main__':
    app.run(debug=True)
