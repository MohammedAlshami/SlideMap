// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { getDatabase, ref, push } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DB_URL || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);

interface UploadToFirestoreProps {
  formData: any; // Type of formData object
  tableName: string;
}

// Initialize Realtime Database
const db = getDatabase();

interface CreateAccountProps {
  email: string;
  password: string;
}

export const createAccount = async ({
  email,
  password,
}: CreateAccountProps) => {
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

// export const signInWithGoogle = async () => {
//   try {
//     // Create a Google authentication provider
//     const provider = new GoogleAuthProvider();

//     // Sign in with Google popup
//     const result = await signInWithPopup(auth, provider);

//     // This gives you a Google Access Token
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential?.accessToken;

//     // The signed-in user info
//     const user = result.user;

//     // Return the user object if needed
//     return user;
//   } catch (error) {
//     // Handle errors
//     console.error("Error signing in with Google:", error);
//     return null;
//   }
// };

export default createAccount;
// export default signInWithGoogle;
