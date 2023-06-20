// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1XUohrb47UQjsH5092mYhLO4rJR5H30o",
  authDomain: "licenta-c2e5f.firebaseapp.com",
  projectId: "licenta-c2e5f",
  storageBucket: "licenta-c2e5f.appspot.com",
  messagingSenderId: "207949649887",
  appId: "1:207949649887:web:98d695e654957e34c1966a",
  measurementId: "G-Z3PTEQ8V9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence);

export { app, firestore, auth, analytics, storage };