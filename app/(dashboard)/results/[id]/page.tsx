// /* eslint-disable react/jsx-no-undef */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { ArrowLeft, Loader2, Trophy, Star, User, BookOpen } from "lucide-react";
// import { authService } from "@/app/services/api.service";

// export default function ResultDetailsPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResult = async () => {
//       try {
//         const res = await authService.getResultById(id as string);
//         setResult(res.data.data);
//       } catch (err) { console.error(err); } 
//       finally { setLoading(false); }
//     };
//     if (id) fetchResult();
//   }, [id]);

//   if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#5D4291]" size={40} /></div>;

//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-[#5D4291] font-bold">
//         <ArrowLeft size={20} /> Back to Results
//       </button>

//       <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-xl">
//         <div className="bg-[#5D4291] p-10 text-center text-white space-y-2">
//           <Trophy className="mx-auto text-yellow-400 mb-2" size={48} />
//           <h2 className="text-3xl font-black uppercase tracking-widest">Mark Sheet</h2>
//           <p className="opacity-80 font-medium">Academic Session 2026</p>
//         </div>
        
//         <div className="p-10 space-y-8">
//           <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-[30px]">
//             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
//               <User className="text-[#5D4291]" />
//             </div>
//             <div>
//               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Student Name</p>
//               <p className="text-xl font-bold text-gray-800">{result?.student?.name}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div className="space-y-1">
//               <p className="text-xs font-bold text-gray-400 uppercase">Subject</p>
//               <div className="flex items-center gap-2 font-bold text-gray-700">
//                 <BookOpen size={18} className="text-blue-500" /> {result?.subject}
//               </div>
//             </div>
//             <div className="space-y-1 text-right">
//               <p className="text-xs font-bold text-gray-400 uppercase">Score</p>
//               <div className="flex items-center justify-end gap-2 font-black text-2xl text-[#5D4291]">
//                 <Star size={20} className="fill-yellow-400 text-yellow-400" /> {result?.marks}/100
//               </div>
//             </div>
//           </div>

//           <div className="pt-6 border-t border-dashed border-gray-200 text-center">
//             <span className={`px-6 py-2 rounded-full font-black text-sm ${
//               result?.marks >= 40 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
//             }`}>
//               {result?.marks >= 40 ? "PASSED" : "FAILED"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Trophy, Star, User, BookOpen } from "lucide-react";
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
        const res = await authService.getResults(); // সব রেজাল্ট নিয়ে আসা
        
        if (res.data?.success) {
          // URL-এর ID-র সাথে মিল আছে এমন রেজাল্ট ফিল্টার করে বের করা
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

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5D4291]" size={40} />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl m-6 shadow-sm">
        <p className="text-gray-500 font-bold">Result not found for ID: {id}</p>
        <button onClick={() => router.back()} className="text-[#5D4291] underline mt-4 font-bold">
          Go Back
        </button>
      </div>
    );
  }

  // আপনার JSON অনুযায়ী 95, 98 মার্কস আছে, তাই এটি অবশ্যই PASSED হবে
  const isPassed = result.marks >= 40;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4 animate-in fade-in duration-500">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-gray-500 hover:text-[#5D4291] font-bold group transition-all"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl">
        <div className="bg-[#5D4291] p-10 text-center text-white relative">
          <div className="absolute top-4 right-6 opacity-20"><Trophy size={80} /></div>
          <Trophy className="mx-auto text-yellow-400 mb-3 drop-shadow-md" size={50} />
          <h2 className="text-2xl font-black uppercase tracking-widest">Academic Session 2026</h2>
        </div>
        
        <div className="p-10 space-y-8">
          {/* Student Info */}
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-[30px] border border-gray-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#5D4291]">
              <User size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">Student Name</p>
              <p className="text-2xl font-black text-gray-800">
                {result.student?.name}
              </p>
            </div>
          </div>

          {/* Subject & Score */}
          <div className="grid grid-cols-2 gap-6 pb-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase">Subject</p>
              <div className="flex items-center gap-2 font-bold text-gray-700 text-xl">
                <BookOpen size={20} className="text-blue-500" /> 
                {result.subject}
              </div>
            </div>
            
            <div className="space-y-1 text-right">
              <p className="text-xs font-bold text-gray-400 uppercase">Total Score</p>
              <div className="flex items-center justify-end gap-1 font-black text-4xl text-[#5D4291]">
                <Star size={24} className="fill-yellow-400 text-yellow-400" />
                {result.marks} <span className="text-lg text-gray-300 font-medium">/100</span>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="pt-8 border-t border-dashed border-gray-200 text-center">
            <div className={`inline-block px-14 py-4 rounded-full font-black text-xl tracking-widest shadow-md transform hover:scale-105 transition-transform ${
              isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {isPassed ? "PASSED" : "FAILED"}
            </div>
            <div className="mt-6">
               <p className="text-[10px] text-gray-300 uppercase font-bold">Report ID</p>
               <p className="text-[11px] text-gray-400 font-mono">{result.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}