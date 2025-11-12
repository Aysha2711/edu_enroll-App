import React, { useState, useEffect } from "react";
import "../styles/studentCourses.css";
import { BookOpen, Clock, Award } from "lucide-react";
import courseDataImg from "../assets/course-data.jpg";
import firestoreService from "../services/firestoreService";

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({ total: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudentCourses();
    
    // Listen for enrollment updates
    const handleEnrollmentUpdate = () => {
      loadStudentCourses();
    };
    
    // Listen for window focus to refresh data
    const handleFocus = () => {
      loadStudentCourses();
    };
    
    window.addEventListener('enrollmentUpdate', handleEnrollmentUpdate);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('enrollmentUpdate', handleEnrollmentUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const loadStudentCourses = async () => {
    try {
      const userData = localStorage.getItem('userData');
      console.log('LocalStorage userData:', userData);
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Parsed user:', user);
        console.log('Fetching fresh data for email:', user.email);
        // Always fetch fresh data from database
        const student = await firestoreService.getStudentByEmail(user.email);
        console.log('Fresh student data from DB:', student);
        
        if (student) {
          // Update localStorage with fresh data
          localStorage.setItem('userData', JSON.stringify(student));
          
          const enrolledCoursesList = student.enrolledCourses || student.enrollCourse || [];
          console.log('Enrolled courses list:', enrolledCoursesList);
          console.log('Available fields:', Object.keys(student));
          
          if (enrolledCoursesList && enrolledCoursesList.length > 0) {
            const coursePromises = enrolledCoursesList.map(courseTitle => 
              firestoreService.getAllCourses().then(courses => 
                courses.find(course => course.title === courseTitle)
              )
            );
            const courses = await Promise.all(coursePromises);
            
            // Get student certificates
            const studentCertificates = await firestoreService.getCertificatesByEmail(user.email);
            
            const validCourses = courses.filter(course => course).map(course => {
              // Check if student has any certificate for this course
              const hasCertificate = studentCertificates.some(cert => 
                (cert.courseTitle === course.title || cert.course === course.title)
              );
              
              return {
                ...course,
                enrolled: student.enrollmentDate || new Date().toLocaleDateString(),
                btn: hasCertificate ? 'Review' : 'Continue',
                status: hasCertificate ? 'Completed' : 'In Progress',
                img: courseDataImg
              };
            });
          
          console.log('All courses from DB:', courses);
          console.log('Valid courses found:', validCourses.length);
          setEnrolledCourses(validCourses);
          
          // Calculate stats based on certificates
          const completed = validCourses.filter(course => course.status === 'Completed').length;
          const inProgress = validCourses.length - completed;
          
          setStats({
            total: validCourses.length,
            inProgress,
            completed
          });
          } else {
            console.log('No enrolled courses found for student');
            setEnrolledCourses([]);
            setStats({ total: 0, inProgress: 0, completed: 0 });
          }
        } else {
          console.log('No student found in database');
          setEnrolledCourses([]);
          setStats({ total: 0, inProgress: 0, completed: 0 });
        }
      } else {
        console.log('No userData in localStorage');
        setEnrolledCourses([]);
        setStats({ total: 0, inProgress: 0, completed: 0 });
      }
    } catch (error) {
      console.error('Error loading student courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>My Courses</h2>
        <p>Track your learning progress and continue where you left off.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-summary">
        <div className="summary-card">
          <BookOpen size={20} />
          <div>
            <h4>Total Enrolled</h4>
            <p>{stats.total}</p>
          </div>
        </div>
        <div className="summary-card">
          <Clock size={20} color="#f59e0b" />
          <div>
            <h4>In Progress</h4>
            <p>{stats.inProgress}</p>
          </div>
        </div>
        <div className="summary-card">
          <Award size={20} color="#22c55e" />
          <div>
            <h4>Completed</h4>
            <p>{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid">
        {loading ? (
          <p>Loading courses...</p>
        ) : enrolledCourses.length > 0 ? (
          enrolledCourses.map((course, i) => (
            <div className="course-card" key={i}>
              <div className="course-image">
                <img src={course.img} alt={course.title} />
                <span
                  className={`status-badge ${
                    course.status === "Completed" ? "completed" : "in-progress"
                  }`}
                >
                  {course.status}
                </span>
              </div>
              <div className="course-content">
                <span className="course-category">{course.category}</span>
                <h3>{course.title}</h3>
                <p className="author">by {course.instructor}</p>



                <p className="enrolled">Enrolled: {course.enrolled}</p>

                <button
                  className={course.status === 'Completed' ? 'review-btn' : 'continue-btn'}
                >
                  {course.status === 'Completed' ? 'Review' : 'Continue'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-courses">
            <p>No enrolled courses found.</p>
            <p>Visit the courses page to enroll in a course.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
