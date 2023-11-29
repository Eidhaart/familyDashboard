// Import statements
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3aBtTg2K95mErmdCrT1n3M4g7kyexXSw",
  authDomain: "family-dashboard-4a7ec.firebaseapp.com",
  databaseURL:
    "https://family-dashboard-4a7ec-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "family-dashboard-4a7ec",
  storageBucket: "family-dashboard-4a7ec.appspot.com",
  messagingSenderId: "670973330653",
  appId: "1:670973330653:web:4b4493b965bd2039298734",
  measurementId: "G-HEN0GPT7GJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
