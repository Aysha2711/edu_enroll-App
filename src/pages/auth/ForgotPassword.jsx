import React, { useState } from "react";
import { GraduationCap} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import firestoreService from '../../services/firestoreService';
import "../../styles/forgotpassword.css";

// Simple email sending function
const sendEmail = async (studentEmail, studentName) => {
  try {
    const response = await fetch('https://formspree.io/f/xpznvqko', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'jf.aysha004@gmail.com',
        subject: 'Password Reset Request',
        message: `Password Reset Request\n\nStudent Email: ${studentEmail}\nStudent Name: ${studentName}\n\nPlease reset the password for this student account.`
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    setLoading(true);
    
    try {
      const student = await firestoreService.getStudentByEmail(email);
      
      if (!student) {
        alert('No account found with this email address');
        setLoading(false);
        return;
      }
      
      // Try to send email automatically
      const emailSent = await sendEmail(email, student.fullName || 'N/A');
      
      if (emailSent) {
        setEmailSent(true);
      } else {
        // Fallback to mailto if automatic sending fails
        const subject = encodeURIComponent('Password Reset Request');
        const body = encodeURIComponent(
          `Password Reset Request\n\nStudent Email: ${email}\nStudent Name: ${student.fullName || 'N/A'}\n\nPlease reset the password for this student account.`
        );
        const mailtoLink = `mailto:jf.aysha004@gmail.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        alert('Please send the email from your email client to complete the request.');
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Error processing password reset:', error);
      alert('Error processing request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="forgot-container">
        <div className="forgot-card">
          <button className="close-btn" onClick={() => navigate("/")}>×</button>

          <div className="forgot-header">
            <div className="forgot-icon">📩</div>
            <h1 className="forgot-title">Check Your Email</h1>
            <p className="forgot-subtext">
              We’ve sent a password reset link to your inbox.
            </p>
          </div>

          <Link to="/login" className="forgot-button back">
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <button className="close-btn" onClick={() => navigate("/")}>×</button>

        <div className="forgot-header">
          <div className="forgot-icon">
            <Link to="/" className="flex items-center gap-2" style={{textDecoration: 'none'}}>
                        <div style={{
                          background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          transition: 'all 0.3s'
                        }}>
                          <GraduationCap className="w-6 h-6" style={{color: 'white'}} />
                        </div>
                     
                      </Link>
          </div>
          <h1 className="forgot-title">Forgot Password?</h1>
          <p className="forgot-subtext">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="forgot-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <Link to="/login" className="forgot-button back">
            ← Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
