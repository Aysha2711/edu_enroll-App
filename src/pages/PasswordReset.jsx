// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/Card.jsx";
// import { Button } from "../components/ui/Button.jsx";
// import { Input } from "../components/ui/Input.jsx";
// import { Label } from "../components/ui/Input.jsx";
// import { Lock, Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext.jsx";
// import "../styles/login.css";

// const PasswordReset = () => {
//   const navigate = useNavigate();
//   const { resetPassword } = useAuth();
//   const [formData, setFormData] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.newPassword !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
    
//     if (formData.newPassword.length < 6) {
//       alert('Password must be at least 6 characters long');
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       await resetPassword(formData.newPassword);
//       alert('Password reset successfully!');
//       navigate('/student-dash');
//     } catch (error) {
//       console.error('Password reset error:', error);
//       alert('Failed to reset password. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-content">
//         <Card className="auth-card">
//           <CardHeader className="auth-header">
//             <div className="auth-icon">
//               <Lock className="w-6 h-6" />
//             </div>
//             <CardTitle className="auth-title">Reset Your Password</CardTitle>
//             <p className="auth-subtitle">
//               Please create a new password for your account
//             </p>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleSubmit} className="auth-form">
//               <div className="form-group">
//                 <Label htmlFor="newPassword">New Password</Label>
//                 <div className="password-input-wrapper">
//                   <Input
//                     id="newPassword"
//                     name="newPassword"
//                     type={showPassword ? "text" : "password"}
//                     value={formData.newPassword}
//                     onChange={handleChange}
//                     placeholder="Enter new password"
//                     required
//                     minLength={6}
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                 <div className="password-input-wrapper">
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm new password"
//                     required
//                     minLength={6}
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               <Button 
//                 type="submit" 
//                 className="auth-submit-btn" 
//                 disabled={loading}
//               >
//                 {loading ? 'Resetting...' : 'Reset Password'}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PasswordReset;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/Card.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Label } from "../components/ui/Input.jsx";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";
import "../styles/login.css"; // Reuse login page styles

const PasswordReset = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(formData.newPassword);
      alert('Password reset successfully!');
      navigate('/student-dash');
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page"> {/* Reuse login page container */}
      <div className="login-container"> {/* Centers the card */}
        <Card className="login-card"> {/* Same style as login card */}
          <CardHeader className="auth-header">
            <div className="auth-icon">
              <Lock className="w-6 h-6" />
            </div>
            <CardTitle className="auth-title">Reset Your Password</CardTitle>
            <p className="auth-subtitle">Please create a new password for your account</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="password-input-wrapper">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="password-input-wrapper">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="login-button" /* Reuse login button style */
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordReset;
