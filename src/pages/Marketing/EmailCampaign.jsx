// src/pages/Marketing/EmailCampaign.jsx
import React, { useState } from 'react';

export default function EmailCampaign() {
    const [campaigns, setCampaigns] = useState([]);
    const [newCampaign, setNewCampaign] = useState({ subject: '', content: '', recipients: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCampaign(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCampaign = (e) => {
        e.preventDefault();
        if (!newCampaign.subject || !newCampaign.content || !newCampaign.recipients) return;
        setCampaigns(prev => [...prev, { id: prev.length + 1, ...newCampaign }]);
        setNewCampaign({ subject: '', content: '', recipients: '' });
    };

    const handleDelete = (id) => {
        setCampaigns(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Email Campaigns</h1>

            {/* Add Campaign Form */}
            <form onSubmit={handleAddCampaign} className="mb-6 flex flex-col gap-2 max-w-lg">
                <input
                    type="text"
                    name="subject"
                    placeholder="Campaign Subject"
                    value={newCampaign.subject}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded"
                />
                <textarea
                    name="content"
                    placeholder="Email Content"
                    value={newCampaign.content}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded h-24 resize-none"
                />
                <input
                    type="text"
                    name="recipients"
                    placeholder="Recipients (comma separated emails)"
                    value={newCampaign.recipients}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
                >
                    Add Campaign
                </button>
            </form>

            {/* Campaigns Table */}
            <table className="w-full border-collapse border border-slate-300">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border border-slate-300 px-4 py-2">ID</th>
                        <th className="border border-slate-300 px-4 py-2">Subject</th>
                        <th className="border border-slate-300 px-4 py-2">Content</th>
                        <th className="border border-slate-300 px-4 py-2">Recipients</th>
                        <th className="border border-slate-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50">
                            <td className="border border-slate-300 px-4 py-2">{c.id}</td>
                            <td className="border border-slate-300 px-4 py-2">{c.subject}</td>
                            <td className="border border-slate-300 px-4 py-2">{c.content}</td>
                            <td className="border border-slate-300 px-4 py-2">{c.recipients}</td>
                            <td className="border border-slate-300 px-4 py-2">
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {campaigns.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center p-4 text-slate-500">
                                No campaigns available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
