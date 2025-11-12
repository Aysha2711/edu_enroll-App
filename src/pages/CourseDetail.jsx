import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card.jsx";
import { Separator } from "../components/ui/Separator.jsx";
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  ChevronLeft,
  CheckCircle2
} from "lucide-react";
import firestoreService from "../services/firestoreService";
import "../styles/CourseDetail.css";
import courseDataImg from "../assets/course-data.jpg";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImage = courseDataImg;

  const loadCourse = useCallback(async () => {
    try {
      const courseData = await firestoreService.getCourseById(id);
      if (courseData) {
        const syllabusData = await firestoreService.getSyllabusByTitle(courseData.title);
        let syllabusWithTopics = [];
        
        if (syllabusData.length > 0) {
          const syllabusDoc = syllabusData[0];
          const syllabusArray = syllabusDoc.syllabus_title || [];
          
          for (let i = 0; i < syllabusArray.length; i++) {
            const syllabusTitle = syllabusArray[i];
            const topics = await firestoreService.getSyllabusTopics(syllabusTitle);
            syllabusWithTopics.push({
              week: i + 1,
              title: syllabusTitle,
              topics: topics.length > 0 ? topics[0].topics || [] : []
            });
          }
        }
        
        setCourse({
          ...courseData,
          image: defaultImage,
          students: 0,
          rating: 4.5,
          overview: courseData.description,
          whatYouLearn: courseData.learnings || [],
          syllabus: syllabusWithTopics,
          requirements: courseData.requirements || []
        });
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  }, [id, defaultImage]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  const staticCourses = {
    "1": {
      title: "Full-Stack Web Development Bootcamp",
      description: "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and deploy them to production.",
      instructor: "Sarah Johnson",
      duration: "12 weeks",
      rating: 4.8,
      image: "/placeholder.svg",
      category: "Web Development",
      level: "Intermediate",
      students: 1234,
      price: "Rs. 299",
      overview: "This comprehensive bootcamp will take you from beginner to job-ready full-stack developer. Learn industry-standard tools and best practices while building portfolio-worthy projects.",
      requirements: [
        "Basic understanding of HTML and CSS",
        "Familiarity with JavaScript fundamentals",
        "Computer with internet connection",
        "Enthusiasm to learn!"
      ],
      syllabus: [
        { week: 1, title: "Introduction to Modern JavaScript", topics: ["ES6+ Features", "Async Programming", "Modules"] },
        { week: 2, title: "React Fundamentals", topics: ["Components", "State & Props", "Hooks"] },
        { week: 3, title: "Advanced React", topics: ["Context API", "Performance", "Testing"] },
        { week: 4, title: "Backend with Node.js", topics: ["Express.js", "REST APIs", "Authentication"] },
        { week: 5, title: "Database & Deployment", topics: ["MongoDB", "Cloud Hosting", "CI/CD"] }
      ],
      whatYouLearn: [
        "Build responsive web applications with React",
        "Create RESTful APIs with Node.js and Express",
        "Work with databases using MongoDB",
        "Implement authentication and authorization",
        "Deploy full-stack applications to the cloud"
      ]
    },
    "2": {
      title: "Data Science & Machine Learning",
      description: "Learn Python, data analysis, and machine learning algorithms. Work with real datasets and build predictive models.",
      instructor: "Dr. Michael Chen",
      duration: "10 weeks",
      rating: 4.9,
      image: "/placeholder.svg",
      category: "Data Science",
      level: "Advanced",
      students: 892,
      price: "Rs. 349",
      overview: "Dive deep into the world of data science and machine learning. Learn to extract insights from data and build intelligent systems.",
      requirements: [
        "Strong mathematics foundation",
        "Basic Python programming knowledge",
        "Understanding of statistics",
        "Analytical mindset"
      ],
      syllabus: [
        { week: 1, title: "Python for Data Science", topics: ["NumPy", "Pandas", "Data Manipulation"] },
        { week: 2, title: "Data Visualization", topics: ["Matplotlib", "Seaborn", "Plotly"] },
        { week: 3, title: "Statistical Analysis", topics: ["Hypothesis Testing", "Regression", "Probability"] },
        { week: 4, title: "Machine Learning Basics", topics: ["Supervised Learning", "Classification", "Evaluation"] },
        { week: 5, title: "Deep Learning", topics: ["Neural Networks", "TensorFlow", "Model Deployment"] }
      ],
      whatYouLearn: [
        "Master Python libraries for data analysis",
        "Create compelling data visualizations",
        "Build and evaluate ML models",
        "Understand deep learning fundamentals",
        "Deploy ML models in production"
      ]
    },
    "3": {
      title: "Mobile App Development with React Native",
      description: "Create cross-platform mobile applications for iOS and Android using React Native and modern development practices.",
      instructor: "Jessica Williams",
      duration: "8 weeks",
      rating: 4.7,
      image: "/placeholder.svg",
      category: "Mobile Development",
      level: "Intermediate",
      students: 756,
      price: "Rs. 279",
      overview: "Learn to build native mobile applications that work on both iOS and Android platforms using a single codebase.",
      requirements: [
        "JavaScript and React knowledge",
        "Understanding of mobile UX principles",
        "Mac for iOS development (optional)",
        "Willingness to learn native concepts"
      ],
      syllabus: [
        { week: 1, title: "React Native Fundamentals", topics: ["Setup", "Components", "Styling"] },
        { week: 2, title: "Navigation & Routing", topics: ["React Navigation", "Stack", "Tabs"] },
        { week: 3, title: "State Management", topics: ["Redux", "Context", "Async Storage"] },
        { week: 4, title: "Native Features", topics: ["Camera", "GPS", "Push Notifications"] },
        { week: 5, title: "Publishing Apps", topics: ["App Store", "Play Store", "Updates"] }
      ],
      whatYouLearn: [
        "Build cross-platform mobile apps",
        "Implement native device features",
        "Design mobile-first user interfaces",
        "Manage app state effectively",
        "Publish to app stores"
      ]
    }
  };

  const fallbackCourse = staticCourses[id || "1"];
  const displayCourse = course || fallbackCourse;

  if (!displayCourse) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      {/* Hero Section */}
      <div className="course-detail-hero">
        <div className="hero-top-left mb-6">
          <Button variant="outline" onClick={() => navigate("/courses")} className="back-btn">
            <ChevronLeft className="w-4 h-4 mr-2"/> Back to Courses
          </Button>
        </div>
        <div className="course-detail-hero-content">
          <div className="course-detail-info">
            <h1>{displayCourse.title}</h1>
            <p>{displayCourse.description}</p>
            <div className="course-detail-meta">
              <div className="course-detail-meta-item">
                <Star className="w-5 h-5 fill-current text-white"/>
                <span>{displayCourse.rating}</span>
              </div>
              <div className="course-detail-meta-item">
                <Users className="w-5 h-5"/>
                <span>{displayCourse.students?.toLocaleString() || '0'} students</span>
              </div>
              <div className="course-detail-meta-item">
                <Clock className="w-5 h-5"/>
                <span>{displayCourse.duration}</span>
              </div>
              <div className="course-detail-meta-item">
                <BookOpen className="w-5 h-5"/>
                <span>{displayCourse.level}</span>
              </div>
            </div>
            <div className="course-detail-buttons">
              <Button 
                variant="accents" 
                size="lg" 
                className="groups"
                onClick={() => {
                  const userRole = localStorage.getItem('userRole');
                  if (!userRole) {
                    alert('Please login to enroll in courses');
                    navigate('/login');
                  } else {
                    navigate(`/enroll/${id}`);
                  }
                }}
              >
                Enroll Now - Rs. {displayCourse.price}
              </Button>
            </div>
          </div>
          <div className="course-detail-image">
            <img src={displayCourse.image} alt={displayCourse.title}/>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="course-detail-content container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{displayCourse.overview}</p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {displayCourse.whatYouLearn?.map((item, index) => (
                    <div key={index} className="checklist-item">
                      <CheckCircle2 className="w-5 h-5"/>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Syllabus */}
            <Card>
              <CardHeader>
                <CardTitle>Course Syllabus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {displayCourse.syllabus?.map((section, index) => (
                    <div key={index} className="syllabus-week">
                      <div className="syllabus-week-number">{section.week}</div>
                      <div>
                        <h4>{section.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {section.topics.map((topic, i) => (
                            <span key={i} className="topic-badge">{topic}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="requirements-list">
                  {displayCourse.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 space-y-6">
              <CardHeader>
                <CardTitle>Course Instructor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="instructor-info">
                  <div className="instructor-avatar">
                    {displayCourse.instructor?.split(' ').map(n => n[0]).join('') || 'IN'}
                  </div>
                  <div>
                    <h4 className="font-semibold">{displayCourse.instructor}</h4>
                    <p className="text-sm text-muted-foreground">Expert Instructor</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-2xl font-bold text-primary">Rs. {displayCourse.price}</span>
                  </div>
                  <Button 
                    className="w-full enroll-btn"
                    onClick={() => {
                      const userRole = localStorage.getItem('userRole');
                      if (!userRole) {
                        alert('Please login to enroll in courses');
                        navigate('/login');
                      } else {
                        navigate(`/enroll/${id}`);
                      }
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /><span>Certificate of completion</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><span>Lifetime access</span></div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><span>Community support</span></div>
                  <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /><span>Downloadable resources</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
