# Firebase Firestore Integration Setup

## Overview
Your e-learning platform now uses Firebase Firestore with the following collections:

### Collections Structure:

1. **admin**
   - email (string)
   - fullName (string)
   - password (string)

2. **student**
   - email (string)
   - fullName (string)
   - password (string)
   - address (string)
   - phone (string)
   - enrollCourse (array)

3. **course**
   - title (string)
   - category (string)
   - description (string)
   - duration (string)
   - instructor (string)
   - level (string)
   - price (number)
   - requirements (array)
   - learnings (array)

4. **certificate**
   - studentName (string)
   - email (string)
   - course (string)
   - issueDate (string)
   - status (string)
   - certificateId (string)

5. **syllabus**
   - course_title (string)
   - syllabus_title (array)

6. **syllabus_topics**
   - syllabus_title (string)
   - topics (array)

## Setup Instructions:

### 1. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `oncode-e9bd6`
3. Go to Firestore Database
4. Create the collections mentioned above

### 2. Add Sample Data
To test the system, you can manually add sample data to Firestore:

#### Admin Collection:
```json
{
  "email": "admin@oncode.com",
  "fullName": "Admin User",
  "password": "admin123"
}
```

#### Student Collection:
```json
{
  "email": "student@example.com",
  "fullName": "John Doe",
  "password": "student123",
  "address": "123 Main St, City, Country",
  "phone": "+1234567890",
  "enrollCourse": ["Web Development Bootcamp"]
}
```

#### Course Collection:
```json
{
  "title": "Web Development Bootcamp",
  "category": "Web Development",
  "description": "Complete web development course",
  "duration": "12 weeks",
  "instructor": "Jane Smith",
  "level": "Beginner",
  "price": 299,
  "requirements": ["Basic computer skills", "Internet connection"],
  "learnings": ["HTML & CSS", "JavaScript", "React.js", "Node.js"]
}
```

### 3. Authentication Flow
- **Login Process**: System checks email in admin collection first, then student collection
- **Admin Login**: Redirects to `/admin-dashboard`
- **Student Login**: Redirects to `/student-dash`
- **Welcome Message**: Shows "Welcome back, [Full Name]!" using the fullName field

### 4. Features Implemented:
- ✅ Role-based authentication (admin/student)
- ✅ Protected routes with role checking
- ✅ Firestore integration for all collections
- ✅ Student management (CRUD operations)
- ✅ Certificate management
- ✅ Course management
- ✅ Dynamic navbar based on user role
- ✅ Proper error handling

### 5. Test Credentials:
After adding sample data:
- **Admin**: admin@oncode.com / admin123
- **Student**: student@example.com / student123

### 6. Security Notes:
- In production, implement proper password hashing
- Add Firestore security rules
- Implement proper input validation
- Use environment variables for sensitive data

## Usage:
1. Start the development server: `npm run dev`
2. Navigate to login page
3. Use test credentials to login
4. System will automatically redirect based on user role
5. Admin users can manage students, courses, and certificates
6. Student users can view their dashboard and courses

## File Structure:
- `src/services/firestoreService.js` - All Firestore operations
- `src/contexts/AuthContext.jsx` - Authentication logic
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/utils/initSampleData.js` - Sample data for testing