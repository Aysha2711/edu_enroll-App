import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/Card.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Separator } from "../components/ui/Separator.jsx";
import { ChevronLeft, Lock, Check } from "lucide-react";
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
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      alert('Please login to enroll in courses');
      navigate('/login');
      return;
    }
    
    loadCourse();
  }, [id, navigate]);

  const loadCourse = async () => {
    if (id) {
      try {
        const courseData = await firestoreService.getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        console.error('Error loading course:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    
    // Phone validation - only allow digits and limit to 10
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is still logged in
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      alert('Please login to complete enrollment');
      navigate('/login');
      return;
    }
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all fields');
      return;
    }
    
    // Validate phone number
    if (formData.phone.length !== 10) {
      alert('Phone number must be exactly 10 digits');
      return;
    }

    setLoading(true);
    try {
      // Check if student already exists
      const existingStudent = await firestoreService.getStudentByEmail(formData.email);
      
      if (existingStudent) {
        // Update existing student's enrolled courses
        const currentCourses = existingStudent.enrolledCourses || [];
        if (!currentCourses.includes(course.title)) {
          const updatedCourses = [...currentCourses, course.title];
          await firestoreService.updateStudent(existingStudent.id, {
            enrolledCourses: updatedCourses
          });
        }
      } else {
        // Add new student to database
        await firestoreService.addStudent({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          enrolledCourses: course ? [course.title] : [],
          enrollmentDate: new Date().toISOString().split('T')[0],
          status: 'active',
          createdAt: new Date()
        });
      }
      
      setShowSuccess(true);
      
      // Trigger enrollment update event
      window.dispatchEvent(new CustomEvent('enrollmentUpdate'));
      
      setTimeout(() => {
        navigate('/courses');
      }, 3000);
    } catch (error) {
      console.error('Error enrolling student:', error);
      alert('Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enroll-page">
      <div className="enroll-container">
        {/* Back to Course */}
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
                {/* Personal Info */}
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

                {/* Payment Info */}
                <div className="section">
                  <h3 className="payment-title">
                    <Lock className="icon" /> Payment Information
                  </h3>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456" 
                      required 
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123" 
                        required 
                      />
                    </div>
                  </div>
                  <p className="secure-note">
                    Your payment information is encrypted and secure
                  </p>
                </div>

                <Button type="submit" className="complete-btn" disabled={loading}>
                  {loading ? 'Processing...' : 'Complete Enrollment'}
                </Button>
                
                {showSuccess && (
                  <div className="success-message">
                    <Check className="success-icon" />
                    <p>Enrollment successful! </p>
                  </div>
                )}
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
