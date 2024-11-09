// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth" ;
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5z8bgor_FCsl5zSx7q0QNQkEPGKQXw3I",
  authDomain: "careerally-78e9f.firebaseapp.com",
  projectId: "careerally-78e9f",
  storageBucket: "careerally-78e9f.firebasestorage.app",
  messagingSenderId: "736792018403",
  appId: "1:736792018403:web:72b7e12125da4e85f434d6",
  measurementId: "G-XRFW08Z1F5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()
// const analytics = getAnalytics(app);

export {app,auth,db} ;