/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, Loader2, Plus, X } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function ClassesListPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await authService.getClasses();
      setClasses(res.data.data || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    try {
      setCreateLoading(true);
      await authService.createClass({ name: newClassName });
      setNewClassName("");
      setIsModalOpen(false);
      await fetchClasses(); 
      alert("Class created successfully!");
    } catch (error: any) {
      console.error("Create class error:", error);
      alert(error.response?.data?.message || "Failed to create class");
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading && classes.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5D4291] dark:text-purple-400" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 relative transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Classes</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D4291] dark:bg-purple-600 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-semibold hover:bg-[#4a3475] dark:hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 dark:shadow-none"
        >
          <Plus size={20} /> Create Class
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[35px] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Class Name</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Students</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {classes.map((cls) => (
              <tr key={cls.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                <td className="px-8 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-[#5D4291] dark:text-purple-400">
                    <GraduationCap size={20} />
                  </div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">{cls.name}</span>
                </td>
                <td className="px-8 py-5 text-gray-600 dark:text-gray-400 font-medium">
                  {cls.students?.length || 0} Students
                </td>
                <td className="px-8 py-5 text-right">
                  <Link 
                    href={`/admin/classes/${cls.id}`} 
                    className="text-[#5D4291] dark:text-purple-400 font-bold text-sm hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {classes.length === 0 && !loading && (
          <div className="p-10 text-center text-gray-400 dark:text-gray-500">No classes found. Create your first class!</div>
        )}
      </div>

      {/* Create Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Create New Class</h2>
            
            <form onSubmit={handleCreateClass} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Class Name</label>
                <input 
                  autoFocus
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. Class 10" 
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:text-white text-sm transition-all"
                  required
                />
              </div>

              <button 
                disabled={createLoading}
                type="submit"
                className="w-full bg-[#5D4291] dark:bg-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#4a3475] dark:hover:bg-purple-700 disabled:opacity-70 transition-all active:scale-[0.98]"
              >
                {createLoading ? (
                  <><Loader2 className="animate-spin" size={20} /> Creating...</>
                ) : (
                  "Create Class Now"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}