// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpO0v578qO6ThQGncRTO7GsJqUSXIlugA",
  authDomain: "spss-2cfd2.firebaseapp.com",
  databaseURL: "https://spss-2cfd2-default-rtdb.firebaseio.com",
  projectId: "spss-2cfd2",
  storageBucket: "spss-2cfd2.appspot.com",
  messagingSenderId: "146208930845",
  appId: "1:146208930845:web:1d299bbe6fac1e65859af4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
