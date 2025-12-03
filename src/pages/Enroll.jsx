import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/Card.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Separator } from "../components/ui/Separator.jsx";
import { ChevronLeft, Check } from "lucide-react";
import "../styles/enroll.css";
import courseDataImg from "../assets/course-data.jpg";
import firestoreService from "../services/firestoreService";

const Enroll = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  // Load course from Firestore or backend
  const loadCourse = useCallback(async () => {
    if (id) {
      try {
        const courseData = await firestoreService.getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        console.error('Error loading course:', error);
      }
    }
  }, [id]);

  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      alert('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    loadCourse();
  }, [navigate, loadCourse]);

  // Handle input changes
  const handleInputChange = (e) => {
    let value = e.target.value;

    // Only digits for phone, max 10
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  // Submit enrollment request to Node.js backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check login
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      alert('Please login to complete enrollment');
      navigate('/login');
      setLoading(false);
      return;
    }

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }
    if (formData.phone.length !== 10) {
      alert('Phone number must be exactly 10 digits');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          courseTitle: course?.title,
          price: course?.price,
          duration: course?.duration,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Enrollment request sent successfully! You will be contacted soon.");
        navigate('/courses');
      } else {
        alert(data.message || "Failed to send enrollment request.");
      }
    } catch (error) {
      alert("Error sending enrollment request.");
      console.error(error);
    }

    setLoading(false);
  };

  if (!course) {
    return <p className="text-center mt-5">Loading course details...</p>;
  }

  return (
    <div className="enroll-page">
      <div className="enroll-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft className="icon" /> Back to Course
        </button>

        <div className="enroll-grid">
          {/* Left Form */}
          <Card className="enroll-form-card">
            <CardHeader>
              <CardTitle>Complete Your Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="enroll-form" onSubmit={handleSubmit}>
                <div className="section">
                  <h3>Personal Information</h3>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      title="Please enter exactly 10 digits"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="complete-btn" disabled={loading}>
                  {loading ? "Sending..." : "Enroll Now"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right Summary */}
          <Card className="order-summary">
            <CardContent>
              <div className="summary-img">
                <img src={courseDataImg} alt="Course" />
              </div>
              <h3>{course?.title || 'Course Title'}</h3>
              <p className="duration">Duration: {course?.duration || 'N/A'}</p>

              <div className="price-box">
                <div className="price-item">
                  <span>Course Price</span>
                  <span>Rs. {course?.price || '0'}</span>
                </div>
                <div className="price-item">
                  <span>Tax</span>
                  <span>Rs. 0</span>
                </div>
                <Separator />
                <div className="total">
                  <span>Total</span>
                  <span className="total-amount">Rs. {course?.price || '0'}</span>
                </div>
              </div>

              <div className="summary-checks">
                <p><Check className="check-icon" /> 30-day money-back guarantee</p>
                <p><Check className="check-icon" /> Lifetime access to course materials</p>
                <p><Check className="check-icon" /> Certificate of completion</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
