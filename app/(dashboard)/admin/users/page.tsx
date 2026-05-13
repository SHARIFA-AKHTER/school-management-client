
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Edit,
  Plus,
  Loader2,
  Users,
  Mail,
  Shield,
} from "lucide-react";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/users`);
      if (res.data.success && res.data.data) {
        setUsers(res.data.data[0] || []);
      }
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setProcessingId(id);
    try {
      await axios.delete(`${API_URL}/auth/users/${id}`);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      toast.error("Could not delete user");
    } finally {
      setProcessingId(null);
    }
  };

  const onUpdate = async (user: User) => {
    const newName = prompt("Enter new name:", user.name);
    if (!newName || newName === user.name) return;
    try {
      await axios.patch(`${API_URL}/auth/users/${user.id}`, { name: newName });
      toast.success("User updated!");
      fetchUsers();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const onAddUser = async () => {
    const name = prompt("Enter Name:");
    const email = prompt("Enter Email:");
    if (!name || !email) return;
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        role: "STUDENT",
        password: "123456",
      });
      toast.success("User added successfully!");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to add user");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
        <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400" size={45} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-500">
      
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            User Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage all registered users professionally
          </p>
        </div>

        <button
          onClick={onAddUser}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Users", val: users.length, icon: Users, color: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400" },
          { label: "Emails", val: "Active", icon: Mail, color: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
          { label: "Roles", val: "Managed", icon: Shield, color: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400" }
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.val}</h2>
              </div>
              <div className={`rounded-xl ${stat.color} p-3 ${stat.text}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg lg:block transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Role</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800 transition hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-5">
                    <div>
                      <h2 className="font-semibold uppercase text-slate-800 dark:text-slate-200">{user.name}</h2>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 lowercase">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => onUpdate(user)} className="rounded-xl bg-indigo-50 dark:bg-indigo-900/40 p-2.5 text-indigo-600 dark:text-indigo-300 transition hover:bg-indigo-100 dark:hover:bg-indigo-900/60">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => onDelete(user.id)} 
                        disabled={processingId === user.id}
                        className="rounded-xl bg-red-50 dark:bg-red-900/40 p-2.5 text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-900/60 disabled:opacity-50"
                      >
                        {processingId === user.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {users.map((user) => (
          <div key={user.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h2 className="text-lg font-bold uppercase text-slate-800 dark:text-slate-100">{user.name}</h2>
                <p className="mt-1 break-all text-sm lowercase text-slate-500 dark:text-slate-400">{user.email}</p>
                <div className="mt-4">
                  <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onUpdate(user)} className="rounded-xl bg-indigo-50 dark:bg-indigo-900/40 p-2.5 text-indigo-600 dark:text-indigo-300">
                  <Edit size={18} />
                </button>
                <button onClick={() => onDelete(user.id)} disabled={processingId === user.id} className="rounded-xl bg-red-50 dark:bg-red-900/40 p-2.5 text-red-600 dark:text-red-400">
                  {processingId === user.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}