import React, { useState } from 'react';
import {
    AlertCircle, Package, Clock, DollarSign, TrendingDown,
    CheckCircle, Download, RefreshCw, Filter
} from 'lucide-react';

const Lowstockalerts = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedItems, setSelectedItems] = useState([]);

    // Sample data
    const alerts = [
        { id: 1, name: 'Bluetooth Speaker Mini', sku: 'BSM-004', image: '🔊', available: 0, reorderPoint: 30, incoming: 0, cost: 22.00, timestamp: '2 hours ago' },
        { id: 2, name: 'Premium Leather Wallet', sku: 'PLW-003', image: '👛', available: 15, reorderPoint: 60, incoming: 80, cost: 35.00, timestamp: '3 hours ago' },
        { id: 3, name: 'Running Shoes Elite', sku: 'RSE-007', image: '👟', available: 0, reorderPoint: 50, incoming: 200, cost: 65.00, timestamp: '1 day ago' },
        { id: 4, name: 'Wireless Mouse', sku: 'WMS-012', image: '🖱️', available: 25, reorderPoint: 80, incoming: 0, cost: 18.00, timestamp: '5 hours ago' },
        { id: 5, name: 'USB Cable', sku: 'USC-008', image: '🔌', available: 45, reorderPoint: 150, incoming: 100, cost: 5.00, timestamp: '12 hours ago' }
    ];

    const getPriority = (item) => {
        if (item.available === 0) return 'critical';
        if (item.available <= item.reorderPoint * 0.5) return 'high';
        if (item.available <= item.reorderPoint) return 'medium';
        return 'low';
    };

    const filteredAlerts = alerts.filter(alert => {
        if (activeFilter === 'all') return true;
        return getPriority(alert) === activeFilter;
    });

    const counts = {
        all: alerts.length,
        critical: alerts.filter(a => getPriority(a) === 'critical').length,
        high: alerts.filter(a => getPriority(a) === 'high').length,
        medium: alerts.filter(a => getPriority(a) === 'medium').length
    };

    const handleReorder = (item) => {
        console.log('Reorder:', item);
        alert(`Reorder request for ${item.name}`);
    };

    const handleDismiss = (item) => {
        console.log('Dismiss:', item);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Low Stock Alerts</h1>
                        <p className="mt-1 text-gray-600">Monitor and manage items requiring attention</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                            <RefreshCw className="h-4 w-4" /> Refresh
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                            <Download className="h-4 w-4" /> Export
                        </button>
                    </div>
                </div>

                {/* Banner */}
                <div className="mb-6">
                    <LowStockBanner
                        criticalCount={counts.critical}
                        lowCount={counts.high + counts.medium}
                        onViewAll={() => setActiveFilter('all')}
                    />
                </div>

                {/* Summary Stats */}
                <div className="mb-6">
                    <AlertSummaryStats alerts={alerts} />
                </div>

                {/* Filter Tabs */}
                <div className="mb-6">
                    <AlertFilterTabs
                        activeFilter={activeFilter}
                        onChange={setActiveFilter}
                        counts={counts}
                    />
                </div>

                {/* Alerts List */}
                <div className="space-y-4">
                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map(item => (
                            <StockAlertItem
                                key={item.id}
                                item={item}
                                onReorder={handleReorder}
                                onDismiss={handleDismiss}
                            />
                        ))
                    ) : (
                        <EmptyAlertsState />
                    )}
                </div>

                {/* Actions Bar */}
                <AlertActionsBar
                    selectedCount={selectedItems.length}
                    onReorderAll={() => console.log('Reorder all')}
                    onDismissAll={() => console.log('Dismiss all')}
                    onExport={() => console.log('Export')}
                />
            </div>
        </div>
    );
};

// Component definitions
const LowStockBanner = ({ criticalCount, lowCount, onViewAll }) => (
    <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
        <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-6 w-6 text-red-600" />
                <div>
                    <h3 className="font-semibold text-red-900">Stock Alert</h3>
                    <p className="mt-1 text-sm text-red-800">
                        You have <strong>{criticalCount} critical</strong> and <strong>{lowCount} low</strong> stock items requiring attention
                    </p>
                </div>
            </div>
            <button
                onClick={onViewAll}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
                View All
            </button>
        </div>
    </div>
);

