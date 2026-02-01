// src/pages/Analytics/ProductReports.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const productData = [
    { day: "Mon", sold: 30 },
    { day: "Tue", sold: 45 },
    { day: "Wed", sold: 40 },
    { day: "Thu", sold: 50 },
    { day: "Fri", sold: 60 },
    { day: "Sat", sold: 55 },
    { day: "Sun", sold: 70 },
];

export default function ProductReports() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Product Reports</h1>

            {/* Product Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Products Sold Today</div>
                    <div className="mt-2 text-2xl font-bold text-green-600">30</div>
                    <div className="mt-1 text-sm text-green-500">+10% vs yesterday</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">This Week</div>
                    <div className="mt-2 text-2xl font-bold text-blue-600">320</div>
                    <div className="mt-1 text-sm text-green-500">+15% vs last week</div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</div>
                    <div className="mt-2 text-2xl font-bold text-purple-600">1280</div>
                    <div className="mt-1 text-sm text-green-500">+8% vs last month</div>
                </div>
            </div>

            {/* Product Sales Chart */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Products Sold Trend (Last 7 days)</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={productData}>
                            <CartesianGrid strokeDasharray="3 3" className="dark:text-gray-600" />
                            <XAxis dataKey="day" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "4px", color: "#fff" }}
                            />
                            <Line type="monotone" dataKey="sold" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
