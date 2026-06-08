/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from "@/app/services/api.service";
import { useState, useEffect } from "react";
// এখানে নিশ্চিত হয়ে নিন আপনার এপিআই সার্ভিস অবজেক্টের নাম কী (apiService নাকি authService)
// আগের ফাইল অনুযায়ী এটি apiService হওয়ার কথা

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

  // ১. হিস্ট্রি লেজার ডাটা ফেচিং ফাংশন
  const fetchPayments = async () => {
    try {
      setLoading(true);
      // এখানে apiService কল করা হলো
      const response: any = await authService.getPayments();
      
      // পোস্টম্যান রেসপন্স স্ট্রাকচার (response.data.data) অনুযায়ী কন্ডিশন ফিক্সড
      if (response?.data?.success && Array.isArray(response?.data?.data)) {
        setPayments(response.data.data);
      } else if (Array.isArray(response?.data)) {
        setPayments(response.data);
      }
    } catch (error) {
      toast.error("Failed to load historical database ledgers");
    } finally {
      setLoading(false);
    }
  };

  // ২. পেমেন্ট ইনিশিয়েট ও রিডাইরেকশন হ্যান্ডলার
  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const { amount, purpose, studentId } = formData;

    if (!amount || !studentId || !purpose) {
      return toast.error("All input parameters are mandatory!");
    }

    try {
      setSubmitting(true);
      
      // এখানে authService.initiatePayment ব্যবহার করা হলো
      const response: any = await authService.initiatePayment({
        amount: Number(amount),
        purpose,
        studentId,
      });

      // ব্যাকএন্ড যদি সাকসেসফুলি সেশন ইউআরএল রিটার্ন করে
      // নোট: ব্যাকএন্ডের রেসপন্স অবজেক্টে যদি সরাসরি 'url' না থাকে, তবে response.data.data.url চেক করুন
      const redirectUrl = response?.data?.url || response?.data?.data?.gatewayUrl || response?.data?.data;

      if (redirectUrl) {
        toast.success("Redirecting to SSLCommerz Secure Gateway...");
        // উইন্ডো রিডাইরেকশন ট্রিগার
        window.location.href = redirectUrl;
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