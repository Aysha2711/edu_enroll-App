import React, { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Phone validation - only allow digits and limit to 10
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    
    // Validate phone number if provided
    if (form.phone && form.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 🔗 Call signup from AuthContext (sends data to backend)
      await signup(form.email, form.password, {
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      // Handle backend/Firebase errors
      let errorMessage = "Failed to create account";

      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/email-already-exists":
            errorMessage =
              "This email is already registered. Please try logging in.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak. Please choose a stronger one.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Network error. Please check your connection.";
            break;
          default:
            errorMessage = error.message || "Failed to create account";
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="login-card">
          <button
            type="button"
            className="close-btn"
            onClick={() => navigate("/")}
          >
            ×
          </button>

          <div className="signup-header">
            <div className="signup-icon">
              <Link
                to="/"
                className="flex items-center gap-2"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    transition: "all 0.3s",
                  }}
                >
                  <GraduationCap className="w-6 h-6" style={{ color: "white" }} />
                </div>
              </Link>
            </div>
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtext">Fill in your details to sign up</p>
          </div>

          <div className="signup-form-container">
            <form onSubmit={handleSignup} className="signup-form">
              
                <div className="form-group">
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="input"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

            

              <div className="form-group">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

            

              <div className="form-group">
                <label className="label">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  placeholder="1234567890"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength="10"
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits"
                />
              </div>

              <div className="form-group">
                <label className="label">Address (Optional)</label>
                <input
                  type="text"
                  name="address"
                  className="input"
                  placeholder="Your address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

             
              <div className="form-group">
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="input"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="error-container">
                  <p className="error-text">{error}</p>
                  {error.includes("already registered") && (
                    <p className="error-help">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        style={{ color: "#1a237e", fontWeight: "600" }}
                      >
                        Sign in here
                      </Link>
                    </p>
                  )}
                </div>
              )}

              <button type="submit" className="signup-button" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <div className="signup-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
