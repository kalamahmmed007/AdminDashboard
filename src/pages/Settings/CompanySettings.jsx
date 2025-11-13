import React from "react";

export default function CompanySettings() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Company Settings</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="p-2 border rounded" placeholder="Company Name" />
                <input className="p-2 border rounded" placeholder="Currency (e.g. USD)" />
                <input className="p-2 border rounded" placeholder="Timezone" />
                <input className="p-2 border rounded" placeholder="Contact Email" />
                <button className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                    Save Company Info
                </button>
            </form>
        </div>
    );
}
