// src/config/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArl0odIlbzbYryFBXmhRuLKfFddnOliqQ",
  authDomain: "oncode-e9bd6.firebaseapp.com",
  databaseURL: "https://oncode-e9bd6-default-rtdb.firebaseio.com",
  projectId: "oncode-e9bd6",
  storageBucket: "oncode-e9bd6.firebasestorage.app",
  messagingSenderId: "105906113301",
  appId: "1:105906113301:web:720dc9376915c30bd0371c",
  measurementId: "G-SB3V06H6JK"
};

// ✅ Initialize app only once
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const realtimeDb = getDatabase(app);

// Test connection
console.log('🔥 Firebase services ready:', { auth: !!auth, db: !!db, storage: !!storage });

export { app, auth, db, storage, realtimeDb };
