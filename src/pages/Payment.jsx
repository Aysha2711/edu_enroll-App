import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/Card.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Separator } from "../components/ui/Separator.jsx";
import { ChevronLeft, Lock, Check, CreditCard } from "lucide-react";
import "../styles/payment.css";
import courseDataImg from "../assets/course-data.jpg";
import firestoreService from "../services/firestoreService";

const Payment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Get enrollment data from localStorage
    const storedData = localStorage.getItem('enrollmentData');
    if (!storedData) {
      alert('No enrollment data found. Please start enrollment process again.');
      navigate(`/enroll/${id}`);
      return;
    }
    
    const data = JSON.parse(storedData);
    if (data.courseId !== id) {
      alert('Course mismatch. Please start enrollment process again.');
      navigate(`/enroll/${id}`);
      return;
    }
    
    setEnrollmentData(data);
  }, [id, navigate]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    }
    
    // CVV validation
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setPaymentData({
      ...paymentData,
      [e.target.name]: value
    });
  };

  const processPayment = async (paymentInfo) => {
    // Simulate payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate payment success/failure
        const isSuccess = Math.random() > 0.1; // 90% success rate
        if (isSuccess) {
          resolve({
            transactionId: `TXN_${Date.now()}`,
            status: 'success',
            amount: enrollmentData.coursePrice
          });
        } else {
          reject(new Error('Payment failed. Please try again.'));
        }
      }, 2000);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Validate payment form
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName) {
      alert('Please fill in all payment details');
      return;
    }
    
    // Validate card number (basic check)
    const cardNumberClean = paymentData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return;
    }
    
    // Validate CVV
    if (paymentData.cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV');
      return;
    }

    setLoading(true);
    
    try {
      // Process payment
      const paymentResult = await processPayment({
        cardNumber: cardNumberClean,
        expiryDate: paymentData.expiryDate,
        cvv: paymentData.cvv,
        amount: enrollmentData.coursePrice,
        currency: 'INR'
      });

      // If payment successful, enroll student
      const existingStudent = await firestoreService.getStudentByEmail(enrollmentData.email);
      
      if (existingStudent) {
        // Update existing student's enrolled courses
        const currentCourses = existingStudent.enrolledCourses || [];
        if (!currentCourses.includes(enrollmentData.courseTitle)) {
          const updatedCourses = [...currentCourses, enrollmentData.courseTitle];
          await firestoreService.updateStudent(existingStudent.id, {
            enrolledCourses: updatedCourses
          });
        }
      } else {
        // Add new student to database
        await firestoreService.addStudent({
          fullName: enrollmentData.fullName,
          email: enrollmentData.email,
          phone: enrollmentData.phone,
          enrolledCourses: [enrollmentData.courseTitle],
          enrollmentDate: new Date().toISOString().split('T')[0],
          status: 'active',
          paymentInfo: {
            transactionId: paymentResult.transactionId,
            amount: paymentResult.amount,
            paymentDate: new Date().toISOString()
          },
          createdAt: new Date()
        });
      }
      
      // Clear enrollment data
      localStorage.removeItem('enrollmentData');
      
      setShowSuccess(true);
      
      // Trigger enrollment update event
      window.dispatchEvent(new CustomEvent('enrollmentUpdate'));
      
      setTimeout(() => {
        navigate('/courses');
      }, 3000);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!enrollmentData) {
    return <div className="payment-loading">Loading...</div>;
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(`/enroll/${id}`)}>
          <ChevronLeft className="icon" /> Back to Enrollment
        </button>

        <div className="payment-grid">
          {/* Left Payment Form */}
          <Card className="payment-form-card">
            <CardHeader>
              <CardTitle className="payment-title">
                <Lock className="lock-icon" />
                Secure Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="payment-form" onSubmit={handlePayment}>
                {/* Enrollment Summary */}
                <div className="enrollment-summary">
                  <h3>Enrollment Details</h3>
                  <p><strong>Name:</strong> {enrollmentData.fullName}</p>
                  <p><strong>Email:</strong> {enrollmentData.email}</p>
                  <p><strong>Course:</strong> {enrollmentData.courseTitle}</p>
                </div>

                <Separator />

                {/* Payment Details */}
                <div className="payment-section">
                  <h3 className="section-title">
                    <CreditCard className="card-icon" />
                    Payment Information
                  </h3>
                  
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input 
                      type="text" 
                      name="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={paymentData.cardNumber}
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
                        value={paymentData.expiryDate}
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
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <p className="security-note">
                    <Lock className="security-icon" />
                    Your payment information is encrypted and secure
                  </p>
                </div>

                <Button type="submit" className="pay-btn" disabled={loading}>
                  {loading ? 'Processing Payment...' : `Pay Rs. ${enrollmentData.coursePrice}`}
                </Button>
                
                {showSuccess && (
                  <div className="success-message">
                    <Check className="success-icon" />
                    <p>Payment successful! Enrollment completed.</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Right Order Summary */}
          <Card className="order-summary">
            <CardContent>
              <div className="summary-img">
                <img src={courseDataImg} alt="Course" />
              </div>
              <h3>{enrollmentData.courseTitle}</h3>

              <div className="price-box">
                <div className="price-item">
                  <span>Course Price</span>
                  <span>Rs. {enrollmentData.coursePrice}</span>
                </div>
                <div className="price-item">
                  <span>Processing Fee</span>
                  <span>Rs. 0</span>
                </div>
                <div className="price-item">
                  <span>Tax</span>
                  <span>Rs. 0</span>
                </div>
                <Separator />
                <div className="total">
                  <span>Total Amount</span>
                  <span className="total-amount">Rs. {enrollmentData.coursePrice}</span>
                </div>
              </div>

              <div className="payment-security">
                <h4>Secure Payment</h4>
                <div className="security-features">
                  <p><Check className="check-icon" /> 256-bit SSL encryption</p>
                  <p><Check className="check-icon" /> PCI DSS compliant</p>
                  <p><Check className="check-icon" /> Secure card processing</p>
                  <p><Check className="check-icon" /> 30-day money-back guarantee</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;