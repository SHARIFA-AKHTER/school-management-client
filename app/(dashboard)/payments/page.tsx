
"use client";

import { useEffect, useState } from "react";
import { CreditCard, Plus, X, DollarSign, User, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePayments } from "./usePayments";

export default function PaymentLedgerPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { 
    payments, loading, isModalOpen, setIsModalOpen, 
    formData, setFormData, submitting, handleCreatePayment 
  } = usePayments();

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
        
        {/* Upper Heading UI block wrapper section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight dark:text-white text-gray-900">Payment Gateways Ledger</h1>
            <p className="text-sm mt-1 dark:text-gray-400 text-gray-500">Trace online transactional records synced directly via SSLCommerz matrix protocols.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all">
            <Plus size={18} /> Initialize Online Checkout
          </button>
        </div>

        {/* Conditional state visualization matrix loader cards block layouts */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-indigo-500">Extracting live transaction logs data sheets...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl p-8 dark:border-white/10 bg-white/5 border-gray-200 bg-white">
            <div className="p-4 bg-indigo-500/10 text-indigo-500 rounded-full mb-4"><CreditCard size={36} /></div>
            <h3 className="text-xl font-bold mb-1 dark:text-white">Transaction Logs Clear</h3>
            <button onClick={() => setIsModalOpen(true)} className="text-xs mt-4 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-500 hover:text-white font-bold px-4 py-2 rounded-xl transition-all">Launch Gateways Portal Session</button>
          </div>
        ) : (
          /* Responsive Layout Main Table System List view */
          <div className="overflow-x-auto rounded-[24px] border dark:border-white/10 border-gray-100 dark:bg-white/5 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="dark:bg-white/5 bg-gray-50 dark:text-gray-400 text-gray-500 font-bold border-b dark:border-white/10 border-gray-100">
                  <th className="p-4">Student Parameter</th>
                  <th className="p-4">Purpose Reference</th>
                  <th className="p-4">Gateway TxID</th>
                  <th className="p-4">Timestamp logs</th>
                  <th className="p-4">Verification Status</th>
                  <th className="p-4 text-right">Amount value</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-white/10 divide-gray-100 dark:text-gray-300 text-gray-700">
                {payments.map((pay) => (
                  <tr key={pay.id || pay.transactionId} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-500/10 rounded-lg text-slate-400"><User size={14} /></div>
                      <span className="font-mono text-xs">{pay.student?.name || pay.studentId}</span>
                    </td>
                    <td className="p-4 font-semibold">{pay.purpose}</td>
                    <td className="p-4 font-mono text-xs text-indigo-400 select-all font-bold">
                      {pay.transactionId || pay.tran_id}
                    </td>
                    <td className="p-4 text-xs opacity-85">
                      {pay.createdAt || pay.paymentDate 
                        ? new Date(pay.createdAt || pay.paymentDate).toLocaleString('en-GB') 
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        pay.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>{pay.status}</span>
                    </td>
                    <td className="p-4 text-right font-bold text-indigo-500 text-base">{pay.amount} BDT</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- SSLCOMMERZ TRANSACTION CONTROL SESSION POPUP MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="w-full max-w-md rounded-[32px] p-6 shadow-2xl z-10 border relative dark:bg-[#0F172A] dark:border-white/10 bg-white border-gray-100 text-gray-900 dark:text-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-extrabold flex items-center gap-2"><DollarSign className="text-indigo-500" size={20} /> Secure SSLCommerz Desk</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10"><X size={18} /></button>
              </div>
              
              <form onSubmit={handleCreatePayment} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-75">Student Unique Token UUID</label>
                  <input type="text" required placeholder="Paste targeted student's data id string" value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all dark:bg-white/5 dark:border-white/10 dark:focus:border-indigo-500 bg-gray-50 border-gray-200 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-75">Purpose Reference Description</label>
                  <input type="text" required placeholder="e.g., Final Term Exam Registration Fee" value={formData.purpose} onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all dark:bg-white/5 dark:border-white/10 dark:focus:border-indigo-500 bg-gray-50 border-gray-200 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-75">Invoice Cost Amount (BDT)</label>
                  <input type="number" required placeholder="1500" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all dark:bg-white/5 dark:border-white/10 dark:focus:border-indigo-500 bg-gray-50 border-gray-200 focus:border-indigo-500" />
                </div>

                <div className="p-3 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-start gap-2 text-xs text-indigo-400 opacity-90 leading-relaxed">
                  <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                  <span>By confirming, a highly secure checkout transaction endpoint link will map dynamically via payment sandbox services.</span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-sm dark:bg-white/5 dark:hover:bg-white/10 bg-gray-100 hover:bg-gray-200">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all">
                    {submitting ? "Redirecting session..." : "Proceed to Checkout"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}