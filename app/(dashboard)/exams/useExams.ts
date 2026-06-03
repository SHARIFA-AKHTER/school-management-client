/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { authService } from "@/app/services/api.service"; 
import { toast } from "react-hot-toast";

export const useExams = () => {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({ title: "", examDate: "", feeAmount: "" });

  const fetchExams = async () => {
    try {
      setLoading(true);
  
      const response = await authService.getExams();
      if (response.data.success) {
        setExams(response.data.data || []);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load examinations data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, examDate, feeAmount } = formData;
    if (!title || !examDate || !feeAmount) return toast.error("All fields are mandatory!");

    try {
      setSubmitting(true);
 
      const response = await authService.createExam({
        title,
        examDate,
        feeAmount: Number(feeAmount)
      });

      if (response.data.success) {
        toast.success("Exam scheduled successfully!");
        setIsModalOpen(false);
        setFormData({ title: "", examDate: "", feeAmount: "" }); 
        fetchExams();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed to record data");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { 
    fetchExams(); 
  }, []);

  return {
    exams, loading, isModalOpen, setIsModalOpen,
    formData, setFormData, submitting, handleCreateExam
  };
};