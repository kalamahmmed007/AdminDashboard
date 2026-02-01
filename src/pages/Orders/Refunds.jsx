import { useState } from "react";
import { ArrowLeft, Search, Filter, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, Eye, MessageSquare, CreditCard, Package, User, Calendar, ChevronDown, X, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

export default function Refunds() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRefund, setSelectedRefund] = useState(null);
    const [showProcessModal, setShowProcessModal] = useState(false);
    const [processAction, setProcessAction] = useState(null);

    const stats = [
        { label: 'Pending Refunds', value: '$1,234.56', count: 8, icon: Clock, color: 'yellow', trend: '+12%' },
        { label: 'Approved Today', value: '$567.89', count: 3, icon: CheckCircle, color: 'green', trend: '+5%' },
        { label: 'Rejected Today', value: '$89.99', count: 1, icon: XCircle, color: 'red', trend: '-2%' },
        { label: 'Total This Month', value: '$4,521.30', count: 42, icon: DollarSign, color: 'blue', trend: '+8%' }
    ];

    const refunds = [
        {
            id: 'REF-2024-001',
            orderId: '#ORD-2024-001',
            customer: { name: 'John Doe', email: 'john@example.com', avatar: '👤' },
            amount: 159.98,
            reason: 'Defective product',
            description: 'Wireless headphones stopped working after 2 days. Left ear has no sound.',
            items: [{ name: 'Wireless Headphones', qty: 2, price: 79.99, image: '🎧' }],
            status: 'pending',
            requestDate: '2024-11-20 09:30 AM',
            paymentMethod: 'Credit Card (**** 4242)',
            timeline: [
                { action: 'Refund Requested', date: '2024-11-20 09:30 AM', by: 'Customer' },
                { action: 'Under Review', date: '2024-11-20 10:00 AM', by: 'System' }
            ]
        },
        {
            id: 'REF-2024-002',
            orderId: '#ORD-2024-015',
            customer: { name: 'Sarah Miller', email: 'sarah@example.com', avatar: '👩' },
            amount: 49.99,
            reason: 'Wrong item received',
            description: 'Ordered blue case but received red one instead.',
            items: [{ name: 'Phone Case Premium', qty: 1, price: 49.99, image: '📱' }],
            status: 'approved',
            requestDate: '2024-11-19 02:15 PM',
            processedDate: '2024-11-20 11:00 AM',
            paymentMethod: 'PayPal',
            timeline: [
                { action: 'Refund Requested', date: '2024-11-19 02:15 PM', by: 'Customer' },
                { action: 'Approved', date: '2024-11-20 11:00 AM', by: 'Admin' },
                { action: 'Refund Processed', date: '2024-11-20 11:05 AM', by: 'System' }
            ]
        },
        {
            id: 'REF-2024-003',
            orderId: '#ORD-2024-008',
            customer: { name: 'Mike Johnson', email: 'mike@example.com', avatar: '👨' },
            amount: 299.99,
            reason: 'Changed mind',
            description: 'No longer need the product. Unopened and in original packaging.',
            items: [{ name: 'Smart Speaker Pro', qty: 1, price: 299.99, image: '🔊' }],
            status: 'pending',
            requestDate: '2024-11-20 08:45 AM',
            paymentMethod: 'Credit Card (**** 1234)',
            timeline: [
                { action: 'Refund Requested', date: '2024-11-20 08:45 AM', by: 'Customer' }
            ]
        },
        {
            id: 'REF-2024-004',
            orderId: '#ORD-2024-003',
            customer: { name: 'Emily Chen', email: 'emily@example.com', avatar: '👧' },
            amount: 89.99,
            reason: 'Item not as described',
            description: 'Product quality is much lower than shown in photos.',
            items: [{ name: 'Leather Wallet', qty: 1, price: 89.99, image: '👛' }],
            status: 'rejected',
            requestDate: '2024-11-18 04:20 PM',
            processedDate: '2024-11-19 09:00 AM',
            rejectionReason: 'Item shows signs of use. Return policy requires unused items.',
            paymentMethod: 'Debit Card (**** 5678)',
            timeline: [
                { action: 'Refund Requested', date: '2024-11-18 04:20 PM', by: 'Customer' },
                { action: 'Rejected', date: '2024-11-19 09:00 AM', by: 'Admin' }
            ]
        },
        {
            id: 'REF-2024-005',
            orderId: '#ORD-2024-022',
            customer: { name: 'David Park', email: 'david@example.com', avatar: '🧑' },
            amount: 124.50,
            reason: 'Damaged during shipping',
            description: 'Package arrived with visible damage. Screen is cracked.',
            items: [{ name: 'Tablet Stand', qty: 1, price: 124.50, image: '📲' }],
            status: 'processing',
            requestDate: '2024-11-19 11:30 AM',
            paymentMethod: 'Credit Card (**** 9012)',
            timeline: [
                { action: 'Refund Requested', date: '2024-11-19 11:30 AM', by: 'Customer' },
                { action: 'Approved', date: '2024-11-20 08:00 AM', by: 'Admin' },
                { action: 'Processing Refund', date: '2024-11-20 08:05 AM', by: 'System' }
            ]
        }
    ];

    const tabs = [
        { id: 'all', label: 'All Refunds', count: refunds.length },
        { id: 'pending', label: 'Pending', count: refunds.filter(r => r.status === 'pending').length },
        { id: 'processing', label: 'Processing', count: refunds.filter(r => r.status === 'processing').length },
        { id: 'approved', label: 'Approved', count: refunds.filter(r => r.status === 'approved').length },
        { id: 'rejected', label: 'Rejected', count: refunds.filter(r => r.status === 'rejected').length }
    ];

    const filteredRefunds = refunds.filter(r => {
        const matchesTab = activeTab === 'all' || r.status === activeTab;
        const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.orderId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            processing: 'bg-blue-100 text-blue-800 border-blue-300',
            approved: 'bg-green-100 text-green-800 border-green-300',
            rejected: 'bg-red-100 text-red-800 border-red-300'
        };
        const icons = {
            pending: Clock,
            processing: RefreshCw,
            approved: CheckCircle,
            rejected: XCircle
        };
        const Icon = icons[status];
        return (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}>
                <Icon className="h-3 w-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const openProcessModal = (refund, action) => {
        setSelectedRefund(refund);
        setProcessAction(action);
        setShowProcessModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6">
                    <button className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Orders
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Refunds</h1>
                            <p className="mt-1 text-gray-600">Manage customer refund requests</p>
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="rounded-lg bg-white p-5 shadow">
                            <div className="flex items-center justify-between">
                                <div className={`rounded-lg p-2 bg-${stat.color}-100`}>
                                    <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                                </div>
                                <span className={`flex items-center text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-600">{stat.label} ({stat.count})</p>
                        </div>
                    ))}
                </div>

                {/* Tabs & Search */}
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-white text-gray-900 shadow'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search refunds..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none sm:w-64"
                        />
                    </div>
                </div>

                {/* Refunds List */}
                <div className="space-y-4">
                    {filteredRefunds.map(refund => (
                        <div key={refund.id} className="rounded-lg bg-white shadow">
                            <div className="p-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    {/* Left: Refund Info */}
                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                                            {refund.customer.avatar}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-gray-900">{refund.id}</h3>
                                                {getStatusBadge(refund.status)}
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">
                                                <span className="font-medium">{refund.customer.name}</span> • {refund.orderId}
                                            </p>
                                            <p className="mt-2 text-sm text-gray-700">
                                                <span className="font-medium text-gray-900">Reason:</span> {refund.reason}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">{refund.description}</p>
                                        </div>
                                    </div>

                                    {/* Right: Amount & Actions */}
                                    <div className="flex items-start justify-between gap-6 lg:text-right">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">${refund.amount.toFixed(2)}</p>
                                            <p className="mt-1 text-xs text-gray-500">{refund.requestDate}</p>
                                            <p className="mt-1 text-xs text-gray-500">{refund.paymentMethod}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedRefund(selectedRefund?.id === refund.id ? null : refund)}
                                                className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50"
                                            >
                                                <Eye className="h-4 w-4 text-gray-600" />
                                            </button>
                                            {refund.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => openProcessModal(refund, 'approve')}
                                                        className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => openProcessModal(refund, 'reject')}
                                                        className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {selectedRefund?.id === refund.id && (
                                    <div className="mt-6 border-t pt-6">
                                        <div className="grid gap-6 lg:grid-cols-2">
                                            {/* Items */}
                                            <div>
                                                <h4 className="mb-3 text-sm font-semibold text-gray-900">Items for Refund</h4>
                                                {refund.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                                        <span className="text-2xl">{item.image}</span>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                            <p className="text-xs text-gray-500">Qty: {item.qty} × ${item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Timeline */}
                                            <div>
                                                <h4 className="mb-3 text-sm font-semibold text-gray-900">Activity Timeline</h4>
                                                <div className="space-y-3">
                                                    {refund.timeline.map((event, idx) => (
                                                        <div key={idx} className="flex gap-3">
                                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                                                <div className="h-2 w-2 rounded-full bg-blue-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{event.action}</p>
                                                                <p className="text-xs text-gray-500">{event.date} • {event.by}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {refund.status === 'rejected' && refund.rejectionReason && (
                                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                                                <div className="flex items-start gap-2">
                                                    <AlertCircle className="h-5 w-5 text-red-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-red-800">Rejection Reason</p>
                                                        <p className="text-sm text-red-700">{refund.rejectionReason}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRefunds.length === 0 && (
                    <div className="rounded-lg bg-white p-12 text-center shadow">
                        <DollarSign className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No refunds found</h3>
                        <p className="mt-2 text-sm text-gray-500">No refund requests match your current filters.</p>
                    </div>
                )}
            </div>

            {/* Process Modal */}
            {showProcessModal && selectedRefund && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {processAction === 'approve' ? 'Approve Refund' : 'Reject Refund'}
                            </h3>
                            <button onClick={() => setShowProcessModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-4 rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-600">Refund ID: <span className="font-medium text-gray-900">{selectedRefund.id}</span></p>
                            <p className="text-sm text-gray-600">Customer: <span className="font-medium text-gray-900">{selectedRefund.customer.name}</span></p>
                            <p className="mt-2 text-xl font-bold text-gray-900">${selectedRefund.amount.toFixed(2)}</p>
                        </div>

                        {processAction === 'reject' && (
                            <div className="mb-4">
                                <label className="mb-1 block text-sm font-medium text-gray-700">Rejection Reason</label>
                                <textarea
                                    placeholder="Explain why this refund is being rejected..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                                    rows="3"
                                />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowProcessModal(false)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowProcessModal(false)}
                                className={`flex-1 rounded-lg px-4 py-2 text-white ${processAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                {processAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}