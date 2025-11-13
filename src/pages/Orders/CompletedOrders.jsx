// src/pages/Orders/CompletedOrders.jsx
import React, { useState, useEffect } from 'react';

export default function CompletedOrders() {
    const [orders, setOrders] = useState([]);

    // Dummy data, পরে API call দিয়ে replace করা যাবে
    useEffect(() => {
        setOrders([
            {
                id: 101,
                customer: 'Rimi TanHa',
                product: 'Laptop',
                quantity: 1,
                total: 1200,
                date: '2025-11-01',
                status: 'Completed',
            },
            {
                id: 102,
                customer: 'Arian Ahmed',
                product: 'Smartphone',
                quantity: 2,
                total: 1600,
                date: '2025-11-03',
                status: 'Completed',
            },
            {
                id: 103,
                customer: 'Nazma Rima',
                product: 'Headphones',
                quantity: 3,
                total: 300,
                date: '2025-11-05',
                status: 'Completed',
            },
        ]);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Completed Orders</h1>
            <table className="w-full border-collapse border border-slate-300">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border border-slate-300 px-4 py-2">Order ID</th>
                        <th className="border border-slate-300 px-4 py-2">Customer</th>
                        <th className="border border-slate-300 px-4 py-2">Product</th>
                        <th className="border border-slate-300 px-4 py-2">Quantity</th>
                        <th className="border border-slate-300 px-4 py-2">Total ($)</th>
                        <th className="border border-slate-300 px-4 py-2">Date</th>
                        <th className="border border-slate-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50">
                            <td className="border border-slate-300 px-4 py-2">{order.id}</td>
                            <td className="border border-slate-300 px-4 py-2">{order.customer}</td>
                            <td className="border border-slate-300 px-4 py-2">{order.product}</td>
                            <td className="border border-slate-300 px-4 py-2">{order.quantity}</td>
                            <td className="border border-slate-300 px-4 py-2">{order.total}</td>
                            <td className="border border-slate-300 px-4 py-2">{order.date}</td>
                            <td className="border border-slate-300 px-4 py-2 text-green-600 font-semibold">
                                {order.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
