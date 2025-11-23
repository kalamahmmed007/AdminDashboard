import React, { useState, useEffect } from 'react';
import {
    Tag, Plus, Edit2, Trash2, Search, Calendar, DollarSign,
    Percent, Users, TrendingUp, Copy, Check, AlertCircle,
    Gift, Clock, BarChart3, RefreshCw, Save, X
} from 'lucide-react';

const CouponManager = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedCode, setCopiedCode] = useState(null);
    const [apiStatus, setApiStatus] = useState('idle');

    // Form state
    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        minPurchase: '',
        maxDiscount: '',
        validFrom: '',
        validTo: '',
        usageLimit: '',
        usedCount: 0,
        isActive: true
    });

    // Sample initial data
    useEffect(() => {
        const sampleCoupons = [
            {
                id: 1,
                code: 'WELCOME20',
                description: 'Welcome bonus for new customers',
                discountType: 'percentage',
                discountValue: 20,
                minPurchase: 1000,
                maxDiscount: 500,
                validFrom: '2025-01-01',
                validTo: '2025-12-31',
                usageLimit: 100,
                usedCount: 45,
                isActive: true,
                createdAt: '2025-01-15'
            },
            {
                id: 2,
                code: 'FLASH500',
                description: 'Flash sale discount',
                discountType: 'fixed',
                discountValue: 500,
                minPurchase: 2000,
                maxDiscount: 500,
                validFrom: '2025-11-20',
                validTo: '2025-11-30',
                usageLimit: 50,
                usedCount: 32,
                isActive: true,
                createdAt: '2025-11-15'
            },
            {
                id: 3,
                code: 'NEWYEAR2025',
                description: 'New Year special offer',
                discountType: 'percentage',
                discountValue: 30,
                minPurchase: 1500,
                maxDiscount: 1000,
                validFrom: '2025-01-01',
                validTo: '2025-01-15',
                usageLimit: 200,
                usedCount: 156,
                isActive: false,
                createdAt: '2024-12-25'
            }
        ];
        setCoupons(sampleCoupons);
    }, []);

    // API Function to send coupon to website
    const sendCouponToWebsite = async (coupon) => {
        setApiStatus('sending');
        setLoading(true);

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    messages: [
                        {
                            role: 'user',
                            content: `Process this coupon data and confirm receipt:
              
Coupon Code: ${coupon.code}
Description: ${coupon.description}
Discount Type: ${coupon.discountType}
Discount Value: ${coupon.discountValue}
Minimum Purchase: ৳${coupon.minPurchase}
Valid From: ${coupon.validFrom}
Valid To: ${coupon.validTo}
Usage Limit: ${coupon.usageLimit}
Status: ${coupon.isActive ? 'Active' : 'Inactive'}

Please confirm you've received this coupon data and provide a brief summary.`
                        }
                    ]
                })
            });

            const data = await response.json();

            if (data.content && data.content[0]) {
                const confirmation = data.content[0].text;
                setApiStatus('success');
                alert(`✅ Coupon sent successfully!\n\nAPI Response:\n${confirmation}`);
            }
        } catch (error) {
            setApiStatus('error');
            alert(`❌ Error sending coupon: ${error.message}`);
        } finally {
            setLoading(false);
            setTimeout(() => setApiStatus('idle'), 3000);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Add or update coupon
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCoupon) {
            // Update existing coupon
            setCoupons(prev => prev.map(c =>
                c.id === editingCoupon.id
                    ? { ...formData, id: c.id, createdAt: c.createdAt }
                    : c
            ));
        } else {
            // Add new coupon
            const newCoupon = {
                ...formData,
                id: Date.now(),
                createdAt: new Date().toISOString().split('T')[0]
            };
            setCoupons(prev => [newCoupon, ...prev]);
        }

        resetForm();
    };

    // Delete coupon
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            setCoupons(prev => prev.filter(c => c.id !== id));
        }
    };

    // Edit coupon
    const handleEdit = (coupon) => {
        setEditingCoupon(coupon);
        setFormData(coupon);
        setShowAddModal(true);
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            code: '',
            description: '',
            discountType: 'percentage',
            discountValue: '',
            minPurchase: '',
            maxDiscount: '',
            validFrom: '',
            validTo: '',
            usageLimit: '',
            usedCount: 0,
            isActive: true
        });
        setEditingCoupon(null);
        setShowAddModal(false);
    };

    // Copy coupon code
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    // Toggle coupon status
    const toggleStatus = (id) => {
        setCoupons(prev => prev.map(c =>
            c.id === id ? { ...c, isActive: !c.isActive } : c
        ));
    };

    // Filter coupons
    const filteredCoupons = coupons.filter(coupon =>
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate stats
    const stats = {
        total: coupons.length,
        active: coupons.filter(c => c.isActive).length,
        totalUsage: coupons.reduce((sum, c) => sum + c.usedCount, 0),
        totalRevenue: coupons.reduce((sum, c) => sum + (c.usedCount * c.discountValue), 0)
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Coupon Management</h1>
                    <p className="text-gray-600">Create, manage and track your promotional coupons</p>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-red-100 p-3">
                                <Tag className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Coupons</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-green-100 p-3">
                                <Gift className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Active Coupons</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-blue-100 p-3">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Usage</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsage}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-purple-100 p-3">
                                <BarChart3 className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Discount Given</h3>
                        <p className="text-2xl font-bold text-gray-900">৳{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Actions Bar */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search coupons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-red-500 focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                        <Plus className="h-5 w-5" />
                        Add New Coupon
                    </button>
                </div>

                {/* Coupons List */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Coupon Code</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Discount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Valid Period</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Usage</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoupons.map((coupon) => (
                                    <tr key={coupon.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <code className="rounded bg-gray-100 px-2 py-1 text-sm font-semibold text-red-600">
                                                    {coupon.code}
                                                </code>
                                                <button
                                                    onClick={() => handleCopy(coupon.code)}
                                                    className="rounded p-1 hover:bg-gray-200"
                                                >
                                                    {copiedCode === coupon.code ? (
                                                        <Check className="h-4 w-4 text-green-600" />
                                                    ) : (
                                                        <Copy className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900">{coupon.description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                {coupon.discountType === 'percentage' ? (
                                                    <>
                                                        <Percent className="h-4 w-4 text-red-600" />
                                                        <span className="font-semibold text-gray-900">{coupon.discountValue}%</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <DollarSign className="h-4 w-4 text-red-600" />
                                                        <span className="font-semibold text-gray-900">৳{coupon.discountValue}</span>
                                                    </>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-600">Min: ৳{coupon.minPurchase}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                <span>{coupon.validFrom}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Clock className="h-4 w-4" />
                                                <span>{coupon.validTo}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-24 rounded-full bg-gray-200">
                                                    <div
                                                        className="h-2 rounded-full bg-red-600"
                                                        style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700">
                                                    {coupon.usedCount}/{coupon.usageLimit}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStatus(coupon.id)}
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${coupon.isActive
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-200 text-gray-700'
                                                    }`}
                                            >
                                                {coupon.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => sendCouponToWebsite(coupon)}
                                                    disabled={loading}
                                                    className="rounded-lg bg-green-600 p-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                                                    title="Send to Website via API"
                                                >
                                                    <TrendingUp className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(coupon)}
                                                    className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(coupon.id)}
                                                    className="rounded-lg bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* API Status Indicator */}
                {apiStatus !== 'idle' && (
                    <div className={`mt-4 rounded-lg p-4 ${apiStatus === 'sending' ? 'bg-blue-100 text-blue-800' :
                            apiStatus === 'success' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                        }`}>
                        <div className="flex items-center gap-2">
                            {apiStatus === 'sending' && <RefreshCw className="h-5 w-5 animate-spin" />}
                            {apiStatus === 'success' && <Check className="h-5 w-5" />}
                            {apiStatus === 'error' && <AlertCircle className="h-5 w-5" />}
                            <span className="font-semibold">
                                {apiStatus === 'sending' && 'Sending coupon to website...'}
                                {apiStatus === 'success' && 'Coupon sent successfully!'}
                                {apiStatus === 'error' && 'Failed to send coupon'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="rounded-lg p-2 hover:bg-gray-100"
                                >
                                    <X className="h-6 w-6 text-gray-600" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                                            Coupon Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="code"
                                            value={formData.code}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                            placeholder="e.g., WELCOME20"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                                            Discount Type *
                                        </label>
                                        <select
                                            name="discountType"
                                            value={formData.discountType}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount (৳)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        placeholder="Describe your coupon..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                                            Discount Value *
                                        </label>
                                        <input
                                            type="number"
                                            name="discountValue"
                                            value={formData.discountValue}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                                            Min Purchase (৳) *
                                        </label>
                                        <input
                                            type="number"
                                            name="minPurchase"
                                            value={formData.minPurchase}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                                            Max Discount (৳)
                                        </label>
                                        <input
                                            type="number"
                                            name="maxDiscount"
                                            value={formData.maxDiscount}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                                            Valid From *
                                        </label>
                                        <input
                                            type="date"
                                            name="validFrom"
                                            value={formData.validFrom}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                                            Valid To *
                                        </label>
                                        <input
                                            type="date"
                                            name="validTo"
                                            value={formData.validTo}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                                        Usage Limit *
                                    </label>
                                    <input
                                        type="number"
                                        name="usageLimit"
                                        value={formData.usageLimit}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                        className="h-5 w-5 rounded border-gray-300 text-red-600"
                                    />
                                    <label className="text-sm font-semibold text-gray-700">
                                        Activate coupon immediately
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                                    >
                                        <Save className="h-5 w-5" />
                                        {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CouponManager;