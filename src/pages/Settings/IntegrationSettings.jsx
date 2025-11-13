import React from "react";

export default function IntegrationSettings() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Integrations</h2>
            <input className="p-2 border rounded w-full mb-3" placeholder="Google Analytics ID" />
            <input className="p-2 border rounded w-full mb-3" placeholder="Facebook Pixel ID" />
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Save Integrations
            </button>
        </div>
    );
}
