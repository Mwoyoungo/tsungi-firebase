// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFb2Lq46W53bBYgH0MM3zCdWMmZ0s0kZQ",
  authDomain: "tsungiai.firebaseapp.com",
  projectId: "tsungiai",
  storageBucket: "tsungiai.firebasestorage.app",
  messagingSenderId: "544448000375",
  appId: "1:544448000375:web:a8ab57676a7719812c3172",
  measurementId: "G-C05PSMTJ9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;