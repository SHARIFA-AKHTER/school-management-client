/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Bell, 
  Lock, 
  Eye, 
  ShieldCheck, 
  Moon, 
  Sun,

} from "lucide-react";
import { toast } from "react-hot-toast"; 

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    toast.success(`${newTheme ? "Dark" : "Light"} mode applied!`);
  };

  const handleSave = () => {
    toast.success("Settings saved locally!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage your account preferences and system settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2">
          <TabButton 
            active={activeTab === "profile"} 
            onClick={() => setActiveTab("profile")}
            icon={User} 
            label="Profile" 
          />
          <TabButton 
            active={activeTab === "appearance"} 
            onClick={() => setActiveTab("appearance")}
            icon={Eye} 
            label="Appearance" 
          />
          <TabButton 
            active={activeTab === "security"} 
            onClick={() => setActiveTab("security")}
            icon={Lock} 
            label="Security" 
          />
          <TabButton 
            active={activeTab === "notifications"} 
            onClick={() => setActiveTab("notifications")}
            icon={Bell} 
            label="Notifications" 
          />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
              <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
                <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center text-[#5D4291] font-black text-2xl">
                  SA
                </div>
                <div>
                  <button className="text-sm font-bold text-[#5D4291] hover:underline">Change Photo</button>
                  <p className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Full Name" placeholder="Sharifa Akhter" />
                <InputGroup label="Email Address" placeholder="sharifa@example.com" />
              </div>
              <button onClick={handleSave} className="bg-[#5D4291] text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-all">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Appearance</h3>
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[24px]">
                <div className="flex items-center gap-4">
                  {isDarkMode ? <Moon className="text-[#5D4291]" /> : <Sun className="text-yellow-500" />}
                  <div>
                    <p className="font-bold text-gray-800">Dark Mode</p>
                    <p className="text-xs text-gray-400">Reduce eye strain in low light</p>
                  </div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${isDarkMode ? 'bg-[#5D4291] justify-end' : 'bg-gray-300 justify-start'}`}
                >
                  <div className="w-6 h-6 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 text-center py-10">
              <ShieldCheck size={60} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Security Settings</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Update your password and enable two-factor authentication to secure your account.</p>
              <button className="text-[#5D4291] font-bold border-2 border-[#5D4291] px-6 py-2 rounded-xl hover:bg-purple-50 transition-all">
                Change Password
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
              <NotificationToggle label="Email Notifications" description="Receive results via email" defaultChecked />
              <NotificationToggle label="System Alerts" description="Get notified about system updates" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function TabButton({ active, icon: Icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
        active 
        ? 'bg-[#5D4291] text-white shadow-lg shadow-purple-100' 
        : 'text-gray-500 hover:bg-gray-50'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );
}

function InputGroup({ label, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-[#5D4291] transition-all"
      />
    </div>
  );
}

function NotificationToggle({ label, description, defaultChecked = false }: any) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all">
      <div>
        <p className="font-bold text-gray-800 text-sm">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <input type="checkbox" defaultChecked={defaultChecked} className="w-5 h-5 accent-[#5D4291]" />
    </div>
  );
}