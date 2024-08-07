// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.F_API_KEY,
  authDomain: "booxchange-hub.firebaseapp.com",
  projectId: "booxchange-hub",
  storageBucket: "booxchange-hub.appspot.com",
  messagingSenderId: process.env.F_MSENDER_ID,
  appId: process.env.F_API_ID,
  measurementId: process.env.F_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)

