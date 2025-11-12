// Firebase initialization utility
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArl0odIlbzbYryFBXmhRuLKfFddnOliqQ",
  authDomain: "oncode-e9bd6.firebaseapp.com",
  projectId: "oncode-e9bd6",
  storageBucket: "oncode-e9bd6.firebasestorage.app",
  messagingSenderId: "105906113301",
  appId: "1:105906113301:web:720dc9376915c30bd0371c",
  measurementId: "G-SB3V06H6JK",
};

let app = null;
let auth = null;
let db = null;
let storage = null;

export const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    const existingApps = getApps();
    
    if (existingApps.length === 0) {
      app = initializeApp(firebaseConfig);
      console.log('✅ Firebase app initialized successfully');
    } else {
      app = getApp();
      console.log('✅ Using existing Firebase app');
    }

    // Initialize services
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Verify services
    if (!auth) throw new Error('Auth service not initialized');
    if (!db) throw new Error('Firestore service not initialized');
    if (!storage) throw new Error('Storage service not initialized');

    console.log('✅ Firebase services initialized successfully');
    return { app, auth, db, storage, success: true };
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    return { error, success: false };
  }
};

export const getFirebaseServices = () => {
  if (!app || !auth || !db || !storage) {
    console.warn('Firebase not initialized. Initializing now...');
    return initializeFirebase();
  }
  return { app, auth, db, storage, success: true };
};

// Initialize Firebase immediately when this module is imported
const initResult = initializeFirebase();
export default initResult;
