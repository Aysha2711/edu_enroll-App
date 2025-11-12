import React, { useState, useEffect } from "react";
import "../styles/studentDash.css";
import { BookOpen, Award, Clock, BarChart2 } from "lucide-react";
import firestoreService from "../services/firestoreService";

const Dashboard = () => {
  const [studentName, setStudentName] = useState('student');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState({ enrolled: 0, completed: 0, inProgress: 0, certificates: 0 });

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      
      // Try different field names
      const name = user.fullName || user.fullname || user.name;
      if (name) {
        const firstName = name.split(' ')[0];
        setStudentName(firstName);
      } else {
        setStudentName('Student');
      }
      
      if (user.email) {
        loadStudentData(user.email);
      }
    }
    
    // Listen for enrollment updates
    const handleEnrollmentUpdate = () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email) {
          loadStudentData(user.email);
        }
      }
    };
    
    // Listen for window focus to refresh data
    const handleFocus = () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email) {
          loadStudentData(user.email);
        }
      }
    };
    
    window.addEventListener('enrollmentUpdate', handleEnrollmentUpdate);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('enrollmentUpdate', handleEnrollmentUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const loadStudentData = async (email) => {
    try {
      console.log('Dashboard - Loading data for email:', email);
      // Get fresh student data from database
      const student = await firestoreService.getStudentByEmail(email);
      console.log('Dashboard - Fresh student data from DB:', student);
      
      if (student) {
        // Update localStorage with fresh data
        localStorage.setItem('userData', JSON.stringify(student));
        
        // Update student name
        const name = student.fullName || student.fullname || student.name;
        if (name) {
          const firstName = name.split(' ')[0];
          setStudentName(firstName);
        }
        
        // Get enrolled courses - check multiple field names
        const enrolledCoursesList = student.enrolledCourses || student.enrollCourse || [];
        console.log('Dashboard - Enrolled courses:', enrolledCoursesList);
        console.log('Dashboard - Student fields:', Object.keys(student));
        
        if (enrolledCoursesList && enrolledCoursesList.length > 0) {
          const coursePromises = enrolledCoursesList.map(courseTitle => 
            firestoreService.getAllCourses().then(courses => 
              courses.find(course => course.title === courseTitle)
            )
          );
          const courses = await Promise.all(coursePromises);
          const validCourses = courses.filter(course => course);
          setEnrolledCourses(validCourses);
          
          // Get student certificates to calculate completion
          const studentCerts = await firestoreService.getCertificatesByEmail(email);
          const completedCourses = validCourses.filter(course => 
            studentCerts.some(cert => cert.courseTitle === course.title || cert.course === course.title)
          ).length;
          
          // Calculate stats based on certificates
          setStats({
            enrolled: validCourses.length,
            completed: completedCourses,
            inProgress: validCourses.length - completedCourses,
            certificates: studentCerts.length
          });
          
          setCertificates(studentCerts);
        } else {
          console.log('Dashboard - No enrolled courses found');
          setEnrolledCourses([]);
          setStats({ enrolled: 0, completed: 0, inProgress: 0, certificates: 0 });
        }
      } else {
        console.log('Dashboard - No student found in database');
        setEnrolledCourses([]);
        setStats({ enrolled: 0, completed: 0, inProgress: 0, certificates: 0 });
      }
      
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome back, {studentName}!</h2>
        <p>Student ID: {localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).StudentId || 'N/A' : 'N/A'} | Here's your learning progress overview.</p>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card"><div className="icon-circle book"><BookOpen size={20} /></div><h3>Enrolled</h3><p className="stat-value">{stats.enrolled}</p></div>
        <div className="stat-card"><div className="icon-circle award"><Award size={20} /></div><h3>Completed</h3><p className="stat-value">{stats.completed}</p></div>
        <div className="stat-card"><div className="icon-circle clock"><Clock size={20} /></div><h3>In Progress</h3><p className="stat-value">{stats.inProgress}</p></div>
        <div className="stat-card"><div className="icon-circle chart"><BarChart2 size={20} /></div><h3>Certificates</h3><p className="stat-value">{certificates.length}</p></div>
      </div>

      {/* Main Grid */}
      <div className="content-grid">
        {/* Continue Learning */}
        <div className="continue-learning">
          <h3>Continue Learning</h3>

          {/* Single container for all course rows */}
          <div className="course-container">
            {enrolledCourses.length > 0 ? enrolledCourses.map((course, i) => {
              return (
                <div className="course-row" key={i}>
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>by {course.instructor}</p>
                    <span className="next-topic">
                      {certificates.some(cert => cert.courseTitle === course.title || cert.course === course.title) 
                        ? 'Course Completed' 
                        : 'Continue Learning'
                      }
                    </span>
                  </div>

                  <div className="course-action">
                    <button 
                      className={
                        certificates.some(cert => cert.courseTitle === course.title || cert.course === course.title)
                          ? 'review-btn' 
                          : 'continue-btn'
                      }
                    >
                      {certificates.some(cert => cert.courseTitle === course.title || cert.course === course.title)
                        ? 'Review' 
                        : 'Continue'
                      }
                    </button>
                  </div>
                </div>
              );
            }) : (
              <p>No enrolled courses found.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          {certificates.length > 0 ? certificates.slice(0, 3).map((cert, i) => (
            <div className="activity-item" key={i}>
              <h4>Earned certificate</h4>
              <p>{cert.course}</p>
              <span>{cert.issueDate}</span>
            </div>
          )) : (
            <div className="activity-item">
              <h4>No recent activity</h4>
              <p>Start learning to see your progress</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;