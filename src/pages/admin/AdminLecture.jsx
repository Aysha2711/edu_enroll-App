import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/Input.jsx";
import { Search, Eye, Trash2 } from "lucide-react";
import "../../styles/AdminLecture.css";
import firestoreService from "../../services/firestoreService";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminLectures = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);


  useEffect(() => {
    loadLectures();
  }, []);

  const loadLectures = async () => {
    try {
      console.log('Loading lectures from Firebase...');
      const data = await firestoreService.getAllLectures();
      console.log('Lectures loaded:', data.length, 'items');
      setLectures(data.map(lecture => ({
        ...lecture,
        status: lecture.status || 'active'
      })));
    } catch (error) {
      console.error("Firebase Error:", error);
      if (error.code === 'permission-denied') {
        alert('Firebase permission error. Please check Firestore security rules.');
      } else {
        alert('Failed to load lectures: ' + error.message);
      }
    }
  };

  const filteredLectures = lectures.filter(
    (lecture) =>
      (lecture.FullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lecture.OfficialEmail || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteLecture = async (lectureId) => {
    if (window.confirm("Are you sure you want to delete this lecturer?")) {
      try {
        await firestoreService.deleteLecture(lectureId);
        await loadLectures();
      } catch (error) {
        console.error("Error deleting lecturer:", error);
        alert("Failed to delete lecturer");
      }
    }
  };

  const handleViewLecture = (lecture) => {
    setSelectedLecture(lecture);
    setShowDetailModal(true);
  };

  const handleStatusToggle = async (lectureId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      await firestoreService.updateLecture(lectureId, { status: newStatus });
      await loadLectures();
    } catch (error) {
      console.error('Error updating lecturer status:', error);
      alert('Failed to update lecturer status');
    }
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const phoneStr = formData.get("Phone");
    const phone = phoneStr ? parseInt(phoneStr, 10) : null;
    if (phoneStr && phoneStr.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    // Auto-generate LectureId: "LEC100" + row number
    const lectureNumber = lectures.length + 1;
    const LectureId = `LEC100${lectureNumber}`;

    const newLecture = {
      Address: formData.get("Address"),
      Designation: formData.get("Designation"),
      FullName: formData.get("FullName"),
      OfficialEmail: formData.get("OfficialEmail"),
      Phone: phone,
      LectureId: LectureId,
      status: 'active',
      createdAt: new Date(),
    };

    try {
      await firestoreService.addLecture(newLecture);
      alert(`Lecture added successfully!\nLecture ID: ${LectureId}`);
      await loadLectures();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding lecture:", error);
      alert("Failed to add lecture");
    }
  };

  return (
    <div className="admin-lectures-container">
      {/* Header */}
      <div className="admin-lectures-header">
        <h1 className="admin-lectures-title">Lecture Management</h1>
        <button
          className="add-lecture-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Lecture
        </button>
      </div>
      <p className="admin-lectures-subtitle">View and manage all registered lectures</p>

      {/* Search */}
      <div className="admin-lectures-search">
        <div className="relative">
            <Search className="admin-search-icon" />
            <Input
            placeholder="Search lectures by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-students-search-input"
            />
        </div>
      </div>

      {/* Lecture Table */}
      <div className="admin-lectures-table-wrapper">
        <table className="admin-lectures-table">
          <thead>
            <tr>
              <th>Lecture ID</th>
              <th>Full Name</th>
              <th>Official Email</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLectures.length === 0 ? (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>
                  {lectures.length === 0 ? 'No lecturers found. Add some lecturers to get started.' : 'No lecturers match your search.'}
                </td>
              </tr>
            ) : (
              filteredLectures.map((lecture) => (
                <tr key={lecture.LectureId || lecture.id}>
                  <td>{lecture.LectureId}</td>
                  <td>{lecture.FullName}</td>
                  <td>{lecture.OfficialEmail}</td>
                  <td>{lecture.Designation}</td>
                  <td>
                    <button 
                      className={`status-btn ${lecture.status === "active" ? "active" : "blocked"}`}
                      onClick={() => handleStatusToggle(lecture.id, lecture.status)}
                    >
                      {lecture.status === 'active' ? 'Active' : 'Blocked'}
                    </button>
                  </td>
                  <td className="actions">
                    <button className="view-btn" onClick={() => handleViewLecture(lecture)}>
                      <Eye size={16} />
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteLecture(lecture.LectureId)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Lecture Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-scroll">
              <h3>Register New Lecture</h3>

              <form onSubmit={handleAddLecture}>
                <label>Full Name</label>
                <input type="text" name="FullName" placeholder="Enter full name" required />

                <label>Official Email</label>
                <input type="email" name="OfficialEmail" placeholder="Enter email" required />

                <label>Designation</label>
                <input type="text" name="Designation" placeholder="Enter designation" />

                <label>Phone</label>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="1234567890"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits"
                  onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10))}
                  required
                />

                <label>Address</label>
                <textarea name="Address" placeholder="Enter address"></textarea>

                <div className="form-buttons">
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Register Lecture
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Lecture Detail Modal */}
      {showDetailModal && selectedLecture && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowDetailModal(false)}>
              ×
            </button>
            {/* lecture-detail-modal */}
            <span className={`status-badge ${selectedLecture.status}`}>
              {selectedLecture.status === 'active' ? 'Active' : 'Blocked'}
            </span>
            
            <h2>Lecture Details</h2>
            <div className="modal-content" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <div className="info-row">
                <strong>Lecture ID:</strong> {selectedLecture.LectureId}
              </div>
              <div className="info-row">
                <strong>Full Name:</strong> {selectedLecture.FullName}
              </div>
              <div className="info-row">
                <strong>Official Email:</strong> {selectedLecture.OfficialEmail}
              </div>
              <div className="info-row">
                <strong>Designation:</strong> {selectedLecture.Designation}
              </div>
              <div className="info-row">
                <strong>Phone:</strong> {selectedLecture.Phone || "N/A"}
              </div>
              <div className="info-row">
                <strong>Address:</strong> {selectedLecture.Address || "N/A"}
              </div>
              <div className="info-row">
                <strong>Status:</strong> 
                <span className={`status-text ${selectedLecture.status}`}>
                  {selectedLecture.status === 'active' ? 'Active' : 'Blocked'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLectures;
