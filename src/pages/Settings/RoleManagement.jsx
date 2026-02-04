import React, { useState } from "react";
import { User, Plus, Trash2, Save } from "lucide-react";

const initialRoles = [
  { id: 1, name: "Admin", description: "Full access to all settings" },
  { id: 2, name: "Editor", description: "Can edit content but not users" },
  { id: 3, name: "Viewer", description: "Read-only access" },
];

export default function RoleManagement() {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState({ name: "", description: "" });

  const handleInputChange = (e) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };

  const handleAddRole = () => {
    if (!newRole.name) return;
    setRoles([
      ...roles,
      { id: roles.length + 1, name: newRole.name, description: newRole.description },
    ]);
    setNewRole({ name: "", description: "" });
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleSaveRoles = () => {
    // Normally, you would call your API here
    console.log("Saved roles:", roles);
    alert("Roles saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Role Management</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Manage user roles and permissions in your system.
      </p>

      {/* Add New Role */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Add New Role</h3>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            name="name"
            placeholder="Role Name"
            value={newRole.name}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newRole.description}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
          />
          <button
            onClick={handleAddRole}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white transition-all hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus size={16} />
            Add Role
          </button>
        </div>
      </div>

      {/* Roles List */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Existing Roles</h3>
        <div className="space-y-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-700"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{role.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{role.description}</p>
              </div>
              <button
                onClick={() => handleDeleteRole(role.id)}
                className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Roles */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveRoles}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-white transition-all hover:bg-green-700"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
