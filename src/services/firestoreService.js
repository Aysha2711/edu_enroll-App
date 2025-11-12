import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from '../config/firebase';

class FirestoreService {
  // Admin operations
  async getAdminByEmail(email) {
    const q = query(collection(db, 'admin'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  async getAllAdmins() {
    const snapshot = await getDocs(collection(db, 'admin'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Student operations
  async getStudentByEmail(email) {
    const q = query(collection(db, 'student'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  async getStudentByStudentId(studentId) {
    const q = query(collection(db, 'student'), where('StudentId', '==', studentId));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  async getAllStudents() {
    const snapshot = await getDocs(collection(db, 'student'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async generateStudentId() {
    try {
      const studentsRef = collection(db, 'student');
      const q = query(studentsRef, orderBy('StudentId', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return 1001;
      }
      
      const lastStudent = querySnapshot.docs[0].data();
      return (lastStudent.StudentId || 1000) + 1;
    } catch (error) {
      console.error('Error generating student ID:', error);
      return 1001;
    }
  }

  async addStudent(studentData) {
    const studentId = await this.generateStudentId();
    const studentWithId = { ...studentData, StudentId: studentId };
    return await addDoc(collection(db, 'student'), studentWithId);
  }

  async updateStudent(studentId, studentData) {
    const docRef = doc(db, 'student', studentId);
    return await updateDoc(docRef, studentData);
  }

  async deleteStudent(studentId) {
    const docRef = doc(db, 'student', studentId);
    return await deleteDoc(docRef);
  }

  // Course operations
  async getAllCourses() {
    const snapshot = await getDocs(collection(db, 'course'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getCourseById(courseId) {
    const docRef = doc(db, 'course', courseId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }

  async addCourse(courseData) {
    return await addDoc(collection(db, 'course'), courseData);
  }

  async updateCourse(courseId, courseData) {
    const docRef = doc(db, 'course', courseId);
    return await updateDoc(docRef, courseData);
  }

  async deleteCourse(courseId) {
    const docRef = doc(db, 'course', courseId);
    return await deleteDoc(docRef);
  }

  async deleteCertificate(certificateId) {
    const docRef = doc(db, 'certificate', certificateId);
    return await deleteDoc(docRef);
  }

  // Certificate operations
  async getAllCertificates() {
    const snapshot = await getDocs(collection(db, 'certificate'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getCertificatesByEmail(email) {
    const q = query(collection(db, 'certificate'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addCertificate(certificateData) {
    return await addDoc(collection(db, 'certificate'), certificateData);
  }

  async updateCertificate(certificateId, certificateData) {
    const docRef = doc(db, 'certificate', certificateId);
    return await updateDoc(docRef, certificateData);
  }

  // Syllabus operations
  async getAllSyllabus() {
    const snapshot = await getDocs(collection(db, 'syllabus'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getSyllabusByTitle(courseTitle) {
    const q = query(collection(db, 'syllabus'), where('course_title', '==', courseTitle));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Syllabus topics operations
  async getSyllabusTopics(syllabusTitle) {
    const q = query(collection(db, 'syllabus_topics'), where('syllabus_title', '==', syllabusTitle));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addSyllabus(syllabusData) {
    return await addDoc(collection(db, 'syllabus'), syllabusData);
  }

  async addSyllabusTopics(topicsData) {
    return await addDoc(collection(db, 'syllabus_topics'), topicsData);
  }

  async addAdmin(adminData) {
    return await addDoc(collection(db, 'admin'), adminData);
  }
}

const firestoreService = new FirestoreService();
export default firestoreService;