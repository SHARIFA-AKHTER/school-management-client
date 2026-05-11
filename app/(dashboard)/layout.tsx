// import { Sidebar } from "@/components/dashboard/Sidebar";
// import { Navbar } from "@/components/dashboard/Navbar";
// import { Footer } from "@/components/dashboard/Footer";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex h-screen bg-[#F7F8FA] p-2 sm:p-3 lg:p-4 gap-2 sm:gap-3 lg:gap-4">

//       {/* ✅ Sidebar (Desktop only) */}
//       <aside className="hidden lg:flex w-64 flex-col bg-white rounded-2xl lg:rounded-3xl shadow-sm overflow-hidden">
//         <Sidebar userRole="ADMIN" />
//       </aside>

//       {/* ✅ Main Section */}
//       <div className="flex-1 flex flex-col gap-2 sm:gap-3 lg:gap-4 overflow-hidden">

//         {/* ✅ Navbar */}
//         <header className="h-14 sm:h-16 lg:h-20 bg-white rounded-2xl lg:rounded-3xl flex items-center px-4 sm:px-6 lg:px-8 shadow-sm">
//           <Navbar />
//         </header>

//         {/* ✅ Content + Footer */}
//         <div className="flex-1 flex flex-col overflow-hidden">

//           {/* ✅ Scrollable Content */}
//           <main className="flex-1 overflow-y-auto rounded-2xl lg:rounded-3xl scrollbar-hide p-3 sm:p-4 lg:p-6">
//             {children}
//           </main>

//           {/* ✅ Footer */}
//           <footer className="h-12 sm:h-14 lg:h-16 bg-white rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-sm shrink-0 text-sm sm:text-base">
//             <Footer />
//           </footer>

//         </div>
//       </div>
//     </div>
//   );
// }

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { Footer } from "@/components/dashboard/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <div className="flex h-screen bg-[#F7F8FA] dark:bg-slate-900 p-2 sm:p-3 lg:p-4 gap-2 sm:gap-3 lg:gap-4 transition-colors duration-300">

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
          <footer className="h-12 sm:h-14 lg:h-16 bg-white dark:bg-slate-950 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-sm shrink-0 text-sm sm:text-base border dark:border-gray-800 transition-colors">
            <Footer />
          </footer>

        </div>
      </div>
    </div>
  );
}