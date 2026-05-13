/* eslint-disable @typescript-eslint/no-explicit-any */

// export const Footer = () => {
//   return (
//     <footer className="bg-white border-t py-4 px-6 md:px-10">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//         <p className="text-sm text-gray-500 text-center">
//           © {new Date().getFullYear()} School Management System. All rights reserved.
//         </p>
//         <div className="flex gap-6">
//           <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Support</a>
//           <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Privacy Policy</a>
//           <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Terms</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    window.addEventListener("storage", checkTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", checkTheme);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full transition-colors duration-300 border-t ${
      isDarkMode 
        ? "bg-[#0B0F1A] border-white/10 text-gray-400" 
        : "bg-white border-gray-200 text-gray-600"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Upper Section: Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center shadow-lg">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                SchoolPro
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              A comprehensive management solution for modern educational institutions, focusing on efficiency and AI-driven insights.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <SocialIcon icon={FaFacebook} isDark={isDarkMode} />
              <SocialIcon icon={FaLinkedin} isDark={isDarkMode} />
              <SocialIcon icon={FaGithub} isDark={isDarkMode} />
              <SocialIcon icon={FaTwitter} isDark={isDarkMode} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden sm:block">
            <h3 className={`font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <FooterLink label="Dashboard" />
              <FooterLink label="Students Management" />
              <FooterLink label="Attendance Tracker" />
            </ul>
          </div>

          {/* Resources */}
          <div className="hidden lg:block">
            <h3 className={`font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Resources</h3>
            <ul className="space-y-4 text-sm">
              <FooterLink label="Documentation" />
              <FooterLink label="Help Center" />
              <FooterLink label="Privacy Policy" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-purple-500 shrink-0" />
                <span>Rajshahi, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-purple-500 shrink-0" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-purple-500 shrink-0" />
                <span>support@schoolpro.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          isDarkMode ? "border-white/10" : "border-gray-100"
        }`}>
          <p className="text-xs text-center md:text-left">
            © {currentYear} SchoolPro. All rights reserved. Developed by Sharifa Akhter.
          </p>
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="#" className="hover:text-purple-500 transition-colors">Support</a>
            <a href="#" className="hover:text-purple-500 transition-colors">Privacy Policy</a>
            <div className="flex items-center gap-1 text-purple-500 font-bold">
              <span>AI SaaS Specialist</span>
              <ExternalLink size={12} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-components
function SocialIcon({ icon: Icon, isDark }: { icon: any; isDark: boolean }) {
  return (
    <motion.a
      whileHover={{ y: -3, scale: 1.1 }}
      className={`p-2 rounded-lg border transition-all cursor-pointer ${
        isDark 
          ? "bg-white/5 border-white/10 text-gray-400 hover:bg-purple-600 hover:text-white" 
          : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-purple-600 hover:text-white shadow-sm"
      }`}
    >
      <Icon size={18} />
    </motion.a>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <a className="hover:text-purple-500 transition-colors cursor-pointer flex items-center group">
        <span className="w-0 group-hover:w-2 h-[2px] bg-purple-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
        {label}
      </a>
    </li>
  );
}