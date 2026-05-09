/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Mail,
  MapPin,
  Calendar,
  Edit,
  Camera,

} from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl">
          
          {/* Cover */}
          <div className="relative h-36 sm:h-52 md:h-60 lg:h-72 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Cover Button */}
            <button className="absolute right-3 top-3 sm:right-5 sm:top-5 flex items-center gap-2 rounded-xl bg-white/20 px-3 py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/30">
              <Camera size={16} />
              <span className="hidden sm:block">Change Cover</span>
            </button>
          </div>

          {/* Content */}
          <div className="relative px-4 pb-6 sm:px-6 md:px-8 lg:px-10">
            
            {/* Top Section */}
            <div className="-mt-14 sm:-mt-20 md:-mt-24 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              
              {/* Left */}
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end">
                
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src="login.jpg"
                    alt="Profile"
                    className="h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-3xl border-4 border-white object-cover shadow-2xl"
                  />

                  <button className="absolute bottom-2 right-2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700">
                    <Camera size={18} />
                  </button>
                </div>

                {/* User Info */}
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    Sharifa Akhter
                  </h1>

                  <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-500">
                    Full Stack Developer
                  </p>

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 sm:justify-start">
                    
                    <div className="flex items-center gap-1">
                      <MapPin size={15} />
                      Bangladesh
                    </div>

                    <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-400"></div>

                    <div className="flex items-center gap-1">
                      <Calendar size={15} />
                      Joined May 2026
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 sm:w-auto">
                <Edit size={18} />
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
              
              <div className="rounded-2xl bg-gray-50 p-4 sm:p-5 text-center transition hover:shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  20+
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Projects
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 sm:p-5 text-center transition hover:shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  2 Years
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Experience
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 sm:p-5 text-center transition hover:shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  10+
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Clients
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 sm:p-5 text-center transition hover:shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  4.9
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Rating
                </p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              
              {/* About */}
              <div className="rounded-3xl bg-gray-50 p-5 sm:p-6 lg:col-span-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  About Me
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-7 text-gray-600">
                  Passionate Full Stack Developer with experience building
                  modern web applications using React, Next.js, Node.js,
                  Express, MongoDB, and TypeScript. I love creating responsive,
                  user-friendly, and scalable applications with clean UI/UX.
                </p>
              </div>

              {/* Contact */}
              <div className="rounded-3xl bg-gray-50 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Contact Info
                </h2>

                <div className="mt-5 space-y-5">
                  
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                      <Mail size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="break-all font-medium text-gray-800">
                        sr0589071@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                      <LinkIcon size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">LinkedIn</p>

                      <a
                        href="https://www.linkedin.com/in/sharifa-akhter-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-sm sm:text-base font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                      >
                        linkedin.com/in/sharifa-akhter-dev
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">
                        Rajshahi, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}