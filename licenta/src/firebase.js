// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDu41MTU5lNepEaioLrVlM1PFZwP3CvRfk",
    authDomain: "licenta-47f5e.firebaseapp.com",
    projectId: "licenta-47f5e",
    storageBucket: "licenta-47f5e.appspot.com",
    messagingSenderId: "710163984947",
    appId: "1:710163984947:web:214e0115ec912fd868a946",
    measurementId: "G-EQPBFRF78N"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);


export { app, firestore, auth, analytics };