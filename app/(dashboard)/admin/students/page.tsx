/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Plus, X } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function StudentsListPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", classId: "" });
  const [createLoading, setCreateLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentRes, classRes] = await Promise.all([
        authService.getStudents(),
        authService.getClasses()
      ]);
      setStudents(studentRes.data.data || []);
      setClasses(classRes.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      await authService.createStudent(formData);
      setIsModalOpen(false);
      setFormData({ name: "", classId: "" });
      fetchData();
      alert("Student created successfully!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create student");
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5D4291] dark:text-purple-400" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Students Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D4291] dark:bg-purple-600 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-purple-100 dark:shadow-none hover:bg-[#4a3475] dark:hover:bg-purple-700 transition-all"
        >
          <Plus size={20} /> Add Student
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[35px] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-800/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
            <tr>
              <th className="px-8 py-5">Student Name</th>
              <th className="px-8 py-5">Class</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                <td className="px-8 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-[#5D4291] dark:text-purple-400 font-bold uppercase">
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">{student.name}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-[#5D4291] dark:text-purple-300 rounded-lg text-xs font-bold">
                    {student.class?.name || "No Class"}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <Link href={`/admin/students/${student.id}`} className="text-[#5D4291] dark:text-purple-400 font-bold text-sm hover:underline">
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && !loading && (
          <div className="p-10 text-center text-gray-400 dark:text-gray-500">No students found.</div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Add New Student</h2>
            
            <form onSubmit={handleCreateStudent} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter student name"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm dark:text-white"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Assign Class</label>
                <select 
                  required
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm appearance-none dark:text-white"
                  onChange={(e) => setFormData({...formData, classId: e.target.value})}
                >
                  <option value="" className="dark:bg-slate-900">Select Class</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id} className="dark:bg-slate-900">{c.name}</option>
                  ))}
                </select>
              </div>
              <button 
                disabled={createLoading}
                className="w-full bg-[#5D4291] dark:bg-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#4a3475] dark:hover:bg-purple-700 disabled:opacity-70 transition-all"
              >
                {createLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Student"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}