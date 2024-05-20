import pyrebase
import uuid
import json

import urllib.parse
import tempfile
import os

def generate_random_uuid():
    # Generate a random 6-digit number as a string
    full_uuid = str(uuid.uuid4())
    return full_uuid

def create_geojson(features):
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }

    # Create a temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.geojson', mode='w+')
    json.dump(geojson, temp_file, indent=4)
    temp_file.close()
    return temp_file.name

class FirebaseDB:
    def __init__(self):
        self.firebase_config = {
   "apiKey": "AIzaSyBLv1DiRB6egmpaoIKfjODXZF5fYheQKIM",
  "authDomain": "realtimedatabasetest-f226a.firebaseapp.com",
  "databaseURL":
    "https://realtimedatabasetest-f226a-default-rtdb.asia-southeast1.firebasedatabase.app",
  "projectId": "realtimedatabasetest-f226a",
  "storageBucket": "realtimedatabasetest-f226a.appspot.com",
  "messagingSenderId": "348704796176",
  "appId": "1:348704796176:web:38994c5ab4d54b752ce495",
        }
        self.firebase = pyrebase.initialize_app(self.firebase_config)
        self.auth = self.firebase.auth()
        self.db = self.firebase.database()
        self.tables = {
            "reports": "SlideMapReports",
            "news": "SlideMapNews",
            "users": "SlideMapUsers"
        }
        self.storage = self.firebase.storage()
    def encode_email(self, email):
        # Encode the email to be Firebase key friendly
        return urllib.parse.quote_plus(email)

    def upload_file(self, file_path):
        # Generate a random file name
        cloud_file_name = generate_random_uuid() + os.path.splitext(file_path)[1]
        try:
            # Upload the file
            self.storage.child(cloud_file_name).put(file_path)
            # Get the download URL
            download_url = self.storage.child(cloud_file_name).get_url(None)
            return download_url
        except Exception as e:
            print("Failed to upload file:", e)
            return None
    def authenticate_user(self, email, password):
        try:
            user = self.auth.sign_in_with_email_and_password(email, password)
            return True  # Authentication successful
        except:
            return False  # Authentication failed

    def register_user(self, first_name, last_name, email, password, confirm_password):
        if password != confirm_password:
            return False  # Password confirmation failed
        try:
            user = self.auth.create_user_with_email_and_password(email, password)
            # Add user details to the database, excluding the password
            data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email
            }
            self.db.child(self.tables["users"]).push(data)
            return True  # Registration successful
        except:
            return False  # Registration failed
    def add_user(self, display_name, email):
        display_name = display_name + " "
        display_name = display_name.split()
        first_name = display_name[0]
        last_name = display_name[1]
        try:
            # Add user details to the database, excluding the password
            data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email
            }
            self.db.child(self.tables["users"]).push(data)
            return True  # Registration successful
        except:
            return False  # Registration failed
    def get_user_record(self, email):
        users = self.db.child(self.tables["users"]).get()
        if users.each():
            for user in users.each():
                if user.val().get("email") == email:
                    return user.val()
        return None  # No user found
    def add_report(self, reporter_email, report_title, date, size, details, list_of_images, list_of_polygons):
        geojson_path = create_geojson(list_of_polygons)
        data = {
            "id": generate_random_uuid(),
            "reporter": reporter_email,
            "title": report_title,
            "date": date,
            "size": size,
            "details": details,
            "images": list_of_images,
            "polygons": list_of_polygons,
            "poly_path": self.upload_file(geojson_path)
        }
        try:
            # Push the report data to the database and get the reference to the new report
            new_report_ref = self.db.child(self.tables["reports"]).push(data)
            report_id = new_report_ref['name']  # This is the unique ID generated for the new report


            # Find the user record by filtering users by email
            users = self.db.child(self.tables["users"]).order_by_child("email").equal_to(reporter_email).get()

            # Check if we got any results; this method returns a PyreResponse object
            if not users.each():
                print("No user found with the specified email.")
                return False
            
            # Assuming email is unique, we should have one user match
            for user in users.each():
                user_key = user.key()  # Get the unique key of the user's record

                # Get existing reports or initialize an empty list if none
                existing_reports = user.val().get("reports", [])

                # Append the new report's unique ID to the existing list of reports
                existing_reports.append(new_report_ref['name'])

                # Update the user's record with the new list of reports
                self.db.child(self.tables["users"]).child(user_key).update({"reports": existing_reports})

            return True  # Report successfully added and user record updated
        except Exception as e:
            print("Error adding report or updating user record:", str(e))
            return False  # Failed to add report or update user record

    def fetch_all_reports(self):
        try:
            # Retrieve all reports from the "reports" node in the database
            reports_data = self.db.child(self.tables["reports"]).get()

            # Initialize an empty list to store reports
            reports = []

            # Check if the fetch was successful and there are reports
            if reports_data.each() is not None:
                for report in reports_data.each():
                    # Append each report's data as a dictionary to the list
                    reports.append(report.val())
            return reports  # Return the list of reports
        except Exception as e:
            print("Error fetching reports:", str(e))
            return []  # Return an empty list in case of error
        
    def fetch_user_reports(self, email):
        try:
            # Step 1: Find the user by filtering users by email
            users = self.db.child(self.tables["users"]).order_by_child("email")

            # Check if any user is found
            if not users.each():
                print("No user found with the specified email.")
                return []

            # Assuming email is unique, we should have one user match
            report_ids = []
            for user in users.each():
                # Get the list of report references from the user's record
                report_ids = user.val().get("reports", [])
                break  # Break after the first match since email should be unique

            # Step 2: Fetch reports based on the report IDs
            reports = []
            for report_id in report_ids:
                report = self.db.child(self.tables["reports"]).child(report_id).get()
                if report.val() is not None:
                    val = report.val()
                    val["report_id"] = report_id
                    reports.append(val)

            return reports  # Return the list of reports
        except Exception as e:
            print("Error fetching user reports:", str(e))
            return []  # Return an empty list in case of error
        
    def fetch_report_details(self, report_id):
        try:
            # Retrieve all report details from the database
            reports = self.db.child(self.tables["reports"]).get()
            if reports.each():
                for report in reports.each():
                    # Check if the internal id matches the provided report_id
                    if report.val().get('id') == report_id:
                        return report.val()  # Return the details of the matching report
            return None  # No report found with the matching id
        except Exception as e:
            print("Error fetching report details:", str(e))
            return None  # Return None in case of an exception





