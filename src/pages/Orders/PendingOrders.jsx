// src/pages/Orders/PendingOrders.jsx
import React, { useState, useEffect } from 'react';

export default function PendingOrders() {
    const [orders, setOrders] = useState([]);

    // Dummy data, পরে API call দিয়ে replace করা যাবে
    useEffect(() => {
        setOrders([
            {
                id: 201,
                customer: 'Rimi TanHa',
                product: 'Tablet',
                quantity: 1,
                total: 500,
                date: '2025-11-07',
                status: 'Pending',
            },
            {
                id: 202,
                customer: 'Arian Ahmed',
                product: 'Keyboard',
                quantity: 2,
                total: 100,
                date: '2025-11-08',
                status: 'Pending',
            },
            {
                id: 203,
                customer: 'Nazma Rima',
                product: 'Mouse',
                quantity: 1,
                total: 30,
                date: '2025-11-09',
                status: 'Pending',
            },
        ]);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
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
                            <td className="border border-slate-300 px-4 py-2 text-yellow-600 font-semibold">
                                {order.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
