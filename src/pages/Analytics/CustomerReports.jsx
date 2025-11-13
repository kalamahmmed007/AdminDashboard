// src/pages/Analytics/CustomerReports.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const customerData = [
    { day: "Mon", newCustomers: 12 },
    { day: "Tue", newCustomers: 18 },
    { day: "Wed", newCustomers: 14 },
    { day: "Thu", newCustomers: 20 },
    { day: "Fri", newCustomers: 22 },
    { day: "Sat", newCustomers: 25 },
    { day: "Sun", newCustomers: 30 },
];

export default function CustomerReports() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Customer Reports</h1>

            {/* Customer Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">New Customers Today</div>
                    <div className="mt-2 text-2xl font-bold text-green-600">12</div>
                    <div className="mt-1 text-sm text-green-500">+5% vs yesterday</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">This Week</div>
                    <div className="mt-2 text-2xl font-bold text-blue-600">121</div>
                    <div className="mt-1 text-sm text-green-500">+12% vs last week</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</div>
                    <div className="mt-2 text-2xl font-bold text-purple-600">520</div>
                    <div className="mt-1 text-sm text-green-500">+8% vs last month</div>
                </div>
            </div>

            {/* Customer Chart */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">New Customers Trend (Last 7 days)</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={customerData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:text-gray-600" />
                            <XAxis dataKey="day" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "4px", color: "#fff" }}
                            />
                            <Line type="monotone" dataKey="newCustomers" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
