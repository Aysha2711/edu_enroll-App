import React, { useState, useEffect } from "react";
import "../../styles/AdminCourses.css";
import { Search, Edit, Eye, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/Input.jsx";
import firestoreService from "../../services/firestoreService";

const AdminCourses = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [courses, setCourses] = useState([]);
  const [learnPoints, setLearnPoints] = useState(["", "", ""]);
  const [requirementPoints, setRequirementPoints] = useState(["", "", ""]);
  const [syllabus, setSyllabus] = useState([{ title: "", points: ["", "", ""] }]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await firestoreService.getAllCourses();
      const allStudents = await firestoreService.getAllStudents();
      
      setCourses(
        data.map((course) => {
          const enrolledCount = allStudents.filter(student => {
            const enrolledCourses = student.enrolledCourses || student.enrollCourse || [];
            return enrolledCourses.includes(course.title);
          }).length;
          
          return {
            ...course,
            students: enrolledCount,
            status: course.status || "active",
          };
        })
      );
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditCourse = async (course) => {
    try {
      const syllabusData = await firestoreService.getSyllabusByTitle(course.title);
      let syllabusWithTopics = [];
      
      if (syllabusData.length > 0) {
        const syllabusDoc = syllabusData[0];
        const syllabusArray = syllabusDoc.syllabus_title || [];
        
        for (let i = 0; i < syllabusArray.length; i++) {
          const syllabusTitle = syllabusArray[i];
          const topics = await firestoreService.getSyllabusTopics(syllabusTitle);
          syllabusWithTopics.push({
            title: syllabusTitle,
            points: topics.length > 0 ? topics[0].topics || [] : []
          });
        }
      }
      
      setEditingCourse(course);
      setIsEditMode(true);
      setLearnPoints(course.learnings && course.learnings.length > 0 ? course.learnings : ["", "", ""]);
      setRequirementPoints(course.requirements && course.requirements.length > 0 ? course.requirements : ["", "", ""]);
      setSyllabus(syllabusWithTopics.length > 0 ? syllabusWithTopics : [{ title: "", points: ["", "", ""] }]);
      setShowForm(true);
    } catch (error) {
      console.error('Error loading course for edit:', error);
    }
  };

  const handleViewCourse = async (course) => {
    try {
      const syllabusData = await firestoreService.getSyllabusByTitle(course.title);
      let syllabusWithTopics = [];

      if (syllabusData.length > 0) {
        const syllabusDoc = syllabusData[0];
        const syllabusArray = syllabusDoc.syllabus_title || [];

        for (let i = 0; i < syllabusArray.length; i++) {
          const syllabusTitle = syllabusArray[i];
          const topics = await firestoreService.getSyllabusTopics(syllabusTitle);
          syllabusWithTopics.push({
            week: i + 1,
            title: syllabusTitle,
            topics: topics.length > 0 ? topics[0].topics || [] : [],
          });
        }
      }

      setSelectedCourse({
        ...course,
        syllabus: syllabusWithTopics,
        whatYouLearn: course.learnings || [],
        requirements: course.requirements || [],
      });
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error loading course details:", error);
    }
  };

  // Helper functions
  const updateLearnPoint = (index, value) => {
    const updated = [...learnPoints];
    updated[index] = value;
    setLearnPoints(updated);
  };
  const addLearnPoint = () => setLearnPoints([...learnPoints, ""]);
  const deleteLearnPoint = (index) => setLearnPoints(learnPoints.filter((_, i) => i !== index));

  const updateRequirementPoint = (index, value) => {
    const updated = [...requirementPoints];
    updated[index] = value;
    setRequirementPoints(updated);
  };
  const addRequirementPoint = () => setRequirementPoints([...requirementPoints, ""]);
  const deleteRequirementPoint = (index) => setRequirementPoints(requirementPoints.filter((_, i) => i !== index));

  const updateSyllabusTitle = (index, value) => {
    const updated = [...syllabus];
    updated[index].title = value;
    setSyllabus(updated);
  };
  const addSyllabusSection = () => setSyllabus([...syllabus, { title: "", points: ["", "", ""] }]);
  const deleteSyllabusSection = (index) => setSyllabus(syllabus.filter((_, i) => i !== index));
  const updateSyllabusPoint = (index, pointIndex, value) => {
    const updated = [...syllabus];
    updated[index].points[pointIndex] = value;
    setSyllabus(updated);
  };
  const addSyllabusPoint = (index) => {
    const updated = [...syllabus];
    updated[index].points.push("");
    setSyllabus(updated);
  };
  const deleteSyllabusPoint = (index, pointIndex) => {
    const updated = [...syllabus];
    updated[index].points = updated[index].points.filter((_, i) => i !== pointIndex);
    setSyllabus(updated);
  };

  const handleStatusToggle = async (courseId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      await firestoreService.updateCourse(courseId, { status: newStatus });
      await loadCourses();
    } catch (error) {
      console.error('Error updating course status:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await firestoreService.deleteCourse(courseId);
        await loadCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course');
      }
    }
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const courseTitle = formData.get('title');
      const courseData = {
        title: courseTitle,
        description: formData.get('description'),
        category: formData.get('category'),
        level: formData.get('level'),
        duration: formData.get('duration'),
        price: parseInt(formData.get('price')),
        instructor: formData.get('instructor'),
        status: 'active',
        requirements: requirementPoints.filter(req => req.trim() !== ''),
        learnings: learnPoints.filter(learn => learn.trim() !== '')
      };
      
      if (isEditMode) {
        await firestoreService.updateCourse(editingCourse.id, courseData);
      } else {
        await firestoreService.addCourse(courseData);
      }
      
      // Save syllabus data
      const validSyllabus = syllabus.filter(section => section.title.trim() !== '');
      if (validSyllabus.length > 0) {
        const syllabusTitles = validSyllabus.map(section => section.title);
        
        // Save main syllabus document
        await firestoreService.addSyllabus({
          course_title: courseTitle,
          syllabus_title: syllabusTitles
        });
        
        // Save syllabus topics for each section
        for (const section of validSyllabus) {
          const validTopics = section.points.filter(point => point.trim() !== '');
          if (validTopics.length > 0) {
            await firestoreService.addSyllabusTopics({
              syllabus_title: section.title,
              topics: validTopics
            });
          }
        }
      }
      
      alert(isEditMode ? 'Course updated successfully!' : 'Course added successfully!');
      await loadCourses();
      setShowForm(false);
      setIsEditMode(false);
      setEditingCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course');
    }
  };

  return (
    <div className="admin-courses-container">
      <div className="coursess-header">
        <div>
          <h1 className="admin-students-title">Course Management</h1>
          <p className="admin-students-subtitle">View and manage all registered courses</p>
        </div>
        <button className="add-course-btn" onClick={() => {
          setIsEditMode(false);
          setEditingCourse(null);
          setLearnPoints(["", "", ""]);
          setRequirementPoints(["", "", ""]);
          setSyllabus([{ title: "", points: ["", "", ""] }]);
          setShowForm(true);
        }}>
          + Add Course
        </button>
      </div>

      {/* Search + Filter */}
      <div className="filter-section">
        <div className="admin-students-searchs filter-combined">
          <div className="relative search-container">
            <Search className="admin-searchs-icon" />
            <Input
              placeholder="Search course..."
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

      {/* Course Table */}
      <div className="courses-table">
        <table>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr key={index}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>{course.level}</td>
                <td>{course.students}</td>
                <td>
                  <button
                    className={`status-btn ${
                      course.status === "active" ? "active" : "blocked"
                    }`}
                    onClick={() => handleStatusToggle(course.id, course.status)}
                  >
                    {course.status === "active" ? "Active" : "Blocked"}
                  </button>
                </td>
                <td className="actions">
                  <button className="view-btn" onClick={() => handleViewCourse(course)}>
                    <Eye size={16} />
                  </button>
                  <button className="edit-btn" onClick={() => handleEditCourse(course)}>
                    <Edit size={16} />
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteCourse(course.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Detail Modal */}
      {showDetailModal && selectedCourse && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="course-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowDetailModal(false)}>×</button>

            <div className="">
              <h2>{selectedCourse.title}</h2>
              <p>{selectedCourse.category} • {selectedCourse.level}</p>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-section">
                <h3>Description</h3>
                <p>{selectedCourse.description}</p>
              </div>

              <div className="modal-section">
                
                <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
                <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                <p><strong>Price:</strong> Rs. {selectedCourse.price}</p>
              </div>

              {selectedCourse.whatYouLearn?.length > 0 && (
                <div className="modal-section">
                  <h3>What You'll Learn</h3>
                  <ul>
                    {selectedCourse.whatYouLearn.map((item, index) => (
                      <li key={index}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCourse.syllabus?.length > 0 && (
                <div className="modal-section">
                  <h3>Course Syllabus</h3>
                  {selectedCourse.syllabus.map((section, index) => (
                    <div key={index} className="syllabus-box">
                      <h4> {section.title}</h4>
                      <ul>
                        {section.topics.map((topic, i) => (
                          <li key={i}>• {topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {selectedCourse.requirements?.length > 0 && (
                <div className="modal-section">
                  <h3>Requirements</h3>
                  <ul>
                    {selectedCourse.requirements.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Course Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-scroll">
              <h3>{isEditMode ? 'Edit Course' : 'Add New Course'}</h3>
              <form onSubmit={handleSubmitCourse}>
                <label>Course Title</label>
                <input type="text" name="title" defaultValue={editingCourse?.title || ''} required />

                <label>Description</label>
                <textarea name="description" defaultValue={editingCourse?.description || ''} required></textarea>

                <label>Category</label>
                <select name="category" defaultValue={editingCourse?.category || ''}>
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Mobile Development">Mobile Development</option>
                </select>

                <label>Level</label>
                <select name="level" defaultValue={editingCourse?.level || ''}>
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                <label>Duration</label>
                <input type="text" name="duration" defaultValue={editingCourse?.duration || ''} required />

                <label>Price</label>
                <input type="number" name="price" defaultValue={editingCourse?.price || ''} required />

                <label>Instructor</label>
                <input type="text" name="instructor" defaultValue={editingCourse?.instructor || ''} required />

                <label>What You'll Learn</label>
                {learnPoints.map((point, index) => (
                  <div key={index} className="input-container">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updateLearnPoint(index, e.target.value)}
                    />
                    <span className="delete-cross" onClick={() => deleteLearnPoint(index)}>&times;</span>
                  </div>
                ))}
                <button type="button" className="add-point-btn" onClick={addLearnPoint}>+</button>

                <label>Course Syllabus</label>
                {syllabus.map((section, index) => (
                  <div key={index} className="syllabus-section">
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="Syllabus Title"
                        value={section.title}
                        onChange={(e) => updateSyllabusTitle(index, e.target.value)}
                      />
                      <span className="delete-cross" onClick={() => deleteSyllabusSection(index)}>&times;</span>
                    </div>
                    {section.points.map((point, i) => (
                      <div key={i} className="input-container">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => updateSyllabusPoint(index, i, e.target.value)}
                        />
                        <span className="delete-cross" onClick={() => deleteSyllabusPoint(index, i)}>&times;</span>
                      </div>
                    ))}
                    <button type="button" className="add-point-btn small" onClick={() => addSyllabusPoint(index)}>+</button>
                  </div>
                ))}
                <button type="button" className="add-syllabus-btn" onClick={addSyllabusSection}>+ Add Syllabus Section</button>

                <label>Course Requirements</label>
                {requirementPoints.map((req, index) => (
                  <div key={index} className="input-container">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateRequirementPoint(index, e.target.value)}
                    />
                    <span className="delete-cross" onClick={() => deleteRequirementPoint(index)}>&times;</span>
                  </div>
                ))}
                <button type="button" className="add-point-btn" onClick={addRequirementPoint}>+</button>

                <div className="form-buttons">
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">{isEditMode ? 'Update Course' : 'Add Course'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
