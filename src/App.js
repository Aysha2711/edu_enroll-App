import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Initialize Firebase first
import "./utils/firebaseInit.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import FirebaseStatus from "./components/FirebaseStatus.jsx";
import Layout from "./components/Layout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import VerifyCertificate from "./pages/VerifyCertificate.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminCourses from "./pages/admin/AdminCourses.jsx";
import AdminStudents from "./pages/admin/AdminStudents.jsx";
import AdminCertificates from "./pages/admin/AdminCertificates.jsx";
import AdminReports from "./pages/admin/AdminReports.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import Enroll from "./pages/Enroll.jsx";
import StudentDashboard from "./pages/studentDash.jsx";
import StudentCourses from "./pages/studentCourses.jsx";
import StudentProfile from "./pages/studentProfile.jsx";

// Firebase is now initialized before any components load

const queryClient = new QueryClient();

// Clear authentication state on app start
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('userRole');
localStorage.removeItem('userData');
localStorage.removeItem('authToken');

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FirebaseStatus />
      <BrowserRouter>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/enroll/:id" element={<Enroll />} />
          <Route path="/verify" element={<VerifyCertificate />} />
          <Route path="/student-dash" element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student-courses" element={
            <ProtectedRoute requiredRole="student">
              <StudentCourses />
            </ProtectedRoute>
          } />
          <Route path="/student-profile" element={
            <ProtectedRoute requiredRole="student">
              <StudentProfile />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses" element={
            <ProtectedRoute requiredRole="admin">
              <AdminCourses />
            </ProtectedRoute>
          } />
          <Route path="/admin/students" element={
            <ProtectedRoute requiredRole="admin">
              <AdminStudents />
            </ProtectedRoute>
          } />
          <Route path="/admin/certificates" element={
            <ProtectedRoute requiredRole="admin">
              <AdminCertificates />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute requiredRole="admin">
              <AdminReports />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute requiredRole="admin">
              <AdminSettings />
            </ProtectedRoute>
          } />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
