// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlyr2LHPo01bMmakvLEvjxaG4e_C1vXAA",
  authDomain: "chat-app-827e3.firebaseapp.com",
  projectId: "chat-app-827e3",
  storageBucket: "chat-app-827e3.appspot.com",
  messagingSenderId: "35551972117",
  appId: "1:35551972117:web:4e9be0dfc0f6fcb51b371c",
  measurementId: "G-VNCG9005XQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);