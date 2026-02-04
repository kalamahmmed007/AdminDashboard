import React, { useState, useEffect } from "react";

const AdminUsersSettings = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "Admin" });

  // Mock fetch admins from backend
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/users"); // Replace with your API
        if (!res.ok) throw new Error("Failed to fetch admins");
        const data = await res.json();
        setAdmins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });
      if (!res.ok) throw new Error("Failed to add admin");
      const added = await res.json();
      setAdmins((prev) => [...prev, added]);
      setNewAdmin({ name: "", email: "", role: "Admin" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete admin");
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Admin Users</h1>

      {error && <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>}

      {/* Add New Admin */}
      <div className="mb-6 space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-2 text-xl font-semibold text-gray-700">Add New Admin</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newAdmin.role}
            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Admin">Admin</option>
            <option value="SuperAdmin">Super Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Editor">Editor</option>
          </select>
        </div>
        <button
          onClick={handleAddAdmin}
          disabled={loading || !newAdmin.name || !newAdmin.email}
          className="mt-2 rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          Add Admin
        </button>
      </div>

      {/* Admin List */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Current Admins</h2>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && admins.length === 0 && <p className="text-gray-500">No admins found.</p>}

        {!loading && admins.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 text-gray-700">{admin.name}</td>
                  <td className="px-6 py-4 text-gray-700">{admin.email}</td>
                  <td className="px-6 py-4 text-gray-700">{admin.role}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="rounded-md bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsersSettings;
