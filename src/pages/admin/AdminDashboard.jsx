import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card.jsx";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import "../../styles/AdminDashboard.css";
import firestoreService from "../../services/firestoreService";

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Students", value: "0", icon: Users, change: "Loading..." },
    { title: "Active Courses", value: "0", icon: BookOpen, change: "Loading..." },
    { title: "Certificates Issued", value: "0", icon: Award, change: "Loading..." },
    { title: "Revenue", value: "$0", icon: TrendingUp, change: "Loading..." },
  ]);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get all data from Firestore
      const [students, courses, certificates] = await Promise.all([
        firestoreService.getAllStudents(),
        firestoreService.getAllCourses(),
        firestoreService.getAllCertificates()
      ]);

      // Calculate stats
      const totalStudents = students.length;
      const activeCourses = courses.filter(course => course.status === 'active' || !course.status).length;
      const certificatesIssued = certificates.length;
      const revenue = courses.reduce((sum, course) => sum + (parseFloat(course.price) || 0), 0);

      setStats([
        { title: "Total Students", value: totalStudents.toString(), icon: Users, change: "+12%" },
        { title: "Active Courses", value: activeCourses.toString(), icon: BookOpen, change: "+3%" },
        { title: "Certificates Issued", value: certificatesIssued.toString(), icon: Award, change: "+18%" },
        { title: "Revenue", value: `$${revenue.toFixed(0)}`, icon: TrendingUp, change: "+25%" },
      ]);

      // Get activities within last 5 days
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      
      // Add recent student registrations (within 5 days)
      const recentStudents = students
        .filter(student => {
          if (!student.createdAt) return false;
          const studentDate = student.createdAt.toDate();
          return studentDate >= fiveDaysAgo;
        })
        .map(student => ({
          student: student.fullName || student.email,
          course: 'New Registration',
          date: student.createdAt.toDate().toLocaleDateString('en-US'),
          timestamp: student.createdAt.toDate()
        }));
      
      // Add recent certificates (within 5 days)
      const recentCertificates = certificates
        .filter(cert => {
          if (!cert.issueDate) return false;
          const certDate = cert.issueDate?.toDate ? cert.issueDate.toDate() : new Date(cert.issueDate);
          return certDate >= fiveDaysAgo;
        })
        .map(cert => {
          const certDate = cert.issueDate?.toDate ? cert.issueDate.toDate() : new Date(cert.issueDate);
          return {
            student: cert.studentName,
            course: `Certificate: ${cert.course}`,
            date: certDate.toLocaleDateString('en-US'),
            timestamp: certDate
          };
        });
      
      // Combine, sort by timestamp, and take top 4
      const allActivities = [...recentStudents, ...recentCertificates]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 4);
      
      setRecentEnrollments(allActivities);

      // Calculate popular courses by enrollment count
      const courseEnrollments = {};
      students.forEach(student => {
        if (student.enrolledCourses) {
          student.enrolledCourses.forEach(courseTitle => {
            courseEnrollments[courseTitle] = (courseEnrollments[courseTitle] || 0) + 1;
          });
        }
      });

      const popularCoursesData = Object.entries(courseEnrollments)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 4)
        .map(([name, enrolled]) => ({ name, enrolled }));
      setPopularCourses(popularCoursesData);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Dashboard</h1>
        <p className="admin-dashboard-subtitle">
          Welcome back! Here's your platform overview.
        </p>
      </div>

      {/* Stats */}
      <div className="admin-dashboard-stats">
        {stats.map((stat) => (
          <Card key={stat.title} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">{stat.title}</span>
              <stat.icon className="stat-card-icon" />
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-change">{stat.change} from last month</div>
          </Card>
        ))}
      </div>

      {/* Tables */}
      <div className="admin-dashboard-tables">
        {/* Recent Enrollments */}
        <div className="dashboard-table-wrapper">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Activity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnrollments.length > 0 ? recentEnrollments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.student}</td>
                      <td>{row.course}</td>
                      <td>{row.date}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="3" style={{textAlign: 'center', padding: '20px'}}>No recent activities</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Popular Courses */}
        <div className="dashboard-table-wrapper">
          <Card>
            <CardHeader>
              <CardTitle>Popular Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Enrolled</th>
                  </tr>
                </thead>
                <tbody>
                  {popularCourses.length > 0 ? popularCourses.map((course, idx) => (
                    <tr key={idx}>
                      <td>{course.name}</td>
                      <td>{course.enrolled} students</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="2" style={{textAlign: 'center', padding: '20px'}}>No course data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
