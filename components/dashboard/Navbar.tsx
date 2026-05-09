// "use client";
// import { useState } from 'react';
// import { User, Bell, LogOut, Menu, X } from 'lucide-react';
// import Link from 'next/link';

// export const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <nav className="bg-white border-b h-16 flex items-center px-4 md:px-8 justify-between sticky top-0 z-40">
//       {/* Brand / Logo */}
//       <div className="flex items-center gap-2">
//         <Link href="/dashboard" className="text-xl font-bold text-primary">
//           SchoolPortal
//         </Link>
//       </div>

//       {/* Desktop Right Side */}
//       <div className="hidden md:flex items-center gap-4">
//         <button className="p-2 hover:bg-gray-100 rounded-full">
//           <Bell size={20} className="text-gray-600" />
//         </button>
//         <div className="flex items-center gap-3 border-l pl-4">
//           <div className="text-right">
//             <p className="text-sm font-semibold">Sharifa Akhter</p>
//             <p className="text-xs text-gray-500 capitalize">Developer</p>
//           </div>
//           <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
//             S
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Toggle */}
//       <button 
//         className="md:hidden p-2" 
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//       >
//         {isMobileMenuOpen ? <X /> : <Menu />}
//       </button>

//       {/* Mobile Dropdown (Optional) */}
//       {isMobileMenuOpen && (
//         <div className="absolute top-16 left-0 w-full bg-white border-b p-4 flex flex-col gap-4 md:hidden shadow-lg">
//           <Link href="/profile" className="flex items-center gap-2"><User size={18}/> Profile</Link>
//           <button className="flex items-center gap-2 text-red-500"><LogOut size={18}/> Logout</button>
//         </div>
//       )}
//     </nav>
//   );
// };

"use client";

import { useState } from "react";
import {
  Bell,
  LogOut,
  Menu,
  X,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
  
    const onLogout = () => {
  
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
      
      router.push("/login");
      
      router.refresh();
    };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md">
            S
          </div>

          <div>
            <Link
              href="/dashboard"
              className="text-lg sm:text-xl font-bold tracking-tight text-gray-800"
            >
              SchoolPortal
            </Link>
            <p className="hidden sm:block text-xs text-gray-500">
              School Management System
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          
          {/* Notification */}
          <button className="relative rounded-full p-2 transition hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />

            {/* Notification Dot */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 hover:bg-gray-100 transition cursor-pointer">
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-gray-800">
                Sharifa Akhter
              </p>
              <p className="text-xs text-gray-500">Full Stack Developer</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
              S
            </div>

            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>

        {/* Tablet Menu */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <button className="relative rounded-full p-2 hover:bg-gray-100 transition">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
            S
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-[400px] border-t border-gray-200"
            : "max-h-0"
        }`}
      >
        <div className="space-y-4 bg-white px-5 py-5 shadow-lg">
          
          {/* User Info */}
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              S
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Sharifa Akhter
              </h3>
              <p className="text-sm text-gray-500">
                Full Stack Developer
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 transition hover:bg-gray-100"
            >
              <User size={18} />
              Profile
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 transition hover:bg-gray-100"
            >
              <Settings size={18} />
              Settings
            </Link>

             <button
          className="w-full group flex items-center gap-x-3 text-sm font-medium px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
          </div>
        </div>
      </div>
    </nav>
  );
};