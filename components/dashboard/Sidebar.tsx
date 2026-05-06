"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  GraduationCap, 
  Settings,
  UserCircle
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["ADMIN", "TEACHER", "STUDENT"],
  },
  {
    label: "User Management",
    icon: UserCircle,
    href: "/admin/users",
    roles: ["ADMIN"],
  },
  {
    label: "Students",
    icon: Users,
    href: "/admin/students",
    roles: ["ADMIN"],
  },
  {
    label: "Attendance",
    icon: ClipboardCheck,
    href: "/teacher/attendance",
    roles: ["TEACHER", "ADMIN"],
  },
  {
    label: "Subjects",
    icon: BookOpen,
    href: "/admin/subjects",
    roles: ["ADMIN", "TEACHER"],
  },
  {
    label: "Results",
    icon: GraduationCap,
    href: "/teacher/results",
    roles: ["TEACHER", "ADMIN", "STUDENT"],
  },
];

export const Sidebar = ({ userRole }: { userRole: string }) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
          
             <div className="bg-blue-500 w-full h-full rounded-lg flex items-center justify-center font-bold">S</div>
          </div>
          <h1 className="text-xl font-bold">SchoolPro</h1>
        </Link>
        
        <div className="space-y-1">
          {routes
            .filter((route) => route.roles.includes(userRole)) 
            .map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-blue-500" : "text-zinc-400")} />
                  {route.label}
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className="px-3 py-2 border-t border-zinc-800">
        <Link
          href="/settings"
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <div className="flex items-center flex-1">
            <Settings className="h-5 w-5 mr-3 text-zinc-400" />
            Settings
          </div>
        </Link>
      </div>
    </div>
  );
};