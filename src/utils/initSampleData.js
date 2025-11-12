import firestoreService from '../services/firestoreService';

// Sample data for testing
export const initializeSampleData = async () => {
  try {
    console.log('Initializing sample data...');

    // Sample admin data
    const adminData = {
      email: 'admin@oncode.com',
      fullName: 'Admin User',
      password: 'admin123' // In production, hash this password
    };

    // Sample student data
    const studentData = {
      email: 'student@example.com',
      fullName: 'John Doe',
      password: 'student123', // In production, hash this password
      address: '123 Main St, City, Country',
      phone: '+1234567890',
      enrollCourse: ['Web Development Bootcamp']
    };

    // Sample course data
    const courseData = {
      title: 'Web Development Bootcamp',
      category: 'Web Development',
      description: 'Complete web development course covering HTML, CSS, JavaScript, and React',
      duration: '12 weeks',
      instructor: 'Jane Smith',
      level: 'Beginner',
      price: 299,
      requirements: ['Basic computer skills', 'Internet connection'],
      learnings: ['HTML & CSS', 'JavaScript fundamentals', 'React.js', 'Node.js basics']
    };

    // Sample certificate data
    const certificateData = {
      studentName: 'John Doe',
      email: 'student@example.com',
      course: 'Web Development Bootcamp',
      issueDate: '2024-01-15',
      status: 'Issued',
      certificateId: 'CERT-2024-001'
    };

    // Sample syllabus data
    const syllabusData = {
      course_title: 'Web Development Bootcamp',
      syllabus_title: ['Introduction to Web Development', 'HTML & CSS Basics', 'JavaScript Fundamentals', 'React.js']
    };

    // Sample syllabus topics data
    const syllabusTopicsData = {
      syllabus_title: 'Introduction to Web Development',
      topics: ['What is Web Development?', 'Frontend vs Backend', 'Development Tools', 'Setting up Environment']
    };

    // Add sample data to Firestore
    await firestoreService.addStudent(studentData);
    await firestoreService.addCourse(courseData);
    await firestoreService.addCertificate(certificateData);

    console.log('Sample data initialized successfully!');
    console.log('Admin login: admin@oncode.com / admin123');
    console.log('Student login: student@example.com / student123');

  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

// Call this function once to initialize sample data
// initializeSampleData();