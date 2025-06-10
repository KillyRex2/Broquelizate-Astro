// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBpHOpHXa1REQtreUu1MN2fgoo1yUinHA",
  authDomain: "broqueastro.firebaseapp.com",
  projectId: "broqueastro",
  storageBucket: "broqueastro.firebasestorage.app",
  messagingSenderId: "669153646020",
  appId: "1:669153646020:web:981a837fc3f722c67d4091",
  measurementId: "G-DSTHRXFYX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth,
}