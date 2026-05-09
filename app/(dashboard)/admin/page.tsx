/* eslint-disable react/no-unescaped-entities */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  School,
  BookOpen,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { authService } from "@/app/services/api.service";
import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const res = await authService.getResults();
        if (res.data?.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5D4291]" size={40} />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Results",
      value: data?.length || 0,
      icon: GraduationCap,
      color: "bg-purple-500",
      trend: "Live",
    },
    {
      label: "Total Students",
      value: "120",
      icon: Users,
      color: "bg-blue-500",
      trend: "+5%",
    },
    {
      label: "Total Classes",
      value: "08",
      icon: School,
      color: "bg-orange-500",
      trend: "Stable",
    },
    {
      label: "Active Subjects",
      value: "15",
      icon: BookOpen,
      color: "bg-emerald-500",
      trend: "Updated",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 font-medium">
            Real-time overview of your school's performance.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-purple-50 p-2 rounded-xl text-[#5D4291]">
            <Calendar size={20} />
          </div>
          <span className="text-sm font-bold text-gray-600 pr-2">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}
              >
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black bg-gray-50 px-2 py-1 rounded-lg text-gray-400 group-hover:text-[#5D4291]">
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-gray-800 mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Results Table (Dynamic from your Backend) */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-gray-800">
              Recent Exam Results
            </h3>
            <Link href="/results">
              <button className="text-sm font-bold text-[#5D4291] hover:underline flex items-center gap-1">
                View All <ArrowUpRight size={16} />
              </button>
            </Link>
          </div>

          <div className="space-y-4">
            {data?.slice(0, 5).map((result: any) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-5 hover:bg-gray-50 rounded-[24px] transition-all border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-xs">
                    {result.marks >= 40 ? "PASS" : "FAIL"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {result.student?.name}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      {result.subject} • Roll: {result.student?.roll || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#5D4291] text-lg">
                    {result.marks}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Score
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="space-y-8">
          <div className="bg-[#5D4291] rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden">
            <TrendingUp
              className="absolute -right-4 -bottom-4 text-white/10"
              size={120}
            />
            <h3 className="text-xl font-bold mb-2">Performance</h3>
            <p className="text-purple-100 text-sm mb-6">
              Based on your recent {data?.length} entries, the average pass rate
              is high.
            </p>
            <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[75%] rounded-full" />
            </div>
            <p className="mt-2 text-[10px] font-bold text-purple-200">
              75% STUDENT SUCCESS RATE
            </p>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm">
            <h3 className="text-lg font-black text-gray-800 mb-6">Shortcuts</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-50 text-blue-600 p-4 rounded-3xl font-bold text-xs hover:scale-105 transition-all">
                Add Student
              </button>
              <button className="bg-purple-50 text-purple-600 p-4 rounded-3xl font-bold text-xs hover:scale-105 transition-all">
                Add Result
              </button>
              <button className="bg-orange-50 text-orange-600 p-4 rounded-3xl font-bold text-xs hover:scale-105 transition-all">
                Classes
              </button>
              <button className="bg-emerald-50 text-emerald-600 p-4 rounded-3xl font-bold text-xs hover:scale-105 transition-all">
                Schedules
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
