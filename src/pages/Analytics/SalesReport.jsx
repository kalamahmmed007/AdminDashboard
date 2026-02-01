// src/pages/Analytics/SalesReport.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const salesData = [
    { day: "Mon", sales: 400 },
    { day: "Tue", sales: 450 },
    { day: "Wed", sales: 420 },
    { day: "Thu", sales: 480 },
    { day: "Fri", sales: 500 },
    { day: "Sat", sales: 550 },
    { day: "Sun", sales: 600 },
];

export default function SalesReport() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Sales Report</h1>

            {/* Sales Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Today Sales</div>
                    <div className="mt-2 text-2xl font-bold text-green-600">$4,128</div>
                    <div className="mt-1 text-sm text-green-500">+3.5% vs last week</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">This Week</div>
                    <div className="mt-2 text-2xl font-bold text-blue-600">$28,340</div>
                    <div className="mt-1 text-sm text-green-500">+1.2% vs last week</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</div>
                    <div className="mt-2 text-2xl font-bold text-purple-600">$124,300</div>
                    <div className="mt-1 text-sm text-red-500">-0.5% vs last month</div>
                </div>
            </div>

            {/* Sales Chart */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Sales Trend (Last 7 days)</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:text-gray-600" />
                            <XAxis dataKey="day" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "4px", color: "#fff" }}
                            />
                            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
