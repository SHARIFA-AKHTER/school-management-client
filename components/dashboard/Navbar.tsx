"use client";
import { useState } from 'react';
import { User, Bell, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b h-16 flex items-center px-4 md:px-8 justify-between sticky top-0 z-40">
      {/* Brand / Logo */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="text-xl font-bold text-primary">
          SchoolPortal
        </Link>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-3 border-l pl-4">
          <div className="text-right">
            <p className="text-sm font-semibold">Sharifa Akhter</p>
            <p className="text-xs text-gray-500 capitalize">Developer</p>
          </div>
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
            S
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden p-2" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Dropdown (Optional) */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b p-4 flex flex-col gap-4 md:hidden shadow-lg">
          <Link href="/profile" className="flex items-center gap-2"><User size={18}/> Profile</Link>
          <button className="flex items-center gap-2 text-red-500"><LogOut size={18}/> Logout</button>
        </div>
      )}
    </nav>
  );
};