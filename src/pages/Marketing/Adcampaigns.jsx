import React, { useState, useEffect } from 'react';
import {
    Target, Plus, Edit2, Trash2, Search, Calendar, DollarSign,
    TrendingUp, Eye, MousePointer, BarChart3, RefreshCw, Save, X,
    PlayCircle, PauseCircle, CheckCircle, Clock, AlertCircle, Share2
} from 'lucide-react';

const AdCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [apiStatus, setApiStatus] = useState('idle');

    const [formData, setFormData] = useState({
        name: '',
        platform: 'facebook',
        budget: '',
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        startDate: '',
        endDate: '',
        targetAudience: '',
        status: 'active',
        adType: 'image',
        objective: 'conversions'
    });

    useEffect(() => {
        const sampleCampaigns = [
            {
                id: 1,
                name: 'Summer Sale 2025',
                platform: 'facebook',
                budget: 50000,
                spent: 32450,
                impressions: 245000,
                clicks: 12450,
                conversions: 856,
                startDate: '2025-11-01',
                endDate: '2025-11-30',
                targetAudience: 'Age 25-45, Fashion Lovers',
                status: 'active',
                adType: 'carousel',
                objective: 'conversions',
                ctr: 5.08,
                cpc: 2.61,
                roas: 4.2
            },
            {
                id: 2,
                name: 'Brand Awareness Q4',
                platform: 'google',
                budget: 75000,
                spent: 58900,
                impressions: 580000,
                clicks: 23400,
                conversions: 1250,
                startDate: '2025-10-01',
                endDate: '2025-12-31',
                targetAudience: 'Bangladesh, Age 18-65',
                status: 'active',
                adType: 'video',
                objective: 'awareness',
                ctr: 4.03,
                cpc: 2.52,
                roas: 3.8
            },
            {
                id: 3,
                name: 'New Year Campaign',
                platform: 'instagram',
                budget: 30000,
                spent: 30000,
                impressions: 156000,
                clicks: 7800,
                conversions: 420,
                startDate: '2024-12-25',
                endDate: '2025-01-05',
                targetAudience: 'Youth, Urban Areas',
                status: 'completed',
                adType: 'story',
                objective: 'engagement',
                ctr: 5.0,
                cpc: 3.85,
                roas: 2.9
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
                            content: `Process this Ad Campaign data:

Campaign: ${campaign.name}
Platform: ${campaign.platform.toUpperCase()}
Budget: ৳${campaign.budget.toLocaleString()}
Spent: ৳${campaign.spent.toLocaleString()}
Impressions: ${campaign.impressions.toLocaleString()}
Clicks: ${campaign.clicks.toLocaleString()}
Conversions: ${campaign.conversions}
CTR: ${campaign.ctr}%
CPC: ৳${campaign.cpc}
ROAS: ${campaign.roas}x
Target Audience: ${campaign.targetAudience}
Duration: ${campaign.startDate} to ${campaign.endDate}
Status: ${campaign.status}

Confirm receipt and provide brief analysis.`
                        }
                    ]
                })
            });

            const data = await response.json();
            if (data.content && data.content[0]) {
                setApiStatus('success');
                alert(`✅ Campaign sent successfully!\n\n${data.content[0].text}`);
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

        const ctr = formData.clicks > 0 ? ((formData.clicks / formData.impressions) * 100).toFixed(2) : 0;
        const cpc = formData.clicks > 0 ? (formData.spent / formData.clicks).toFixed(2) : 0;
        const roas = formData.spent > 0 ? (formData.conversions * 1000 / formData.spent).toFixed(1) : 0;

        if (editingCampaign) {
            setCampaigns(prev => prev.map(c =>
                c.id === editingCampaign.id
                    ? { ...formData, id: c.id, ctr: parseFloat(ctr), cpc: parseFloat(cpc), roas: parseFloat(roas) }
                    : c
            ));
        } else {
            const newCampaign = {
                ...formData,
                id: Date.now(),
                ctr: parseFloat(ctr),
                cpc: parseFloat(cpc),
                roas: parseFloat(roas)
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
            name: '', platform: 'facebook', budget: '', spent: 0, impressions: 0,
            clicks: 0, conversions: 0, startDate: '', endDate: '', targetAudience: '',
            status: 'active', adType: 'image', objective: 'conversions'
        });
        setEditingCampaign(null);
        setShowAddModal(false);
    };

    const filteredCampaigns = campaigns.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.platform.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: campaigns.length,
        active: campaigns.filter(c => c.status === 'active').length,
        totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
        totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
        totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
        totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0)
    };

    const getPlatformColor = (platform) => {
        const colors = {
            facebook: 'bg-blue-600',
            instagram: 'bg-pink-600',
            google: 'bg-red-600',
            youtube: 'bg-red-700',
            tiktok: 'bg-black'
        };
        return colors[platform] || 'bg-gray-600';
    };

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-700',
            paused: 'bg-yellow-100 text-yellow-700',
            completed: 'bg-gray-100 text-gray-700',
            draft: 'bg-blue-100 text-blue-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Ad Campaigns</h1>
                    <p className="text-gray-600">Manage and track your advertising campaigns</p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-red-100 p-3">
                                <Target className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Campaigns</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-green-100 p-3">
                                <PlayCircle className="h-6 w-6 text-green-600" />
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
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Budget</h3>
                        <p className="text-2xl font-bold text-gray-900">৳{stats.totalBudget.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-purple-100 p-3">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Spent</h3>
                        <p className="text-2xl font-bold text-gray-900">৳{stats.totalSpent.toLocaleString()}</p>
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
                                <CheckCircle className="h-6 w-6 text-pink-600" />
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
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Platform</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Budget/Spent</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Performance</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Metrics</th>
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
                                                <p className="text-sm text-gray-600">{campaign.targetAudience}</p>
                                                <p className="text-xs text-gray-500">
                                                    {campaign.startDate} - {campaign.endDate}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${getPlatformColor(campaign.platform)}`}>
                                                {campaign.platform.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">৳{campaign.budget.toLocaleString()}</p>
                                            <div className="mt-1 h-2 w-32 rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-red-600"
                                                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-600">Spent: ৳{campaign.spent.toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-700">{campaign.impressions.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MousePointer className="h-4 w-4 text-blue-500" />
                                                    <span className="text-sm text-gray-700">{campaign.clicks.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm text-gray-700">{campaign.conversions}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">CTR:</span>
                                                    <span className="font-semibold text-gray-900">{campaign.ctr}%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">CPC:</span>
                                                    <span className="font-semibold text-gray-900">৳{campaign.cpc}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">ROAS:</span>
                                                    <span className="font-semibold text-green-600">{campaign.roas}x</span>
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
                                {apiStatus === 'sending' && 'Sending campaign data...'}
                                {apiStatus === 'success' && 'Campaign sent successfully!'}
                                {apiStatus === 'error' && 'Failed to send campaign'}
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
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Platform *</label>
                                        <select
                                            name="platform"
                                            value={formData.platform}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="facebook">Facebook</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="google">Google Ads</option>
                                            <option value="youtube">YouTube</option>
                                            <option value="tiktok">TikTok</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Budget (৳) *</label>
                                        <input
                                            type="number"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Spent (৳)</label>
                                        <input
                                            type="number"
                                            name="spent"
                                            value={formData.spent}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Status *</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="active">Active</option>
                                            <option value="paused">Paused</option>
                                            <option value="completed">Completed</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Impressions</label>
                                        <input
                                            type="number"
                                            name="impressions"
                                            value={formData.impressions}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

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
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Target Audience *</label>
                                    <input
                                        type="text"
                                        name="targetAudience"
                                        value={formData.targetAudience}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        placeholder="e.g., Age 25-45, Fashion Lovers"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Start Date *</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">End Date *</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Ad Type</label>
                                        <select
                                            name="adType"
                                            value={formData.adType}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="image">Image</option>
                                            <option value="video">Video</option>
                                            <option value="carousel">Carousel</option>
                                            <option value="story">Story</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Objective</label>
                                        <select
                                            name="objective"
                                            value={formData.objective}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="conversions">Conversions</option>
                                            <option value="awareness">Brand Awareness</option>
                                            <option value="engagement">Engagement</option>
                                            <option value="traffic">Traffic</option>
                                        </select>
                                    </div>
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

export default AdCampaigns;