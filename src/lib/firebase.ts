// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeBIM2_Rsg8QV5J6BRMUtTHtAt74ML9f0",
  authDomain: "paws-progress.firebaseapp.com",
  projectId: "paws-progress",
  storageBucket: "paws-progress.firebasestorage.app",
  messagingSenderId: "8584840517",
  appId: "1:8584840517:web:4e9eaa1bb57856d7ecaa2c",
  measurementId: "G-PEQRG4X2X3",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Create and export Firestore instance
const db = getFirestore(app);

// ✅ Export it!
export { db, app };
