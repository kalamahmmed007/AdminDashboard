// src/pages/Marketing/Coupons.jsx
import React, { useState, useEffect } from 'react';

export default function Coupons() {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', expiry: '' });

    // Dummy data, পরে API call দিয়ে replace করা যাবে
    useEffect(() => {
        setCoupons([
            { id: 1, code: 'WELCOME10', discount: '10%', expiry: '2025-12-31' },
            { id: 2, code: 'BLACKFRIDAY', discount: '25%', expiry: '2025-11-29' },
            { id: 3, code: 'FREESHIP', discount: 'Free Shipping', expiry: '2026-01-15' },
        ]);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCoupon = (e) => {
        e.preventDefault();
        if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiry) return;
        setCoupons(prev => [...prev, { id: prev.length + 1, ...newCoupon }]);
        setNewCoupon({ code: '', discount: '', expiry: '' });
    };

    const handleDelete = (id) => {
        setCoupons(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Coupons</h1>

            {/* Add Coupon Form */}
            <form onSubmit={handleAddCoupon} className="mb-6 flex flex-col gap-2 max-w-md">
                <input
                    type="text"
                    name="code"
                    placeholder="Coupon Code"
                    value={newCoupon.code}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    name="discount"
                    placeholder="Discount (e.g., 10% or Free Shipping)"
                    value={newCoupon.discount}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="date"
                    name="expiry"
                    value={newCoupon.expiry}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
                >
                    Add Coupon
                </button>
            </form>

            {/* Coupons Table */}
            <table className="w-full border-collapse border border-slate-300">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border border-slate-300 px-4 py-2">ID</th>
                        <th className="border border-slate-300 px-4 py-2">Code</th>
                        <th className="border border-slate-300 px-4 py-2">Discount</th>
                        <th className="border border-slate-300 px-4 py-2">Expiry Date</th>
                        <th className="border border-slate-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id} className="hover:bg-slate-50">
                            <td className="border border-slate-300 px-4 py-2">{coupon.id}</td>
                            <td className="border border-slate-300 px-4 py-2">{coupon.code}</td>
                            <td className="border border-slate-300 px-4 py-2">{coupon.discount}</td>
                            <td className="border border-slate-300 px-4 py-2">{coupon.expiry}</td>
                            <td className="border border-slate-300 px-4 py-2">
                                <button
                                    onClick={() => handleDelete(coupon.id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {coupons.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center p-4 text-slate-500">
                                No coupons available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
