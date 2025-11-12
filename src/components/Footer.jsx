import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Linkedin, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container py-12">
        <div className="footer-content">
          {/* Brand */}
          <div className="footer-section">
            <div className="flex items-center gap-2 mb-4">
              <div style={{
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                padding: '0.5rem',
                borderRadius: '0.5rem'
              }}>
                <GraduationCap className="w-6 h-6" style={{color: 'white'}} />
              </div>
              <span className="text-xl font-bold" style={{color: '#2563eb'}}>
                OnCode
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students to master digital skills through real-world learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <Link to="/verify">Verify Certificate</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                support@oncode.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
            </ul>
            <div className="flex gap-4" style={{marginTop: '1rem'}}>
              <a href="#" className="text-muted-foreground" style={{
                transition: 'color 0.2s',
                textDecoration: 'none'
              }}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground" style={{
                transition: 'color 0.2s',
                textDecoration: 'none'
              }}>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground" style={{
                transition: 'color 0.2s',
                textDecoration: 'none'
              }}>
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} OnCode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