const PriorityBadge = ({ level }) => {
    const config = {
        critical: { bg: 'bg-red-100', text: 'text-red-700', label: 'Critical' },
        high: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'High' },
        medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medium' },
        low: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Low' }
    };

    const { bg, text, label } = config[level];

    return (
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${bg} ${text}`}>
            {label}
        </span>
    );
};

const StockAlertItem = ({ item, onReorder, onDismiss }) => {
    const getPriority = () => {
        if (item.available === 0) return 'critical';
        if (item.available <= item.reorderPoint * 0.5) return 'high';
        if (item.available <= item.reorderPoint) return 'medium';
        return 'low';
    };

    const priority = getPriority();

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                        {item.image}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                            <h4 className="truncate font-semibold text-gray-900">{item.name}</h4>
                            <PriorityBadge level={priority} />
                        </div>
                        <p className="mb-2 text-sm text-gray-600">SKU: {item.sku}</p>
                        <div className="flex items-center gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Available: </span>
                                <span className={`font-semibold ${item.available === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                                    {item.available}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">Reorder at: </span>
                                <span className="font-semibold text-gray-900">{item.reorderPoint}</span>
                            </div>
                            {item.incoming > 0 && (
                                <div className="flex items-center gap-1 text-blue-600">
                                    <Package className="h-4 w-4" />
                                    <span>+{item.incoming} incoming</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onReorder(item)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Reorder
                    </button>
                    <button
                        onClick={() => onDismiss(item)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};

const AlertSummaryStats = ({ alerts }) => {
    const stats = {
        critical: alerts.filter(a => a.available === 0).length,
        high: alerts.filter(a => a.available > 0 && a.available <= a.reorderPoint * 0.5).length,
        medium: alerts.filter(a => a.available > a.reorderPoint * 0.5 && a.available <= a.reorderPoint).length,
        totalValue: alerts.reduce((sum, a) => sum + (a.cost * a.reorderPoint), 0)
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-red-900">Critical</h4>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-900">{stats.critical}</p>
                <p className="text-xs text-red-700">Out of stock</p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-orange-900">High Priority</h4>
                    <TrendingDown className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-900">{stats.high}</p>
                <p className="text-xs text-orange-700">Below 50% reorder point</p>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-yellow-900">Medium</h4>
                    <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-yellow-900">{stats.medium}</p>
                <p className="text-xs text-yellow-700">Approaching reorder point</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900">Est. Reorder Value</h4>
                    <DollarSign className="h-5 w-5 text-gray-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Total cost to restock</p>
            </div>
        </div>
    );
};

const AlertFilterTabs = ({ activeFilter, onChange, counts }) => {
    const tabs = [
        { id: 'all', label: 'All Alerts', count: counts.all },
        { id: 'critical', label: 'Critical', count: counts.critical },
        { id: 'high', label: 'High', count: counts.high },
        { id: 'medium', label: 'Medium', count: counts.medium }
    ];

    return (
        <div className="flex gap-2 border-b border-gray-200 pb-2">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeFilter === tab.id ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {tab.label}
                    {tab.count > 0 && (
                        <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeFilter === tab.id ? 'bg-white text-red-600' : 'bg-gray-200 text-gray-700'
                            }`}>
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

const AlertActionsBar = ({ selectedCount, onReorderAll, onDismissAll, onExport }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-gray-900 px-6 py-4 shadow-xl">
            <div className="flex items-center gap-6">
                <p className="text-sm text-white">
                    <strong>{selectedCount}</strong> item{selectedCount > 1 ? 's' : ''} selected
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onReorderAll}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Reorder All
                    </button>
                    <button
                        onClick={onDismissAll}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                        Dismiss All
                    </button>
                    <button
                        onClick={onExport}
                        className="rounded-lg border border-white px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                    >
                        Export List
                    </button>
                </div>
            </div>
        </div>
    );
};

const EmptyAlertsState = () => (
    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900">All Clear!</h3>
        <p className="mb-4 text-gray-600">
            No low stock alerts at the moment. All inventory levels are healthy.
        </p>
        <button className="rounded-lg bg-gray-900 px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800">
            View All Inventory
        </button>
    </div>
);

export default Lowstockalerts;