// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLv1DiRB6egmpaoIKfjODXZF5fYheQKIM",
  authDomain: "realtimedatabasetest-f226a.firebaseapp.com",
  databaseURL:
    "https://realtimedatabasetest-f226a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtimedatabasetest-f226a",
  storageBucket: "realtimedatabasetest-f226a.appspot.com",
  messagingSenderId: "348704796176",
  appId: "1:348704796176:web:38994c5ab4d54b752ce495",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

interface UploadToFirestoreProps {
  formData: any; // Type of formData object
  tableName: string;
}

// Initialize Realtime Database
const db = getDatabase();

// Function to add record to Realtime Database
const uploadToRealtimeDatabase = async ({formData, tableName}: UploadToFirestoreProps) => {
  try {
    // Push the form data to the specified location in Realtime Database
    const newPostRef = push(ref(db, tableName), formData);
    console.log('Data pushed to Realtime Database with ID:', newPostRef.key);
    return newPostRef.key; // Return the key of the newly added data
  } catch (error) {
    console.error('Error adding data to Realtime Database:', error);
    return null;
  }
};

export default uploadToRealtimeDatabase;