/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Loader2, Plus, X, School } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function SubjectsListPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", classId: "" });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subjectRes, classRes] = await Promise.all([
        authService.getSubjects(),
        authService.getClasses()
      ]);
      setSubjects(subjectRes.data.data || []);
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

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      await authService.createSubject(formData);
      setIsModalOpen(false);
      setFormData({ name: "", classId: "" });
      fetchData();
      alert("Subject created successfully!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create subject");
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading && subjects.length === 0) {
    return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#5D4291]" size={40} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Subjects</h1>
          <p className="text-sm text-gray-500">Manage curriculum by class</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D4291] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-purple-100 transition-all hover:bg-[#4a3475]"
        >
          <Plus size={20} /> Add Subject
        </button>
      </div>

      <div className="bg-white rounded-[35px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
            <tr>
              <th className="px-8 py-5">Subject Name</th>
              <th className="px-8 py-5">Assigned Class</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="px-8 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <BookOpen size={20} />
                  </div>
                  <span className="font-bold text-gray-700">{subject.name}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="flex items-center gap-2 text-gray-500 font-medium">
                    <School size={16} className="text-gray-400" />
                    {subject.class?.name}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <Link href={`/admin/subjects/${subject.id}`} className="text-[#5D4291] font-bold text-sm hover:underline">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Subject</h2>
            <form onSubmit={handleCreateSubject} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Subject Name</label>
                <input 
                  type="text" required placeholder="e.g. Physics"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Select Class</label>
                <select 
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm appearance-none"
                  onChange={(e) => setFormData({...formData, classId: e.target.value})}
                >
                  <option value="">Choose Class...</option>
                  {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <button 
                disabled={createLoading}
                className="w-full bg-[#5D4291] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#4a3475] disabled:opacity-70 transition-all"
              >
                {createLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Subject"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}