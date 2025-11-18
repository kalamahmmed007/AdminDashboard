// src/pages/Orders/CompletedOrders.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Printer } from 'lucide-react';
import debounce from 'lodash.debounce';

export default function CompletedOrders() {
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Completed');
    const [page, setPage] = useState(1);
    const limit = 5;

    // Dummy data
    useEffect(() => {
        setOrders([
            { id: 101, customer: 'Rimi TanHa', product: 'Laptop', quantity: 1, total: 1200, date: '2025-11-01', status: 'Completed' },
            { id: 102, customer: 'Arian Ahmed', product: 'Smartphone', quantity: 2, total: 1600, date: '2025-11-03', status: 'Completed' },
            { id: 103, customer: 'Nazma Rima', product: 'Headphones', quantity: 3, total: 300, date: '2025-11-05', status: 'Completed' },
            { id: 104, customer: 'Ali Khan', product: 'Monitor', quantity: 1, total: 400, date: '2025-11-06', status: 'Completed' },
            { id: 105, customer: 'Sara Ali', product: 'Keyboard', quantity: 2, total: 150, date: '2025-11-07', status: 'Completed' },
            { id: 106, customer: 'John Doe', product: 'Mouse', quantity: 1, total: 50, date: '2025-11-08', status: 'Completed' },
        ]);
    }, []);

    // Debounced search
    const handleSearchDebounced = useCallback(
        debounce((val) => setQuery(val), 300),
        []
    );

    const handleSearch = (e) => {
        handleSearchDebounced(e.target.value);
        setPage(1);
    };

    // Filter orders
    const filteredOrders = useMemo(() => {
        return orders.filter(o => {
            const matchesQuery =
                !query ||
                o.id.toString().includes(query) ||
                o.customer.toLowerCase().includes(query.toLowerCase());

            const matchesStatus = statusFilter === 'All' || o.status === statusFilter;

            return matchesQuery && matchesStatus;
        });
    }, [orders, query, statusFilter]);

    // Pagination
    const paginatedOrders = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredOrders.slice(start, start + limit);
    }, [filteredOrders, page]);

    // Status badge colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Actions
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            setOrders(prev => prev.filter(o => o.id !== id));
        }
    };

    const handleEdit = (id) => {
        alert(`Edit order ${id} (frontend only)`);
    };

    const handleStatusChange = (id, newStatus) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    const totalPages = Math.ceil(filteredOrders.length / limit);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="mb-6 text-2xl font-bold">Completed Orders</h1>

            {/* Search & Filter */}
            <div className="mb-4 flex flex-col items-center gap-3 md:flex-row">
                <input
                    placeholder="Search by ID or Customer"
                    className="rounded border px-3 py-2 md:w-1/3"
                    onChange={handleSearch}
                />
                <select
                    className="rounded border px-3 py-2"
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                >
                    <option value="All">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {paginatedOrders.map(order => (
                    <div key={order.id} className="flex flex-col items-center justify-between rounded-lg bg-white p-4 shadow md:flex-row">
                        <div className="mb-2 flex-1 md:mb-0">
                            <p className="text-sm text-gray-600">Order ID: <span className="font-semibold text-gray-900">{order.id}</span></p>
                            <p className="text-sm text-gray-600">Customer: <span className="font-semibold text-gray-900">{order.customer}</span></p>
                            <p className="text-sm text-gray-600">Product: <span className="font-semibold text-gray-900">{order.product}</span></p>
                            <p className="text-sm text-gray-600">Quantity: <span className="font-semibold text-gray-900">{order.quantity}</span></p>
                            <p className="text-sm text-gray-600">Total: <span className="font-semibold text-gray-900">${order.total}</span></p>
                            <p className="text-sm text-gray-600">Date: <span className="font-semibold text-gray-900">{order.date}</span></p>
                        </div>

                        <div className="flex flex-col items-center gap-2 md:flex-row">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>

                            <select
                                className="rounded border px-2 py-1 text-sm"
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            >
                                <option>Pending</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </select>

                            <button
                                className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
                            >
                                <Printer size={16} /> Print
                            </button>

                            <button
                                className="rounded bg-yellow-100 px-3 py-1 text-sm hover:bg-yellow-200"
                                onClick={() => handleEdit(order.id)}
                            >
                                Edit
                            </button>

                            <button
                                className="rounded bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
                                onClick={() => handleDelete(order.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div>
                    Showing {paginatedOrders.length} of {filteredOrders.length}
                </div>
                <div className="flex gap-2">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded border px-3 py-1 disabled:opacity-50">Prev</button>
                    <span className="rounded border px-3 py-1">Page {page}</span>
                    <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
}
