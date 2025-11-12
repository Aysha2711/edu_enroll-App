import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

const FirebaseTest = () => {
  const [firebaseStatus, setFirebaseStatus] = useState('Checking...');
  const [authStatus, setAuthStatus] = useState('Checking...');

  useEffect(() => {
    // Test Firebase Auth
    if (auth) {
      setFirebaseStatus('✅ Firebase Auth is available');
      
      // Test auth state listener
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthStatus(`✅ User logged in: ${user.email}`);
        } else {
          setAuthStatus('ℹ️ No user logged in');
        }
      });

      return () => unsubscribe();
    } else {
      setFirebaseStatus('❌ Firebase Auth is not available');
      setAuthStatus('❌ Cannot check auth state');
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div><strong>Firebase Test:</strong></div>
      <div>{firebaseStatus}</div>
      <div>{authStatus}</div>
    </div>
  );
};

export default FirebaseTest;
