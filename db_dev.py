
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
            reports.append("value": report.val())
    else:
        print("No data found.")
    return reports

print(fetch_slidemapreport())
