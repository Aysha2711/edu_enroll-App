// Firebase initialization test
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArl0odIlbzbYryFBXmhRuLKfFddnOliqQ",
  authDomain: "oncode-e9bd6.firebaseapp.com",
  projectId: "oncode-e9bd6",
  storageBucket: "oncode-e9bd6.firebasestorage.app",
  messagingSenderId: "105906113301",
  appId: "1:105906113301:web:720dc9376915c30bd0371c",
  measurementId: "G-SB3V06H6JK",
};

export const testFirebaseInit = () => {
  try {
    console.log('Testing Firebase initialization...');
    
    // Check if Firebase is already initialized
    const apps = getApps();
    console.log('Existing Firebase apps:', apps.length);
    
    // Initialize or get existing app
    const app = apps.length === 0 ? initializeApp(firebaseConfig) : getApp();
    console.log('Firebase app:', app);
    
    // Test auth service
    const auth = getAuth(app);
    console.log('Firebase auth:', auth);
    
    console.log('✅ Firebase initialization test passed');
    return { app, auth, success: true };
  } catch (error) {
    console.error('❌ Firebase initialization test failed:', error);
    return { error, success: false };
  }
};
