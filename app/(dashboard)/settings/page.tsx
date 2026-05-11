/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

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
  Camera,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "Sharifa Akhter",
    email: "sharifa@example.com",
    phone: "+8801XXXXXXXXX",
    location: "Bangladesh",
  });

  /* ---------------- LOAD SAVED DATA ---------------- */

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const savedData = localStorage.getItem("profileSettings");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  /* ---------------- THEME ---------------- */

  const toggleTheme = () => {
    const newTheme = !isDarkMode;

    setIsDarkMode(newTheme);

    localStorage.setItem("theme", newTheme ? "dark" : "light");

    document.documentElement.classList.toggle("dark");

    toast.success(
      `${newTheme ? "Dark" : "Light"} mode activated ✨`
    );
  };

  /* ---------------- FORM ---------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = () => {
    localStorage.setItem(
      "profileSettings",
      JSON.stringify(formData)
    );

    toast.success("Settings saved successfully 🚀");
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;

      setProfileImage(base64String);

      localStorage.setItem(
        "profileImage",
        base64String
      );

      toast.success("Profile photo uploaded 🚀");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-[#0F172A]"
          : "bg-linear-to-br from-[#f5f3ff] via-white to-[#eef2ff]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#A855F7] flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" />
            </div>

            <div>
              <h1
                className={`text-4xl font-black ${
                  isDarkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                Settings
              </h1>

              <p
                className={`text-sm ${
                  isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Customize your dashboard beautifully ✨
              </p>
            </div>
          </div>
        </motion.div>

        {/* MAIN LAYOUT */}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* SIDEBAR */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-[32px] p-5 border backdrop-blur-xl h-fit sticky top-6 ${
              isDarkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/80 border-white"
            }`}
          >
            <div className="space-y-3">
              <TabButton
                active={activeTab === "profile"}
                onClick={() =>
                  setActiveTab("profile")
                }
                icon={User}
                label="Profile"
                isDarkMode={isDarkMode}
              />

              <TabButton
                active={activeTab === "appearance"}
                onClick={() =>
                  setActiveTab("appearance")
                }
                icon={Eye}
                label="Appearance"
                isDarkMode={isDarkMode}
              />

              <TabButton
                active={activeTab === "security"}
                onClick={() =>
                  setActiveTab("security")
                }
                icon={Lock}
                label="Security"
                isDarkMode={isDarkMode}
              />

              <TabButton
                active={activeTab === "notifications"}
                onClick={() =>
                  setActiveTab("notifications")
                }
                icon={Bell}
                label="Notifications"
                isDarkMode={isDarkMode}
              />
            </div>
          </motion.div>

          {/* CONTENT */}

          <motion.div
            layout
            className={`rounded-[36px] p-6 md:p-10 border shadow-2xl backdrop-blur-xl overflow-hidden ${
              isDarkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/80 border-white"
            }`}
          >
            <AnimatePresence mode="wait">
              {/* PROFILE */}

              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2
                      className={`text-2xl font-black ${
                        isDarkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      Profile Information
                    </h2>

                    <p
                      className={`mt-1 ${
                        isDarkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Update your personal details and
                      profile photo.
                    </p>
                  </div>

                  {/* AVATAR */}

                  <div
                    className={`rounded-[28px] border p-6 ${
                      isDarkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-linear-to-r from-purple-50 to-indigo-50 border-purple-100"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <div className="w-28 h-28 rounded-[30px] overflow-hidden border-4 border-white shadow-xl bg-gray-200">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-r from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white text-4xl font-black">
                              SA
                            </div>
                          )}
                        </div>

                        <label className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-lg hover:scale-110 transition cursor-pointer">
                          <Camera
                            size={18}
                            className="text-[#7C3AED]"
                          />

                          <input
                            type="file"
                            accept="image/*"
                            onChange={
                              handleImageUpload
                            }
                            className="hidden"
                          />
                        </label>
                      </motion.div>

                      <div className="text-center sm:text-left">
                        <h3
                          className={`text-2xl font-bold ${
                            isDarkMode
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {formData.fullName}
                        </h3>

                        <p
                          className={`text-sm mt-1 ${
                            isDarkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Frontend & Full Stack Developer
                        </p>

                        <label className="inline-block mt-4 px-5 py-2 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#A855F7] text-white font-semibold shadow-lg hover:scale-105 transition cursor-pointer">
                          Upload New Photo

                          <input
                            type="file"
                            accept="image/*"
                            onChange={
                              handleImageUpload
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* FORM */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Sharifa Akhter"
                      isDarkMode={isDarkMode}
                    />

                    <InputGroup
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sharifa@example.com"
                      isDarkMode={isDarkMode}
                    />

                    <InputGroup
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+8801XXXXXXXXX"
                      isDarkMode={isDarkMode}
                    />

                    <InputGroup
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Bangladesh"
                      isDarkMode={isDarkMode}
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={handleSave}
                    className="px-8 py-4 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold shadow-xl"
                  >
                    Save Changes
                  </motion.button>
                </motion.div>
              )}

              {/* APPEARANCE */}

              {activeTab === "appearance" && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  className="space-y-8"
                >
                  <div>
                    <h2
                      className={`text-2xl font-black ${
                        isDarkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      Appearance
                    </h2>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`rounded-[28px] p-6 border flex items-center justify-between ${
                      isDarkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-linear-to-r from-indigo-50 to-purple-50 border-purple-100"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#A855F7] flex items-center justify-center shadow-lg">
                        {isDarkMode ? (
                          <Moon className="text-white" />
                        ) : (
                          <Sun className="text-yellow-300" />
                        )}
                      </div>

                      <div>
                        <h3
                          className={`font-bold text-lg ${
                            isDarkMode
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          Dark Mode
                        </h3>

                        <p
                          className={`text-sm ${
                            isDarkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Beautiful dark interface for
                          night work.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={toggleTheme}
                      className={`w-20 h-10 rounded-full p-1 flex items-center transition-all duration-500 ${
                        isDarkMode
                          ? "bg-linear-to-r from-[#7C3AED] to-[#A855F7] justify-end"
                          : "bg-gray-300 justify-start"
                      }`}
                    >
                      <motion.div
                        layout
                        className="w-8 h-8 rounded-full bg-white shadow-lg"
                      />
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {/* SECURITY */}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  className="space-y-8"
                >
                  <div
                    className={`rounded-[30px] border p-8 text-center ${
                      isDarkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-linear-to-r from-green-50 to-emerald-50 border-green-100"
                    }`}
                  >
                    <ShieldCheck
                      size={70}
                      className="mx-auto text-green-500 mb-5"
                    />

                    <h3
                      className={`text-2xl font-black ${
                        isDarkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      Your account is secure 🔐
                    </h3>

                    <p
                      className={`max-w-md mx-auto mt-3 ${
                        isDarkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Manage password, authentication and
                      account protection settings.
                    </p>

                    <button className="mt-6 px-6 py-3 rounded-2xl bg-linear-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold shadow-xl hover:scale-105 transition">
                      Change Password
                    </button>
                  </div>
                </motion.div>
              )}

              {/* NOTIFICATIONS */}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  className="space-y-6"
                >
                  <h2
                    className={`text-2xl font-black ${
                      isDarkMode
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    Notifications
                  </h2>

                  <NotificationToggle
                    label="Email Notifications"
                    description="Receive important updates by email."
                    defaultChecked
                    isDarkMode={isDarkMode}
                  />

                  <NotificationToggle
                    label="Push Notifications"
                    description="Get instant alerts in your dashboard."
                    defaultChecked
                    isDarkMode={isDarkMode}
                  />

                  <NotificationToggle
                    label="System Alerts"
                    description="Security and maintenance alerts."
                    isDarkMode={isDarkMode}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function TabButton({
  active,
  icon: Icon,
  label,
  onClick,
  isDarkMode,
}: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, x: 4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
        active
          ? "bg-linear-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-xl"
          : isDarkMode
          ? "text-gray-300 hover:bg-white/10"
          : "text-gray-600 hover:bg-purple-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        {label}
      </div>

      <ChevronRight size={18} />
    </motion.button>
  );
}

function InputGroup({
  label,
  placeholder,
  isDarkMode,
  name,
  value,
  onChange,
}: any) {
  return (
    <div className="space-y-2">
      <label
        className={`text-xs font-bold uppercase tracking-widest ${
          isDarkMode
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl px-5 py-4 border outline-none transition-all duration-300 ${
          isDarkMode
            ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A855F7]"
            : "bg-white border-gray-200 focus:border-[#7C3AED]"
        } focus:ring-4 focus:ring-purple-200/30`}
      />
    </div>
  );
}

function NotificationToggle({
  label,
  description,
  defaultChecked = false,
  isDarkMode,
}: any) {
  const [enabled, setEnabled] =
    useState(defaultChecked);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`rounded-[24px] border p-5 flex items-center justify-between transition-all ${
        isDarkMode
          ? "bg-white/5 border-white/10"
          : "bg-white border-gray-100"
      }`}
    >
      <div>
        <h4
          className={`font-bold ${
            isDarkMode
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          {label}
        </h4>

        <p
          className={`text-sm mt-1 ${
            isDarkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-16 h-9 rounded-full p-1 flex items-center transition-all duration-500 ${
          enabled
            ? "bg-linear-to-r from-[#7C3AED] to-[#A855F7] justify-end"
            : "bg-gray-300 justify-start"
        }`}
      >
        <motion.div
          layout
          className="w-7 h-7 bg-white rounded-full shadow-md"
        />
      </button>
    </motion.div>
  );
}