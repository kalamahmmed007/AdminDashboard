import React, { useState, useEffect } from 'react';
import {
    Users, Plus, Edit2, Trash2, Search, DollarSign, TrendingUp,
    Link2, CheckCircle, Clock, Share2, Copy, RefreshCw, Save, X,
    BarChart3, Award, Target, Eye, MousePointer, AlertCircle
} from 'lucide-react';

const Affilatemarketing = () => {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAffiliate, setEditingAffiliate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedCode, setCopiedCode] = useState(null);
    const [apiStatus, setApiStatus] = useState('idle');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        affiliateCode: '',
        commissionRate: '',
        totalSales: 0,
        totalCommission: 0,
        clicks: 0,
        conversions: 0,
        status: 'active',
        joinedDate: '',
        paymentMethod: 'bank',
        bankDetails: ''
    });

    useEffect(() => {
        const sampleAffiliates = [
            {
                id: 1,
                name: 'Md. Arif Rahman',
                email: 'arif@example.com',
                phone: '+880 1712-345678',
                affiliateCode: 'AFF001',
                commissionRate: 15,
                totalSales: 125000,
                totalCommission: 18750,
                clicks: 2450,
                conversions: 125,
                status: 'active',
                joinedDate: '2025-01-15',
                paymentMethod: 'bank',
                bankDetails: 'Dutch Bangla Bank - 1234567890',
                tier: 'gold',
                conversionRate: 5.1
            },
            {
                id: 2,
                name: 'Fatema Begum',
                email: 'fatema@example.com',
                phone: '+880 1812-345678',
                affiliateCode: 'AFF002',
                commissionRate: 12,
                totalSales: 89000,
                totalCommission: 10680,
                clicks: 1850,
                conversions: 89,
                status: 'active',
                joinedDate: '2025-02-10',
                paymentMethod: 'bkash',
                bankDetails: '01812345678',
                tier: 'silver',
                conversionRate: 4.8
            },
            {
                id: 3,
                name: 'Kamal Hossain',
                email: 'kamal@example.com',
                phone: '+880 1912-345678',
                affiliateCode: 'AFF003',
                commissionRate: 10,
                totalSales: 56000,
                totalCommission: 5600,
                clicks: 1200,
                conversions: 56,
                status: 'pending',
                joinedDate: '2025-10-01',
                paymentMethod: 'nagad',
                bankDetails: '01912345678',
                tier: 'bronze',
                conversionRate: 4.7
            }
        ];
        setAffiliates(sampleAffiliates);
    }, []);

    const sendToWebsite = async (affiliate) => {
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
                            content: `Process this Affiliate Partner data:

Affiliate: ${affiliate.name}
Email: ${affiliate.email}
Code: ${affiliate.affiliateCode}
Commission Rate: ${affiliate.commissionRate}%
Total Sales: ৳${affiliate.totalSales.toLocaleString()}
Total Commission: ৳${affiliate.totalCommission.toLocaleString()}
Clicks: ${affiliate.clicks}
Conversions: ${affiliate.conversions}
Conversion Rate: ${affiliate.conversionRate}%
Tier: ${affiliate.tier.toUpperCase()}
Payment Method: ${affiliate.paymentMethod}
Status: ${affiliate.status}

Confirm receipt and provide brief summary.`
                        }
                    ]
                })
            });

            const data = await response.json();
            if (data.content && data.content[0]) {
                setApiStatus('success');
                alert(`✅ Affiliate data sent!\n\n${data.content[0].text}`);
            }
        } catch (error) {
            setApiStatus('error');
            alert(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
            setTimeout(() => setApiStatus('idle'), 3000);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateAffiliateCode = () => {
        const code = 'AFF' + String(Date.now()).slice(-6);
        setFormData(prev => ({ ...prev, affiliateCode: code }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const conversionRate = formData.clicks > 0
            ? ((formData.conversions / formData.clicks) * 100).toFixed(1)
            : 0;

        const tier = formData.totalSales >= 100000 ? 'gold'
            : formData.totalSales >= 50000 ? 'silver'
                : 'bronze';

        if (editingAffiliate) {
            setAffiliates(prev => prev.map(a =>
                a.id === editingAffiliate.id
                    ? { ...formData, id: a.id, conversionRate: parseFloat(conversionRate), tier }
                    : a
            ));
        } else {
            const newAffiliate = {
                ...formData,
                id: Date.now(),
                conversionRate: parseFloat(conversionRate),
                tier
            };
            setAffiliates(prev => [newAffiliate, ...prev]);
        }

        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this affiliate?')) {
            setAffiliates(prev => prev.filter(a => a.id !== id));
        }
    };

    const handleEdit = (affiliate) => {
        setEditingAffiliate(affiliate);
        setFormData(affiliate);
        setShowAddModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: '', email: '', phone: '', affiliateCode: '', commissionRate: '',
            totalSales: 0, totalCommission: 0, clicks: 0, conversions: 0,
            status: 'active', joinedDate: '', paymentMethod: 'bank', bankDetails: ''
        });
        setEditingAffiliate(null);
        setShowAddModal(false);
    };

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const filteredAffiliates = affiliates.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.affiliateCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: affiliates.length,
        active: affiliates.filter(a => a.status === 'active').length,
        totalSales: affiliates.reduce((sum, a) => sum + a.totalSales, 0),
        totalCommission: affiliates.reduce((sum, a) => sum + a.totalCommission, 0),
        totalClicks: affiliates.reduce((sum, a) => sum + a.clicks, 0),
        totalConversions: affiliates.reduce((sum, a) => sum + a.conversions, 0)
    };

    const getTierColor = (tier) => {
        const colors = {
            gold: 'bg-yellow-100 text-yellow-700 border-yellow-300',
            silver: 'bg-gray-100 text-gray-700 border-gray-300',
            bronze: 'bg-orange-100 text-orange-700 border-orange-300'
        };
        return colors[tier] || 'bg-gray-100 text-gray-700';
    };

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-700',
            pending: 'bg-yellow-100 text-yellow-700',
            suspended: 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Affiliate Marketing</h1>
                    <p className="text-gray-600">Manage your affiliate partners and track commissions</p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-red-100 p-3">
                                <Users className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Affiliates</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-green-100 p-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Active</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-blue-100 p-3">
                                <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Sales</h3>
                        <p className="text-2xl font-bold text-gray-900">৳{stats.totalSales.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-purple-100 p-3">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Commission</h3>
                        <p className="text-2xl font-bold text-gray-900">৳{stats.totalCommission.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-orange-100 p-3">
                                <MousePointer className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Clicks</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalClicks.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-pink-100 p-3">
                                <Target className="h-6 w-6 text-pink-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Conversions</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalConversions}</p>
                    </div>
                </div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search affiliates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-red-500 focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                    >
                        <Plus className="h-5 w-5" />
                        Add Affiliate
                    </button>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Affiliate</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Code</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Commission</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Performance</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Metrics</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tier</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAffiliates.map((affiliate) => (
                                    <tr key={affiliate.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{affiliate.name}</p>
                                                <p className="text-sm text-gray-600">{affiliate.email}</p>
                                                <p className="text-xs text-gray-500">{affiliate.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <code className="rounded bg-gray-100 px-2 py-1 text-sm font-semibold text-red-600">
                                                    {affiliate.affiliateCode}
                                                </code>
                                                <button
                                                    onClick={() => handleCopy(affiliate.affiliateCode)}
                                                    className="rounded p-1 hover:bg-gray-200"
                                                >
                                                    {copiedCode === affiliate.affiliateCode ? (
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    ) : (
                                                        <Copy className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">{affiliate.commissionRate}%</p>
                                            <p className="text-sm text-green-600">৳{affiliate.totalCommission.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">earned</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">৳{affiliate.totalSales.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">{affiliate.conversions} conversions</p>
                                            <div className="mt-1 h-2 w-32 rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-red-600"
                                                    style={{ width: `${Math.min((affiliate.totalSales / 150000) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-700">{affiliate.clicks} clicks</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Target className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm text-gray-700">{affiliate.conversionRate}% CVR</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getTierColor(affiliate.tier)}`}>
                                                {affiliate.tier.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(affiliate.status)}`}>
                                                {affiliate.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => sendToWebsite(affiliate)}
                                                    disabled={loading}
                                                    className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700 disabled:opacity-50"
                                                    title="Send to Website"
                                                >
                                                    <Share2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(affiliate)}
                                                    className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(affiliate.id)}
                                                    className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
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

                {apiStatus !== 'idle' && (
                    <div className={`mt-4 rounded-lg p-4 ${apiStatus === 'sending' ? 'bg-blue-100 text-blue-800' :
                        apiStatus === 'success' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        <div className="flex items-center gap-2">
                            {apiStatus === 'sending' && <RefreshCw className="h-5 w-5 animate-spin" />}
                            {apiStatus === 'success' && <CheckCircle className="h-5 w-5" />}
                            {apiStatus === 'error' && <AlertCircle className="h-5 w-5" />}
                            <span className="font-semibold">
                                {apiStatus === 'sending' && 'Sending data...'}
                                {apiStatus === 'success' && 'Data sent successfully!'}
                                {apiStatus === 'error' && 'Failed to send'}
                            </span>
                        </div>
                    </div>
                )}

                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingAffiliate ? 'Edit Affiliate' : 'Add Affiliate'}
                                </h2>
                                <button onClick={resetForm} className="rounded-lg p-2 hover:bg-gray-100">
                                    <X className="h-6 w-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Affiliate Code *</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                name="affiliateCode"
                                                value={formData.affiliateCode}
                                                onChange={handleInputChange}
                                                required
                                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={generateAffiliateCode}
                                                className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Commission Rate (%) *</label>
                                        <input
                                            type="number"
                                            name="commissionRate"
                                            value={formData.commissionRate}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            max="100"
                                            step="0.1"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Total Sales (৳)</label>
                                        <input
                                            type="number"
                                            name="totalSales"
                                            value={formData.totalSales}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Commission (৳)</label>
                                        <input
                                            type="number"
                                            name="totalCommission"
                                            value={formData.totalCommission}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Clicks</label>
                                        <input
                                            type="number"
                                            name="clicks"
                                            value={formData.clicks}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Conversions</label>
                                        <input
                                            type="number"
                                            name="conversions"
                                            value={formData.conversions}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Joined Date</label>
                                        <input
                                            type="date"
                                            name="joinedDate"
                                            value={formData.joinedDate}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Payment Method</label>
                                        <select
                                            name="paymentMethod"
                                            value={formData.paymentMethod}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="bank">Bank Transfer</option>
                                            <option value="bkash">bKash</option>
                                            <option value="nagad">Nagad</option>
                                            <option value="rocket">Rocket</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="active">Active</option>
                                            <option value="pending">Pending</option>
                                            <option value="suspended">Suspended</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Payment Details</label>
                                    <input
                                        type="text"
                                        name="bankDetails"
                                        value={formData.bankDetails}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        placeholder="Bank account or mobile number"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                                    >
                                        <Save className="h-5 w-5" />
                                        {editingAffiliate ? 'Update Affiliate' : 'Add Affiliate'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Affilatemarketing;