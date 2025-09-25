import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFyrJkZcFhnFf_tj_Jinu7yASgT7C7dA8",
  authDomain: "lastoftheirkind-120c1.firebaseapp.com",
  projectId: "lastoftheirkind-120c1",
  storageBucket: "lastoftheirkind-120c1.firebasestorage.app",
  messagingSenderId: "699165918652",
  appId: "1:699165918652:web:7decbbc078a54b1ff62b31",
  measurementId: "G-9W27T3K8QB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);