// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK0q-7o7GwN3ovUPB3Ojrj_idi6qwkqYk",
  authDomain: "netflix-gpt-4f069.firebaseapp.com",
  projectId: "netflix-gpt-4f069",
  storageBucket: "netflix-gpt-4f069.firebasestorage.app",
  messagingSenderId: "552614049770",
  appId: "1:552614049770:web:350768d01e2cd8e409e493",
  measurementId: "G-5DGG52TSVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();