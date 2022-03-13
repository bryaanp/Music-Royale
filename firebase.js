// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auths = firebase.auth();

export { firebase, db, auths };
