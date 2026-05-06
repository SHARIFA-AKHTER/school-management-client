/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/app/services/api.service";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    console.log("Attempting Login with:", payload);

    try {
      setLoading(true);
      const res = await authService.login(payload);

      console.log("Login Success Response:", res.data);

      // ✅ accessToken fix
      const token = res.data?.data?.accessToken;

      if (res.data.success && token) {
        localStorage.setItem("token", token);

        if (res.data.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }

        console.log("Login successful, token saved");

        router.push("/admin");
      } else {
        console.error("AccessToken not found:", res.data);
        alert("Login failed: token missing");
      }
    } catch (error: any) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D9D1E9] p-4">
      <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left */}
        <div className="hidden md:flex w-1/2">
          <img
            src="/login.jpg"
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-gray-400 mb-6">Enter your credentials</p>

          <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl mb-6">
            <Home size={18} /> Google Login
          </button>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-gray-500">Email</label>
              <input
                name="email"
                required
                type="email"
                placeholder="Enter email"
                className="w-full p-3 border rounded-xl mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-gray-500">Password</label>
              <div className="relative mt-1">
                <input
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full p-3 border rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </button>

          </form>

          <p className="text-center mt-6 text-sm">
            Don’t have account?{" "}
            <Link href="/register" className="text-purple-600 font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}