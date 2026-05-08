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
      await axios.patch(`${API_URL}/auth/users/${user.id}`, {
        name: newName,
      });

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
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <Loader2
          className="animate-spin text-indigo-600"
          size={45}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
      
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            User Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all registered users professionally
          </p>
        </div>

        <button
          onClick={onAddUser}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Users</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                {users.length}
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Emails</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-800">
                Active
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <Mail size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Roles</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-800">
                Managed
              </h2>
            </div>

            <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
              <Shield size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg lg:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Role
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div>
                      <h2 className="font-semibold uppercase text-slate-800">
                        {user.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500 lowercase">
                        {user.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => onUpdate(user)}
                        className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition hover:bg-indigo-100"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(user.id)}
                        disabled={processingId === user.id}
                        className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                      >
                        {processingId === user.id ? (
                          <Loader2
                            className="animate-spin"
                            size={18}
                          />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile + Tablet Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              
              <div className="flex-1">
                <h2 className="text-lg font-bold uppercase text-slate-800">
                  {user.name}
                </h2>

                <p className="mt-1 break-all text-sm lowercase text-slate-500">
                  {user.email}
                </p>

                <div className="mt-4">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate(user)}
                  className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition hover:bg-indigo-100"
                >
                  <Edit size={18} />
                </button>

                <button
                  onClick={() => onDelete(user.id)}
                  disabled={processingId === user.id}
                  className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                >
                  {processingId === user.id ? (
                    <Loader2
                      className="animate-spin"
                      size={18}
                    />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}