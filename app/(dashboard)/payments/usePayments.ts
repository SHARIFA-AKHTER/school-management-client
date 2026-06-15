/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from "@/app/services/api.service";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const usePayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "Exam Fee",
    studentId: "",
  });

  useEffect(()=>{
    const status = searchParams.get("status");
    const trx = searchParams.get("trx");
    if (status ==="success") {
      toast.success(`Payment completed successfully!" TrxID: ${trx}`,{
            duration: 5000
      });
      window.history.replaceState({}, document.title, window.location.pathname)
    }else if (status === "fail"){
      toast.error("Payment failed! please try again." );
      window.history.replaceState({}, document.title, window.location.pathname)
    }else if (status === "cancel") {
      toast.error("Payment cancelled by user." );
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams])

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response: any = await authService.getPayments();

      if (response?.data?.success && Array.isArray(response?.data?.data)) {
        setPayments(response.data.data);
      } else if (Array.isArray(response?.data)) {
        setPayments(response.data);
      }
    } catch (error) {
      toast.error("Failed to load transaction records");
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

      const res = await authService.initiatePayment({
        amount: Number(amount),
        purpose,
        studentId,
      });

      const redirectUrl = res?.data?.url || res?.data?.data?.url || res?.url;

      if (redirectUrl) {
        toast.success("Redirecting to SSLCommerz Secure Gateway...");
   
        window.location.replace(redirectUrl); 
      } else {
        toast.error("Gateway deployment session URL not found in response");
      }
    } catch (error: any) {
      console.error("Payment error detail:", error);
  
      const errorMessage = error?.response?.data?.message || error?.message || "Internal core server transaction handshake error";
      toast.error(errorMessage);
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
    refetchPayments: fetchPayments,
  };
};
