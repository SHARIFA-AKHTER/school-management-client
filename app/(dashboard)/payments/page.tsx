/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Suspense, useEffect, useState } from "react";
import { CreditCard, Plus, X, DollarSign, User, ShieldCheck, Calendar, CheckCircle2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePayments } from "./usePayments";

export function PaymentLedgerPage() {
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
    <div className="min-h-screen flex flex-col transition-all duration-500 bg-gray-50 dark:bg-[#0B0F19]">
      <div className="grow max-w-7xl mx-auto px-4 py-6 md:py-10 md:px-8 pb-24 w-full">

        {/* Upper Heading UI Block - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight dark:text-white text-gray-900">
              Payment Gateways Ledger
            </h1>
            <p className="text-xs md:text-sm mt-1 dark:text-gray-400 text-gray-500 max-w-xl">
              Trace online transactional records synced directly via SSLCommerz matrix protocols.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            <Plus size={18} /> Initialize Online Checkout
          </button>
        </div>

        {/* Conditional State Core Visualizer */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-indigo-500">Extracting live transaction logs data sheets...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl p-6 md:p-15 dark:border-white/10 bg-white dark:bg-white/5 border-gray-200">
            <div className="p-4 bg-indigo-500/10 text-indigo-500 rounded-full mb-4">
              <CreditCard size={36} />
            </div>
            <h3 className="text-xl font-bold mb-1 dark:text-white text-gray-800">Transaction Logs Clear</h3>
            <p className="text-sm text-gray-400 max-w-xs">No payment records found inside the dynamic gateway system matrix.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs mt-4 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-500 hover:text-white font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              Launch Gateways Portal Session
            </button>
          </div>
        ) : (
          <>
            {/* 📱 MOBILE & TABLET LAYOUT: Card Grid View (Hidden on Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mb-6">
              {payments.map((pay) => (
                <div
                  key={pay.id || pay.transactionId}
                  className="rounded-2xl p-5 border dark:border-white/10 border-gray-100 bg-white dark:bg-white/5 shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-slate-500/10 rounded-lg text-slate-400">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Student / Class</p>
                        <h4 className="font-semibold text-sm dark:text-white text-gray-800">
                          {pay.student?.name || "Academic Student"}
                        </h4>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${pay.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                      {pay.status}
                    </span>
                  </div>

                  <div className="border-t border-b dark:border-white/5 border-gray-50 py-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Purpose:</span>
                      <span className="font-semibold dark:text-gray-200 text-gray-700">{pay.purpose}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">TxID:</span>
                      <span className="font-mono text-indigo-400 font-bold select-all">{pay.transactionId}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Timestamp:</span>
                      <span className="dark:text-gray-300 text-gray-600">
                        {pay.paymentDate ? new Date(pay.paymentDate).toLocaleString('en-GB') : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-bold text-gray-400 uppercase">Amount</span>
                    <span className="font-extrabold text-indigo-500 text-lg">{pay.amount} BDT</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 💻 DESKTOP LAYOUT: Full Scale Table (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block overflow-hidden rounded-[24px] border dark:border-white/10 border-gray-100 dark:bg-white/5 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="dark:bg-white/5 bg-gray-50 dark:text-gray-400 text-gray-500 font-bold border-b dark:border-white/10 border-gray-100">
                      <th className="p-4 lg:p-5">Student Parameter</th>
                      <th className="p-4 lg:p-5">Purpose Reference</th>
                      <th className="p-4 lg:p-5">Gateway TxID</th>
                      <th className="p-4 lg:p-5">Timestamp logs</th>
                      <th className="p-4 lg:p-5">Verification Status</th>
                      <th className="p-4 lg:p-5 text-right">Amount value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-white/10 divide-gray-100 dark:text-gray-300 text-gray-700">
                    {payments.map((pay) => (
                      <tr key={pay.id || pay.transactionId} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4 lg:p-5 flex items-center gap-2.5">
                          <div className="p-1.5 bg-slate-500/10 rounded-lg text-slate-400">
                            <User size={14} />
                          </div>
                          <span className="font-medium">{pay.student?.name || "Student Core"}</span>
                        </td>
                        <td className="p-4 lg:p-5 font-semibold text-gray-800 dark:text-gray-200">{pay.purpose}</td>
                        <td className="p-4 lg:p-5 font-mono text-xs text-indigo-400 select-all font-bold">
                          {pay.transactionId}
                        </td>
                        <td className="p-4 lg:p-5 text-xs opacity-85">
                          {pay.paymentDate ? new Date(pay.paymentDate).toLocaleString('en-GB') : "N/A"}
                        </td>
                        <td className="p-4 lg:p-5">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${pay.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                            }`}>{pay.status}</span>
                        </td>
                        <td className="p-4 lg:p-5 text-right font-bold text-indigo-500 text-base">{pay.amount} BDT</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- SSLCOMMERZ POPUP MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md rounded-[28px] p-6 shadow-2xl z-10 border relative bg-white dark:bg-[#111827] border-gray-100 dark:border-gray-800 text-gray-900 dark:text-gray-100 my-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-extrabold flex items-center gap-2 text-gray-900 dark:text-white">
                  <DollarSign className="text-indigo-500" size={20} /> Secure SSLCommerz Desk
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreatePayment} className="space-y-4">
                {/* Input 1 */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 text-gray-500 dark:text-gray-400">Student Unique Token UUID</label>
                  <input
                    type="text"
                    required
                    placeholder="Paste targeted student's data id string"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Input 2 */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 text-gray-500 dark:text-gray-400">Purpose Reference Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Final Term Exam Registration Fee"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Input 3 */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 text-gray-500 dark:text-gray-400">Invoice Cost Amount (BDT)</label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Info Banner */}
                <div className="p-3 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-2xl border border-indigo-500/10 flex items-start gap-2 text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed">
                  <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                  <span>By confirming, a highly secure checkout transaction endpoint link will map dynamically via payment sandbox services.</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                  >
                    {submitting ? "Redirecting..." : "Proceed to Checkout"}
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
export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0B0F19]">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <PaymentLedgerPage />
    </Suspense>
  );
}