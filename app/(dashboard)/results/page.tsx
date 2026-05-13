/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Loader2, Plus, X, GraduationCap, BookOpen } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function ResultsListPage() {
  const [results, setResults] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formData, setFormData] = useState({ studentId: "", subject: "", marks: "" });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resData, studentData, subjectData] = await Promise.all([
        authService.getResults(),
        authService.getStudents(),
        authService.getSubjects()
      ]);
      setResults(resData.data.data || []);
      setStudents(studentData.data.data || []);
      setSubjects(subjectData.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      await authService.addResult({
        ...formData,
        marks: Number(formData.marks)
      });
      setIsModalOpen(false);
      setFormData({ studentId: "", subject: "", marks: "" });
      fetchData();
      alert("Result added successfully!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add result");
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading && results.length === 0) {
    return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#5D4291] dark:text-purple-400" size={40} /></div>;
  }

  return (
    <div className="space-y-6 transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Academic Results</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and view student performance</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D4291] dark:bg-purple-600 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-purple-100 dark:shadow-none hover:bg-[#4a3475] dark:hover:bg-purple-700 transition-all"
        >
          <Plus size={20} /> Add Result
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[35px] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
              <tr>
                <th className="px-8 py-5">Student</th>
                <th className="px-8 py-5">Subject</th>
                <th className="px-8 py-5">Marks</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {results.map((res) => (
                <tr key={res.id} className="hover:bg-purple-50/20 dark:hover:bg-purple-900/10 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-[#5D4291] dark:text-purple-400">
                        <GraduationCap size={16} />
                      </div>
                      <span className="font-bold text-gray-700 dark:text-gray-200">{res.student?.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {res.subject}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`font-black ${res.marks >= 80 ? 'text-green-500 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {res.marks}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link href={`/results/${res.id}`} className="text-[#5D4291] dark:text-purple-400 font-bold text-sm hover:underline">
                      View Card
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Result Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-500" /> Post New Result
            </h2>
            <form onSubmit={handleAddResult} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Student</label>
                <select 
                  required className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm dark:text-gray-200"
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                >
                  <option value="" className="dark:bg-slate-900">Select Student</option>
                  {students.map((s) => <option key={s.id} value={s.id} className="dark:bg-slate-900">{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Subject</label>
                <select 
                  required className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm dark:text-gray-200"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="" className="dark:bg-slate-900">Select Subject</option>
                  <option value="English" className="dark:bg-slate-900">English</option>
                  <option value="Bangla" className="dark:bg-slate-900">Bangla</option>
                  <option value="Maths" className="dark:bg-slate-900">Maths</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Marks Obtained</label>
                <input 
                  type="number" required max="100" placeholder="e.g. 95"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm dark:text-gray-200 placeholder-gray-400"
                  onChange={(e) => setFormData({...formData, marks: e.target.value})}
                />
              </div>
              <button 
                disabled={createLoading}
                className="w-full bg-[#5D4291] dark:bg-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#4a3475] dark:hover:bg-purple-700 disabled:opacity-70 transition-all mt-4"
              >
                {createLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Publish Result"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}