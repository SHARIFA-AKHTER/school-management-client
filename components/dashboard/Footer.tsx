// src/components/dashboard/Footer.tsx
export const Footer = () => {
  return (
    <footer className="bg-white border-t py-4 px-6 md:px-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} School Management System. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Support</a>
          <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Privacy Policy</a>
          <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Terms</a>
        </div>
      </div>
    </footer>
  );
};