/* eslint-disable react/no-unescaped-entities */
"use client";

import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  DollarSign, 
  MoreVertical,
  TrendingUp
} from "lucide-react";

// Stats Data
const stats = [
  { label: "Students", value: "15.00K", icon: GraduationCap, color: "bg-purple-100 text-purple-600", trend: "+12%" },
  { label: "Teachers", value: "2.00K", icon: UserCheck, color: "bg-blue-100 text-blue-600", trend: "+3%" },
  { label: "Parents", value: "5.6K", icon: Users, color: "bg-orange-100 text-orange-600", trend: "+5%" },
  { label: "Earnings", value: "$19.3K", icon: DollarSign, color: "bg-green-100 text-green-600", trend: "+8%" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, here's what's happening today.</p>
        </div>
        <button className="bg-purple-600 text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-purple-700 transition w-full md:w-auto">
          Generate Report
        </button>
      </div>

      {/* 1. Stats Cards - Fully Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 md:p-6 rounded-[32px] shadow-sm flex items-center justify-between border border-transparent hover:border-purple-100 transition-all">
            <div className="space-y-1">
              <p className="text-gray-500 text-xs md:text-sm font-medium">{stat.label}</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</h3>
              <div className="flex items-center text-[10px] md:text-xs text-green-600 font-medium">
                <TrendingUp size={12} className="mr-1" /> {stat.trend}
              </div>
            </div>
            <div className={`p-3 md:p-4 rounded-2xl ${stat.color}`}>
              <stat.icon size={24} className="md:w-7 md:h-7" />
            </div>
          </div>
        ))}
      </div>

      {/* 2. Main Content Grid (Charts & Tables) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Exam Results Chart Placeholder */}
        <div className="xl:col-span-2 bg-white p-5 md:p-8 rounded-[32px] shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-gray-800">All Exam Result</h4>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20}/></button>
          </div>
          {/* Chart Container - height adjusts for mobile */}
          <div className="w-full h-62.5 md:h-75 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
             <div className="text-purple-400 mb-2">📊</div>
             <p className="text-gray-400 text-xs md:text-sm">Recharts integration here</p>
          </div>
        </div>

        {/* Student Ratio / Donut Chart Area */}
        <div className="bg-white p-5 md:p-8 rounded-[32px] shadow-sm border border-gray-50">
          <h4 className="font-bold text-gray-800 mb-6">Students Ratio</h4>
          <div className="relative flex justify-center py-4">
             {/* Mock Donut Chart */}
             <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[12px] md:border-[18px] border-purple-500 border-t-blue-400 border-l-orange-400 flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl font-bold">15,000</span>
                <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">Total Students</span>
             </div>
          </div>
          {/* Legend */}
          <div className="mt-6 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-xs font-medium"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Male</div>
            <div className="flex items-center gap-2 text-xs font-medium"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Female</div>
          </div>
        </div>

      </div>

      {/* 3. Star Students / Recent Activity (Bottom Table) */}
      <div className="bg-white p-5 md:p-8 rounded-[32px] shadow-sm border border-gray-50">
        <h4 className="font-bold text-gray-800 mb-6">Star Students</h4>
        <div className="overflow-x-auto -mx-5 md:mx-0"> {/* Mobile scroll hack */}
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-5 py-4 font-medium">Name</th>
                <th className="px-5 py-4 font-medium">ID</th>
                <th className="px-5 py-4 font-medium">Marks</th>
                <th className="px-5 py-4 font-medium">Percent</th>
                <th className="px-5 py-4 font-medium">Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">E</div>
                    <span className="text-sm font-semibold">Evelyn Harper</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 font-medium">PRE45173</td>
                  <td className="px-5 py-4 text-sm text-gray-600 font-medium">1185</td>
                  <td className="px-5 py-4 text-sm text-purple-600 font-bold">98%</td>
                  <td className="px-5 py-4 text-sm text-gray-500">2024</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}