import React from "react";

export default function Card({ title, value, icon, color = "text-gray-900", change, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex cursor-pointer flex-col justify-between rounded-2xl bg-white p-4 shadow transition hover:shadow-md"
        >
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">{title}</div>
                {icon && <div className="text-gray-400">{icon}</div>}
            </div>

            <div className={`mt-2 text-2xl font-bold ${color}`}>{value}</div>

            {change && (
                <div
                    className={`mt-1 text-xs ${change.startsWith("+") ? "text-green-500" : "text-red-500"
                        }`}
                >
                    {change}
                </div>
            )}
        </div>
    );
}
