import React, { useState, useEffect } from "react";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch notification settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/notifications"); // replace with your real API
        if (!res.ok) throw new Error("Failed to fetch notification settings");
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save notification settings");
      alert("Notification settings saved successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Notification Settings</h1>

      {error && <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>}

      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">Notification Preferences</h2>

        <div className="space-y-4">
          {/* Email Alerts */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email Alerts</span>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={() => toggleSetting("emailAlerts")}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>

          {/* SMS Alerts */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">SMS Alerts</span>
            <input
              type="checkbox"
              checked={settings.smsAlerts}
              onChange={() => toggleSetting("smsAlerts")}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Push Notifications</span>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={() => toggleSetting("pushNotifications")}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
