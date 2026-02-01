import React from "react";

export default function ProfileSettings() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="p-2 border rounded" placeholder="Full Name" />
                <input className="p-2 border rounded" placeholder="Email Address" />
                <input className="p-2 border rounded" placeholder="Phone Number" />
                <input type="password" className="p-2 border rounded" placeholder="New Password" />
                <button className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
}
