
// "use client";

// import { Users, BookOpen, DollarSign, Activity } from "lucide-react";

// export default function AdminDashboard() {
//   return (
//     <div className="space-y-6">

//       {/* 🔥 Title */}
//       <div>
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//           Dashboard Overview
//         </h1>
//         <p className="text-gray-500 text-sm sm:text-base">
//           Welcome back, Admin 👋
//         </p>
//       </div>

//       {/* 🔥 Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

//         <Card
//           title="Total Students"
//           value="1,250"
//           icon={<Users size={20} />}
//         />

//         <Card
//           title="Total Teachers"
//           value="85"
//           icon={<BookOpen size={20} />}
//         />

//         <Card
//           title="Revenue"
//           value="$12,500"
//           icon={<DollarSign size={20} />}
//         />

//         <Card
//           title="Active Classes"
//           value="32"
//           icon={<Activity size={20} />}
//         />

//       </div>

//       {/* 🔥 Table Section */}
//       <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">

//         <h2 className="text-lg font-semibold mb-4">
//           Recent Students
//         </h2>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">

//             <thead className="text-gray-500 border-b">
//               <tr>
//                 <th className="py-3">Name</th>
//                 <th>Email</th>
//                 <th>Class</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody className="text-gray-700">
//               <tr className="border-b">
//                 <td className="py-3">Rahim</td>
//                 <td>rahim@gmail.com</td>
//                 <td>Class 10</td>
//                 <td className="text-green-600">Active</td>
//               </tr>

//               <tr className="border-b">
//                 <td className="py-3">Karim</td>
//                 <td>karim@gmail.com</td>
//                 <td>Class 9</td>
//                 <td className="text-yellow-600">Pending</td>
//               </tr>

//               <tr>
//                 <td className="py-3">Sadia</td>
//                 <td>sadia@gmail.com</td>
//                 <td>Class 8</td>
//                 <td className="text-green-600">Active</td>
//               </tr>
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// type CardProps = {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
// };

// function Card({ title, value, icon }: CardProps) {
//   return (
//     <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm flex items-center justify-between">

//       <div>
//         <p className="text-gray-500 text-xs sm:text-sm">
//           {title}
//         </p>
//         <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
//           {value}
//         </h2>
//       </div>

//       <div className="bg-gray-100 p-3 rounded-xl">
//         {icon}
//       </div>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, School, BookOpen } from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    studentCount: 0,
    teacherCount: 0,
    classCount: 0,
    subjectCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
      
        const res = await axios.get(`${API_URL}/students`);
        
   
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* 1. Students Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <GraduationCap className="text-purple-600 mb-2" size={24} />
        <p className="text-gray-500 text-sm font-medium">Total Students</p>
        <h3 className="text-2xl font-bold text-slate-900">{stats.studentCount}</h3>
      </div>

      {/* 2. Teachers Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <Users className="text-blue-600 mb-2" size={24} />
        <p className="text-gray-500 text-sm font-medium">Total Teachers</p>
        <h3 className="text-2xl font-bold text-slate-900">{stats.teacherCount}</h3>
      </div>

      {/* 3. Classes Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <School className="text-orange-600 mb-2" size={24} />
        <p className="text-gray-500 text-sm font-medium">Total Classes</p>
        <h3 className="text-2xl font-bold text-slate-900">{stats.classCount}</h3>
      </div>

      {/* 4. Subjects Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <BookOpen className="text-emerald-600 mb-2" size={24} />
        <p className="text-gray-500 text-sm font-medium">Total Subjects</p>
        <h3 className="text-2xl font-bold text-slate-900">{stats.subjectCount}</h3>
      </div>
    </div>
  );
}