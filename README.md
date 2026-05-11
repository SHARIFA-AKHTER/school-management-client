# 🏫 SchoolPortal - Modern School Management System

SchoolPortal is a high-end, responsive, and feature-rich **SaaS Dashboard** application. It is designed to streamline administrative tasks, manage student records, and provide a seamless experience for educators and administrators using a modern tech stack.

![SchoolPortal Preview](https://i.ibb.co.com/84t2j16W/School-Management-System-05-10-2026-12-58-PM.png)

## 🌗 Theme Support (Dark & Light Mode)
This project features a fully dynamic theme switching system.
* **Dynamic Toggle:** Seamlessly switch between Light and Dark modes.
* **System Preference:** Automatically adapts to the user's OS theme.
* **Modern Colors:** Built with **Tailwind CSS v4** using the **OKLCH** color space for vibrant and accessible UI.

## ✨ Key Features
* **Advanced Dashboard:** At-a-glance statistics for students, teachers, and performance metrics.
* **Dual Authentication:** Secure login via JWT-based Email/Password and **Google One-Tap/Identity Services**.
* **Professional UI:** Modern interface with **Glassmorphism** effects and smooth transitions.
* **Role-Based Access Control (RBAC):** Personalized views and permissions for Admins, Teachers, and Students.
* **Fully Responsive:** Optimized for a flawless experience across Mobile, Tablet, and Desktop.
* **Interactive Navigation:** Sticky, blurred navbar and a dynamic sidebar for premium UX.

## 🚀 Tech Stack
* **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Authentication:** JWT & Google Identity Services
* **State Management:** React Hooks & Context API

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/SHARIFA-AKHTER/school-management-client.git]
   Install dependencies:

npm install
Configure Environment Variables:
Create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_API_URL=your_api_backend_url

Run the development server:
npm run dev
Open http://localhost:3000 in your browser to see the result.

📂 Project Structure

├── app/
│   ├── (auth)/          # Login and Authentication pages
│   ├── (dashboard)/     # Admin and Management panels
│   ├── components/      # Reusable UI (Navbar, Sidebar, Buttons)
│   ├── services/        # API calls and Auth Logic
│   └── layout.tsx       # Root layout with global providers
├── public/              # Static assets (images, icons)
└── tailwind.config.ts   # Custom theme and styling configurations

🔗 Live Demo [https://school-management-client.vercel.app/]

👩‍💻 Developed By
Sharifa Akhter AI SaaS Specialist | Full Stack Developer



