// Import the robust Firebase initialization
import { getFirebaseServices } from './utils/firebaseInit.js';

// Get Firebase services (will initialize if not already done)
const { app, auth, db, storage, success } = getFirebaseServices();

if (!success) {
  console.error('❌ Failed to initialize Firebase services');
  throw new Error('Firebase initialization failed');
}

export { auth, db, storage };
export default app;
