// import React, { useState, useEffect } from "react";
// import "../../styles/AdminCertificates.css";
// import { Search } from "lucide-react";
// import { Input } from "../../components/ui/Input.jsx";
// import firestoreService from "../../services/firestoreService";


// const AdminCertificate = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("All");

//   const [certificates, setCertificates] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [selectedStudentCourses, setSelectedStudentCourses] = useState([]);

//   useEffect(() => {
//     loadCertificates();
//     loadStudents();
//     loadCourses();
//   }, []);

//   const loadStudents = async () => {
//     try {
//       const data = await firestoreService.getAllStudents();
//       setStudents(data);
//     } catch (error) {
//       console.error('Error loading students:', error);
//     }
//   };

//   const loadCourses = async () => {
//     try {
//       const data = await firestoreService.getAllCourses();
//       setCourses(data);
//     } catch (error) {
//       console.error('Error loading courses:', error);
//     }
//   };

//   const loadCertificates = async () => {
//     try {
//       const data = await firestoreService.getAllCertificates();
//       setCertificates(data);
//     } catch (error) {
//       console.error('Error loading certificates:', error);
//     }
//   };

//   const handleStatusToggle = async (certificateId, currentStatus) => {
//     const newStatus = currentStatus === 'issued' ? 'pending' : 'issued';
//     try {
//       await firestoreService.updateCertificate(certificateId, { status: newStatus });
//       await loadCertificates();
//     } catch (error) {
//       console.error('Error updating certificate status:', error);
//     }
//   };

//   const handleAddCertificate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
    
//     try {
//       const newCertificate = {
//         studentName: formData.get("student"),
//         email: formData.get("mail"),
//         course: formData.get("course"),
//         issueDate: formData.get("date"),
//         status: formData.get("status"),
//         certificateId: `CERT-${Date.now()}`
//       };
      
//       await firestoreService.addCertificate(newCertificate);
//       await loadCertificates(); // Reload certificates
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error adding certificate:', error);
//       alert('Failed to add certificate');
//     }
//   };

//   const filteredCertificates = certificates.filter(
//     (cert) =>
//       (cert.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (cert.course || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (cert.email || '').toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="admin-certificate-container">
//       <div className="coursess-header">
//               <div className="admin-dashboardd-header">
//                 <h1 className="admin-dashboard-title">Certificate Management</h1>
//                 <p className="admin-dashboard-subtitle">
//                   Generate and manage e-certificates.
//                 </p>
//               </div>
//               <button className="add-course-btn" onClick={() => {
//                 setShowForm(true);
//                 setSelectedStudentCourses([]);
//               }}>
//                 + Generate Certificate
//               </button>
//               <button className="add-course-btn" onClick={() => {
//                 setShowForm(true);
//                 setSelectedStudentCourses([]);
//               }}>
//                 + Generate Certificate based on course
//               </button>
//             </div>
      
//             {/* --- Filter + Search Section --- */}
//             <div className="filter-section">
//               <div className="admin-students-searchs filter-combined">
//                 <div className="relative search-container">
//                   <Search className="admin-searchs-icon" />
//                   <Input
//                     placeholder="Search certificate..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="admin-students-searchs-input"
//                   />
//                 </div>
//                 <select
//                   className="category-filter"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option value="All">All Categories</option>
//                   <option value="Web Development">Web Development</option>
//                   <option value="Data Science">Data Science</option>
//                   <option value="Mobile Development">Mobile Development</option>
//                 </select>
//               </div>
            
        
//       </div>

//       <div className="certificate-table-wrapper">
//         <table className="certificate-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Student</th>
//               <th>Course</th>
//               <th>Issue Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCertificates.map((cert) => (
//               <tr key={cert.id}>
//                 <td>{cert.certificateId}</td>
//                 <td>{cert.studentName}</td>
//                 <td>{cert.course}</td>
//                 <td>{cert.issueDate?.toDate ? cert.issueDate.toDate().toLocaleDateString() : cert.issueDate}</td>
//                 <td>
//                   <button
//                     className={`status-btn ${
//                       cert.status === "issued" || cert.status === "Issued" ? "active" : "blocked"
//                     }`}
//                     onClick={() => handleStatusToggle(cert.id, cert.status.toLowerCase())}
//                   >
//                     {cert.status === "issued" || cert.status === "Issued" ? "Issued" : "Pending"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showForm && (
//         <div className="certificate-popup-overlay">
//           <div className="certificate-popup">
//             <h3>Issue New Certificate</h3>
//             <form onSubmit={handleAddCertificate}>
//               <label>Student Email:</label>
//               <select name="mail" required onChange={(e) => {
//                 const selectedStudent = students.find(s => s.email === e.target.value);
//                 if (selectedStudent) {
//                   const studentName = selectedStudent.fullName || selectedStudent.fullname || selectedStudent.name || 'Name not found';
//                   document.querySelector('input[name="student"]').value = studentName;
                  
