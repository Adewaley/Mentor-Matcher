// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbwKdc98Sn4ega9fKaOPC_OUEtD9iU0tc",
  authDomain: "mentmatcher-590a9.firebaseapp.com",
  projectId: "mentmatcher-590a9",
  storageBucket: "mentmatcher-590a9.appspot.com",
  messagingSenderId: "698574562688",
  appId: "1:698574562688:web:715f85657e2aa0f0250d65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()

export {auth, db};