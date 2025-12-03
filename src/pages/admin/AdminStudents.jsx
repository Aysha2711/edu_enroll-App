import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/ui/Input.jsx";
import { Search, Eye, Trash2 } from "lucide-react";
import "../../styles/AdminStudents.css";
import firestoreService from "../../services/firestoreService";

// courseOptions will be loaded from Firestore

const AdminStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [courseSelections, setCourseSelections] = useState([
    { value: "Web Development Bootcamp", open: false },
  ]);

  const dropdownRefs = useRef([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const updated = [...courseSelections];
      let changed = false;
      updated.forEach((item, idx) => {
        if (item.open && dropdownRefs.current[idx] && !dropdownRefs.current[idx].contains(event.target)) {
          updated[idx].open = false;
          changed = true;
        }
      });
      if (changed) setCourseSelections(updated);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [courseSelections]);

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadStudents();
    loadCourses();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await firestoreService.getAllStudents();
      // Get certificates to calculate completed courses
      const allCertificates = await firestoreService.getAllCertificates();
      
      setStudents(data.map(student => {
        const enrolledCourses = student.enrolledCourses || student.enrollCourse || [];
        const studentCertificates = allCertificates.filter(cert => cert.email === student.email);
        const completedCoursesList = studentCertificates.map(cert => cert.courseTitle || cert.course).filter(Boolean);
        
        return {
          ...student,
          enrolled: enrolledCourses.length,
          completed: studentCertificates.length,
          completedCoursesList: completedCoursesList,
          status: student.status || "active",
          joinDate: student.createdAt ? new Date(student.createdAt.toDate()).toLocaleDateString() : new Date().toLocaleDateString()
        };
      }));
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await firestoreService.getAllCourses();
      setCourses(data.map(course => course.title));
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      (student.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const toggleDropdown = (index) => {
    const updated = [...courseSelections];
    updated[index].open = !updated[index].open;
    setCourseSelections(updated);
  };

  const selectCourse = (index, value) => {
    const updated = [...courseSelections];
    updated[index].value = value;
    updated[index].open = false; // close dropdown automatically
    setCourseSelections(updated);
  };

  const addCourseDropdown = () =>
    setCourseSelections([...courseSelections, { value: courses[0] || 'No courses available', open: false }]);

  const deleteCourseDropdown = (index) => {
    if (courseSelections.length > 1) {
      setCourseSelections(courseSelections.filter((_, i) => i !== index));
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await firestoreService.deleteStudent(studentId);
        await loadStudents(); // Reload students
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student');
      }
    }
  };

  // Generate random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate phone number
    const phone = formData.get('phone');
    if (phone && phone.length !== 10) {
      alert('Phone number must be exactly 10 digits');
      return;
    }
    
    // Use the already generated password
    const autoPassword = generatedPassword;
    
    try {
      const newStudent = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: autoPassword,
        address: formData.get('address'),
        phone: phone,
        status: 'active',
        enrolledCourses: courseSelections.map(course => course.value),
        passwordReset: false, // Flag to track if password needs reset
        createdAt: new Date()
      };
      
      await firestoreService.addStudent(newStudent);
      alert(`Student added successfully!\nAuto-generated password: ${autoPassword}\nPlease share this password with the student.`);
      await loadStudents(); // Reload students
      setShowForm(false);
      setGeneratedPassword(""); // Reset password
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student');
    }
  };

  const handleStatusToggle = async (studentId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      await firestoreService.updateStudent(studentId, { status: newStatus });
      await loadStudents(); // Reload students
    } catch (error) {
      console.error('Error updating student status:', error);
      alert('Failed to update student status');
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  return (
    <div className="admin-students-container">
      {/* Header */}
      <div className="admin-students-header">
        <h1 className="admin-students-title">Student Management</h1>
        <button className="add-student-btn" onClick={() => {
          setShowForm(true);
          setGeneratedPassword(generatePassword()); // Generate password when opening form
        }}>
          + Add Student
        </button>
      </div>
      <p className="admin-students-subtitle">View and manage all registered students</p>

      {/* Search */}
      <div className="admin-students-search">
        <div className="relative">
          <Search className="admin-search-icon" />
          <Input
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-students-search-input"
          />
        </div>
      </div>

      {/* Student Table */}
      <div className="admin-students-table-wrapper">
        <table className="admin-students-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Enrolled</th>
              <th>Completed</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.StudentId || 'N/A'}</td>
                <td>{student.fullName || student.fullname || 'N/A'}</td>
                <td>{student.email}</td>
                <td>{student.enrolled} courses</td>
                <td>{student.completed} courses</td>
                <td>{student.joinDate}</td>
                <td>
                  <button 
                    className={`status-btn ${student.status === "active" ? "active" : "blocked"}`}
                    onClick={() => handleStatusToggle(student.id, student.status)}
                  >
                    {student.status === 'active' ? 'Active' : 'Blocked'}
                  </button>
                </td>
                <td className="actions">
                  <button className="view-btn" onClick={() => handleViewStudent(student)}>
                    <Eye size={16} />
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteStudent(student.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-scroll">
              <h3>Register New Student</h3>
              <form onSubmit={handleAddStudent}>
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Enter full name" required />

                <label>Email</label>
                <div className="email-password-row">
                  <input type="email" name="email" placeholder="Enter email address" required />
                </div>
                <div className="password-display">
                    <label>Auto-Generated Password</label>
                    <div className="password-value">{generatedPassword}</div>
                  </div>

                <label>Address</label>
                <textarea name="address" placeholder="Enter address"></textarea>

                <label>Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="1234567890" 
                  maxLength="10"
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits"
                  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)}
                />

                <label>Enroll To Courses</label>
                {courseSelections.map((course, index) => (
                  <div
                    key={index}
                    className="dropdown-row"
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    <div
                      className="custom-dropdown"
                      onClick={() => toggleDropdown(index)}
                    >
                      <span>{course.value}</span>
                      <span className="arrow">{course.open ? "▲" : "▼"}</span>
                      {course.open && (
                        <ul className="dropdown-list">
                          {courses.map((option, i) => (
                            <li
                              key={i}
                              className="dropdown-item"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent parent toggle
                                selectCourse(index, option); // select & close
                              }}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {courseSelections.length > 1 && (
                      <button
                        type="button"
                        className="delete-course-btn"
                        onClick={() => deleteCourseDropdown(index)}
                      >
                        ✖
                      </button>
                    )}
                  </div>
                ))}

                <button type="button" className="add-point-btn" onClick={addCourseDropdown}>
                  + Add Course
                </button>

                <div className="form-buttons">
                  <button type="button" className="cancel-btn" onClick={() => {
                    setShowForm(false);
                    setGeneratedPassword(""); // Reset password
                  }}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Register Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {showDetailModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="course-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowDetailModal(false)}>×</button>
            
            <div className="">
              <h2>Student Details</h2>
            </div>
            
            <div className="modal-content" style={{maxHeight: '70vh', overflowY: 'auto'}}>
              <div className="student-info">
                <div className="info-row">
                  <strong>Student ID:</strong>
                  <span>{selectedStudent.StudentId || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <strong>Full Name:</strong>
                  <span>{selectedStudent.fullname || selectedStudent.fullName || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <strong>Email:</strong>
                  <span>{selectedStudent.email}</span>
                </div>
                <div className="info-row">
                  <strong>Phone:</strong>
                  <span>{selectedStudent.phone || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <strong>Address:</strong>
                  <span>{selectedStudent.address || 'N/A'}</span>
                </div>
                
                
                  <span className={`status-badge ${selectedStudent.status}`}>
                    {selectedStudent.status === 'active' ? 'Active' : 'Blocked'}
                  </span>
                
                <div className="info-row">
                  <strong>Join Date:</strong>
                  <span>{selectedStudent.joinDate}</span>
                </div>
                <div className="info-row">
                  <strong>Enrolled Courses:</strong>
                  <span>{selectedStudent.enrolled} courses</span>
                </div>
                <div className="info-row">
                  <strong>Completed Courses:</strong>
                  <span>{selectedStudent.completed} courses</span>
                </div>
              </div>
              
              {(selectedStudent.enrolledCourses || selectedStudent.enrollCourse) && (selectedStudent.enrolledCourses || selectedStudent.enrollCourse).length > 0 && (
                <div className="course-sections">
                  <div className="enrolled-courses">
                    <h3>Enrolled Courses</h3>
                    <ul>
                      {(selectedStudent.enrolledCourses || selectedStudent.enrollCourse).map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="enrolled-courses">
                    <h3>Completed Courses</h3>
                    <ul>
                      {selectedStudent.completedCoursesList && selectedStudent.completedCoursesList.length > 0 ? (
                        selectedStudent.completedCoursesList.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))
                      ) : (
                        <li>No completed courses</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
