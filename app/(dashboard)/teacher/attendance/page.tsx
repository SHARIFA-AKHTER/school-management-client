/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Calendar, Loader2, Plus, X, UserCheck } from "lucide-react";
import { authService } from "@/app/services/api.service";

export default function AttendancePage() {
  const [records, setRecords] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    status: "PRESENT",
    date: new Date().toISOString().split('T')[0]
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [attendanceRes, studentRes] = await Promise.all([
        authService.getAttendances(),
        authService.getStudents()
      ]);
      setRecords(attendanceRes.data.data || []);
      setStudents(studentRes.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTakeAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId) return alert("Please select a student");

    try {
      setCreateLoading(true);
      await authService.takeAttendance({
        ...formData,
        date: new Date(formData.date).toISOString()
      });

      setIsModalOpen(false);
      setFormData({ studentId: "", status: "PRESENT", date: new Date().toISOString().split('T')[0] });
      await fetchData();
      alert("Attendance recorded successfully!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to take attendance");
    } finally {
      setCreateLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PRESENT": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "ABSENT": return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      case "LATE": return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
      default: return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  if (loading && records.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5D4291] dark:text-purple-400" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Attendance Records</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track daily student presence</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D4291] dark:bg-purple-600 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-purple-100 dark:shadow-none hover:bg-[#4a3475] dark:hover:bg-purple-700 transition-all"
        >
          <Plus size={20} /> Take Attendance
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[35px] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
              <tr>
                <th className="px-8 py-5">Student</th>
                <th className="px-8 py-5">Class</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-purple-50/20 dark:hover:bg-purple-900/10 transition-colors text-sm">
                  <td className="px-8 py-5">
                    <span className="font-bold text-gray-700 dark:text-gray-200">{record.student?.name}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">{record.student?.class?.name}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                      <Calendar size={14} />
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${getStatusStyle(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {records.length === 0 && !loading && (
          <div className="p-10 text-center text-gray-400 dark:text-gray-500">No records found.</div>
        )}
      </div>

      {/* Take Attendance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <UserCheck className="text-[#5D4291] dark:text-purple-400" /> Take Attendance
            </h2>

            <form onSubmit={handleTakeAttendance} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Select Student</label>
                <select
                  required
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm appearance-none dark:text-gray-200"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                >
                  <option value="" className="dark:bg-slate-900">Choose a student...</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id} className="dark:bg-slate-900">{s.name} ({s.class?.name})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {["PRESENT", "ABSENT", "LATE"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({ ...formData, status })}
                      className={`py-3 rounded-xl text-[10px] font-bold transition-all border ${
                        formData.status === status
                          ? 'bg-[#5D4291] dark:bg-purple-600 text-white border-[#5D4291] dark:border-purple-600'
                          : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none text-sm dark:text-gray-200"
                />
              </div>

              <button
                disabled={createLoading}
                className="w-full bg-[#5D4291] dark:bg-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#4a3475] dark:hover:bg-purple-700 disabled:opacity-70 transition-all"
              >
                {createLoading ? <Loader2 className="animate-spin" size={20} /> : "Submit Attendance"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}