//                   // Filter courses to show only enrolled courses without certificates
//                   const enrolledCourses = selectedStudent.enrolledCourses || selectedStudent.enrollCourse || [];
                  
//                   // Get existing certificates for this student
//                   const studentCertificates = certificates.filter(cert => cert.email === selectedStudent.email);
//                   const completedCourses = studentCertificates.map(cert => cert.course);
                  
//                   // Show only enrolled courses that don't have certificates yet
//                   const availableCourses = courses.filter(course => 
//                     enrolledCourses.includes(course.title) && !completedCourses.includes(course.title)
//                   );
                  
//                   setSelectedStudentCourses(availableCourses);
//                 } else {
//                   setSelectedStudentCourses([]);
//                 }
//               }}>
//                 <option value="">Select student email</option>
//                 {students.map(student => (
//                   <option key={student.id} value={student.email}>
//                     {student.email}
//                   </option>
//                 ))}
//               </select>

//               <label>Student Name:</label>
//               <input type="text" name="student" required readOnly placeholder="Name will auto-fill when email is selected" />

//               <label>Course:</label>
//               <select name="course" required>
//                 <option value="">
//                   {selectedStudentCourses.length === 0 && students.find(s => s.email === document.querySelector('select[name="mail"]')?.value) 
//                     ? 'No enrolled courses found' 
//                     : 'Select a course'}
//                 </option>
//                 {(selectedStudentCourses.length > 0 ? selectedStudentCourses : courses).map(course => (
//                   <option key={course.id} value={course.title}>
//                     {course.title}
//                   </option>
//                 ))}
//               </select>

//               <label>Issue Date:</label>
//               <input type="date" name="date" required />

//               <label>Status:</label>
//               <select name="status" required>
//                 <option value="issued">Issued</option>
//                 <option value="pending">Pending</option>
//               </select>

//               <div className="popup-buttons">
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCertificate;


