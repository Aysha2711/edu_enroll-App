// import React from "react";
// import "../styles/studentProfile.css";
// import { Mail, Phone, MapPin } from "lucide-react";

// const Profile = () => {
//   return (
//     <div className="profile-container">
//       {/* Header */}
//       <div className="profile-header">
//         <h2>My Profile</h2>
//         <p>Manage your account information and view your achievements.</p>
//       </div>

//       <div className="profile-grid">
//         {/* Left Section - Personal Info */}
//         <div className="personal-info-card">
//           <h3>Personal Information</h3>

//           <div className="profile-photo-section">
//             <div className="photo-placeholder"></div>
//             <button className="change-photo-btn">Change Photo</button>
//             <p className="photo-note">JPG, PNG or GIF (max. 2MB)</p>
//           </div>

//           <form className="profile-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label>First Name</label>
//                 <input type="text" value="John" readOnly />
//               </div>
//               <div className="form-group">
//                 <label>Last Name</label>
//                 <input type="text" value="Smith" readOnly />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Email</label>
//               <div className="input-with-icon">
//                 <Mail size={16} />
//                 <input type="email" value="john.smith@example.com" readOnly />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Phone</label>
//               <div className="input-with-icon">
//                 <Phone size={16} />
//                 <input type="text" value="+1 (555) 123-4567" readOnly />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Address</label>
//               <div className="input-with-icon">
//                 <MapPin size={16} />
//                 <input type="text" value="New York, USA" readOnly />
//               </div>
//             </div>

            

//             <button type="button" className="save-btn">
//               Save Changes
//             </button>
//           </form>
//         </div>

//         {/* Right Section */}
//         <div className="profile-sidebar">
//           <div className="learning-stats-card">
//             <h3>Learning Stats</h3>
//             <ul>
//               <li>
//                 <span>Member Since</span>
//                 <strong>Jan 2024</strong>
//               </li>
//               <li>
//                 <span>Total Courses</span>
//                 <strong>4</strong>
//               </li>
//               <li>
//                 <span>Completed</span>
//                 <strong>2</strong>
//               </li>
//               <li>
//                 <span>Certificates</span>
//                 <strong>2</strong>
//               </li>
//               <li>
//                 <span>Study Hours</span>
//                 <strong>127h</strong>
//               </li>
//             </ul>
//           </div>

//           <div className="certificates-card">
//             <h3>Certificates</h3>

//             <div className="certificate-item">
//               <div className="cert-info">
//                 <h4>React & TypeScript</h4>
//                 <p>1/10/2024</p>
//               </div>
//               <span className="grade-badge a-plus">A+</span>
//               <button className="download-btn">Download</button>
//             </div>

//             <div className="certificate-item">
//               <div className="cert-info">
//                 <h4>JavaScript Fundamentals</h4>
//                 <p>12/15/2023</p>
//               </div>
//               <span className="grade-badge a">A</span>
//               <button className="download-btn">Download</button>
//             </div>
//           </div>
//         </div>
//       </div>

     
//     </div>
//   );
// };

// export default Profile;
