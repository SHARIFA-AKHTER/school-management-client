/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, CalendarClock } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function AttendanceDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdData = async () => {
      try {
        const res = await authService.getAttendanceById(id as string);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIdData();
  }, [id]);

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#5D4291]" size={40} /></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-[#5D4291]">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
             <h2 className="text-3xl font-bold text-gray-800">{data?.student?.name}</h2>
             <p className="text-gray-400 font-medium">{data?.student?.class?.name}</p>
          </div>
          <div className={`px-4 py-2 rounded-2xl font-bold text-xs ${
            data?.status === "PRESENT" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}>
            {data?.status}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <CalendarClock className="text-[#5D4291]" />
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Record Date</p>
              <p className="font-semibold text-gray-700">{new Date(data?.date).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}