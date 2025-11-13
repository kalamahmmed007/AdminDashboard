// src/pages/Users/AddUser.jsx
import React, { useState } from 'react';

export default function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log({ name, email });
        alert('User added!');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add User</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
                    Add User
                </button>
            </form>
        </div>
    );
}
