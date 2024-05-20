from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
import difflib


from FirebaseDB import FirebaseDB
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

firebase_db = FirebaseDB()

def paginate_list(input_list, items_per_page=6):
    paginated_dict = {}
    num_pages = (len(input_list) + items_per_page - 1) // items_per_page

    for page_num in range(1, num_pages + 1):
        start_index = (page_num - 1) * items_per_page
        end_index = min(page_num * items_per_page, len(input_list))
        paginated_dict[str(page_num)] = input_list[start_index:end_index]

    return paginated_dict

def sort_entries_by_relevance(entries, search_query):
    """
    Sorts a list of dictionaries based on the relevance to a given search query,
    prioritizing 'title' first and 'description' second.

    Parameters:
        entries (list): A list of dictionaries, each containing at least a 'title' and 'description'.
        search_query (str): The search term to match against the entries.

    Returns:
        list: A list of dictionaries sorted by relevance to the search query.
    """
    if search_query:  # Check if search_query has a value
        def score_entry(entry):
            title_score = difflib.SequenceMatcher(None, entry['title'], search_query).ratio()
            description_score = difflib.SequenceMatcher(None, entry['details'], search_query).ratio()
            # Weight the title more than the description
            return title_score * 0.7 + description_score * 0.3

        # Sort the entries by the score, highest first
        entries.sort(key=score_entry, reverse=True)
        
        
    return entries

def fetch_slidemapreport(page, search):
    
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
        
        
    # print(reports)
    
    if search:
        reports = sort_entries_by_relevance(reports, search)
        
    
    if page:
        reports = paginate_list(reports, 6) 
        reports = reports[str(page)]
        
    
    return reports

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Apply CORS to all routes and all domains

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
    page = request.args.get('page', type=int)
    search = request.args.get('search', type=int)


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
        

    if page:
        news_list= sort_entries_by_relevance(news_list, search)
        
    news_list_returned = paginate_list(news_list, 6)
    print(news_list_returned)
    if page:
        news_list_returned = news_list_returned[str(page)]
    else:
        news_list_returned = news_list_returned['1']
    
    return jsonify({"data": news_list, "total": len(news_list_returned)})
@app.route('/report', methods=['POST'])
def receive_report():
    try:
        # Get the JSON data from the request
        report_data = request.json
        print("report data: ", report_data)
        
        # Extract the relevant fields
        # reporter_email = report_data.get('reporterEmail')
        email = report_data.get('email')
        report_title = report_data.get('title')
        incident_date = report_data.get('Date')
        size = report_data.get('landslide_size')
        details = report_data.get('details')
        list_of_images = report_data.get('images')
        list_of_polygons = report_data.get('polygons')
        
        firebase_db.add_report(email, report_title, incident_date, size, details, list_of_images, list_of_polygons)

        # # Print the extracted data
        # print(f"Landslide Name: {landslide_name}")
        # print(f"Incident Date: {incident_date}")
        # print(f"Size: {size}")
        # print(f"Casualties: {casualties}")
        # print(f"Images: {images}")
        # print(f"GeoJSON: {geojson}")

        # # You can perform further processing here
        
        return jsonify({'message': 'Report received successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/register', methods=['POST', 'GET'],)
def register():
    try:
        # Get the JSON data from the request
        credentials = request.json
        print("credentials data: ", credentials)
        
        # Extract the relevant fields
        # reporter_email = report_data.get('reporterEmail')
        email = credentials.get('email')
        password = credentials.get('password')
        first_name = credentials.get('firstName', "test")
        last_name = credentials.get('lastName', "test")
        isgoogle= credentials.get('isGoogle', False)
        display_name = credentials.get('displayName', "test")
        
        if isgoogle:
            try:
                authentication_success = firebase_db.add_user(display_name, email)
            except:
                raise Exception("Account already registered")
        else:

            try:
                authentication_success = firebase_db.register_user(first_name, last_name, email, password, password)
            except:
                raise Exception("Account already registered")
            
        if not authentication_success:
            raise Exception("Authentication failed")
        
        return jsonify({'message': 'Report received successfully', "authenticated": True}), 200
    except Exception as e:
        return jsonify({'error': str(e), "authenticated": True}), 400


@app.route('/reports', methods=['GET'])
def reports():
    page = request.args.get('page', type=int)
    search = request.args.get('search', type=int)

    reports_list= fetch_slidemapreport(page, search)
    reports = {"data": reports_list, "total": len(reports_list)}
    return jsonify(reports)


@app.route('/personal_reports', methods=['GET', 'POST'])
def personal_reports():
    report_data = request.json
    email = report_data.get('email')
    print(email)
    reports_list = firebase_db.fetch_user_reports("alshamicourses@gmail.com")
    
    return jsonify(reports_list)


@app.route('/fetch_report', methods=['GET'])
def fetch_report():

    # Check if the index parameter is provided in the query string
    report_id = request.args.get('uuid', type=str)
    print(report_id)
    report_details = firebase_db.fetch_report_details(report_id)
    print(report_details)

    response = jsonify(report_details)
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow access from all origins
    return response

@app.route('/login', methods=['POST', 'GET'],)
def login():
    try:
        # Get the JSON data from the request
        credentials = request.json
        print("credentials data: ", credentials)
        
        # Extract the relevant fields
        # reporter_email = report_data.get('reporterEmail')
        email = credentials.get('email')
        password = credentials.get('password')

        try:
            authentication_success = firebase_db.authenticate_user(email, password)
        except:
            raise Exception("Account already registered")
        
        if not authentication_success:
            raise Exception("Authentication failed")
        
        return jsonify({'message': 'Report received successfully', "authenticated": True}), 200
    except Exception as e:
        return jsonify({'error': str(e), "authenticated": False}), 400
    
if __name__ == '__main__':
    app.run(debug=True)
