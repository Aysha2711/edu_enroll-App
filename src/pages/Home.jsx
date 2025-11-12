import { Button } from "../components/ui/Button.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { Link } from "react-router-dom";
import { Award, BookOpen, Clock, Users, ArrowRight, Star } from "lucide-react";
import heroImage from "../assets/hero-learning.jpg";
import "../styles/Home.css";
import { useState, useEffect } from "react";
import firestoreService from "../services/firestoreService";

const Home = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    loadPopularCourses();
  }, []);

  const loadPopularCourses = async () => {
    try {
      const courses = await firestoreService.getAllCourses();
      // Filter out blocked courses and get first 3 for home page
      const activeCourses = courses.filter(course => course.status !== 'blocked');
      setPopularCourses(activeCourses.slice(0, 3));
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const benefits = [
    {
      icon: Users,
      title: "Expert Tutors",
      description: "Learn from industry professionals with real-world experience",
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Earn certificates that employers recognize and trust",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace, anytime and anywhere",
    },
    {
      icon: BookOpen,
      title: "Lifetime Access",
      description: "Keep access to all course materials forever",
    },
  ];

  const steps = [
    { number: "1", title: "Enroll", description: "Choose your course" },
    { number: "2", title: "Learn", description: "Watch & practice" },
    { number: "3", title: "Complete", description: "Finish all modules" },
    { number: "4", title: "Certified", description: "Get your certificate" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <img
            src={heroImage}
            alt="Students learning"
          />
          <div className="home-hero-overlay" />
        </div>
        
        <div className="container">
          <div className="home-hero-content">
            <h1 className="home-hero-title">
              Learn. Build. Get Certified with OnCode.
            </h1>
            <p className="home-hero-subtitle">
              Explore modern coding courses and become job-ready with verifiable certificates
            </p>
            <div className="home-hero-buttons">
              <Link to="/courses">
                <Button variant="accents" size="lg" className="groups">
                  Browse Courses
                  <ArrowRight className="home-hero-arrow" />
                </Button>
              </Link>
              <Link to="/signup">
              <Button variant="outlines" size="lg" className="home-hero-button-outline">
                Join Now
              </Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="home-section home-section-muted">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-section-title">Popular Courses</h2>
            <p className="home-section-subtitle">Start learning with our most loved courses</p>
          </div>
          
          <div className="home-courses-grid">
            {popularCourses.map((course, index) => (
              <div key={index} className="home-course-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <CourseCard {...course} />
              </div>
            ))}
          </div>

          <div className="home-section-footer">
            <Link to="/courses">
              <Button variant="outline" size="lg">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="home-section home-steps-section">
        <div className="home-steps-bg">
          <div className="container">
            <div className="home-section-header">
              <h2 className="home-section-title">How OnCode Works</h2>
              <p className="home-section-subtitle">Your journey to success in 4 simple steps</p>
            </div>

            <div className="home-steps-grid">
              {steps.map((step, index) => (
                <div key={index} className="home-step-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="home-step-number">
                    {step.number}
                  </div>
                  <h3 className="home-step-title">{step.title}</h3>
                  <p className="home-step-description">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="home-section home-section-muted">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-section-title">Why Choose OnCode?</h2>
            <p className="home-section-subtitle">Everything you need to succeed</p>
          </div>

          <div className="home-benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="home-benefit-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="home-benefit-icon">
                  <benefit.icon className="home-benefit-icon-svg" />
                </div>
                <h3 className="home-benefit-title">{benefit.title}</h3>
                <p className="home-benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section home-testimonials-section">
        <div className="home-testimonials-bg">
          <div className="container">
            <div className="home-section-header">
              <h2 className="home-section-title">Student Success Stories</h2>
              <p className="home-section-subtitle">Hear from our successful learners</p>
            </div>

            <div className="home-testimonials-grid">
              {[
                {
                  name: "Alex Martinez",
                  role: "Software Engineer at Tech Corp",
                  content: "OnCode helped me transition from a different career into tech. The structured courses and verifiable certificates gave me the confidence to apply for developer roles.",
                },
                {
                  name: "Priya Sharma",
                  role: "Full Stack Developer",
                  content: "The hands-on projects and expert instructors made all the difference. I went from beginner to landing my dream job in just 6 months!",
                },
                {
                  name: "James Wilson",
                  role: "Data Analyst",
                  content: "The flexibility to learn at my own pace while working full-time was perfect. The certificates are recognized by employers and truly valuable.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="home-testimonial-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="home-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="home-star" />
                    ))}
                  </div>
                  <p className="home-testimonial-content">"{testimonial.content}"</p>
                  <div>
                    <p className="home-testimonial-name">{testimonial.name}</p>
                    <p className="home-testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta-content">
            <h2 className="home-cta-title">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="home-cta-subtitle">
              Join thousands of students already learning on OnCode and get certified today!
            </p>
            <div className="home-cta-buttons">
              <Link to="/courses">
                <Button variant="accents" size="lg" className="groups">
                  Get Started Now
                  <ArrowRight className="home-cta-arrow" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outlines" size="lg" className="home-hero-button-outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
