/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, DollarSign, Plus, Trophy, Clock, FileText, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useExams } from "./useExams";

export default function ExamManagementPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { 
    exams, loading, isModalOpen, setIsModalOpen, 
    formData, setFormData, submitting, handleCreateExam 
  } = useExams();


  useEffect(() => {
    const checkTheme = () => setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-all duration-500">
      <div className="flex-grow max-w-7xl mx-auto px-4 py-8 md:px-8 pb-20 w-full">
        
        {/* Header Block UI styling section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight dark:text-white text-gray-900">Exam Management</h1>
            <p className="text-sm mt-1 dark:text-gray-400 text-gray-500">Schedule exams, specify dynamic fee systems, and map tracking controls.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-2xl transition-all font-bold text-sm shadow-lg shadow-purple-500/20">
            <Plus size={18} /> Schedule New Exam
          </button>
        </div>

        {/* Dynamic loading conditional rendering logic maps */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-purple-500">Syncing database via Axios client...</p>
          </div>
        ) : exams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl p-8 dark:border-white/10 bg-white/5 border-gray-200 bg-white">
            <div className="p-4 bg-purple-500/10 text-purple-500 rounded-full mb-4"><FileText size={36} /></div>
            <h3 className="text-xl font-bold mb-1 dark:text-white">No Exam Scheduled Yet</h3>
            <p className="text-sm max-w-xs mb-6 dark:text-gray-400 text-gray-500">Create parameters to trace data seamlessly inside SaaS matrix logic.</p>
            <button onClick={() => setIsModalOpen(true)} className="text-xs bg-purple-600/10 hover:bg-purple-600 text-purple-500 hover:text-white font-bold px-4 py-2 rounded-xl transition-all">Add First Exam Setup</button>
          </div>
        ) : (
          /* Cards Grid Area */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} key={exam.id} className="border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group dark:bg-white/5 dark:border-white/10 bg-white border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all"><Calendar size={22} /></div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase bg-emerald-500/10 text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Active</span>
                </div>
                <h3 className="text-lg font-bold mb-3 truncate dark:text-white text-gray-900">{exam.title}</h3>
                <div className="space-y-2.5 text-sm dark:text-gray-400 text-gray-600">
                  <div className="flex items-center gap-2"><Clock size={15} className="text-purple-500" /><span>{new Date(exam.examDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                  <div className="flex items-center gap-2 font-semibold"><DollarSign size={15} className="text-purple-500" /><span>Fee: <strong className="dark:text-white text-gray-900">{exam.feeAmount} BDT</strong></span></div>
                </div>
                <div className="mt-6 pt-5 border-t flex justify-between items-center dark:border-white/10 border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs opacity-75 dark:text-gray-400"><Trophy size={14} className="text-amber-500" /><span>{exam.results?.length || 0} Records Logged</span></div>
                  <Link href={`/exams/${exam.id}`} className="text-purple-500 text-sm font-bold hover:underline">Details</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- ADD NEW EXAM MODAL DIALOG POPUP --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="w-full max-w-md rounded-[32px] p-6 shadow-2xl z-10 border relative dark:bg-[#0F172A] dark:border-white/10 text-gray-900 dark:text-white bg-white border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-extrabold">Schedule Academic Exam</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10"><X size={18} /></button>
              </div>
              <form onSubmit={handleCreateExam} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-75">Exam Title</label>
                  <input type="text" placeholder="e.g., Final Term Examination" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all dark:bg-white/5 dark:border-white/10 dark:focus:border-purple-500 dark:text-white bg-gray-50 border-gray-200 focus:border-purple-500" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-75">Exam Date</label>
                    <input type="date" value={formData.examDate} onChange={(e) => setFormData({ ...formData, examDate: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all dark:bg-white/5 dark:border-white/10 dark:focus:border-purple-500 dark:text-white bg-gray-50 border-gray-200 focus:border-purple-500 scheme-dark" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-75">Fee Amount (BDT)</label>
                    <input type="number" placeholder="500" value={formData.feeAmount} onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all dark:bg-white/5 dark:border-white/10 dark:focus:border-purple-500 dark:text-white bg-gray-50 border-gray-200 focus:border-purple-500" />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-sm dark:bg-white/5 dark:hover:bg-white/10 bg-gray-100 hover:bg-gray-200">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20">{submitting ? "Processing..." : "Confirm Schedule"}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}