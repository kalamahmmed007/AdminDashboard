// src/pages/Products/Inventory.jsx
import React, { useState } from 'react';

const mockInventory = [
    { id: 1, name: 'iPhone 15', category: 'Electronics', stock: 25, price: 1200 },
    { id: 2, name: 'Leather Jacket', category: 'Clothing', stock: 10, price: 250 },
    { id: 3, name: 'Bluetooth Headphones', category: 'Electronics', stock: 50, price: 100 },
    { id: 4, name: 'Sneakers', category: 'Clothing', stock: 30, price: 80 },
    { id: 5, name: 'Wrist Watch', category: 'Accessories', stock: 15, price: 180 },
];

export default function Inventory() {
    const [search, setSearch] = useState('');

    const filteredInventory = mockInventory.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Inventory</h1>

            <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-700 text-left">
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Category</th>
                            <th className="py-2 px-4">Stock</th>
                            <th className="py-2 px-4">Price ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map(item => (
                            <tr
                                key={item.id}
                                className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <td className="py-2 px-4">{item.id}</td>
                                <td className="py-2 px-4">{item.name}</td>
                                <td className="py-2 px-4">{item.category}</td>
                                <td className="py-2 px-4">{item.stock}</td>
                                <td className="py-2 px-4">{item.price}</td>
                            </tr>
                        ))}
                        {filteredInventory.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
