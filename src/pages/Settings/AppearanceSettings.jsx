import React from "react";

export default function AppearanceSettings() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" /> Dark Mode
                </label>
                <label className="flex items-center gap-2">
                    <input type="color" /> Primary Theme Color
                </label>
            </div>
        </div>
    );
}
