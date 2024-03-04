// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd_M_9OcjEBvdIKR_g4IiFXfv1vz4GPPc",
  authDomain: "netflixgpt-51f07.firebaseapp.com",
  projectId: "netflixgpt-51f07",
  storageBucket: "netflixgpt-51f07.appspot.com",
  messagingSenderId: "610437553786",
  appId: "1:610437553786:web:ef4acab4a1591bb2c765c3",
  measurementId: "G-290VJKJRCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();