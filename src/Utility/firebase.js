// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore"
// //auth
// import {getAuth} from 'firebase/auth'
// import 'firebase/compat/firestore'
// import 'firebase/compat/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyDeyoZrMiTwGMowmmbU590CpLjLxbljJnQ",
//   authDomain: "fir-crud-560fe.firebaseapp.com",
//   databaseURL: "https://fir-crud-560fe-default-rtdb.firebaseio.com",
//   projectId: "fir-crud-560fe",
//   storageBucket: "fir-crud-560fe.firebasestorage.app",
//   messagingSenderId: "994335600508",
//   appId: "1:994335600508:web:14b24a2b857e7459b93ef9",
//   measurementId: "G-2YK0N3DH49"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db=app.firestore();

// Firebase v9 (MODULAR ONLY)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeyoZrMiTwGMowmmbU590CpLjLxbljJnQ",
  authDomain: "fir-crud-560fe.firebaseapp.com",
  projectId: "fir-crud-560fe",
  storageBucket: "fir-crud-560fe.appspot.com",
  messagingSenderId: "994335600508",
  appId: "1:994335600508:web:14b24a2b857e7459b93ef9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
