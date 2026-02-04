import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectWarehouses } from '../../redux/slices/warehouseSlice';
import {
    Search, Package, AlertTriangle, TrendingUp, TrendingDown,
    ArrowUpDown, Plus, Minus, Save, History, Download, Upload, RefreshCw,
    X, Edit2, BarChart3, Boxes, Clock, ArrowRight
} from 'lucide-react';

export default function StockManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedWarehouse, setSelectedWarehouse] = useState('all');
    const [showAdjustModal, setShowAdjustModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [adjustmentType, setAdjustmentType] = useState('add');
    const [adjustmentQty, setAdjustmentQty] = useState('');
    const [adjustmentReason, setAdjustmentReason] = useState('');
    const [editingStock, setEditingStock] = useState({});
    const navigate = useNavigate();

    const warehousesList = useSelector(selectWarehouses);

    const warehouses = [
        { id: 'all', name: 'All Warehouses' },
        ...warehousesList.map(w => ({ id: w.id, name: w.name }))
    ];

    const stats = [
        { label: 'Total SKUs', value: '1,234', icon: Package, color: 'blue', sub: 'Across all warehouses' },
        { label: 'Low Stock Items', value: '23', icon: AlertTriangle, color: 'yellow', sub: 'Below threshold' },
        { label: 'Out of Stock', value: '8', icon: Boxes, color: 'red', sub: 'Needs restock' },
        { label: 'Total Units', value: '45,892', icon: BarChart3, color: 'green', sub: '$284,520 value' }
    ];

    const [products, setProducts] = useState([
        { id: 1, name: 'Wireless Headphones Pro', sku: 'WHP-001', image: '🎧', category: 'Electronics', stock: 145, reserved: 12, incoming: 50, threshold: 20, lastUpdated: '2 hours ago', warehouses: { wh1: 80, wh2: 45, wh3: 20 } },
        { id: 2, name: 'Smart Watch Series 5', sku: 'SWS-005', image: '⌚', category: 'Electronics', stock: 67, reserved: 8, incoming: 0, threshold: 30, lastUpdated: '1 day ago', warehouses: { wh1: 40, wh2: 20, wh3: 7 } },
        { id: 3, name: 'USB-C Fast Charger', sku: 'UFC-010', image: '🔌', category: 'Electronics', stock: 234, reserved: 23, incoming: 100, threshold: 50, lastUpdated: '5 hours ago', warehouses: { wh1: 120, wh2: 74, wh3: 40 } },
        { id: 4, name: 'Premium Leather Wallet', sku: 'PLW-003', image: '👛', category: 'Accessories', stock: 12, reserved: 5, incoming: 30, threshold: 25, lastUpdated: '3 hours ago', warehouses: { wh1: 8, wh2: 4, wh3: 0 } },
        { id: 5, name: 'Running Shoes Elite', sku: 'RSE-007', image: '👟', category: 'Sports', stock: 0, reserved: 0, incoming: 200, threshold: 40, lastUpdated: '2 days ago', warehouses: { wh1: 0, wh2: 0, wh3: 0 } },
        { id: 6, name: 'Cotton T-Shirt Basic', sku: 'CTB-022', image: '👕', category: 'Clothing', stock: 456, reserved: 34, incoming: 0, threshold: 100, lastUpdated: '6 hours ago', warehouses: { wh1: 200, wh2: 156, wh3: 100 } },
        { id: 7, name: 'Bluetooth Speaker Mini', sku: 'BSM-004', image: '🔊', category: 'Electronics', stock: 8, reserved: 2, incoming: 0, threshold: 15, lastUpdated: '12 hours ago', warehouses: { wh1: 5, wh2: 3, wh3: 0 } },
        { id: 8, name: 'Yoga Mat Premium', sku: 'YMP-011', image: '🧘', category: 'Sports', stock: 5, reserved: 1, incoming: 50, threshold: 20, lastUpdated: '1 hour ago', warehouses: { wh1: 3, wh2: 2, wh3: 0 } }
    ]);

    const stockHistory = [
        { date: 'Nov 20, 2024 2:30 PM', type: 'add', qty: 50, reason: 'Supplier delivery', user: 'John Admin' },
        { date: 'Nov 19, 2024 11:00 AM', type: 'remove', qty: 12, reason: 'Order fulfillment', user: 'System' },
        { date: 'Nov 18, 2024 4:15 PM', type: 'adjust', qty: -3, reason: 'Damaged items', user: 'Sarah Manager' },
        { date: 'Nov 17, 2024 9:00 AM', type: 'transfer', qty: 20, reason: 'Transfer to NY warehouse', user: 'John Admin' },
        { date: 'Nov 15, 2024 3:30 PM', type: 'add', qty: 100, reason: 'Initial stock', user: 'System' }
    ];

    const getStockStatus = (product) => {
        const available = product.stock - product.reserved;
        if (product.stock === 0) return { label: 'Out of Stock', color: 'red', bg: 'bg-red-100 text-red-800' };
        if (available <= product.threshold * 0.5) return { label: 'Critical', color: 'red', bg: 'bg-red-100 text-red-800' };
        if (available <= product.threshold) return { label: 'Low Stock', color: 'yellow', bg: 'bg-yellow-100 text-yellow-800' };
        return { label: 'In Stock', color: 'green', bg: 'bg-green-100 text-green-800' };
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const status = getStockStatus(p);
        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'low' && (status.label === 'Low Stock' || status.label === 'Critical')) ||
            (filterStatus === 'out' && status.label === 'Out of Stock') ||
            (filterStatus === 'in' && status.label === 'In Stock');

        const matchesWarehouse = selectedWarehouse === 'all' || (p.warehouses[selectedWarehouse] ?? 0) > 0;
        return matchesSearch && matchesFilter && matchesWarehouse;
    });

    const openAdjustModal = (product) => {
        setSelectedProduct(product);
        setAdjustmentType('add');
        setAdjustmentQty('');
        setAdjustmentReason('');
        setShowAdjustModal(true);
    };

    const openHistoryModal = (product) => {
        setSelectedProduct(product);
        setShowHistoryModal(true);
    };

    const openTransferModal = (product) => {
        setSelectedProduct(product);
        setShowTransferModal(true);
    };

    const handleAdjustment = () => {
        if (!adjustmentQty || !adjustmentReason) return;
        const qty = parseInt(adjustmentQty);
        setProducts(products.map(p => {
            if (p.id === selectedProduct.id) {
                return { ...p, stock: adjustmentType === 'add' ? p.stock + qty : Math.max(0, p.stock - qty) };
            }
            return p;
        }));
        setShowAdjustModal(false);
    };

    const handleInlineEdit = (productId, value) => {
        const qty = parseInt(value) || 0;
        setProducts(products.map(p => p.id === productId ? { ...p, stock: qty } : p));
        setEditingStock(prev => ({ ...prev, [productId]: false }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
                        <p className="mt-1 text-gray-600">Monitor and manage inventory levels</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                            <Upload className="h-4 w-4" />
                            Import
                        </button>
                        <button 
                        onClick={() => setAdjustmentType('add')}
                         className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${adjustmentType === 'add' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200'}`}>
                            <Plus className="h-4 w-4" />
                            Add Stock
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <div key={idx} className={`rounded-lg bg-white p-5 shadow ${stat.color === 'red' || stat.color === 'yellow' ? 'border-l-4' : ''} ${stat.color === 'red' ? 'border-l-red-500' : stat.color === 'yellow' ? 'border-l-yellow-500' : ''}`}>
                            <div className="flex items-center justify-between">
                                <div className={`rounded-lg p-2 ${stat.color === 'blue' ? 'bg-blue-100' :
                                        stat.color === 'yellow' ? 'bg-yellow-100' :
                                            stat.color === 'red' ? 'bg-red-100' : 'bg-green-100'
                                    }`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color === 'blue' ? 'text-blue-600' :
                                            stat.color === 'yellow' ? 'text-yellow-600' :
                                                stat.color === 'red' ? 'text-red-600' : 'text-green-600'
                                        }`} />
                                </div>
                                {(stat.color === 'red' || stat.color === 'yellow') && (
                                    <span className={`text-xs font-medium ${stat.color === 'red' ? 'text-red-600' : 'text-yellow-600'}`}>
                                        Needs attention
                                    </span>
                                )}
                            </div>
                            <p className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <p className="text-xs text-gray-400">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="mb-4 rounded-lg bg-white p-4 shadow">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or SKU..."
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            >
                                <option value="all">All Stock Status</option>
                                <option value="in">In Stock</option>
                                <option value="low">Low Stock</option>
                                <option value="out">Out of Stock</option>
                            </select>
                            <select
                                value={selectedWarehouse}
                                onChange={(e) => setSelectedWarehouse(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            >
                                {warehouses.map(wh => (
                                    <option key={wh.id} value={wh.id}>{wh.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stock Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="w-full">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">SKU</th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">On Hand</th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Reserved</th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Available</th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Incoming</th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Threshold</th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProducts.map(product => {
                                const status = getStockStatus(product);
                                const available = product.stock - product.reserved;
                                return (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
                                                    {product.image}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{product.name}</p>
                                                    <p className="text-xs text-gray-500">{product.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-mono text-sm text-gray-500">{product.sku}</td>
                                        <td className="px-4 py-4 text-center">
                                            {editingStock[product.id] ? (
                                                <input
                                                    type="number"
                                                    defaultValue={product.stock}
                                                    onBlur={(e) => handleInlineEdit(product.id, e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleInlineEdit(product.id, e.target.value)}
                                                    className="w-20 rounded border border-blue-500 px-2 py-1 text-center text-sm focus:outline-none"
                                                    autoFocus
                                                />
                                            ) : (
                                                <button
                                                    onClick={() => setEditingStock({ [product.id]: true })}
                                                    className="font-semibold text-gray-900 hover:text-blue-600"
                                                >
                                                    {product.stock}
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-600">{product.reserved}</td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`font-semibold ${available <= 0 ? 'text-red-600' : available <= product.threshold ? 'text-yellow-600' : 'text-green-600'}`}>
                                                {available}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            {product.incoming > 0 ? (
                                                <span className="inline-flex items-center gap-1 text-sm text-blue-600">
                                                    <TrendingUp className="h-3 w-3" />
                                                    +{product.incoming}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-500">{product.threshold}</td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.bg}`}>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openAdjustModal(product)}
                                                    className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
                                                    title="Adjust Stock"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => openTransferModal(product)}
                                                    className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
                                                    title="Transfer"
                                                >
                                                    <ArrowRight className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => openHistoryModal(product)}
                                                    className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
                                                    title="History"
                                                >
                                                    <History className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="mt-4 rounded-lg bg-white p-12 text-center shadow">
                        <Package className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                        <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {/* Adjust Stock Modal */}
            {showAdjustModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Adjust Stock</h3>
                            <button onClick={() => setShowAdjustModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                            <span className="text-2xl">{selectedProduct.image}</span>
                            <div>
                                <p className="font-medium text-gray-900">{selectedProduct.name}</p>
                                <p className="text-sm text-gray-500">Current stock: {selectedProduct.stock}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Adjustment Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setAdjustmentType('add')}
                                    className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 ${adjustmentType === 'add' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200'
                                        }`}
                                >
                                    <Plus className="h-5 w-5" />
                                    Add Stock
                                </button>
                                <button
                                    onClick={() => setAdjustmentType('remove')}
                                    className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 ${adjustmentType === 'remove' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200'
                                        }`}
                                >
                                    <Minus className="h-5 w-5" />
                                    Remove Stock
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                value={adjustmentQty}
                                onChange={(e) => setAdjustmentQty(e.target.value)}
                                placeholder="Enter quantity"
                                min="1"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Reason</label>
                            <select
                                value={adjustmentReason}
                                onChange={(e) => setAdjustmentReason(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                            >
                                <option value="">Select reason</option>
                                <option value="delivery">Supplier Delivery</option>
                                <option value="return">Customer Return</option>
                                <option value="damaged">Damaged/Defective</option>
                                <option value="correction">Inventory Correction</option>
                                <option value="theft">Theft/Loss</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {adjustmentQty && (
                            <div className={`mb-4 rounded-lg p-3 ${adjustmentType === 'add' ? 'bg-green-50' : 'bg-red-50'}`}>
                                <p className={`text-sm font-medium ${adjustmentType === 'add' ? 'text-green-800' : 'text-red-800'}`}>
                                    New stock level: {adjustmentType === 'add'
                                        ? selectedProduct.stock + parseInt(adjustmentQty || 0)
                                        : Math.max(0, selectedProduct.stock - parseInt(adjustmentQty || 0))}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={() => setShowAdjustModal(false)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button
                                onClick={handleAdjustment}
                                disabled={!adjustmentQty || !adjustmentReason}
                                className={`flex-1 rounded-lg px-4 py-2 text-white ${adjustmentType === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                    } disabled:opacity-50`}
                            >
                                Confirm Adjustment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* History Modal */}
            {showHistoryModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Stock History</h3>
                            <button onClick={() => setShowHistoryModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                            <span className="text-2xl">{selectedProduct.image}</span>
                            <div>
                                <p className="font-medium text-gray-900">{selectedProduct.name}</p>
                                <p className="text-sm text-gray-500">{selectedProduct.sku}</p>
                            </div>
                        </div>

                        <div className="max-h-80 overflow-y-auto">
                            <div className="space-y-3">
                                {stockHistory.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 border-b pb-3 last:border-0">
                                        <div className={`mt-1 rounded-full p-1.5 ${item.type === 'add' ? 'bg-green-100' :
                                                item.type === 'remove' ? 'bg-red-100' :
                                                    item.type === 'transfer' ? 'bg-blue-100' : 'bg-yellow-100'
                                            }`}>
                                            {item.type === 'add' && <Plus className="h-3 w-3 text-green-600" />}
                                            {item.type === 'remove' && <Minus className="h-3 w-3 text-red-600" />}
                                            {item.type === 'transfer' && <ArrowRight className="h-3 w-3 text-blue-600" />}
                                            {item.type === 'adjust' && <Edit2 className="h-3 w-3 text-yellow-600" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">{item.reason}</p>
                                                <span className={`font-semibold ${item.type === 'add' ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {item.type === 'add' ? '+' : ''}{item.qty}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">{item.date} • {item.user}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Transfer Modal */}
            {showTransferModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Transfer Stock</h3>
                            <button onClick={() => setShowTransferModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                            <span className="text-2xl">{selectedProduct.image}</span>
                            <div>
                                <p className="font-medium text-gray-900">{selectedProduct.name}</p>
                                <p className="text-sm text-gray-500">Total stock: {selectedProduct.stock}</p>
                            </div>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">From</label>
                                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                                    <option>Main Warehouse - LA</option>
                                    <option>East Coast - NY</option>
                                    <option>Central - Chicago</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">To</label>
                                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                                    <option>East Coast - NY</option>
                                    <option>Main Warehouse - LA</option>
                                    <option>Central - Chicago</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Quantity to Transfer</label>
                            <input
                                type="number"
                                placeholder="Enter quantity"
                                min="1"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Notes (Optional)</label>
                            <textarea
                                placeholder="Add any notes about this transfer..."
                                rows={2}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4 rounded-lg bg-blue-50 p-3">
                            <p className="text-sm text-blue-800">
                                <Clock className="mr-1 inline h-4 w-4" />
                                Estimated transfer time: 2-3 business days
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setShowTransferModal(false)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowTransferModal(false)}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}