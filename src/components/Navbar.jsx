
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Button } from "./ui/Button.jsx";
// import { GraduationCap, Menu, X, User } from "lucide-react";
// import { useState, useEffect } from "react";
// import "../styles/navbar.css";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
//   }, []);

//   useEffect(() => {
//     const checkLogin = () => {
//       setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
//     };
//     checkLogin();
//     window.addEventListener("storage", checkLogin);
//     return () => window.removeEventListener("storage", checkLogin);
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Courses", path: "/courses" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//     { name: "Verify Certificate", path: "/verify" },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="navbar">
//       <div className="container">
//         <div className="navbar-content">
//           {/* Logo */}
//           <Link to="/" className="logo-link">
//             <div className="logo-icon">
//               <GraduationCap className="icon" />
//             </div>
//             <span className="navbar-brand">OnCode</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="navbar-nav">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`nav-link ${isActive(link.path) ? "active" : ""}`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Right Section */}
//           <div className="navbar-auth">
//             {!isLoggedIn ? (
//               <>
//                 <Link to="/login">
//                   <Button variant="outline" size="sm">
//                     Login
//                   </Button>
//                 </Link>
//                 <Link to="/signup">
//                   <Button variant="primary" size="sm">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             ) : (
//               <div
//                 className="user-dropdown"
//                 onMouseEnter={() => setDropdownOpen(true)}
//                 onMouseLeave={() => setDropdownOpen(false)}
//               >
//                 <div className="user-avatar">
//                   <User className="user-icon" />
//                 </div>

//                 {dropdownOpen && (
//                   <div className="dropdown-menu">
//                     <Link
//                       to="/student-dash"
//                       className="dropdown-item"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       Dashboard
//                     </Link>
//                     <Link
//                       to="/student-courses"
//                       className="dropdown-item"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       My Courses
//                     </Link>
//                     <Link
//                       to="/student-profile"
//                       className="dropdown-item"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                     <Link
//                     to="/"
//                       onClick={() => {
//                         handleLogout();
//                         setDropdownOpen(false);
//                       }}
//                       className="dropdown-item logout"
//                     >
//                       Logout
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="navbar-mobile-toggle"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.jsx";
import { GraduationCap, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import "../styles/navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setDropdownOpen(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Verify Certificate", path: "/verify" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <GraduationCap className="icon" />
            </div>
            <span className="navbar-brand">OnCode</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="navbar-auth">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div
                className="user-dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="user-avatar">
                  <User className="user-icon" />
                </div>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link
                      to="/student-dash"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/student-courses"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Courses
                    </Link>
                    <Link
                      to="/student-profile"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout"
                      style={{
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
