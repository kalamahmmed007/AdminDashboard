import React, { useState } from 'react';
import {
    AlertTriangle, Package, Clock, Truck, Check, Download,
    RefreshCw
} from 'lucide-react';

const StockLevel = () => {
    const [filterValue, setFilterValue] = useState('all');

    const warehouses = [
        { id: 'wh1', name: 'Main Warehouse - LA' },
        { id: 'wh2', name: 'East Distribution' },
        { id: 'wh3', name: 'Central Hub' }
    ];

    const inventory = [
        { id: 1, name: 'Wireless Headphones Pro', sku: 'WHP-001', image: '🎧', total: 458, allocated: 34, available: 424, reorderPoint: 50, status: 'healthy', incoming: 100, lastMovement: '2 hours ago', warehouses: { wh1: 250, wh2: 150, wh3: 58 } },
        { id: 2, name: 'Smart Watch Series 5', sku: 'SWS-005', image: '⌚', total: 234, allocated: 28, available: 206, reorderPoint: 80, status: 'healthy', incoming: 0, lastMovement: '5 hours ago', warehouses: { wh1: 120, wh2: 80, wh3: 34 } },
        { id: 3, name: 'Premium Leather Wallet', sku: 'PLW-003', image: '👛', total: 45, allocated: 12, available: 33, reorderPoint: 60, status: 'low', incoming: 80, lastMovement: '3 hours ago', warehouses: { wh1: 25, wh2: 15, wh3: 5 } },
        { id: 4, name: 'Running Shoes Elite', sku: 'RSE-007', image: '👟', total: 0, allocated: 0, available: 0, reorderPoint: 50, status: 'out', incoming: 200, lastMovement: '3 days ago', warehouses: { wh1: 0, wh2: 0, wh3: 0 } },
        { id: 5, name: 'Bluetooth Speaker Mini', sku: 'BSM-004', image: '🔊', total: 18, allocated: 5, available: 13, reorderPoint: 30, status: 'critical', incoming: 0, lastMovement: '12 hours ago', warehouses: { wh1: 10, wh2: 5, wh3: 3 } }
    ];

    const filteredInventory = inventory.filter(item => {
        if (filterValue === 'all') return true;
        if (filterValue === 'low') return item.available <= item.reorderPoint && item.available > 0;
        if (filterValue === 'critical') return item.available <= item.reorderPoint * 0.5 && item.available > 0;
        if (filterValue === 'out') return item.available === 0;
        if (filterValue === 'healthy') return item.available > item.reorderPoint;
        return true;
    });

    const handleReorder = (item) => {
        alert(`Reorder request for ${item.name}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Stock Levels</h1>
                        <p className="mt-1 text-gray-600">Monitor inventory levels and reorder points</p>
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

                {/* Filters */}
                <div className="mb-6">
                    <StockLevelFilters value={filterValue} onChange={setFilterValue} />
                </div>

                {/* Inventory Cards Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredInventory.map(item => (
                        <div key={item.id} className="space-y-4">
                            <StockSummaryCard item={item} />
                            <StockAlert item={item} />
                            <StockMovementIndicator incoming={item.incoming} lastMovement={item.lastMovement} />
                            <ReorderRecommendation item={item} />
                            <WarehouseStockBreakdown item={item} warehouses={warehouses} />
                        </div>
                    ))}
                </div>

                {/* Low Stock List */}
                <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Items Requiring Attention</h2>
                    <LowStockList items={inventory} onReorder={handleReorder} />
                </div>
            </div>
        </div>
    );
};

// ========================= Child Components =========================

const StockLevelIndicator = ({ current, reorderPoint, max }) => {
    const percentage = (current / max) * 100;

    const getStatus = () => {
        if (current === 0) return { color: 'bg-red-500', label: 'Out of Stock' };
        if (current <= reorderPoint * 0.5) return { color: 'bg-orange-500', label: 'Critical' };
        if (current <= reorderPoint) return { color: 'bg-yellow-500', label: 'Low' };
        return { color: 'bg-green-500', label: 'Healthy' };
    };

    const { color, label } = getStatus();

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm text-gray-600">{current}/{max}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div className={`h-full ${color} transition-all`} style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
};

const StockAlert = ({ item }) => {
    if (item.status === 'out') {
        return (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                    <p className="text-sm font-medium text-red-900">Out of Stock</p>
                    <p className="text-xs text-red-700">
                        {item.incoming > 0 ? `${item.incoming} units incoming` : 'No incoming stock'}
                    </p>
                </div>
            </div>
        );
    }

    if (item.available <= item.reorderPoint) {
        return (
            <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                    <p className="text-sm font-medium text-yellow-900">Low Stock Alert</p>
                    <p className="text-xs text-yellow-700">
                        {item.available} units remaining • Reorder at {item.reorderPoint}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

const StockSummaryCard = ({ item }) => (
    <div className="rounded-lg border bg-white p-4 shadow">
        <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                    {item.image}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.sku}</p>
                </div>
            </div>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-3">
            <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-lg font-bold text-gray-900">{item.total}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500">Available</p>
                <p className={`text-lg font-bold ${item.available <= item.reorderPoint ? 'text-red-600' : 'text-green-600'}`}>
                    {item.available}
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-500">Allocated</p>
                <p className="text-lg font-bold text-gray-900">{item.allocated}</p>
            </div>
        </div>

        <StockLevelIndicator
            current={item.available}
            reorderPoint={item.reorderPoint}
            max={item.total}
        />
    </div>
);

const StockMovementIndicator = ({ incoming, lastMovement }) => {
    if (incoming > 0) {
        return (
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm">
                <Truck className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">+{incoming} incoming</span>
                <span className="text-blue-700">• {lastMovement}</span>
            </div>
        );
    }

    return (
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last movement: {lastMovement}</span>
        </div>
    );
};

const calculateReorderQuantity = (item, leadTimeDays = 7, safetyStock = 0.2) => {
    const avgDailyUsage = item.allocated / 30;
    const leadTimeDemand = avgDailyUsage * leadTimeDays;
    const safetyStockQty = leadTimeDemand * safetyStock;
    const reorderQty = Math.ceil(leadTimeDemand + safetyStockQty);

    return {
        recommended: reorderQty,
        daysUntilStockout: Math.floor(item.available / avgDailyUsage)
    };
};

const ReorderRecommendation = ({ item }) => {
    const { recommended, daysUntilStockout } = calculateReorderQuantity(item);
    if (item.available > item.reorderPoint) return null;

    return (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                    <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                    <h4 className="mb-1 text-sm font-semibold text-blue-900">Reorder Recommendation</h4>
                    <p className="mb-2 text-sm text-blue-800">
                        Order <strong>{recommended} units</strong> to maintain healthy stock levels
                    </p>
                    <p className="text-xs text-blue-700">
                        Current stock will last approximately {daysUntilStockout} days at current usage rate
                    </p>
                </div>
            </div>
        </div>
    );
};

const WarehouseStockBreakdown = ({ item, warehouses }) => (
    <div className="rounded-lg bg-gray-50 p-4">
        <h4 className="mb-3 text-sm font-semibold text-gray-900">Stock by Location</h4>
        <div className="space-y-2">
            {warehouses.map(wh => {
                const stock = item.warehouses?.[wh.id] || 0;
                const percentage = item.total ? (stock / item.total) * 100 : 0;

                return (
                    <div key={wh.id}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="text-gray-700">{wh.name}</span>
                            <span className="font-medium text-gray-900">{stock} units</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-200">
                            <div
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

const LowStockList = ({ items, onReorder }) => {
    const lowStockItems = items.filter(item =>
        item.available <= item.reorderPoint && item.status !== 'out'
    );

    if (lowStockItems.length === 0) {
        return (
            <div className="py-8 text-center">
                <Check className="mx-auto mb-2 h-12 w-12 text-green-500" />
                <p className="text-gray-600">All items are well stocked</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {lowStockItems.map(item => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">
                                {item.available} units left • Reorder at {item.reorderPoint}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => onReorder(item)}
                        className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
                    >
                        Reorder
                    </button>
                </div>
            ))}
        </div>
    );
};

const StockLevelFilters = ({ value, onChange }) => {
    const filters = [
        { id: 'all', label: 'All Items' },
        { id: 'low', label: 'Low Stock' },
        { id: 'critical', label: 'Critical' },
        { id: 'out', label: 'Out of Stock' },
        { id: 'healthy', label: 'Healthy' }
    ];

    return (
        <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map(filter => (
                <button
                    key={filter.id}
                    onClick={() => onChange(filter.id)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${value === filter.id
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default StockLevel;
