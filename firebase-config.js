// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuA_oJVdDtScr8BQYmmiPv6K_mL75Qfyg",
  authDomain: "music-royale-a3aaa.firebaseapp.com",
  projectId: "music-royale-a3aaa",
  storageBucket: "music-royale-a3aaa.appspot.com",
  messagingSenderId: "623611242673",
  appId: "1:623611242673:web:eb1a775aec4c6806f5da90",
  measurementId: "G-ESG5BJ6W6K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
const analytics = getAnalytics(app);