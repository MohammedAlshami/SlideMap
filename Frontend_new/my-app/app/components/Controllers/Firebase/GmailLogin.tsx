// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "os.environ.get("FIREBASE_API_KEY","")",
  authDomain: "os.environ.get("FIREBASE_AUTH_DOMAIN","")",
  databaseURL:
    "os.environ.get("FIREBASE_DB_URL","")",
  projectId: "realtimedatabasetest-f226a",
  storageBucket: "os.environ.get("FIREBASE_STORAGE_BUCKET","")",
  messagingSenderId: "348704796176",
  appId: "1:348704796176:web:38994c5ab4d54b752ce495",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



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