# Example usage


# # Authenticate a user
# auth_status = firebase_db.authenticate_user("user@example.com", "password123")
# print("Authentication status:", auth_status)

# # Register a new user
# registration_status = firebase_db.register_user("John", "Doe", "john.doe@example.com", "securepassword", "securepassword")
# print("Registration status:", registration_status)

# # Fetch a user record
# user_record = firebase_db.get_user_record("john.doe@example.com")
# print("User Record:", user_record)



# reporter = "john.doe@example.com"
# report_title = "Sample Landslide Report"
# date = "2024-04-29"
# size = "Large"
# details = "This is a detailed description of the sample landslide event."
# list_of_images = ["url_to_image1.jpg", "url_to_image2.jpg"]
# list_of_polygons = [[(34.0522, -118.2437), (34.0522, -118.2436)], [(34.0523, -118.2437), (34.0523, -118.2438)]]
# user_reported = "john.doe@example.com"

# # # Call the add_report function
# # result = firebase_db.add_report(reporter, report_title, date, size, details, list_of_images, list_of_polygons)
# # print("Report Record:", result)


# reports = firebase_db.fetch_all_reports()
# # print(reports)


# user_reports_made = firebase_db.fetch_user_reports(reporter)
# # print(user_reports_made)


# single_report = firebase_db.fetch_report_details(user_reports_made[0]["report_id"])
# print(single_report)