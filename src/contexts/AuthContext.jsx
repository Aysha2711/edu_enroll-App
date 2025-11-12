import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firestoreService from "../services/firestoreService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Signup Function - Register as student
  const signup = async (email, password, userData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Add to student collection
    await firestoreService.addStudent({
      email,
      fullName: userData.fullName,
      password, // Note: In production, don't store plain passwords
      address: userData.address || '',
      phone: userData.phone || '',
      enrolledCourses: [],
      status: 'active',
      createdAt: new Date()
    });
  };

  // ✅ Signin Function - Check admin/student collections
  const signin = async (email, password) => {
    // First check if user exists in admin collection
    const adminUser = await firestoreService.getAdminByEmail(email);
    if (adminUser) {
      if (adminUser.password === password) {
        await signInWithEmailAndPassword(auth, email, password).catch(() => {
          // If Firebase auth fails, we still proceed with Firestore data
        });
        setCurrentUser(adminUser);
        setUserRole('admin');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userData', JSON.stringify(adminUser));
        return { role: 'admin', user: adminUser };
      } else {
        throw new Error('Invalid password');
      }
    }

    // Check if user exists in student collection
    const studentUser = await firestoreService.getStudentByEmail(email);
    if (studentUser) {
      // Check if student is blocked
      if (studentUser.status === 'blocked') {
        throw new Error('Your account has been blocked. Please contact administrator.');
      }
      
      if (studentUser.password === password) {
        await signInWithEmailAndPassword(auth, email, password).catch(() => {
          // If Firebase auth fails, we still proceed with Firestore data
        });
        setCurrentUser(studentUser);
        setUserRole('student');
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userData', JSON.stringify(studentUser));
        return { role: 'student', user: studentUser };
      } else {
        throw new Error('Invalid password');
      }
    }

    throw new Error('User not found');
  };

  // ✅ Logout Function
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
  };

  // ✅ Keep track of user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check stored user data
        const storedRole = localStorage.getItem('userRole');
        const storedUserData = localStorage.getItem('userData');
        
        if (storedRole && storedUserData) {
          setUserRole(storedRole);
          setCurrentUser(JSON.parse(storedUserData));
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, userRole, signup, signin, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
