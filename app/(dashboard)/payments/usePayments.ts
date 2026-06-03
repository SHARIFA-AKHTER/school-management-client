/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { authService } from "@/app/services/api.service";
import { toast } from "react-hot-toast";

export const usePayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    amount: "",
    purpose: "Exam Fee",
    studentId: "",
  });

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response: any = await authService.getPayments();
      // ব্যাকএন্ড যদি ডিরেক্ট অ্যারে অথবা অবজেক্টের ভেতর ডেটা পাঠায় তার সেফটি হ্যান্ডেলিং
      if (response?.data?.success) {
        setPayments(response.data.data || []);
      } else if (Array.isArray(response?.data)) {
        setPayments(response.data);
      }
    } catch {
      toast.error("Failed to load historical database ledgers");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const { amount, purpose, studentId } = formData;

    if (!amount || !studentId || !purpose) {
      return toast.error("All input parameters are mandatory!");
    }

    try {
      setSubmitting(true);
      
      // ব্যাকএন্ড Zod Schema ভ্যালিডেশনের সাথে হুবহু মিল রেখে ডেটা পাঠানো হচ্ছে
      const response: any = await authService.initiatePayment({
        amount: Number(amount),
        purpose,
        studentId,
      });

      // আপনার ব্যাকএন্ডের জেনারেট করা সাকসেস এবং ইউআরএল রেসপন্স হ্যান্ডেলিং
      if (response?.data?.success && response?.data?.url) {
        toast.success("Redirecting to SSLCommerz Secure Gateway...");
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to fetch gateway deployment session url");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Internal core server transaction handshake error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    payments,
    loading,
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    submitting,
    handleCreatePayment,
    refetchPayments: fetchPayments 
  };
};