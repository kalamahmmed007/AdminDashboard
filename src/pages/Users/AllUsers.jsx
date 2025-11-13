// src/pages/Users/AllUsers.jsx
import React, { useState, useEffect } from 'react';

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  // Dummy data, পরে API call replace করা যাবে
  useEffect(() => {
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer' },
      { id: 3, name: 'Ali Tanha', email: 'ali@example.com', role: 'Customer' },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 px-4 py-2">ID</th>
            <th className="border border-slate-300 px-4 py-2">Name</th>
            <th className="border border-slate-300 px-4 py-2">Email</th>
            <th className="border border-slate-300 px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="border border-slate-300 px-4 py-2">{user.id}</td>
              <td className="border border-slate-300 px-4 py-2">{user.name}</td>
              <td className="border border-slate-300 px-4 py-2">{user.email}</td>
              <td className="border border-slate-300 px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
