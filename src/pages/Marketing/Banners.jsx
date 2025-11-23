import React, { useState, useEffect } from 'react';
import {
    Image, Plus, Edit2, Trash2, Search, Eye, MousePointer,
    Calendar, Link2, BarChart3, RefreshCw, Save, X, CheckCircle,
    AlertCircle, Upload, Monitor, Smartphone, Tablet, Share2
} from 'lucide-react';

const Banners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [apiStatus, setApiStatus] = useState('idle');

    const [formData, setFormData] = useState({
        title: '',
        position: 'homepage-hero',
        device: 'all',
        imageUrl: '',
        linkUrl: '',
        startDate: '',
        endDate: '',
        status: 'active',
        priority: 1,
        clicks: 0,
        impressions: 0,
        buttonText: '',
        backgroundColor: '#dc2626'
    });

    useEffect(() => {
        const sampleBanners = [
            {
                id: 1,
                title: 'Summer Sale 2025',
                position: 'homepage-hero',
                device: 'all',
                imageUrl: '🏖️',
                linkUrl: '/summer-sale',
                startDate: '2025-11-01',
                endDate: '2025-11-30',
                status: 'active',
                priority: 1,
                clicks: 3450,
                impressions: 45000,
                ctr: 7.67,
                buttonText: 'Shop Now',
                backgroundColor: '#dc2626'
            },
            {
                id: 2,
                title: 'New Arrivals Banner',
                position: 'category-top',
                device: 'desktop',
                imageUrl: '🎁',
                linkUrl: '/new-arrivals',
                startDate: '2025-11-15',
                endDate: '2025-12-15',
                status: 'active',
                priority: 2,
                clicks: 2100,
                impressions: 32000,
                ctr: 6.56,
                buttonText: 'Explore',
                backgroundColor: '#000000'
            },
            {
                id: 3,
                title: 'Mobile App Promotion',
                position: 'sidebar',
                device: 'mobile',
                imageUrl: '📱',
                linkUrl: '/download-app',
                startDate: '2025-10-01',
                endDate: '2025-12-31',
                status: 'active',
                priority: 3,
                clicks: 1850,
                impressions: 28000,
                ctr: 6.61,
                buttonText: 'Download',
                backgroundColor: '#7c3aed'
            },
            {
                id: 4,
                title: 'Black Friday Preview',
                position: 'homepage-middle',
                device: 'all',
                imageUrl: '💰',
                linkUrl: '/black-friday',
                startDate: '2025-11-20',
                endDate: '2025-11-30',
                status: 'scheduled',
                priority: 1,
                clicks: 0,
                impressions: 0,
                ctr: 0,
                buttonText: 'Coming Soon',
                backgroundColor: '#000000'
            }
        ];
        setBanners(sampleBanners);
    }, []);

    const sendToWebsite = async (banner) => {
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
                            content: `Process this Banner data:

Title: ${banner.title}
Position: ${banner.position}
Device: ${banner.device}
Link: ${banner.linkUrl}
Button Text: ${banner.buttonText}
Period: ${banner.startDate} to ${banner.endDate}
Status: ${banner.status}
Priority: ${banner.priority}
Impressions: ${banner.impressions.toLocaleString()}
Clicks: ${banner.clicks}
CTR: ${banner.ctr}%
Background: ${banner.backgroundColor}

Confirm receipt and provide banner optimization suggestions.`
                        }
                    ]
                })
            });

            const data = await response.json();
            if (data.content && data.content[0]) {
                setApiStatus('success');
                alert(`✅ Banner sent successfully!\n\n${data.content[0].text}`);
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

        const ctr = formData.impressions > 0
            ? ((formData.clicks / formData.impressions) * 100).toFixed(2)
            : 0;

        if (editingBanner) {
            setBanners(prev => prev.map(b =>
                b.id === editingBanner.id
                    ? { ...formData, id: b.id, ctr: parseFloat(ctr) }
                    : b
            ));
        } else {
            const newBanner = {
                ...formData,
                id: Date.now(),
                ctr: parseFloat(ctr)
            };
            setBanners(prev => [newBanner, ...prev]);
        }

        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this banner?')) {
            setBanners(prev => prev.filter(b => b.id !== id));
        }
    };

    const handleEdit = (banner) => {
        setEditingBanner(banner);
        setFormData(banner);
        setShowAddModal(true);
    };

    const toggleStatus = (id) => {
        setBanners(prev => prev.map(b =>
            b.id === id
                ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' }
                : b
        ));
    };

    const resetForm = () => {
        setFormData({
            title: '', position: 'homepage-hero', device: 'all', imageUrl: '',
            linkUrl: '', startDate: '', endDate: '', status: 'active', priority: 1,
            clicks: 0, impressions: 0, buttonText: '', backgroundColor: '#dc2626'
        });
        setEditingBanner(null);
        setShowAddModal(false);
    };

    const filteredBanners = banners.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: banners.length,
        active: banners.filter(b => b.status === 'active').length,
        totalImpressions: banners.reduce((sum, b) => sum + b.impressions, 0),
        totalClicks: banners.reduce((sum, b) => sum + b.clicks, 0),
        avgCtr: banners.length > 0
            ? (banners.reduce((sum, b) => sum + b.ctr, 0) / banners.length).toFixed(2)
            : 0
    };

    const getPositionColor = (position) => {
        const colors = {
            'homepage-hero': 'bg-red-100 text-red-700',
            'homepage-middle': 'bg-blue-100 text-blue-700',
            'category-top': 'bg-green-100 text-green-700',
            'sidebar': 'bg-purple-100 text-purple-700',
            'footer': 'bg-gray-100 text-gray-700'
        };
        return colors[position] || 'bg-gray-100 text-gray-700';
    };

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-700',
            inactive: 'bg-gray-100 text-gray-700',
            scheduled: 'bg-blue-100 text-blue-700',
            expired: 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getDeviceIcon = (device) => {
        switch (device) {
            case 'desktop': return <Monitor className="h-4 w-4" />;
            case 'mobile': return <Smartphone className="h-4 w-4" />;
            case 'tablet': return <Tablet className="h-4 w-4" />;
            default: return <Monitor className="h-4 w-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Banner Management</h1>
                    <p className="text-gray-600">Create and manage promotional banners across your website</p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-red-100 p-3">
                                <Image className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Banners</h3>
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
                                <Eye className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Views</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalImpressions.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-orange-100 p-3">
                                <MousePointer className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Total Clicks</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalClicks}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-purple-100 p-3">
                                <BarChart3 className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <h3 className="mb-1 text-sm font-medium text-gray-600">Avg CTR</h3>
                        <p className="text-2xl font-bold text-gray-900">{stats.avgCtr}%</p>
                    </div>
                </div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search banners..."
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
                        Create Banner
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredBanners.map((banner) => (
                        <div key={banner.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div
                                className="flex h-48 items-center justify-center text-6xl"
                                style={{ backgroundColor: banner.backgroundColor }}
                            >
                                {banner.imageUrl}
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <div className="mb-2 flex items-start justify-between">
                                        <h3 className="text-lg font-bold text-gray-900">{banner.title}</h3>
                                        <button
                                            onClick={() => toggleStatus(banner.id)}
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(banner.status)}`}
                                        >
                                            {banner.status}
                                        </button>
                                    </div>

                                    <div className="mb-2 flex items-center gap-2">
                                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getPositionColor(banner.position)}`}>
                                            {banner.position}
                                        </span>
                                        <div className="flex items-center gap-1 text-gray-600">
                                            {getDeviceIcon(banner.device)}
                                            <span className="text-xs">{banner.device}</span>
                                        </div>
                                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                                            Priority: {banner.priority}
                                        </span>
                                    </div>

                                    {banner.buttonText && (
                                        <button className="mb-2 rounded-lg border-2 border-gray-900 bg-white px-4 py-1 text-sm font-semibold text-gray-900">
                                            {banner.buttonText}
                                        </button>
                                    )}
                                </div>

                                <div className="mb-4 space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Link:</span>
                                        <span className="ml-2 truncate font-medium text-gray-900">{banner.linkUrl}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Period:</span>
                                        <span className="text-xs text-gray-700">{banner.startDate} - {banner.endDate}</span>
                                    </div>
                                </div>

                                <div className="mb-4 grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-3">
                                    <div className="text-center">
                                        <div className="mb-1 flex items-center justify-center gap-1">
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{banner.impressions.toLocaleString()}</p>
                                        <p className="text-xs text-gray-600">Views</p>
                                    </div>
                                    <div className="border-x border-gray-200 text-center">
                                        <div className="mb-1 flex items-center justify-center gap-1">
                                            <MousePointer className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{banner.clicks}</p>
                                        <p className="text-xs text-gray-600">Clicks</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-1 flex items-center justify-center gap-1">
                                            <BarChart3 className="h-4 w-4 text-green-500" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{banner.ctr}%</p>
                                        <p className="text-xs text-gray-600">CTR</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => sendToWebsite(banner)}
                                        disabled={loading}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                                    >
                                        <Share2 className="h-4 w-4" />
                                        Send
                                    </button>
                                    <button
                                        onClick={() => handleEdit(banner)}
                                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner.id)}
                                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {apiStatus !== 'idle' && (
                    <div className={`mt-6 rounded-lg p-4 ${apiStatus === 'sending' ? 'bg-blue-100 text-blue-800' :
                            apiStatus === 'success' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                        }`}>
                        <div className="flex items-center gap-2">
                            {apiStatus === 'sending' && <RefreshCw className="h-5 w-5 animate-spin" />}
                            {apiStatus === 'success' && <CheckCircle className="h-5 w-5" />}
                            {apiStatus === 'error' && <AlertCircle className="h-5 w-5" />}
                            <span className="font-semibold">
                                {apiStatus === 'sending' && 'Sending banner...'}
                                {apiStatus === 'success' && 'Banner sent successfully!'}
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
                                    {editingBanner ? 'Edit Banner' : 'Create Banner'}
                                </h2>
                                <button onClick={resetForm} className="rounded-lg p-2 hover:bg-gray-100">
                                    <X className="h-6 w-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Banner Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Position *</label>
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="homepage-hero">Homepage Hero</option>
                                            <option value="homepage-middle">Homepage Middle</option>
                                            <option value="category-top">Category Top</option>
                                            <option value="sidebar">Sidebar</option>
                                            <option value="footer">Footer</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Device *</label>
                                        <select
                                            name="device"
                                            value={formData.device}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="all">All Devices</option>
                                            <option value="desktop">Desktop Only</option>
                                            <option value="mobile">Mobile Only</option>
                                            <option value="tablet">Tablet Only</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Priority</label>
                                        <input
                                            type="number"
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleInputChange}
                                            min="1"
                                            max="10"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Image/Emoji</label>
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                            placeholder="🎉 or image URL"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Background Color</label>
                                        <input
                                            type="color"
                                            name="backgroundColor"
                                            value={formData.backgroundColor}
                                            onChange={handleInputChange}
                                            className="h-10 w-full rounded-lg border border-gray-300 px-2 py-1 focus:border-red-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Link URL *</label>
                                        <input
                                            type="text"
                                            name="linkUrl"
                                            value={formData.linkUrl}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                            placeholder="/sale"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Button Text</label>
                                        <input
                                            type="text"
                                            name="buttonText"
                                            value={formData.buttonText}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                            placeholder="Shop Now"
                                        />
                                    </div>
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
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="scheduled">Scheduled</option>
                                            <option value="expired">Expired</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                                    >
                                        <Save className="h-5 w-5" />
                                        {editingBanner ? 'Update Banner' : 'Create Banner'}
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

export default Banners;