import React, { useState, useEffect } from "react";
import "../../styles/AdminCertificates.css";
import { Search, Upload, Eye, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/Input.jsx";
import * as XLSX from "xlsx";
import firestoreService from "../../services/firestoreService";

const AdminCertificate = () => {
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudentCourses, setSelectedStudentCourses] = useState([]);
  const [bulkCourse, setBulkCourse] = useState("");
  const [bulkData, setBulkData] = useState([]);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [studentNames, setStudentNames] = useState({});

  useEffect(() => {
    const loadData = async () => {
      await loadStudents();
      await loadCourses();
      await loadCertificates();
    };
    loadData();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await firestoreService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await firestoreService.getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const loadCertificates = async () => {
    try {
      const data = await firestoreService.getAllCertificates();
      const allStudents = await firestoreService.getAllStudents();
      
      const updatedCertificates = [];
      const studentNamesMap = {};
      
      for (const cert of data) {
        let updatedCert = { ...cert };
        
        // If certificate has StudentId, fetch student name
        if (cert.StudentId && !studentNamesMap[cert.StudentId]) {
          try {
            const student = await firestoreService.getStudentByStudentId(cert.StudentId);
            if (student) {
              studentNamesMap[cert.StudentId] = student.fullName || student.fullname || 'Unknown';
            }
          } catch (error) {
            console.error(`Error fetching student ${cert.StudentId}:`, error);
          }
        }
        
        // If certificate has studentName but no StudentId, find StudentId
        if (!cert.StudentId && cert.studentName) {
          const student = allStudents.find(s => 
            (s.fullName || s.fullname || '').toLowerCase() === cert.studentName.toLowerCase()
          );
          if (student && student.StudentId) {
            updatedCert.StudentId = student.StudentId;
          }
        }
        
        updatedCertificates.push(updatedCert);
      }
      
      setCertificates(updatedCertificates);
      setStudentNames(studentNamesMap);
    } catch (error) {
      console.error("Error loading certificates:", error);
    }
  };

  const handleStatusToggle = async (certificateId, currentStatus) => {
    const newStatus = currentStatus === "issued" ? "pending" : "issued";
    try {
      await firestoreService.updateCertificate(certificateId, { status: newStatus });
      await loadCertificates();
    } catch (error) {
      console.error("Error updating certificate status:", error);
    }
  };

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  const handleDeleteCertificate = async (certificateId) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await firestoreService.deleteCertificate(certificateId);
        await loadCertificates();
      } catch (error) {
        console.error('Error deleting certificate:', error);
        alert('Failed to delete certificate');
      }
    }
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const selectedStudent = students.find(s => s.email === formData.get("mail"));
      const newCertificate = {
        studentName: formData.get("student"),
        email: formData.get("mail"),
        course: formData.get("course"),
        issueDate: formData.get("date"),
        status: formData.get("status"),
        certificateId: `CERT-${Date.now()}`,
        StudentId: selectedStudent?.StudentId || null
      };

      await firestoreService.addCertificate(newCertificate);
      await loadCertificates();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding certificate:", error);
      alert("Failed to add certificate");
    }
  };

  const handleBulkFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);
      setBulkData(parsedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBulkGenerate = async (e) => {
    e.preventDefault();
    if (!bulkCourse || bulkData.length === 0) {
      alert("Please select a course and upload student list.");
      return;
    }

    try {
      const allStudents = await firestoreService.getAllStudents();
      const certificatesToAdd = [];

      for (const excelStudent of bulkData) {
        // Try different possible column names for StudentId
        const studentId = excelStudent.StudentId || excelStudent.studentId || excelStudent['Student ID'] || excelStudent.ID;
        let dbStudent = null;
        
        if (studentId) {
          // Try both number and string comparison
          dbStudent = allStudents.find(s => 
            s.StudentId === parseInt(studentId) || s.StudentId === studentId || s.StudentId === String(studentId)
          );
        }
        
        const certificate = {
          studentName: dbStudent ? (dbStudent.fullName || dbStudent.fullname) : (excelStudent.name || excelStudent.fullName || excelStudent.Name || "Unknown"),
          email: dbStudent ? dbStudent.email : (excelStudent.email || excelStudent.Email || ""),
          course: bulkCourse,
          issueDate: new Date().toLocaleDateString(),
          status: "issued",
          certificateId: `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          StudentId: studentId ? (isNaN(studentId) ? studentId : parseInt(studentId)) : null
        };
        
        certificatesToAdd.push(certificate);
      }

      for (const cert of certificatesToAdd) {
        await firestoreService.addCertificate(cert);
      }

      await loadCertificates();
      alert("Certificates generated successfully!");
      setShowBulkForm(false);
      setBulkData([]);
      setBulkCourse("");
    } catch (error) {
      console.error("Error generating bulk certificates:", error);
      alert("Failed to generate bulk certificates");
    }
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      (cert.studentName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.course || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-certificate-container">
      <div className="coursess-header">
        <div className="admin-dashboardd-header">
          <h1 className="admin-dashboard-title">Certificate Management</h1>
          <p className="admin-dashboard-subtitle">
            Generate and manage e-certificates.
          </p>
        </div>
        <button
          className="add-course-btn"
          onClick={() => {
            setShowForm(true);
            setSelectedStudentCourses([]);
          }}
        >
          + Generate Certificate
        </button>
        <button
          className="add-course-btn"
          onClick={() => setShowBulkForm(true)}
        >
          + Generate Certificate based on course
        </button>
      </div>

      {/* Filter + Search */}
      <div className="filter-section">
        <div className="admin-students-searchs filter-combined">
          <div className="relative search-container">
            <Search className="admin-searchs-icon" />
            <Input
              placeholder="Search certificate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-students-searchs-input"
            />
          </div>
          <select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Mobile Development">Mobile Development</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="certificate-table-wrapper">
        <table className="certificate-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>

              <th>Course</th>
              <th>Issue Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificates.map((cert) => (
              <tr key={cert.id}>
                <td>{cert.certificateId}</td>
                <td>{cert.StudentId || 'N/A'}</td>

                <td>{cert.course}</td>
                <td>
                  {cert.issueDate?.toDate
                    ? cert.issueDate.toDate().toLocaleDateString()
                    : cert.issueDate}
                </td>
                <td>
                  <button
                    className={`status-btn ${
                      cert.status === "issued" || cert.status === "Issued"
                        ? "active"
                        : "blocked"
                    }`}
                    onClick={() =>
                      handleStatusToggle(cert.id, cert.status.toLowerCase())
                    }
                  >
                    {cert.status === "issued" || cert.status === "Issued"
                      ? "Issued"
                      : "Pending"}
                  </button>
                </td>
                <td>
                  <button className="view-btn" onClick={() => handleViewCertificate(cert)}>
                    <Eye size={16} />
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteCertificate(cert.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Single Certificate Modal */}
      {showForm && (
        <div className="certificate-popup-overlay">
          <div className="certificate-popup">
            <h3>Issue New Certificate</h3>
            <form onSubmit={handleAddCertificate}>
              <label>Student Email:</label>
              <select
                name="mail"
                required
                onChange={(e) => {
                  const selectedStudent = students.find(
                    (s) => s.email === e.target.value
                  );
                  if (selectedStudent) {
                    const studentName =
                      selectedStudent.fullName ||
                      selectedStudent.fullname ||
                      selectedStudent.name ||
                      "Name not found";
                    document.querySelector(
                      'input[name="student"]'
                    ).value = studentName;

                    const enrolledCourses =
                      selectedStudent.enrolledCourses ||
                      selectedStudent.enrollCourse ||
                      [];

                    const studentCertificates = certificates.filter(
                      (cert) => cert.email === selectedStudent.email
                    );
                    const completedCourses = studentCertificates.map(
                      (cert) => cert.course
                    );

                    const availableCourses = courses.filter(
                      (course) =>
                        enrolledCourses.includes(course.title) &&
                        !completedCourses.includes(course.title)
                    );

                    setSelectedStudentCourses(availableCourses);
                  } else {
                    setSelectedStudentCourses([]);
                  }
                }}
              >
                <option value="">Select student email</option>
                {students.map((student) => (
                  <option key={student.id} value={student.email}>
                    {student.email}
                  </option>
                ))}
              </select>

              <label>Student Name:</label>
              <input
                type="text"
                name="student"
                required
                readOnly
                placeholder="Name will auto-fill when email is selected"
              />

              <label>Course:</label>
              <select name="course" required>
                <option value="">
                  {selectedStudentCourses.length === 0 &&
                  students.find(
                    (s) =>
                      s.email ===
                      document.querySelector('select[name="mail"]')?.value
                  )
                    ? "No enrolled courses found"
                    : "Select a course"}
                </option>
                {(selectedStudentCourses.length > 0
                  ? selectedStudentCourses
                  : courses
                ).map((course) => (
                  <option key={course.id} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>

              <label>Issue Date:</label>
              <input type="date" name="date" required />

              <label>Status:</label>
              <select name="status" required>
                <option value="issued">Issued</option>
                <option value="pending">Pending</option>
              </select>

              <div className="popup-buttons">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkForm && (
        <div className="certificate-popup-overlay">
          <div className="certificate-popup">
            <h3>Generate Certificates by Course</h3>
            <form onSubmit={handleBulkGenerate}>
              <label>Course:</label>
              <select
                name="bulkCourse"
                value={bulkCourse}
                onChange={(e) => setBulkCourse(e.target.value)}
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>

              <label>Upload Student List (Excel):</label>
              <div className="upload-section">
                <label htmlFor="bulkFile" className="upload-label">
                  <Upload className="upload-icon" />
                  <span>Click to upload Excel file (.xlsx)</span>
                </label>
                <input
                  id="bulkFile"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleBulkFileUpload}
                  hidden
                />
              </div>

              {bulkData.length > 0 && (
                <p className="file-info">
                  {bulkData.length} students loaded from Excel
                </p>
              )}

              <div className="popup-buttons">
                <button type="submit" className="save-btn">
                  Generate
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowBulkForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate View Modal */}
      {showCertificateModal && selectedCertificate && (
        <div className="certificate-popup-overlay" onClick={() => setShowCertificateModal(false)}>
          <div className="certificate-popup" onClick={(e) => e.stopPropagation()}>
            <div className="certificate-view">
              <div className="certificate-header-view">
                <h2>Certificate of Completion</h2>
                <button className="close-btn" onClick={() => setShowCertificateModal(false)}>×</button>
              </div>
              
              <div className="certificate-body">
                <p className="certificate-text">This is to certify that</p>
                <h3 className="student-name">{studentNames[selectedCertificate.StudentId] || selectedCertificate.studentName}</h3>
                <p className="certificate-text">has successfully completed the course</p>
                <h4 className="course-name">{selectedCertificate.course}</h4>
                <p className="certificate-text">on {selectedCertificate.issueDate?.toDate ? selectedCertificate.issueDate.toDate().toLocaleDateString() : selectedCertificate.issueDate}</p>
                
                <div className="certificate-footer">
                  <p>Certificate ID: {selectedCertificate.certificateId}</p>
                  <p>Status: {selectedCertificate.status === 'issued' ? 'Issued' : 'Pending'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificate;
