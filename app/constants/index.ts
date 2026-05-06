export const APP_ROLES ={
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT'
}as const ;

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  STUDENTS: "/students",
  ATTENDANCE: "/attendance",
  RESULTS: "/results",
}as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", roles: ["ADMIN", "TEACHER", "STUDENT"] },
  { label: "Attendance", href: "/teacher/attendance", roles: ["TEACHER", "ADMIN"] },
  { label: "Users", href: "/admin/users", roles: ["ADMIN"] },
];