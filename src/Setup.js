// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDDzlAea9hv-cTQIehos8fcHAlbZrwjcI",
  authDomain: "booxchange-hub.firebaseapp.com",
  projectId: "booxchange-hub",
  storageBucket: "booxchange-hub.appspot.com",
  messagingSenderId: "66736776635",
  appId: "1:66736776635:web:cfd2e4a7b8f62ad9e5109e",
  measurementId: "G-DVT68WQPB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)

