/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/app/services/api.service";
import Script from "next/script"; 

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeGoogle = () => {
      if ((window as any).google) {
        console.log("Google library loaded successfully");
        
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        console.log("Using Client ID:", clientId);

        if (!clientId) {
          console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing in .env.local");
          return;
        }

        (window as any).google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
        });
      } else {
        console.warn("Google library not found yet, retrying...");
      }
    };


    const timer = setTimeout(initializeGoogle, 1000);
    return () => clearTimeout(timer);
  }, []);


  const handleGoogleResponse = async (response: any) => {
    console.log("Google Login Response Received:", response);
    try {
      setLoading(true);
      const res = await authService.googleLogin({ token: response.credential });
      console.log("Backend response for Google Login:", res.data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        router.push("/admin");
      }
    } catch (error: any) {
      console.error("Google Login Error details:", error.response?.data || error.message);
      alert("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  const triggerGoogleLogin = () => {
    console.log("Triggering Google Login Prompt...");
    if ((window as any).google) {
      (window as any).google.accounts.id.prompt((notification: any) => {
        console.log("Google prompt notification:", notification);
        if (notification.isNotDisplayed()) {
          console.warn("Prompt not displayed:", notification.getNotDisplayedReason());
   
        }
      });
    } else {
      console.error("Google library not loaded. Click ignored.");
      alert("Google Login is not ready yet. Please refresh.");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      setLoading(true);
      const res = await authService.login(payload);
      if (res.data.success) {
        localStorage.setItem("token", res.data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        router.push("/admin");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        strategy="beforeInteractive"
        onLoad={() => console.log("Google Identity Script Loaded")}
      />

      <div className="min-h-screen flex items-center justify-center bg-[#D9D1E9] p-4 font-sans">
        <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
          
          <div className="hidden md:flex w-1/2 relative bg-purple-100">
            <img src="/login.jpg" alt="login" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-purple-900/40 to-transparent" />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-16">
            <h1 className="text-4xl font-black text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-400 font-medium mb-8">Please enter your details to sign in</p>

            <button 
              type="button"
              onClick={triggerGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-3.5 rounded-2xl mb-8 hover:bg-gray-50 transition-all font-bold text-gray-700 active:scale-95"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="google" className="w-5 h-5" />
              Continue with Google
            </button>

            <div className="relative mb-8 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <span className="relative bg-white px-4 text-xs font-black text-gray-300 uppercase tracking-widest">Or login with email</span>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                <input name="email" required type="email" placeholder="hello@example.com" className="w-full p-4 bg-gray-50 border-none rounded-2xl mt-1 focus:ring-2 focus:ring-purple-200 outline-none transition-all font-medium" />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Password</label>
                <div className="relative mt-1">
                  <input name="password" required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-200 outline-none transition-all font-medium" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl flex justify-center items-center gap-2 font-black shadow-xl shadow-purple-200 transition-all active:scale-[0.98]">
                {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}