import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, CheckCircle } from 'lucide-react';

const FirebaseStatus = () => {
  const { firebaseError } = useAuth();

  if (!firebaseError) {
    return (
      <div className="firebase-status success" style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: '#d4edda',
        color: '#155724',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        zIndex: 9999,
        opacity: 0.8
      }}>
        <CheckCircle size={14} />
        Firebase Connected
      </div>
    );
  }

  return (
    <div className="firebase-status error" style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#f8d7da',
      color: '#721c24',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <AlertCircle size={14} />
      <div>
        <div style={{ fontWeight: 'bold' }}>Firebase Error</div>
        <div style={{ fontSize: '11px' }}>{firebaseError}</div>
      </div>
    </div>
  );
};

export default FirebaseStatus;
