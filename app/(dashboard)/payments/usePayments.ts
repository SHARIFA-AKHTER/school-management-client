/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { authService } from "@/app/services/api.service";
// import { useState, useEffect } from "react";

// import { toast } from "react-hot-toast";

// export const usePayments = () => {
//   const [payments, setPayments] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [submitting, setSubmitting] = useState<boolean>(false);

//   const [formData, setFormData] = useState({
//     amount: "",
//     purpose: "Exam Fee",
//     studentId: "",
//   });

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);

//       const response: any = await authService.getPayments();

//       if (response?.data?.success && Array.isArray(response?.data?.data)) {
//         setPayments(response.data.data);
//       } else if (Array.isArray(response?.data)) {
//         setPayments(response.data);
//       }
//     } catch (error) {
//       toast.error("Failed to load historical database ledgers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreatePayment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { amount, purpose, studentId } = formData;

//     if (!amount || !studentId || !purpose) {
//       return toast.error("All input parameters are mandatory!");
//     }

//     try {
//       setSubmitting(true);

//       const response: any = await authService.initiatePayment({
//         amount: Number(amount),
//         purpose,
//         studentId,
//       });

//       const redirectUrl = response?.data?.url || response?.data?.data?.gatewayUrl || response?.data?.data;

//       if (redirectUrl) {
//         toast.success("Redirecting to SSLCommerz Secure Gateway...");

//         window.location.href = redirectUrl;
//       } else {
//         toast.error("Failed to fetch gateway deployment session url");
//       }
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message || "Internal core server transaction handshake error"
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   return {
//     payments,
//     loading,
//     isModalOpen,
//     setIsModalOpen,
//     formData,
//     setFormData,
//     submitting,
//     handleCreatePayment,
//     refetchPayments: fetchPayments
//   };
// };

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from "@/app/services/api.service";
import { useState, useEffect } from "react";
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
