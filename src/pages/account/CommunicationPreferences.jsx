import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/useAuth";

export default function CommunicationPreferences() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState({
    sms: true,
    whatsapp: false,
    call: true,
    email: true,
  });

  const toggle = (key) => setPrefs({ ...prefs, [key]: !prefs[key] });

  const channels = [
    { key: "sms", label: "SMS", icon: "💬" },
    { key: "whatsapp", label: "WhatsApp", icon: "🟢" },
    { key: "call", label: "Call", icon: "📞" },
    { key: "email", label: "Email", icon: "✉️" },
  ];

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-blue-900">
          Communication Preferences
        </h2>
        <p className="text-gray-500 mt-1">
          Please select communication preferences for
        </p>

        {/* Mobile number card */}
        <div className="mt-6 border border-gray-200 rounded-xl p-5 max-w-md">
          <p className="text-sm text-gray-500">Mobile Number</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-semibold text-gray-800">
              +91-{user?.mobile}
            </span>
            <span className="text-green-500 text-xl">✔</span>
          </div>
        </div>

        <p className="mt-6 text-gray-700 font-medium">
          Manage notifications for important updates on Credit Report, Loans and
          Cards offers, payment reminders and more
        </p>

        {/* Toggles */}
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-2 mt-6 max-w-2xl">
          {channels.map((c) => (
            <div
              key={c.key}
              className="flex items-center justify-between py-4 border-b border-gray-100"
            >
              <span className="flex items-center gap-3 text-gray-700 font-medium">
                <span>{c.icon}</span>
                {c.label}
              </span>
              <button
                onClick={() => toggle(c.key)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  prefs[c.key] ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                    prefs[c.key] ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-blue-900">
          <span className="font-bold">Note:</span> Communication preferences
          usually get updated within 48 hours.
        </p>
      </div>
    </DashboardLayout>
  );
}