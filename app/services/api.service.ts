/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Functions
export const authService = {
  login: (data: any) => apiClient.post("/auth/login", data),
  register: (data: any) => apiClient.post("/auth/register", data),

  getClasses: () => apiClient.get("/admin/class"),
  createClass: (data: { name: string }) =>
    apiClient.post("/class/create-class", data),
  getClassById: (id: string) => apiClient.get(`/class/${id}`),
  getStudents: () => apiClient.get("/admin/students"),
};

export const studentService = {
  getAll: () => apiClient.get("/students"),
  getById: (id: string) => apiClient.get(`/students/${id}`),
};
