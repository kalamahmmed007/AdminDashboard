// src/pages/Analytics/RevenueAnalysis.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const revenueData = [
    { day: "Mon", revenue: 1200 },
    { day: "Tue", revenue: 1500 },
    { day: "Wed", revenue: 1400 },
    { day: "Thu", revenue: 1700 },
    { day: "Fri", revenue: 1900 },
    { day: "Sat", revenue: 1600 },
    { day: "Sun", revenue: 2000 },
];

export default function RevenueAnalysis() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Revenue Analysis</h1>

            {/* Revenue Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue Today</div>
                    <div className="mt-2 text-2xl font-bold text-green-600">$1,200</div>
                    <div className="mt-1 text-sm text-green-500">+5% vs yesterday</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">This Week</div>
                    <div className="mt-2 text-2xl font-bold text-blue-600">$8,500</div>
                    <div className="mt-1 text-sm text-green-500">+12% vs last week</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</div>
                    <div className="mt-2 text-2xl font-bold text-purple-600">$34,000</div>
                    <div className="mt-1 text-sm text-green-500">+7% vs last month</div>
                </div>
            </div>

            {/* Revenue Trend Chart */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Revenue Trend (Last 7 days)</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:text-gray-600" />
                            <XAxis dataKey="day" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "4px", color: "#fff" }}
                            />
                            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
