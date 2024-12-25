// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlRUAwVIN5CoI8D9d-wYFRemlC_XQu4rc",
  authDomain: "care-car-wash.firebaseapp.com",
  projectId: "care-car-wash",
  storageBucket: "care-car-wash.firebasestorage.app",
  messagingSenderId: "146818489952",
  appId: "1:146818489952:web:3357bf5c00b78e746ded05",
  measurementId: "G-EQ6R4PPX15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
