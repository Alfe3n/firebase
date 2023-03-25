// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBExe7OpGxpfVgQ1hpCUWPaRmsi87ajNJA",
  authDomain: "first-project-48530.firebaseapp.com",
  projectId: "first-project-48530",
  storageBucket: "first-project-48530.appspot.com",
  messagingSenderId: "90802975463",
  appId: "1:90802975463:web:24a8d8aad44726a3252842",
  measurementId: "G-Z7NHZXR4FS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
