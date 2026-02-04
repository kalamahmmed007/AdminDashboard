import React, { useState, useEffect } from "react";

const ApiAccessSettings = () => {
  const [apiKey, setApiKey] = useState("");       // Current key from backend
  const [newKey, setNewKey] = useState("");       // Input field for manual key
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");         // Error messages

  // Mock backend API URLs
  const API_GET_KEY = "/api/admin/apikey";
  const API_GENERATE_KEY = "/api/admin/apikey/generate";
  const API_UPDATE_KEY = "/api/admin/apikey";

  // Fetch current API key from backend
  useEffect(() => {
    const fetchApiKey = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_GET_KEY);
        if (!res.ok) throw new Error("Failed to fetch API key");
        const data = await res.json();
        setApiKey(data.key);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApiKey();
  }, []);

  // Generate a new API key
  const handleGenerateKey = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_GENERATE_KEY, { method: "POST" });
      if (!res.ok) throw new Error("Failed to generate new API key");
      const data = await res.json();
      setApiKey(data.newKey);
      setNewKey("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update API key manually
  const handleSaveKey = async () => {
    if (!newKey.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_UPDATE_KEY, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: newKey }),
      });
      if (!res.ok) throw new Error("Failed to update API key");
      const data = await res.json();
      setApiKey(data.key);
      setNewKey("");
      alert("API Key updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">API Access Settings</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>
      )}

      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        {/* Current API Key */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Current API Key</h2>
            {loading ? (
              <p className="mt-1 text-gray-500">Loading...</p>
            ) : (
              <p className="mt-1 text-gray-600">{apiKey || "No API key set"}</p>
            )}
          </div>
          <button
            onClick={handleGenerateKey}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            Generate New Key
          </button>
        </div>

        {/* Manual Update */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <label className="mb-1 block font-medium text-gray-700">
              Enter New API Key
            </label>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Paste or type your new key"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSaveKey}
            disabled={loading || !newKey.trim()}
            className="mt-2 rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 disabled:opacity-50 md:mt-0"
          >
            Save Key
          </button>
        </div>

        {/* Info Section */}
        <div className="rounded-md bg-gray-50 p-4 text-gray-700">
          <p>
            Keep your API key safe. Do not share it publicly. Use the key for integrating external apps and services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiAccessSettings;
