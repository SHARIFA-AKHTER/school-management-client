/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});


// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Functions
export const authService = {
  login: (data: any) => apiClient.post("/auth/login", data),
  register: (data: any) => apiClient.post("/auth/register", data),
  googleLogin: (data: { token: string }) => apiClient.post("/auth/google-login", data),

  getClasses: () => apiClient.get("/class"),
  createClass: (data: { name: string }) =>
    apiClient.post("/class/create-class", data),
  getClassById: (id: string) => apiClient.get(`/class/${id}`),
  getStudents: () => apiClient.get("/students"),
  getStudentById: (id: string) => apiClient.get(`/students/${id}`),
  createStudent: (data: { name: string; classId: string }) =>
    apiClient.post("/students/create-student", data),
  getAttendances: () => apiClient.get("/attendance"),
  getAttendanceById: (id: string) => apiClient.get(`/attendance/${id}`),
  takeAttendance: (data: { studentId: string; status: string; date: string }) => 
    apiClient.post("/attendance/take-attendance", data),
  getSubjects: () => apiClient.get("/subjects"),
  getSubjectById: (id: string) => apiClient.get(`/subjects/${id}`),
  createSubject: (data: { name: string; classId: string }) => 
    apiClient.post("/subjects/create-subject", data),
  getResults: () => apiClient.get("/results"),
  getResultById: (id: string) => apiClient.get(`/results/${id}`),
  addResult: (data: { studentId: string; subjectId: string; marks: number; examId?: string | null }) => 
    apiClient.post("/results/add-result", data),

  getExams: (): Promise<any> => apiClient.get("/exams"),
  getExamById: (id: string): Promise<any> => apiClient.get(`/exams/${id}`),
  
  createExam: (data: { title: string; examDate: string; feeAmount: number }): Promise<any> => 
    apiClient.post("/exams/create-exam", data),
  // SSLCOMMERZ PAYMENT SECURE MANAGEMENT SYSTEMS ENDPOINTS
  // =========================================================================
  getPayments: (): Promise<any> => apiClient.get("/payments"),
  //new online payment initiation endpoint for SSLCommerz session deployment
  initiatePayment: (data: { amount: number; purpose: string; studentId: string }): Promise<any> => 
    apiClient.post("/payments/initiate", data),

};

