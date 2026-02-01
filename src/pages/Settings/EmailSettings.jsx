import React from "react";

export default function EmailSettings() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Email & Notification</h2>
            <input className="p-2 border rounded w-full mb-3" placeholder="SMTP Host" />
            <input className="p-2 border rounded w-full mb-3" placeholder="Port" />
            <input className="p-2 border rounded w-full mb-3" placeholder="Username" />
            <input
                type="password"
                className="p-2 border rounded w-full mb-3"
                placeholder="Password"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Save Email Settings
            </button>
        </div>
    );
}
