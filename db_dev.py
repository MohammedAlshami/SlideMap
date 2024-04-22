
import pyrebase
firebaseConfig = {
  "apiKey": "os.environ.get("FIREBASE_API_KEY","")",
  "authDomain": "os.environ.get("FIREBASE_AUTH_DOMAIN","")",
  "databaseURL":
    "os.environ.get("FIREBASE_DB_URL","")",
  "projectId": "realtimedatabasetest-f226a",
  "storageBucket": "os.environ.get("FIREBASE_STORAGE_BUCKET","")",
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
            reports.append("value": report.val())
    else:
        print("No data found.")
    return reports

print(fetch_slidemapreport())
