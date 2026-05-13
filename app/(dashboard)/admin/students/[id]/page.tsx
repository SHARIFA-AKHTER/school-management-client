/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, User, GraduationCap } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await authService.getStudentById(id as string);
        setStudent(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchStudent();
  }, [id]);

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#5D4291] dark:text-purple-400" size={40} />
    </div>
  );
  
  if (!student) return <div className="p-10 text-center dark:text-gray-300">Student not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 transition-colors duration-300">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#5D4291] dark:hover:text-purple-400 font-semibold transition-colors"
      >
        <ArrowLeft size={20} /> Back to List
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] p-10 border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-10 items-center">
        <div className="w-32 h-32 bg-purple-100 dark:bg-purple-900/30 rounded-[35px] flex items-center justify-center text-[#5D4291] dark:text-purple-400 text-4xl font-bold">
          {student.name.charAt(0)}
        </div>
        <div className="space-y-4 text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{student.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl text-gray-600 dark:text-gray-300 text-sm">
              <GraduationCap size={18} className="text-[#5D4291] dark:text-purple-400" /> {student.class?.name}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl text-gray-600 dark:text-gray-300 text-sm">
              <User size={18} className="text-[#5D4291] dark:text-purple-400" /> ID: {student.id.slice(0, 8)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[35px] border border-gray-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase text-xs tracking-widest opacity-70">Class Information</h3>
          <p className="text-lg font-bold text-gray-700 dark:text-gray-200">Current Grade: {student.class?.name}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Class ID: {student.classId}</p>
        </div>
      </div>
    </div>
  );
}