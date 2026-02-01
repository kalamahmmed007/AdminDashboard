import React from "react";

export default function SecuritySettings() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <label className="flex items-center gap-2 mb-3">
                <input type="checkbox" /> Enable Two-Factor Authentication
            </label>
            <label className="flex items-center gap-2 mb-3">
                <input type="checkbox" /> Enable Login Attempt Limit
            </label>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Update Security
            </button>
        </div>
    );
}
