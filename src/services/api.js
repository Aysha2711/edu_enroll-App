const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('firebase_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle responses
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Something went wrong');
    }
    return response.json();
  }

  // Auth endpoints
  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  async login(idToken) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    return this.handleResponse(response);
  }

  async getProfile(uid) {
    const response = await fetch(`${this.baseURL}/auth/profile/${uid}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateProfile(uid, userData) {
    const response = await fetch(`${this.baseURL}/auth/profile/${uid}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  // Course endpoints
  async getCourses() {
    const response = await fetch(`${this.baseURL}/courses`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getCourse(courseId) {
    const response = await fetch(`${this.baseURL}/courses/${courseId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createCourse(courseData) {
    const response = await fetch(`${this.baseURL}/courses`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(courseData),
    });
    return this.handleResponse(response);
  }

  async updateCourse(courseId, courseData) {
    const response = await fetch(`${this.baseURL}/courses/${courseId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(courseData),
    });
    return this.handleResponse(response);
  }

  async deleteCourse(courseId) {
    const response = await fetch(`${this.baseURL}/courses/${courseId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async enrollInCourse(courseId) {
    const response = await fetch(`${this.baseURL}/courses/${courseId}/enroll`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getEnrolledCourses() {
    const response = await fetch(`${this.baseURL}/courses/student/enrolled`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin endpoints
  async getStudents() {
    const response = await fetch(`${this.baseURL}/admin/students`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getStudent(studentId) {
    const response = await fetch(`${this.baseURL}/admin/students/${studentId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateStudentRole(studentId, role) {
    const response = await fetch(`${this.baseURL}/admin/students/${studentId}/role`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    return this.handleResponse(response);
  }

  async deleteStudent(studentId) {
    const response = await fetch(`${this.baseURL}/admin/students/${studentId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getDashboardStats() {
    const response = await fetch(`${this.baseURL}/admin/dashboard/stats`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getEnrollments() {
    const response = await fetch(`${this.baseURL}/admin/enrollments`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }
}

export default new ApiService();
