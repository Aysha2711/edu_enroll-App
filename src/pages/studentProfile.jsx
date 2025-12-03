import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Phone, MapPin, Key } from "lucide-react";
import "../styles/studentProfile.css";

const StudentProfile = () => {
  const { currentUser, resetPassword } = useAuth();
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match');
      return;
    }
    if (passwords.new.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    try {
      await resetPassword(passwords.current, passwords.new);
      alert('Password updated successfully!');
      setShowPasswordReset(false);
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      alert('Failed to update password: ' + error.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <p>Manage your account information and view your achievements.</p>
      </div>

      <div className="profile-grid">
        <div className="personal-info-card">
          <h3>Personal Information</h3>
          
          <div className="profile-photo-section">
            <div className="photo-placeholder"></div>
            <button className="change-photo-btn">Change Photo</button>
            <p className="photo-note">JPG, PNG or GIF (max. 2MB)</p>
          </div>

          <form className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={currentUser?.fullName || 'N/A'} readOnly />
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-with-icon">
                <Mail size={16} />
                <input type="email" value={currentUser?.email || 'N/A'} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <div className="input-with-icon">
                <Phone size={16} />
                <input type="text" value={currentUser?.phone || 'N/A'} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <div className="input-with-icon">
                <MapPin size={16} />
                <input type="text" value={currentUser?.address || 'N/A'} readOnly />
              </div>
            </div>

            <div className="password-section">
              <button 
                type="button" 
                className="reset-password-btn"
                onClick={() => setShowPasswordReset(!showPasswordReset)}
              >
                <Key size={16} />
                Reset Password
              </button>
            </div>
          </form>

          {showPasswordReset && (
            <form className="password-reset-form" onSubmit={handlePasswordReset}>
              <h4>Change Password</h4>
              
              <div className="form-group">
                <label>Current Password</label>
                <div className="password-input-group">
                  <input 
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                  >
                    {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-group">
                  <input 
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                  >
                    {showPasswords.new ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input-group">
                  <input 
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                  >
                    {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="password-form-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowPasswordReset(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="profile-sidebar">
          <div className="learning-stats-card">
            <h3>Learning Stats</h3>
            <ul>
              <li>
                <span>Member Since</span>
                <strong>{currentUser?.createdAt ? new Date(currentUser.createdAt.toDate()).toLocaleDateString() : 'N/A'}</strong>
              </li>
              <li>
                <span>Total Courses</span>
                <strong>{currentUser?.enrolledCourses?.length || 0}</strong>
              </li>
              <li>
                <span>Status</span>
                <strong className={`status-${currentUser?.status || 'active'}`}>
                  {currentUser?.status === 'active' ? 'Active' : 'Blocked'}
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
