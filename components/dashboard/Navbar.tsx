/* eslint-disable react-hooks/set-state-in-effect */

// "use client";

// import { useState } from "react";
// import {
//   Bell,
//   LogOut,
//   Menu,
//   X,
//   User,
//   Settings,
//   ChevronDown,
// } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";


// export const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const router = useRouter();
  
//     const onLogout = () => {
  
//       localStorage.removeItem("token");
//       localStorage.removeItem("user"); 
      
//       router.push("/login");
      
//       router.refresh();
//     };

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
//       <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md">
//             S
//           </div>

//           <div>
//             <Link
//               href="/dashboard"
//               className="text-lg sm:text-xl font-bold tracking-tight text-gray-800"
//             >
//               SchoolPortal
//             </Link>
//             <p className="hidden sm:block text-xs text-gray-500">
//               School Management System
//             </p>
//           </div>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex items-center gap-6">
          
//           {/* Notification */}
//           <button className="relative rounded-full p-2 transition hover:bg-gray-100">
//             <Bell size={20} className="text-gray-600" />

//             {/* Notification Dot */}
//             <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
//           </button>

//           {/* User Profile */}
//           <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 hover:bg-gray-100 transition cursor-pointer">
//             <div className="text-right leading-tight">
//               <p className="text-sm font-semibold text-gray-800">
//                 Sharifa Akhter
//               </p>
//               <p className="text-xs text-gray-500">Full Stack Developer</p>
//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
//               S
//             </div>

//             <ChevronDown size={16} className="text-gray-500" />
//           </div>
//         </div>

//         {/* Tablet Menu */}
//         <div className="hidden md:flex lg:hidden items-center gap-3">
//           <button className="relative rounded-full p-2 hover:bg-gray-100 transition">
//             <Bell size={20} className="text-gray-600" />
//             <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
//           </button>

//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
//             S
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ${
//           isMobileMenuOpen
//             ? "max-h-[400px] border-t border-gray-200"
//             : "max-h-0"
//         }`}
//       >
//         <div className="space-y-4 bg-white px-5 py-5 shadow-lg">
          
//           {/* User Info */}
//           <div className="flex items-center gap-3 border-b pb-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
//               S
//             </div>

//             <div>
//               <h3 className="font-semibold text-gray-800">
//                 Sharifa Akhter
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Full Stack Developer
//               </p>
//             </div>
//           </div>

//           {/* Menu Items */}
//           <div className="flex flex-col gap-2">
//             <Link
//               href="/profile"
//               className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 transition hover:bg-gray-100"
//             >
//               <User size={18} />
//               Profile
//             </Link>

//             <Link
//               href="/settings"
//               className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 transition hover:bg-gray-100"
//             >
//               <Settings size={18} />
//               Settings
//             </Link>

//              <button
//           className="w-full group flex items-center gap-x-3 text-sm font-medium px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all"
//           onClick={onLogout}
//         >
//           <LogOut className="h-5 w-5" />
//           Logout
//         </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  LogOut,
  Menu,
  X,
  User,
  Settings,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes"; 

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();


  useEffect(() => setMounted(true), []);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md">
            S
          </div>
          <div>
            <Link
              href="/admin"
              className="text-lg sm:text-xl font-bold tracking-tight text-gray-800 dark:text-white"
            >
              SchoolPortal
            </Link>
            <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
              School Management System
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* Notification */}
          <button className="relative rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Sharifa Akhter
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI SaaS Specialist</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
              S
            </div>
            <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Mobile & Tablet Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
            {mounted && (
                <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300"
                >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            )}
            <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-100 border-t border-gray-200 dark:border-gray-800" : "max-h-0"
        }`}
      >
        <div className="space-y-4 bg-white dark:bg-slate-950 px-5 py-5 shadow-lg">
          <div className="flex flex-col gap-2">
            <Link href="/profile" className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <User size={18} /> Profile
            </Link>
            <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Settings size={18} /> Settings
            </Link>
            <button className="w-full flex items-center gap-x-3 text-sm font-medium px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all" onClick={onLogout}>
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};