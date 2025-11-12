import { Target, Heart, Lightbulb, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import "../styles/About.css";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Learn by Doing",
      description: "We believe in hands-on, project-based learning that prepares you for real-world challenges.",
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Quality education should be accessible to everyone, regardless of background or location.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously update our curriculum to reflect the latest industry trends and technologies.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join a supportive community of learners and mentors who are passionate about growth.",
    },
  ];

  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">About OnCode</h1>
            <p className="about-hero-subtitle">
              Empowering students to master digital skills through real-world learning experiences
            </p>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="about-mission-content">
            <div className="about-mission-header">
              <h2 className="about-mission-title">Our Mission</h2>
              <p className="about-mission-description">
                At OnCode, we're on a mission to make quality tech education accessible to everyone. 
                We believe that learning to code and developing digital skills should be an engaging, 
                practical experience that prepares you for real-world success.
              </p>
            </div>

            <div className="about-story-card">
              <h3 className="about-story-title">Our Story</h3>
              <p className="about-story-text">
                OnCode was founded in 2020 by a group of educators and software engineers who saw 
                a gap in the market for practical, industry-relevant tech education. We noticed 
                that traditional education often fell short in preparing students for actual tech careers.
              </p>
              <p className="about-story-text">
                Starting with just a handful of courses, we've grown into a comprehensive learning 
                platform trusted by thousands of students worldwide. Our courses are designed by 
                industry professionals who understand what employers are looking for.
              </p>
              <p className="about-story-text">
                Today, OnCode continues to innovate in online education, offering verifiable 
                certificates that employers recognize and trust, alongside a supportive community 
                that helps students succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="about-values-header">
            <h2 className="about-values-title">Our Values</h2>
            <p className="about-values-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="about-values-grid">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="about-value-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="about-value-icon">
                  <value.icon style={{height: '2rem', width: '2rem'}} />
                </div>
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="about-stats-grid">
            {[
              { number: "10,000+", label: "Active Students" },
              { number: "50+", label: "Expert Instructors" },
              { number: "100+", label: "Courses Available" },
              { number: "15,000+", label: "Certificates Issued" },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="about-stat-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="about-stat-number">{stat.number}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <h2 className="about-cta-title">
              Join Our Learning Community
            </h2>
            <p className="about-cta-subtitle">
              Start your journey with OnCode today and become part of our growing community of successful learners.
            </p>
            <div className="about-cta-buttons">
              <Link to="/courses">
                <Button variant="accents" size="lg" className="groups">
                  Explore Courses
                  <ArrowRight style={{marginLeft: '0.5rem', height: '1.25rem', width: '1.25rem'}} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outlines" size="lg" className="home-hero-button-outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;