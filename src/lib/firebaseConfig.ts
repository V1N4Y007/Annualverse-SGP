import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPNcNNixBLpJPtN4sAJdMlHGL_ixuU5BU",
  authDomain: "annualverse-11fa7.firebaseapp.com",
  projectId: "annualverse-11fa7",
  storageBucket: "annualverse-11fa7.appspot.com",
  messagingSenderId: "1028027921733",
  appId: "1:1028027921733:web:f25d195b2848e509a3fa2c",
  measurementId: "G-ZR0ZS99BHQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // 🔥 Authentication
const db = getFirestore(app); // 🔥 Firestore Database
const storage = getStorage(app); // 🔥 File Storage

// Export services
export { app, auth, db, storage };
