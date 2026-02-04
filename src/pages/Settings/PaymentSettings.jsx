import React, { useState, useEffect } from "react";

const PaymentSettings = () => {
  const [methods, setMethods] = useState({
    card: true,
    paypal: false,
    bkash: true,
    nagad: false,
    dbbl: true,
  });

  const [credentials, setCredentials] = useState({
    paypalClientId: "",
    paypalSecret: "",
    bkashUsername: "",
    bkashPassword: "",
    nagadMerchantId: "",
    nagadApiKey: "",
    dbblApiKey: "",
  });

  const [defaultMethod, setDefaultMethod] = useState("card");
  const [testMode, setTestMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock backend fetch
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        // Replace this with real API call
        const res = await fetch("/api/admin/payment-settings");
        if (!res.ok) throw new Error("Failed to fetch payment settings");
        const data = await res.json();
        setMethods(data.methods);
        setCredentials(data.credentials);
        setDefaultMethod(data.defaultMethod);
        setTestMode(data.testMode);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = (method) => {
    setMethods((prev) => ({ ...prev, [method]: !prev[method] }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/payment-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ methods, credentials, defaultMethod, testMode }),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      alert("Payment settings saved successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Payment Settings</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>
      )}

      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Payment Methods</h2>

          {Object.keys(methods).map((method) => (
            <div key={method} className="flex items-center justify-between">
              <span className="capitalize text-gray-700">{method}</span>
              <input
                type="checkbox"
                checked={methods[method]}
                onChange={() => handleToggle(method)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Credentials / API Keys</h2>

          {/* PayPal */}
          {methods.paypal && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium text-gray-700">PayPal Client ID</label>
                <input
                  type="text"
                  value={credentials.paypalClientId}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, paypalClientId: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium text-gray-700">PayPal Secret</label>
                <input
                  type="text"
                  value={credentials.paypalSecret}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, paypalSecret: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* bKash */}
          {methods.bkash && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium text-gray-700">bKash Username</label>
                <input
                  type="text"
                  value={credentials.bkashUsername}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, bkashUsername: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium text-gray-700">bKash Password</label>
                <input
                  type="password"
                  value={credentials.bkashPassword}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, bkashPassword: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Nagad */}
          {methods.nagad && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium text-gray-700">Nagad Merchant ID</label>
                <input
                  type="text"
                  value={credentials.nagadMerchantId}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, nagadMerchantId: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium text-gray-700">Nagad API Key</label>
                <input
                  type="text"
                  value={credentials.nagadApiKey}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, nagadApiKey: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* DBBL */}
          {methods.dbbl && (
            <div className="grid gap-4 md:grid-cols-1">
              <div>
                <label className="mb-1 block font-medium text-gray-700">DBBL API Key</label>
                <input
                  type="text"
                  value={credentials.dbblApiKey}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, dbblApiKey: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Default Method & Test Mode */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium text-gray-700">Default Payment Method</label>
            <select
              value={defaultMethod}
              onChange={(e) => setDefaultMethod(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(methods)
                .filter((m) => methods[m])
                .map((m) => (
                  <option key={m} value={m}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-4 flex items-center gap-2 md:mt-0">
            <input
              type="checkbox"
              checked={testMode}
              onChange={() => setTestMode(!testMode)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium text-gray-700">Enable Test Mode</span>
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

export default PaymentSettings;
