// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAi3BD7GWL4Eth29ytnVCPTNOZDusEBbdY",
    authDomain: "gaming-portal-26c38.firebaseapp.com",
    projectId: "gaming-portal-26c38",
    storageBucket: "gaming-portal-26c38.appspot.com",
    messagingSenderId: "102807734997",
    appId: "1:102807734997:web:81cd3a07dfe9cd4959f05c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;