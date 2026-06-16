# 🏫 SchoolPortal - Modern School Management System

SchoolPortal is a high-end, responsive, and feature-rich **SaaS Dashboard** application. It is designed to streamline administrative tasks, manage student records, and provide a seamless experience for educators and administrators using a modern tech stack.

![SchoolPortal Preview](https://i.ibb.co.com/84t2j16W/School-Management-System-05-10-2026-12-58-PM.png)

## 🌗 Theme Support (Dark & Light Mode)
This project features a fully dynamic theme switching system.
* **Dynamic Toggle:** Seamlessly switch between Light and Dark modes.
* **System Preference:** Automatically adapts to the user's OS theme.
* **Modern Colors:** Built with **Tailwind CSS v4** using the **OKLCH** color space for vibrant and accessible UI.

## ✨ Key Features

* **💳 Secure Payment Ledger Gateways:** Integrated with **SSLCommerz Secure Gateway Matrix Protocols** for online checkout initialization. Features a complete flow with real-time URL transaction handshake processing and query parameter state tracking (`success`/`fail`/`cancel`).
* **📊 Visual Transaction Analytics:** Real-time dual-view layout showcasing live transactional record data sheets via a desktop full-scale structured table and a mobile-optimized responsive card grid view.
* **⚡ Optimized Build & Suspense Handling:** Architecture utilizes React `<Suspense>` boundaries to guarantee seamless asynchronous telemetry, clean client-side search parameter extraction, and zero-deoptimization build safety.
* **Advanced Dashboard:** At-a-glance statistics for students, teachers, and performance metrics.
* **Dual Authentication:** Secure login via JWT-based Email/Password and **Google One-Tap/Identity Services**.
* **Professional UI:** Modern interface with **Glassmorphism** effects, **Framer Motion** micro-interactions, and smooth transitions.
* **Role-Based Access Control (RBAC):** Personalized views and permissions for Admins, Teachers, and Students.
* **Fully Responsive:** Optimized for a flawless experience across Mobile, Tablet, and Desktop.

## 🚀 Tech Stack

* **Framework:** [Next.js 16+](https://nextjs.org/) (App Router Architecture)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Authentication:** JWT Hooks & Google Identity Services
* **State & Parameters:** Next.js Navigation Hooks (`useSearchParams`) & Context API

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
│   ├── (auth)/          # Login and Authentication routing protocols
│   ├── (dashboard)/     # Admin, Management panels & Payment Gateway Ledgers
│   │   └── payments/    # SSLCommerz portal checkout session core UI
│   ├── components/      # Reusable UI components (Navbar, Sidebar, Buttons)
│   ├── services/        # API integration, Core Auth & Payment transaction logic
│   └── layout.tsx       # Global root layouts wrap with theme & state providers
├── public/              # Static ecosystem core assets (images, icons)
└── tailwind.config.ts   # Custom OKLCH palette configurations

🔗 Live Demo [https://school-management-client.vercel.app/]

👩‍💻 Developed By
Sharifa Akhter AI SaaS Specialist | Full Stack Developer



