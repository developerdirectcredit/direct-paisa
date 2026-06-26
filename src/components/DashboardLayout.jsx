import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserCircle,
  FileText,
  LifeBuoy,
  LogOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

// Sidebar ke main items
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/account/dashboard" },
  { label: "My Profile", icon: UserCircle, path: "/account/profile" },
  { label: "My Invoices", icon: FileText, path: "/account/invoices" },
];

// Help & Support ke sub-items
const helpSubItems = [
  { label: "FAQs", path: "/account/support?tab=faqs" },
  { label: "Submit A Query", path: "/account/support?tab=query" },
  { label: "Contact Us", path: "/account/support?tab=contact" },
  { label: "Communication Preferences", path: "/account/preferences" },
];

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Help & Support accordion — agar support/preferences page pe ho to khula rakho
  const isHelpActive =
    location.pathname.startsWith("/account/support") ||
    location.pathname.startsWith("/account/preferences");
  const [helpOpen, setHelpOpen] = useState(isHelpActive);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path.split("?")[0];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* Simple top bar (logo) */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <img
            src="/logo.png"
            alt="Direct Credit"
            className="h-12 md:h-16 object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
          {/* ── Sidebar ── */}
          <aside className="bg-white rounded-2xl shadow-sm p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} className={active ? "text-blue-600" : "text-blue-500"} />
                    {item.label}
                  </span>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              );
            })}

            {/* Help & Support accordion */}
            <button
              onClick={() => setHelpOpen(!helpOpen)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-colors ${
                isHelpActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <LifeBuoy size={20} className={isHelpActive ? "text-blue-600" : "text-blue-500"} />
                Help &amp; Support
              </span>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform ${
                  helpOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {helpOpen && (
              <div className="pl-6 py-1 space-y-1">
                {helpSubItems.map((sub) => {
                  const active =
                    location.pathname + location.search === sub.path ||
                    (sub.path.startsWith("/account/preferences") &&
                      location.pathname === "/account/preferences");
                  return (
                    <button
                      key={sub.path}
                      onClick={() => navigate(sub.path)}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-left text-sm transition-colors ${
                        active
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      <span className="text-gray-300">—</span>
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-red-500 hover:bg-red-50 transition-colors"
            >
              <span className="flex items-center gap-3">
                <LogOut size={20} />
                Logout
              </span>
              <ChevronRight size={18} className="text-red-300" />
            </button>
          </aside>

          {/* ── Right content ── */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>

      {/* Footer note */}
      <footer className="text-center text-xs text-gray-400 py-6 px-4">
        CIN No. U74900HR2011PTC044581 © Copyright 2014-2026 Direct Credit. All
        Rights Reserved.
      </footer>
    </div>
  );
}