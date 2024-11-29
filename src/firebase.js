// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import App from "./App";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpaBUGGxg57X8EtNuFua2MakO2qQAVCZw",
  authDomain: "thofinn-56710.firebaseapp.com",
  projectId: "thofinn-56710",
  storageBucket: "thofinn-56710.firebasestorage.app",
  messagingSenderId: "899438955658",
  appId: "1:899438955658:web:ffe4ffa9c9c78a13a07173",
  measurementId: "G-HWQGNPSKHW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//export const db=getFirestore(app)
// Initialize Firebase Authentication and export it
export const db=getFirestore(app)
export const auth=getAuth(app);