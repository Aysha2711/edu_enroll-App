# Firebase Firestore Rules Fix

## Problem
"Missing or insufficient permissions" error when accessing Firestore collections.

## Solution
Update Firestore Security Rules in Firebase Console:

1. Go to Firebase Console → Firestore Database → Rules
2. Replace existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow read access to public collections for unauthenticated users
    match /course/{document} {
      allow read: if true;
    }
    
    match /syllabus/{document} {
      allow read: if true;
    }
    
    match /syllabus_topics/{document} {
      allow read: if true;
    }
  }
}
```

3. Click "Publish" to apply the rules

## Alternative (Development Only)
For development/testing, you can temporarily use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Warning: This allows all access - only use for development!**