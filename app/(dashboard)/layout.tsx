
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F7F8FA] p-4 gap-4"> 
      <aside className="hidden lg:flex w-64 flex-col bg-white rounded-3xl shadow-sm overflow-hidden">
        <Sidebar userRole="ADMIN" />
      </aside>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden">

        <header className="h-20 bg-white rounded-3xl flex items-center px-8 shadow-sm">
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto rounded-3xl scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}