// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, push } from 'firebase/database';
import { useRouter } from "next/navigation";

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

const auth = getAuth(app);

interface UploadToFirestoreProps {
  formData: any; // Type of formData object
  tableName: string;
}

// Initialize Realtime Database
const db = getDatabase();

// Function to add record to Realtime Database
export const uploadToRealtimeDatabase = async ({formData, tableName}: UploadToFirestoreProps) => {
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

interface CreateAccountProps {
  email: string;
  password: string;
}


export const createAccount = async ({ email, password }: CreateAccountProps) => {
  try {
    // Create a new user account with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Log the user's email for confirmation
    const user = userCredential.user;
    console.log("Account created for:", user.email);

    // Return the user object if needed
    return user;
  } catch (error) {
    // Handle errors
    console.error("Error creating account:", error);
    return null;
  }
};

export const signInWithGoogle = async () => {
  try {
    // Create a Google authentication provider
    const provider = new GoogleAuthProvider();

    // Sign in with Google popup
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    

    // The signed-in user info
    const user = result.user;


    // Return the user object if needed
    return user;
  } catch (error) {
    // Handle errors
    console.error("Error signing in with Google:", error);
    return null;
  }
};

// export default uploadToRealtimeDatabase;
export default signInWithGoogle;