/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Users, BookOpen, Loader2, Plus } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {

        const res = await authService.getClasses(); 
        console.log("Classes Data:", res.data);
        
   
        setClasses(res.data.data || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5D4291]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Classes Management</h1>
          <p className="text-sm text-gray-500">Manage school classes and view student/subject stats.</p>
        </div>
        <button className="bg-[#5D4291] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-semibold hover:bg-[#4a3475] transition-all shadow-lg shadow-purple-100">
          <Plus size={20} /> Add New Class
        </button>
      </div>

      {/* Stats Cards (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-2xl text-[#5D4291]">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Classes</p>
            <p className="text-2xl font-bold text-gray-800">{classes.length}</p>
          </div>
        </div>
      </div>

      {/* Classes Table */}
      <div className="bg-white rounded-[35px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Class Name</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Students</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Subjects</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {classes.map((cls) => (
              <tr key={cls.id} className="hover:bg-purple-50/30 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-[#5D4291] font-bold">
                      {cls.name.substring(0, 2)}
                    </div>
                    <span className="font-bold text-gray-700">{cls.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} className="text-gray-400" />
                    <span className="font-medium">{cls.students?.length || 0} Students</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen size={16} className="text-gray-400" />
                    <span className="font-medium">{cls.subjects?.length || 0} Subjects</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-[#5D4291] font-bold text-sm hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {classes.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No classes found. Start by adding one!
          </div>
        )}
      </div>
    </div>
  );
}