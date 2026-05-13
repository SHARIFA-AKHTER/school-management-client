
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Trophy, Star, User, BookOpen, Download } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function ResultDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await authService.getResults();
        
        if (res.data?.success) {
          const allResults = res.data.data;
          const singleResult = allResults.find((item: any) => item.id === id);
          setResult(singleResult);
        }
      } catch (err) {
        console.error("Error fetching result:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResult();
  }, [id]);

  const handleDownloadJSON = () => {
    if (!result) return;
    
    const fileName = `${result.student?.name || "result"}_${result.subject}.json`;
    const jsonString = JSON.stringify(result, null, 2); 
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); 
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5D4291] dark:text-purple-400" size={40} />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl m-6 shadow-sm border border-gray-100 dark:border-slate-800">
        <p className="text-gray-500 dark:text-gray-400 font-bold">Result not found for ID: {id}</p>
        <button onClick={() => router.back()} className="text-[#5D4291] dark:text-purple-400 underline mt-4 font-bold">
          Go Back
        </button>
      </div>
    );
  }

  const isPassed = result.marks >= 40;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4 animate-in fade-in duration-500 transition-colors">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#5D4291] dark:hover:text-purple-400 font-bold group transition-all"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>


        <button 
          onClick={handleDownloadJSON}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-[#5D4291] hover:text-white dark:hover:bg-purple-600 transition-all rounded-xl text-sm font-bold border border-gray-200 dark:border-slate-700 shadow-sm"
        >
          <Download size={16} /> JSON Download
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden border border-gray-100 dark:border-slate-800 shadow-2xl transition-all">
        <div className="bg-[#5D4291] dark:bg-purple-900/50 p-10 text-center text-white relative">
          <div className="absolute top-4 right-6 opacity-20"><Trophy size={80} /></div>
          <Trophy className="mx-auto text-yellow-400 mb-3 drop-shadow-md" size={50} />
          <h2 className="text-2xl font-black uppercase tracking-widest">Academic Session 2026</h2>
        </div>
        
        <div className="p-10 space-y-8">
          {/* Student Info */}
          <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-[30px] border border-gray-100 dark:border-slate-800">
            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm text-[#5D4291] dark:text-purple-400">
              <User size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[2px]">Student Name</p>
              <p className="text-2xl font-black text-gray-800 dark:text-gray-100">
                {result.student?.name}
              </p>
            </div>
          </div>

          {/* Subject & Score */}
          <div className="grid grid-cols-2 gap-6 pb-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Subject</p>
              <div className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-200 text-xl">
                <BookOpen size={20} className="text-blue-500 dark:text-blue-400" /> 
                {result.subject}
              </div>
            </div>
            
            <div className="space-y-1 text-right">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Total Score</p>
              <div className="flex items-center justify-end gap-1 font-black text-4xl text-[#5D4291] dark:text-purple-400">
                <Star size={24} className="fill-yellow-400 text-yellow-400" />
                {result.marks} <span className="text-lg text-gray-300 dark:text-gray-600 font-medium">/100</span>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="pt-8 border-t border-dashed border-gray-200 dark:border-slate-700 text-center">
            <div className={`inline-block px-14 py-4 rounded-full font-black text-xl tracking-widest shadow-md transform hover:scale-105 transition-transform ${
              isPassed ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {isPassed ? "PASSED" : "FAILED"}
            </div>
            <div className="mt-6">
               <p className="text-[10px] text-gray-300 dark:text-gray-600 uppercase font-bold">Report ID</p>
               <p className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">{result.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}