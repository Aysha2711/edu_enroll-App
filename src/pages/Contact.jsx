import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/Button.jsx";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Textarea } from "../components/ui/Textarea.jsx";
import { Label } from "../components/ui/Input.jsx";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "../hooks/use-toast.js";
import "../styles/Contact.css";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const leftCardsRef = useRef([]);
  const rightCardRef = useRef();

  // Equalize left card heights to right card
  const setEqualHeight = () => {
    if (leftCardsRef.current.length && rightCardRef.current) {
      const maxHeight = rightCardRef.current.offsetHeight;
      leftCardsRef.current.forEach(card => {
        if (card) card.style.height = `${maxHeight}px`;
      });
    }
  };

  useEffect(() => {
    setEqualHeight();
    window.addEventListener("resize", setEqualHeight);
    return () => window.removeEventListener("resize", setEqualHeight);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="contact-grid">
          {/* Left side cards */}
          <div className="contact-left">
            {/* Contact Info Card */}
            <Card className="contact-card" ref={el => leftCardsRef.current[0] = el}>
              <CardContent className="p-4">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="contact-info-content">
                    <h3>Email</h3>
                    <p>support@oncode.com</p>
                    <p>info@oncode.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="contact-info-content">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Mon-Fri 9am-6pm EST</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="contact-info-content">
                    <h3>Office</h3>
                    <p>
                      123 Learning Street<br/>
                      Tech District, CA 94102<br/>
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Response Card */}
            <Card className="contact-quick-response" ref={el => leftCardsRef.current[1] = el}>
              <CardContent className="p-4">
                <h3>Quick Response</h3>
                <p>We typically respond to all inquiries within 24 hours during business days.</p>
              </CardContent>
            </Card>
          </div>

          {/* Right side contact form */}
          <div className="contact-right">
            <Card className="contact-form-card" ref={rightCardRef}>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="contact-form-group">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div className="contact-form-group">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="contact-submit">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
