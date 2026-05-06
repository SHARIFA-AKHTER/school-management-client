/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { authService } from "@/app/services/api.service";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Registering with:", payload);

    try {
      setLoading(true);
      const res = await authService.register(payload);
      
      console.log("Registration Success Response:", res.data);

   
      if (res.data.success) {
        alert(res.data.message || "Registration Successful!");
        router.push("/login");
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration Error Details:", error.response?.data || error.message); 
    
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#D9D1E9] p-4 md:p-10">
      <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Image Section */}
        <div className="hidden md:flex md:w-1/2 relative bg-purple-100 items-center justify-center overflow-hidden">
          <img 
            src="/login.jpg" 
            alt="School Register" 
            className="object-cover w-full h-full" 
          />
          <div className="absolute bottom-10 left-10 right-10 text-white bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/20">
            <h2 className="text-2xl font-bold">Join SchoolPro</h2>
            <p className="text-sm mt-2 text-gray-100">Create an account to start managing your platform.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Register</h1>
            <p className="text-gray-400 text-sm mb-8">Create your account in seconds</p>

            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                <input 
                  name="name" 
                  required 
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                <input 
                  name="email" 
                  required 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
                <div className="relative">
                  <input 
                    name="password" 
                    required 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a password" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm transition-all" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                disabled={loading} 
                type="submit"
                className="w-full bg-[#5D4291] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#4a3475] transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
              Already have an account? {" "}
              <Link href="/login" className="text-purple-600 font-bold hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}