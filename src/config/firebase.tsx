// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyCFqJqOE-3J6o2M-E4d35n2BWfa8qMXkYg",
  authDomain: "mantiq-1.firebaseapp.com",
  projectId: "mantiq-1",
  storageBucket: "mantiq-1.firebasestorage.app",
  messagingSenderId: "1022323990142",
  appId: "1:1022323990142:web:20102dc0f5f476d7c8c22f",
  measurementId: "G-CVZX1JDJZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);