// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpNOJymv_YkXQ0U3ijisDrfkcvAp8yok4",
  authDomain: "note-app-14f28.firebaseapp.com",
  projectId: "note-app-14f28",
  storageBucket: "note-app-14f28.appspot.com",
  messagingSenderId: "931476310026",
  appId: "1:931476310026:web:fd95850fdd1bf6277837f3",
  measurementId: "G-406N7VR2ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export{auth,provider};