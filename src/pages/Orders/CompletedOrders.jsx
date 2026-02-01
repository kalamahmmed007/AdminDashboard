// src/pages/Orders/CompletedOrders.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Printer } from 'lucide-react';
import debounce from 'lodash.debounce';
import { Search, Download, Eye, Star, MessageSquare, Package, Calendar, DollarSign, TrendingUp, CheckCircle, FileText, RefreshCw } from 'lucide-react';

export default function CompletedOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [selectedOrders, setSelectedOrders] = useState([]);

    const completedOrders = [
        {
            id: '#ORD-2024-001',
            customer: 'John Doe',
            email: 'john@example.com',
            phone: '+1 234-567-8900',
            orderDate: '2024-11-18',
            completedDate: '2024-11-20',
            total: '$459.00',
            items: 3,
            paymentMethod: 'Credit Card',
            deliveryMethod: 'Express Shipping',
            rating: 5,
            hasReview: true,
            invoiceNo: 'INV-2024-001'
        },
        {
            id: '#ORD-2024-004',
            customer: 'Emily Brown',
            email: 'emily@example.com',
            phone: '+1 234-567-8901',
            orderDate: '2024-11-19',
            completedDate: '2024-11-22',
            total: '$892.00',
            items: 5,
            paymentMethod: 'PayPal',
            deliveryMethod: 'Standard Shipping',
            rating: 4,
            hasReview: true,
            invoiceNo: 'INV-2024-004'
        },
        {
            id: '#ORD-2024-011',
            customer: 'Michael Chen',
            email: 'michael@example.com',
            phone: '+1 234-567-8902',
            orderDate: '2024-11-17',
            completedDate: '2024-11-20',
            total: '$345.50',
            items: 2,
            paymentMethod: 'Credit Card',
            deliveryMethod: 'Express Shipping',
            rating: 5,
            hasReview: false,
            invoiceNo: 'INV-2024-011'
        },
        {
            id: '#ORD-2024-012',
            customer: 'Sarah Anderson',
            email: 'sarah.a@example.com',
            phone: '+1 234-567-8903',
            orderDate: '2024-11-16',
            completedDate: '2024-11-21',
            total: '$678.00',
            items: 4,
            paymentMethod: 'Bank Transfer',
            deliveryMethod: 'Standard Shipping',
            rating: 3,
            hasReview: true,
            invoiceNo: 'INV-2024-012'
        },
        {
            id: '#ORD-2024-013',
            customer: 'David Wilson',
            email: 'david.w@example.com',
            phone: '+1 234-567-8904',
            orderDate: '2024-11-15',
            completedDate: '2024-11-19',
            total: '$234.00',
            items: 1,
            paymentMethod: 'Credit Card',
            deliveryMethod: 'Express Shipping',
            rating: 5,
            hasReview: true,
            invoiceNo: 'INV-2024-013'
        },
        {
            id: '#ORD-2024-014',
            customer: 'Jessica Martinez',
            email: 'jessica@example.com',
            phone: '+1 234-567-8905',
            orderDate: '2024-11-14',
            completedDate: '2024-11-18',
            total: '$1,245.00',
            items: 7,
            paymentMethod: 'PayPal',
            deliveryMethod: 'Premium Shipping',
            rating: 4,
            hasReview: true,
            invoiceNo: 'INV-2024-014'
        }
    ];

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const toggleOrderSelection = (orderId) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const toggleAllOrders = () => {
        if (selectedOrders.length === completedOrders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(completedOrders.map(order => order.id));
        }
    };

    const downloadInvoice = (invoiceNo) => {
        console.log('Downloading invoice:', invoiceNo);
    };

    const filteredOrders = completedOrders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesDate = true;
        if (dateFilter !== 'all') {
            const today = new Date('2024-11-22');
            const completedDate = new Date(order.completedDate);
            const diffDays = Math.floor((today - completedDate) / (1000 * 60 * 60 * 24));

            if (dateFilter === 'today') matchesDate = diffDays === 0;
            if (dateFilter === 'week') matchesDate = diffDays <= 7;
            if (dateFilter === 'month') matchesDate = diffDays <= 30;
        }

        return matchesSearch && matchesDate;
    });

    const totalRevenue = completedOrders.reduce((sum, order) =>
        sum + parseFloat(order.total.replace(/[$,]/g, '')), 0
    );

    const avgRating = (completedOrders.reduce((sum, order) => sum + order.rating, 0) / completedOrders.length).toFixed(1);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Completed Orders</h1>
                            <p className="mt-1 text-gray-600">Successfully delivered and completed orders</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">{completedOrders.length} Orders Completed</span>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{completedOrders.length}</p>
                                <p className="mt-1 text-xs text-green-600">+12% from last week</p>
                            </div>
                            <CheckCircle className="h-10 w-10 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                                <p className="mt-1 text-xs text-blue-600">From completed orders</p>
                            </div>
                            <DollarSign className="h-10 w-10 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Average Rating</p>
                                <p className="text-2xl font-bold text-gray-900">{avgRating} / 5.0</p>
                                <div className="mt-1">{renderStars(Math.round(parseFloat(avgRating)))}</div>
                            </div>
                            <Star className="h-10 w-10 text-yellow-500" />
                        </div>
                    </div>
                    <div className="rounded-lg border-l-4 border-purple-500 bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">With Reviews</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {completedOrders.filter(o => o.hasReview).length}
                                </p>
                                <p className="mt-1 text-xs text-purple-600">
                                    {((completedOrders.filter(o => o.hasReview).length / completedOrders.length) * 100).toFixed(0)}% review rate
                                </p>
                            </div>
                            <MessageSquare className="h-10 w-10 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Filters and Actions */}
                <div className="mb-6 rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            {/* Search */}
                            <div className="relative max-w-md flex-1">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search completed orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {/* Filter and Actions */}
                            <div className="flex items-center gap-3">
                                <select
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">Last 7 Days</option>
                                    <option value="month">Last 30 Days</option>
                                </select>

                                <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">
                                    <Download className="h-4 w-4" />
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.length === completedOrders.length}
                                            onChange={toggleAllOrders}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Order Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Completed Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Rating
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.includes(order.id)}
                                                onChange={() => toggleOrderSelection(order.id)}
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-blue-600">{order.id}</span>
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                                                <span className="text-xs text-gray-500">{order.email}</span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.orderDate}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                                                <Calendar className="h-4 w-4" />
                                                {order.completedDate}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                            {order.items}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {order.total}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                {renderStars(order.rating)}
                                                {order.hasReview && (
                                                    <span className="flex items-center gap-1 text-xs text-purple-600">
                                                        <MessageSquare className="h-3 w-3" />
                                                        Review
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="rounded p-1 hover:bg-gray-100"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4 text-gray-600" />
                                                </button>
                                                <button
                                                    onClick={() => downloadInvoice(order.invoiceNo)}
                                                    className="rounded p-1 hover:bg-gray-100"
                                                    title="Download Invoice"
                                                >
                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                </button>
                                                <button
                                                    className="rounded p-1 hover:bg-gray-100"
                                                    title="Reorder"
                                                >
                                                    <RefreshCw className="h-4 w-4 text-green-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredOrders.length === 0 && (
                        <div className="p-12 text-center">
                            <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">No Completed Orders</h3>
                            <p className="text-gray-500">No orders match your search criteria.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                            <span className="font-medium">88</span> completed orders
                        </div>
                        <div className="flex gap-2">
                            <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                                Previous
                            </button>
                            <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                                1
                            </button>
                            <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                                2
                            </button>
                            <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                                3
                            </button>
                            <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}