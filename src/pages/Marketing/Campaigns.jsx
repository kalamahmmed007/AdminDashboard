import React, { useState, useEffect } from 'react';
import {
    Mail, MessageSquare, Plus, Edit2, Trash2, Search, Send,
    Users, TrendingUp, Eye, MousePointer, CheckCircle, X,
    RefreshCw, Save, Share2, AlertCircle, Calendar, BarChart3
} from 'lucide-react';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [apiStatus, setApiStatus] = useState('idle');

    const [formData, setFormData] = useState({
        name: '',
        type: 'email',
        subject: '',
        content: '',
        targetAudience: 'all',
        scheduledDate: '',
        scheduledTime: '',
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        status: 'draft'
    });

    useEffect(() => {
        const sampleCampaigns = [
            {
                id: 1,
                name: 'Black Friday Special Offers',
                type: 'email',
                subject: 'Dont Miss 70% OFF - Black Friday Sale!',
                content: 'Exclusive deals waiting for you...',
                targetAudience: 'all',
                scheduledDate: '2025-11-25',
                scheduledTime: '10:00',
                sent: 25000,
                delivered: 24500,
                opened: 12250,
                clicked: 3675,
                status: 'sent',
                createdAt: '2025-11-20',
                openRate: 50.0,
                clickRate: 15.0
            },
            {
                id: 2,
                name: 'New Product Launch SMS',
                type: 'sms',
                subject: '',
                content: 'New collection launched! Visit our store now.',
                targetAudience: 'active',
                scheduledDate: '2025-11-26',
                scheduledTime: '14:00',
                sent: 15000,
                delivered: 14850,
                opened: 0,
                clicked: 2227,
                status: 'sent',
                createdAt: '2025-11-15',
                openRate: 0,
                clickRate: 15.0
            },
            {
                id: 3,
                name: 'Weekly Newsletter',
                type: 'email',
                subject: 'This Weeks Top Picks Just For You',
                content: 'Curated selection of products...',
                targetAudience: 'subscribers',
                scheduledDate: '2025-11-27',
                scheduledTime: '09:00',
                sent: 0,
                delivered: 0,
                opened: 0,
                clicked: 0,
                status: 'scheduled',
                createdAt: '2025-11-22',
                openRate: 0,
                clickRate: 0
            },
            {
                id: 4,
                name: 'Cart Abandonment Follow-up',
                type: 'email',
                subject: 'You left something behind!',
                content: 'Complete your purchase and get 10% off',
                targetAudience: 'abandoned',
                scheduledDate: '',
                scheduledTime: '',
                sent: 0,
                delivered: 0,
                opened: 0,
                clicked: 0,
                status: 'draft',
                createdAt: '2025-11-23',
                openRate: 0,
                clickRate: 0
            }
        ];
        setCampaigns(sampleCampaigns);
    }, []);

    const sendToWebsite = async (campaign) => {
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
                            content: `Process this Marketing Campaign:

Campaign: ${campaign.name}
Type: ${campaign.type.toUpperCase()}
${campaign.type === 'email' ? `Subject: ${campaign.subject}` : ''}
Content: ${campaign.content}
Target: ${campaign.targetAudience}
${campaign.scheduledDate ? `Scheduled: ${campaign.scheduledDate} ${campaign.scheduledTime}` : ''}
Sent: ${campaign.sent.toLocaleString()}
Delivered: ${campaign.delivered.toLocaleString()}
${campaign.type === 'email' ? `Opened: ${campaign.opened.toLocaleString()} (${campaign.openRate}%)` : ''}
Clicked: ${campaign.clicked.toLocaleString()} (${campaign.clickRate}%)
Status: ${campaign.status}

Confirm receipt and analysis.`
                        }
                    ]
                })
            });

            const data = await response.json();
            if (data.content && data.content[0]) {
                setApiStatus('success');
                alert(`✅ Campaign sent!\n\n${data.content[0].text}`);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const openRate = formData.sent > 0 && formData.type === 'email'
            ? ((formData.opened / formData.sent) * 100).toFixed(1)
            : 0;

        const clickRate = formData.sent > 0
            ? ((formData.clicked / formData.sent) * 100).toFixed(1)
            : 0;

        if (editingCampaign) {
            setCampaigns(prev => prev.map(c =>
                c.id === editingCampaign.id
                    ? { ...formData, id: c.id, createdAt: c.createdAt, openRate: parseFloat(openRate), clickRate: parseFloat(clickRate) }
                    : c
            ));
        } else {
            const newCampaign = {
                ...formData,
                id: Date.now(),
                createdAt: new Date().toISOString().split('T')[0],
                openRate: parseFloat(openRate),
                clickRate: parseFloat(clickRate)
            };
            setCampaigns(prev => [newCampaign, ...prev]);
        }

        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this campaign?')) {
            setCampaigns(prev => prev.filter(c => c.id !== id));
        }
    };

    const handleEdit = (campaign) => {
        setEditingCampaign(campaign);
        setFormData(campaign);
        setShowAddModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: '', type: 'email', subject: '', content: '',
            targetAudience: 'all', scheduledDate: '', scheduledTime: '',
            sent: 0, delivered: 0, opened: 0, clicked: 0, status: 'draft'
        });
        setEditingCampaign(null);
        setShowAddModal(false);
    };

    const filteredCampaigns = campaigns.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const stats = {
        total: campaigns.length,
        sent: campaigns.filter(c => c.status === 'sent').length,
        totalSent: campaigns.reduce((sum, c) => sum + c.sent, 0),
        totalOpened: campaigns.reduce((sum, c) => sum + c.opened, 0),
        totalClicked: campaigns.reduce((sum, c) => sum + c.clicked, 0),
        scheduled: campaigns.filter(c => c.status === 'scheduled').length
    };

    const avgOpenRate = stats.totalSent > 0
        ? ((stats.totalOpened / stats.totalSent) * 100).toFixed(1)
        : 0;

    const getStatusColor = (status) => {
        const colors = {
            draft: 'bg-gray-100 text-gray-700',
            scheduled: 'bg-blue-100 text-blue-700',
            sending: 'bg-yellow-100 text-yellow-700',
            sent: 'bg-green-100 text-green-700',
            failed: 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getTypeIcon = (type) => {
        return type === 'email' ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
                    <p className="text-gray-600">Create and manage email & SMS campaigns</p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-red-100 p-3">
                                <BarChart3 className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Campaigns</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-green-100 p-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Sent</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-blue-100 p-3">
                                <Send className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Sent</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalSent.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-purple-100 p-3">
                                <Eye className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Opened</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalOpened.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-orange-100 p-3">
                                <MousePointer className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Clicked</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalClicked.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-pink-100 p-3">
                                <TrendingUp className="h-6 w-6 text-pink-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Avg Open Rate</h3>
                        <p className="text-2xl font-bold text-gray-900">{avgOpenRate}%</p>
                    </div>
                </div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
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
                        New Campaign
                    </button>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Campaign</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Target</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Schedule</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Performance</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCampaigns.map((campaign) => (
                                    <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{campaign.name}</p>
                                                {campaign.subject && (
                                                    <p className="text-sm text-gray-600">{campaign.subject}</p>
                                                )}
                                                <p className="mt-1 text-xs text-gray-500">{campaign.content.substring(0, 50)}...</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(campaign.type)}
                                                <span className="text-sm font-semibold capitalize text-gray-700">
                                                    {campaign.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
                                                {campaign.targetAudience}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {campaign.scheduledDate ? (
                                                <div className="text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{campaign.scheduledDate}</span>
                                                    </div>
                                                    <span className="text-xs">{campaign.scheduledTime}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">Not scheduled</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">Sent:</span>
                                                    <span className="font-semibold text-gray-900">{campaign.sent.toLocaleString()}</span>
                                                </div>
                                                {campaign.type === 'email' && (
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Opened:</span>
                                                        <span className="font-semibold text-green-600">{campaign.openRate}%</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">Clicked:</span>
                                                    <span className="font-semibold text-blue-600">{campaign.clickRate}%</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                                                {campaign.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => sendToWebsite(campaign)}
                                                    disabled={loading}
                                                    className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700 disabled:opacity-50"
                                                    title="Send to Website"
                                                >
                                                    <Share2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(campaign)}
                                                    className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(campaign.id)}
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
                                {apiStatus === 'sending' && 'Sending campaign...'}
                                {apiStatus === 'success' && 'Campaign sent successfully!'}
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
                                    {editingCampaign ? 'Edit Campaign' : 'New Campaign'}
                                </h2>
                                <button onClick={resetForm} className="rounded-lg p-2 hover:bg-gray-100">
                                    <X className="h-6 w-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Campaign Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Type *</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="email">Email</option>
                                            <option value="sms">SMS</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Target Audience *</label>
                                        <select
                                            name="targetAudience"
                                            value={formData.targetAudience}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="all">All Customers</option>
                                            <option value="active">Active Customers</option>
                                            <option value="subscribers">Subscribers</option>
                                            <option value="abandoned">Cart Abandoned</option>
                                            <option value="vip">VIP Customers</option>
                                        </select>
                                    </div>
                                </div>

                                {formData.type === 'email' && (
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Email Subject *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required={formData.type === 'email'}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Content *</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                        rows="4"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Schedule Date</label>
                                        <input
                                            type="date"
                                            name="scheduledDate"
                                            value={formData.scheduledDate}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Schedule Time</label>
                                        <input
                                            type="time"
                                            name="scheduledTime"
                                            value={formData.scheduledTime}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Sent</label>
                                        <input
                                            type="number"
                                            name="sent"
                                            value={formData.sent}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Delivered</label>
                                        <input
                                            type="number"
                                            name="delivered"
                                            value={formData.delivered}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    {formData.type === 'email' && (
                                        <div>
                                            <label className="mb-1 block text-sm font-semibold text-gray-700">Opened</label>
                                            <input
                                                type="number"
                                                name="opened"
                                                value={formData.opened}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Clicked</label>
                                        <input
                                            type="number"
                                            name="clicked"
                                            value={formData.clicked}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="scheduled">Scheduled</option>
                                        <option value="sending">Sending</option>
                                        <option value="sent">Sent</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                                    >
                                        <Save className="h-5 w-5" />
                                        {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
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

export default Campaigns;