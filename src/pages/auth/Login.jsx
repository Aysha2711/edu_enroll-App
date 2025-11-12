import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signin(email, password);

      // ✅ Store login state so Navbar updates
      localStorage.setItem("isLoggedIn", "true");

      // Redirect based on user role
      if (result.role === 'admin') {
        alert(`Welcome back, ${result.user.fullName}!`);
        navigate("/admin");
      } else {
        alert(`Welcome back, ${result.user.fullName}!`);
        navigate("/student-dash");
      }
    } catch (error) {
      let errorMessage = "Failed to sign in";
      if (error.message === 'User not found') {
        errorMessage = "No account found with this email. Please sign up first.";
      } else if (error.message === 'Invalid password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No account found with this email. Please sign up first.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Network error. Please try again.";
            break;
          default:
            errorMessage = error.message || "Failed to sign in";
        }
      } else {
        errorMessage = error.message || "Failed to sign in";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <button
            type="button"
            className="close-btn"
            onClick={() => navigate("/")}
          >
            ×
          </button>

          <div className="login-header">
            <div className="login-icon">
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
                  }}
                >
                  <GraduationCap className="w-6 h-6" style={{ color: "white" }} />
                </div>
              </Link>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtext">Please log in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="error-container">
                <p className="error-text">{error}</p>
                {error.includes("No account found") && (
                  <p className="error-help">
                    Don’t have an account?{" "}
                    <Link to="/signup" style={{ color: "#1a237e" }}>
                      Sign up here
                    </Link>
                  </p>
                )}
              </div>
            )}

            <div className="forgot-password-link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
