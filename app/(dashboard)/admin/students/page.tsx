/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {  Loader2, Plus, X } from "lucide-react";
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
    return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#5D4291]" size={40} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Students Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D4291] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-purple-100"
        >
          <Plus size={20} /> Add Student
        </button>
      </div>

      <div className="bg-white rounded-[35px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
            <tr>
              <th className="px-8 py-5">Student Name</th>
              <th className="px-8 py-5">Class</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="px-8 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-[#5D4291] font-bold uppercase">
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-700">{student.name}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-purple-100 text-[#5D4291] rounded-lg text-xs font-bold">
                    {student.class?.name || "No Class"}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <Link href={`/admin/students/${student.id}`} className="text-[#5D4291] font-bold text-sm hover:underline">
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Student</h2>
            <form onSubmit={handleCreateStudent} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter student name"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Assign Class</label>
                <select 
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm appearance-none"
                  onChange={(e) => setFormData({...formData, classId: e.target.value})}
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <button 
                disabled={createLoading}
                className="w-full bg-[#5D4291] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#4a3475] disabled:opacity-70 transition-all"
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