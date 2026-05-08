/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Users, BookOpen, ArrowLeft, Loader2 } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function ClassDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
      
        const res = await authService.getClassById(id as string);
        setClassData(res.data.data);
      } catch (error) {
        console.error("Error fetching class details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-[#5D4291]">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!classData) return <div className="p-10 text-center">Class data not found!</div>;

  return (
    <div className="space-y-8 p-4">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-3 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{classData.name} Details</h1>
          <p className="text-sm text-gray-500">Student and subject management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[35px] border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-2xl text-[#5D4291]"><Users size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Students</p>
            <p className="text-2xl font-bold text-gray-800">{classData.students?.length || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[35px] border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600"><BookOpen size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Subjects</p>
            <p className="text-2xl font-bold text-gray-800">{classData.subjects?.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[35px] border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Enrolled Students</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
            <tr>
              <th className="px-8 py-4">Name</th>
              <th className="px-8 py-4">Student ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {classData.students?.map((student: any) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-4 font-semibold text-gray-700">{student.name}</td>
                <td className="px-8 py-4 text-gray-400 text-sm">{student.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}