const admin = require('firebase-admin');
const path = require('path');

// Check if Firebase is already initialized to avoid duplicate errors
if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(__dirname, 'serviceAccountKey.json');

  // Initialize using local service account key
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
  });

  console.log('✅ Firebase Admin initialized successfully');
}

module.exports = admin;
