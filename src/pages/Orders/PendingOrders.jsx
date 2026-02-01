// src/pages/Orders/PendingOrders.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Printer } from 'lucide-react';
import debounce from 'lodash.debounce';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, AlertCircle, Calendar, DollarSign, User } from 'lucide-react';

export default function PendingOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    const pendingOrders = [
        {
            id: '#ORD-2024-003',
            customer: 'Mike Johnson',
            email: 'mike@example.com',
            phone: '+1 234-567-8900',
            date: '2024-11-21',
            time: '10:30 AM',
            total: '$125.00',
            items: 1,
            payment: 'Pending',
            paymentMethod: 'Bank Transfer',
            priority: 'high',
            hoursWaiting: 26
        },
        {
            id: '#ORD-2024-007',
            customer: 'Jennifer Wilson',
            email: 'jennifer@example.com',
            phone: '+1 234-567-8901',
            date: '2024-11-22',
            time: '09:15 AM',
            total: '$678.00',
            items: 4,
            payment: 'Pending',
            paymentMethod: 'Cash on Delivery',
            priority: 'normal',
            hoursWaiting: 3
        },
        {
            id: '#ORD-2024-008',
            customer: 'Robert Taylor',
            email: 'robert@example.com',
            phone: '+1 234-567-8902',
            date: '2024-11-22',
            time: '11:45 AM',
            total: '$234.50',
            items: 2,
            payment: 'Pending',
            paymentMethod: 'Credit Card',
            priority: 'urgent',
            hoursWaiting: 1
        },
        {
            id: '#ORD-2024-009',
            customer: 'Amanda Garcia',
            email: 'amanda@example.com',
            phone: '+1 234-567-8903',
            date: '2024-11-22',
            time: '08:20 AM',
            total: '$445.00',
            items: 3,
            payment: 'Pending',
            paymentMethod: 'PayPal',
            priority: 'normal',
            hoursWaiting: 4
        },
        {
            id: '#ORD-2024-010',
            customer: 'Christopher Martinez',
            email: 'chris@example.com',
            phone: '+1 234-567-8904',
            date: '2024-11-20',
            time: '03:30 PM',
            total: '$892.00',
            items: 6,
            payment: 'Pending',
            paymentMethod: 'Bank Transfer',
            priority: 'high',
            hoursWaiting: 45
        }
    ];

    const getPriorityColor = (priority) => {
        const colors = {
            urgent: 'bg-red-100 text-red-800 border-red-300',
            high: 'bg-orange-100 text-orange-800 border-orange-300',
            normal: 'bg-blue-100 text-blue-800 border-blue-300'
        };
        return colors[priority];
    };

    const getPriorityIcon = (priority) => {
        if (priority === 'urgent') return <AlertCircle className="h-3 w-3" />;
        if (priority === 'high') return <Clock className="h-3 w-3" />;
        return null;
    };

    const toggleOrderSelection = (orderId) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const toggleAllOrders = () => {
        if (selectedOrders.length === pendingOrders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(pendingOrders.map(order => order.id));
        }
    };

    const approveOrder = (orderId) => {
        console.log('Approving order:', orderId);
        // Add approval logic here
    };

    const rejectOrder = (orderId) => {
        console.log('Rejecting order:', orderId);
        // Add rejection logic here
    };

    const bulkApprove = () => {
        console.log('Bulk approving:', selectedOrders);
        // Add bulk approval logic here
    };

    const filteredOrders = pendingOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (sortBy === 'newest') return b.hoursWaiting - a.hoursWaiting;
        if (sortBy === 'oldest') return a.hoursWaiting - b.hoursWaiting;
        if (sortBy === 'amount-high') return parseFloat(b.total.slice(1)) - parseFloat(a.total.slice(1));
        if (sortBy === 'amount-low') return parseFloat(a.total.slice(1)) - parseFloat(b.total.slice(1));
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Pending Orders</h1>
                            <p className="mt-1 text-gray-600">Orders waiting for approval or payment confirmation</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2">
                            <Clock className="h-5 w-5 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">{pendingOrders.length} Orders Pending</span>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
                            </div>
                            <Clock className="h-10 w-10 text-yellow-500" />
                        </div>
                    </div>
                    <div className="rounded-lg border-l-4 border-red-500 bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Urgent</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {pendingOrders.filter(o => o.priority === 'urgent').length}
                                </p>
                            </div>
                            <AlertCircle className="h-10 w-10 text-red-500" />
                        </div>
                    </div>
                    <div className="rounded-lg border-l-4 border-orange-500 bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">High Priority</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {pendingOrders.filter(o => o.priority === 'high').length}
                                </p>
                            </div>
                            <Clock className="h-10 w-10 text-orange-500" />
                        </div>
                    </div>
                    <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending Value</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${pendingOrders.reduce((sum, o) => sum + parseFloat(o.total.slice(1)), 0).toFixed(2)}
                                </p>
                            </div>
                            <DollarSign className="h-10 w-10 text-green-500" />
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
                                    placeholder="Search pending orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                            {/* Sort and Actions */}
                            <div className="flex items-center gap-3">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="newest">Oldest First</option>
                                    <option value="oldest">Newest First</option>
                                    <option value="amount-high">Amount: High to Low</option>
                                    <option value="amount-low">Amount: Low to High</option>
                                </select>

                                {selectedOrders.length > 0 && (
                                    <button
                                        onClick={bulkApprove}
                                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Approve Selected ({selectedOrders.length})
                                    </button>
                                )}

                                <button className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700">
                                    <Download className="h-4 w-4" />
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="divide-y divide-gray-200">
                        {sortedOrders.map((order) => (
                            <div key={order.id} className="p-6 transition hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    {/* Checkbox */}
                                    <input
                                        type="checkbox"
                                        checked={selectedOrders.includes(order.id)}
                                        onChange={() => toggleOrderSelection(order.id)}
                                        className="mt-1 rounded border-gray-300"
                                    />

                                    {/* Order Details */}
                                    <div className="flex-1">
                                        <div className="mb-3 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg font-semibold text-blue-600">{order.id}</span>
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(order.priority)}`}>
                                                    {getPriorityIcon(order.priority)}
                                                    {order.priority.toUpperCase()}
                                                </span>
                                                {order.hoursWaiting > 24 && (
                                                    <span className="inline-flex items-center gap-1 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {order.hoursWaiting}h waiting
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-2xl font-bold text-gray-900">{order.total}</span>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                                    <p className="text-xs text-gray-500">{order.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-900">{order.date}</p>
                                                    <p className="text-xs text-gray-500">{order.time}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Payment Method</p>
                                                <p className="text-sm font-medium text-gray-900">{order.paymentMethod}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Items</p>
                                                <p className="text-sm font-medium text-gray-900">{order.items} item(s)</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => approveOrder(order.id)}
                                                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                Approve & Process
                                            </button>
                                            <button
                                                onClick={() => rejectOrder(order.id)}
                                                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                            >
                                                <XCircle className="h-4 w-4" />
                                                Reject
                                            </button>
                                            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50">
                                                <Eye className="h-4 w-4" />
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {sortedOrders.length === 0 && (
                        <div className="p-12 text-center">
                            <Clock className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">No Pending Orders</h3>
                            <p className="text-gray-500">All orders have been processed or there are no matching results.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}