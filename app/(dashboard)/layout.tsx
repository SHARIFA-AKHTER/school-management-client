

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { Footer } from "@/components/dashboard/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <div className="flex min-h-screen bg-[#F7F8FA] dark:bg-slate-900 p-2 sm:p-3 lg:p-4 gap-2 sm:gap-3 lg:gap-4 transition-colors duration-300">

      {/* ✅ Sidebar (Desktop only) */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-slate-950 rounded-2xl lg:rounded-3xl shadow-sm overflow-hidden border dark:border-gray-800">
        <Sidebar userRole="ADMIN" />
      </aside>

      {/* ✅ Main Section */}
      <div className="flex-1 flex flex-col gap-2 sm:gap-3 lg:gap-4 overflow-hidden">

        {/* ✅ Navbar */}
    
        <header className="h-14 sm:h-16 lg:h-20 bg-white dark:bg-slate-950 rounded-2xl lg:rounded-3xl flex items-center px-4 sm:px-6 lg:px-8 shadow-sm border dark:border-gray-800 transition-colors">
          <Navbar />
        </header>

        {/* ✅ Content + Footer */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* ✅ Scrollable Content */}
          <main className="flex-1 overflow-y-auto rounded-2xl lg:rounded-3xl scrollbar-hide p-3 sm:p-4 lg:p-6 bg-white dark:bg-slate-950/50 shadow-sm border dark:border-gray-800">
            {children}
          </main>

          {/* ✅ Footer */}
          <footer className="mt-3">
            <Footer />
          </footer>

        </div>
      </div>
    </div>
  );
}