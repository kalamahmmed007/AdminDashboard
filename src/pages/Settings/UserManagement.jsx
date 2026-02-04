import React, { useState, useEffect } from "react";

const UserManagementSettings = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User", active: true });

  // Mock fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users"); // Replace with your real API
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error("Failed to add user");
      const added = await res.json();
      setUsers((prev) => [...prev, added]);
      setNewUser({ name: "", email: "", role: "User", active: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/users/${id}/toggle-active`, { method: "PUT" });
      if (!res.ok) throw new Error("Failed to toggle user status");
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">User Management</h1>

      {error && <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</div>}

      {/* Add New User */}
      <div className="mb-6 space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-2 text-xl font-semibold text-gray-700">Add New User</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="User">User</option>
            <option value="PremiumUser">Premium User</option>
          </select>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newUser.active}
              onChange={() => setNewUser({ ...newUser, active: !newUser.active })}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-medium text-gray-700">Active</span>
          </div>
        </div>
        <button
          onClick={handleAddUser}
          disabled={loading || !newUser.name || !newUser.email}
          className="mt-2 rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Current Users</h2>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && users.length === 0 && <p className="text-gray-500">No users found.</p>}

        {!loading && users.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.role}</td>
                  <td className="px-6 py-4 text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        user.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-4 text-right">
                    <button
                      onClick={() => toggleActive(user.id)}
                      className="rounded-md bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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

export default UserManagementSettings;
