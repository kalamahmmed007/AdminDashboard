// src/pages/Users/Roles.jsx
import React, { useState, useEffect } from 'react';

export default function Roles() {
    const [roles, setRoles] = useState([]);

    // Dummy data, পরে API call replace করা যাবে
    useEffect(() => {
        setRoles([
            { id: 1, name: 'Admin', permissions: ['Manage Users', 'Manage Products', 'View Reports'] },
            { id: 2, name: 'Customer', permissions: ['View Products', 'Place Orders'] },
            { id: 3, name: 'Manager', permissions: ['Manage Orders', 'View Analytics'] },
        ]);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Roles & Permissions</h1>
            <table className="w-full border-collapse border border-slate-300">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border border-slate-300 px-4 py-2">ID</th>
                        <th className="border border-slate-300 px-4 py-2">Role Name</th>
                        <th className="border border-slate-300 px-4 py-2">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id} className="hover:bg-slate-50">
                            <td className="border border-slate-300 px-4 py-2">{role.id}</td>
                            <td className="border border-slate-300 px-4 py-2">{role.name}</td>
                            <td className="border border-slate-300 px-4 py-2">
                                {role.permissions.join(', ')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
