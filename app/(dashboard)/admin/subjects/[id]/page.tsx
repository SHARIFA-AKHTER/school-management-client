/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Book, Hash, Layers } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function SubjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await authService.getSubjectById(id as string);
        setSubject(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSubject();
  }, [id]);

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#5D4291]" size={40} /></div>;
  if (!subject) return <div className="p-10 text-center">Subject not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-[#5D4291] font-semibold transition-colors">
        <ArrowLeft size={20} /> Back to Subjects
      </button>

      <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 bg-blue-50 rounded-[25px] flex items-center justify-center text-blue-600">
            <Book size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{subject.name}</h1>
            <p className="text-[#5D4291] font-semibold">Part of {subject.class?.name} Curriculum</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-gray-50 rounded-3xl flex items-center gap-4">
            <Layers className="text-gray-400" size={24} />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Class Name</p>
              <p className="font-bold text-gray-700">{subject.class?.name}</p>
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-3xl flex items-center gap-4">
            <Hash className="text-gray-400" size={24} />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Subject ID</p>
              <p className="text-sm font-medium text-gray-600">{subject.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}