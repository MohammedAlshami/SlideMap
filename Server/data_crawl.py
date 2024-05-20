import requests
import json
from datetime import datetime, timedelta
import base64

def encode_credentials(login, password):
    credentials = f"{login}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    return encoded_credentials

def make_requests(start_year, start_month, start_day):
    start_date = datetime(start_year, start_month, start_day)
    end_date = datetime(2010, 1, 1)
    date_delta = timedelta(days=30)  # Roughly one month
    file_path = 'search_results.json'

    # Load or initialize the results list
    try:
        with open(file_path, 'r') as file:
            results = json.load(file)
    except FileNotFoundError:
        results = []

    while start_date >= end_date:
        before_date = start_date.strftime('%Y-%m-%d')
        start_date -= date_delta
        after_date = start_date.strftime('%Y-%m-%d')
        keyword = f""" (intext:landslide OR intext:landslip OR intext:"tanah runtuh") intext:Malaysia before:{before_date} after:{after_date} """

        # API request setup
        url = "https://api.dataforseo.com/v3/serp/google/news/live/advanced"
        headers = {
            'Authorization': f'Basic {encode_credentials("alshamicourses@gmail.com", "40eb72ba713e9d70")}',
            'Content-Type': 'application/json'
        }
        data = json.dumps([
            {
                "language_code": "en",
                "location_code": 2840,
                "keyword": keyword,
                "calculate_rectangles": True
            }
        ])
        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 200:
            data = response.json()
            results.append(data)
            # Save results to JSON
            with open(file_path, 'w') as file:
                json.dump(results, file)
        else:
            print(f"Failed to fetch data: {response.status_code} - {response.text}")

    print("All requests completed and saved.")

# Example usage
make_requests(2024, 4, 29)
