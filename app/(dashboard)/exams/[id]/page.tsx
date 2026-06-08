/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, DollarSign, Trophy, UserCheck, Clock, User, Award, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { authService } from "@/app/services/api.service";
import { toast } from "react-hot-toast";

export default function ExamDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Safe extraction mechanism context tracking
  const { id } = use(params);
  
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const checkTheme = () => setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchSingleExamDetails = async () => {
      try {
        setLoading(true);
        const response: any = await authService.getExamById(id);
        if (response.data?.success) {
          setExam(response.data.data);
        }
      } catch {
        toast.error("Failed to sync structural examination details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSingleExamDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-3">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-purple-500">Extracting individual node profile parameters...</p>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold mb-4">Exam parameters matrix not found inside records</p>
        <Link href="/exams" className="text-sm text-purple-500 hover:underline">Return to interface listing matrix</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 max-w-5xl mx-auto w-full transition-all duration-500">
      
      {/* Return Navigation controller button wrapper alignment */}
      <Link href="/exams" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 mb-8 group transition-colors">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Examination Dashboard
      </Link>

      {/* Main Container Card panel dashboard structure mapping layouts design wrapper views */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }}
        className="border rounded-[32px] p-6 md:p-8 shadow-sm dark:bg-white/5 dark:border-white/10 bg-white border-gray-100"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b dark:border-white/10 border-gray-100">
          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-purple-500/10 text-purple-500 tracking-wide mb-2 inline-block">Institutional Meta-Profile Data</span>
            <h1 className="text-2xl md:text-3xl font-extrabold dark:text-white text-gray-900">{exam.title}</h1>
          </div>
          <div className="text-right md:text-right">
            <p className="text-xs uppercase font-bold tracking-wider opacity-60 dark:text-white">Assigned Reference ID</p>
            <p className="text-xs font-mono select-all text-purple-500 font-bold mt-0.5">{exam.id}</p>
          </div>
        </div>

        {/* Informative Core Stats Blocks Layout integration view sheets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
          <div className="p-5 rounded-2xl dark:bg-white/5 bg-gray-50/50 border dark:border-white/5 border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500"><Calendar size={22} /></div>
            <div>
              <p className="text-xs opacity-60 dark:text-gray-400 text-gray-500">Schedule Date</p>
              <p className="text-base font-bold dark:text-white text-gray-900">{new Date(exam.examDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl dark:bg-white/5 bg-gray-50/50 border dark:border-white/5 border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500"><DollarSign size={22} /></div>
            <div>
              <p className="text-xs opacity-60 dark:text-gray-400 text-gray-500">Required Processing Fee</p>
              <p className="text-base font-bold dark:text-white text-gray-900">{exam.feeAmount} BDT</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl dark:bg-white/5 bg-gray-50/50 border dark:border-white/5 border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500"><Trophy size={22} /></div>
            <div>
              <p className="text-xs opacity-60 dark:text-gray-400 text-gray-500">Results Published Data</p>
              <p className="text-base font-bold dark:text-white text-gray-900">{exam.results?.length || 0} Students Logs</p>
            </div>
          </div>
        </div>

        {/* Inner Context list mapping component visualization cards stack */}
        <div>
          <h2 className="text-lg font-bold mb-4 dark:text-white text-gray-900 flex items-center gap-2">
            <UserCheck size={18} className="text-purple-500" />
            Student Performance Registry Records
          </h2>

          {!exam.results || exam.results.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-2xl dark:border-white/10 dark:text-gray-400 text-gray-500">
              <Clock className="mx-auto mb-2 text-purple-400 opacity-75" size={28} />
              <p className="text-sm">No localized exam records uploaded down this node timeline matrix architecture yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border dark:border-white/10 border-gray-100">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="dark:bg-white/5 bg-gray-50/70 dark:text-gray-400 text-gray-500 font-bold border-b dark:border-white/10 border-gray-100">
                    <th className="p-4">Student ID Parameter</th>
                    <th className="p-4">Subject Reference Mapping</th>
                    <th className="p-4 text-right">Secured Aggregates Scores</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-white/10 divide-gray-100 dark:text-gray-300 text-gray-700">
                  {exam.results.map((result: any) => (
                    <tr key={result.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-xs">{result.studentId}</td>
                      <td className="p-4 font-semibold">{result.subject}</td>
                      <td className="p-4 text-right font-bold text-purple-500">{result.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}