import React, { useState } from "react";
import {
  User,
  Building,
  CreditCard,
  Mail,
  Palette,
  Link as LinkIcon,
  Shield,
  Settings,
} from "lucide-react";

import ProfileSettings from "./ProfileSettings";
import CompanySettings from "./CompanySettings";
import PaymentSettings from "./PaymentSettings";
import EmailSettings from "./EmailSettings";
import AppearanceSettings from "./AppearanceSettings";
import IntegrationSettings from "./IntegrationSettings";
import SecuritySettings from "./SecuritySettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "company", label: "Company", icon: <Building size={18} /> },
    { id: "payment", label: "Payment", icon: <CreditCard size={18} /> },
    { id: "email", label: "Email", icon: <Mail size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "integration", label: "Integrations", icon: <LinkIcon size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-slate-900">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-slate-700">
          <Settings size={24} className="text-red-600" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Settings
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                  ? "text-red-600 border-b-2 border-red-600 bg-red-50 dark:bg-slate-700"
                  : "text-gray-500 hover:text-red-600"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "company" && <CompanySettings />}
          {activeTab === "payment" && <PaymentSettings />}
          {activeTab === "email" && <EmailSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "integration" && <IntegrationSettings />}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}
