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
  Package,
  DollarSign,
  Users,
  Megaphone,
  BarChart3,
} from "lucide-react";

import ProfileSettings from "./ProfileSettings";
import CompanySettings from "./CompanySettings";
import PaymentSettings from "./PaymentSettings";
import EmailSettings from "./EmailSettings";
import AppearanceSettings from "./AppearanceSettings";
import IntegrationSettings from "./IntegrationSettings";
import SecuritySettings from "./SecuritySettings";
import ShippingSettings from "./ShippingSettings";
import StoreSettings from "./StoreSettings";
import TaxSettings from "./TaxSettings";
import UserManagement from "./UserManagement";
import NotificationSettings from "./NotificationSettings";
import ApiAccessSettings from "./APIAccess";
import RoleManagementSettings from "./RoleManagement";
import AdminUsersSettings from "./AdminUsers";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "store", label: "Store", icon: <Building size={18} /> },
    { id: "payment", label: "Payment", icon: <CreditCard size={18} /> },
    { id: "email", label: "Email", icon: <Mail size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "integration", label: "Integrations", icon: <LinkIcon size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "shipping", label: "Shipping", icon: <Package size={18} /> },
    { id: "tax", label: "Tax", icon: <DollarSign size={18} /> },
    { id: "userManagement", label: "User Management", icon: <Users size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Megaphone size={18} /> },
    { id: "apiAccess", label: "API Access", icon: <BarChart3 size={18} /> },
    { id: "roleManagement", label: "Role Management", icon: <Settings size={18} /> },
    { id: "adminUsers", label: "Admin Users", icon: <Users size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-lg dark:bg-slate-800">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-200 p-6 dark:border-slate-700">
          <Settings size={24} className="text-red-600" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Settings
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
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
          {activeTab === "store" && <StoreSettings />}
          {activeTab === "payment" && <PaymentSettings />}
          {activeTab === "email" && <EmailSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "integration" && <IntegrationSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "shipping" && <ShippingSettings />}
          {activeTab === "tax" && <TaxSettings />}
          {activeTab === "userManagement" && <UserManagement />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "apiAccess" && <ApiAccessSettings />}
          {activeTab === "roleManagement" && <RoleManagementSettings />}
          {activeTab === "adminUsers" && <AdminUsersSettings />}
        </div>
      </div>
    </div>
  );
}
