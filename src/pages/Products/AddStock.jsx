// src/pages/Stock/AddStock.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectCategories } from '../../redux/slices/stockSlice';
import { selectWarehouses } from '../../redux/slices/warehouseSlice';
import { 
    ArrowLeft, 
    Save, 
    Package, 
    Hash, 
    Tag, 
    Layers, 
    TrendingUp, 
    AlertTriangle,
    MapPin,
    Plus,
    Minus,
    Info
} from 'lucide-react';

export default function AddStock() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const warehouses = useSelector(selectWarehouses);
    const categories = useSelector(selectCategories);

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        stock: '',
        threshold: '',
        image: '📦',
        selectedWarehouse: 'wh1',
        warehouseStocks: {
            wh1: '',
            wh2: '',
            wh3: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [distributionMode, setDistributionMode] = useState('single'); // 'single' or 'multiple'

    const emojiOptions = ['📦', '🎧', '⌚', '🔌', '👛', '👟', '👕', '🔊', '🧘', '💻', '📱', '🎮', '📷', '🎨', '⚽', '🏀'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleWarehouseStockChange = (warehouseId, value) => {
        setFormData(prev => ({
            ...prev,
            warehouseStocks: {
                ...prev.warehouseStocks,
                [warehouseId]: value
            }
        }));
    };

    const autoGenerateSKU = () => {
        const category = formData.category.slice(0, 3).toUpperCase() || 'PRD';
        const random = Math.floor(Math.random() * 9000) + 1000;
        setFormData(prev => ({
            ...prev,
            sku: `${category}-${random}`
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.sku.trim()) {
            newErrors.sku = 'SKU is required';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (distributionMode === 'single') {
            if (!formData.stock || parseInt(formData.stock) < 0) {
                newErrors.stock = 'Stock quantity is required';
            }
        } else {
            const totalStock = Object.values(formData.warehouseStocks)
                .reduce((sum, val) => sum + (parseInt(val) || 0), 0);
            if (totalStock === 0) {
                newErrors.warehouseStocks = 'At least one warehouse must have stock';
            }
        }

        if (!formData.threshold || parseInt(formData.threshold) < 0) {
            newErrors.threshold = 'Threshold is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Prepare warehouse distribution
        let warehouseDistribution = {};
        let totalStock = 0;

        if (distributionMode === 'single') {
            totalStock = parseInt(formData.stock);
            warehouseDistribution = {
                [formData.selectedWarehouse]: totalStock
            };
        } else {
            warehouseDistribution = Object.entries(formData.warehouseStocks).reduce((acc, [key, value]) => {
                const qty = parseInt(value) || 0;
                if (qty > 0) {
                    acc[key] = qty;
                    totalStock += qty;
                }
                return acc;
            }, {});
        }

        // Create product object
        const newProduct = {
            name: formData.name.trim(),
            sku: formData.sku.trim().toUpperCase(),
            category: formData.category,
            stock: totalStock,
            threshold: parseInt(formData.threshold),
            image: formData.image,
            warehouses: warehouseDistribution,
            selectedWarehouse: formData.selectedWarehouse
        };

        // Dispatch to Redux
        dispatch(addProduct(newProduct));

        // Show success message (you can add toast notification here)
        alert('Stock added successfully!');

        // Navigate back to stock management
        navigate('/stock');
    };

    const calculateTotalStock = () => {
        return Object.values(formData.warehouseStocks)
            .reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/stock')}
                        className="mb-4 flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Stock Management</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Add New Stock</h1>
                    <p className="mt-1 text-gray-600">Add a new product to your inventory</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Product Information Card */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <div className="mb-4 flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Product Information</h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Product Name */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Wireless Headphones Pro"
                                        className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 ${
                                            errors.name 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                {/* SKU */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        SKU <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleChange}
                                            placeholder="e.g., WHP-001"
                                            className={`flex-1 rounded-lg border px-4 py-2.5 font-mono uppercase focus:outline-none focus:ring-2 ${
                                                errors.sku 
                                                    ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={autoGenerateSKU}
                                            className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                            title="Auto Generate SKU"
                                        >
                                            <Hash className="h-4 w-4" />
                                        </button>
                                    </div>
                                    {errors.sku && (
                                        <p className="mt-1 text-sm text-red-500">{errors.sku}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 ${
                                            errors.category 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        }`}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                                    )}
                                </div>

                                {/* Product Icon */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Product Icon
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {emojiOptions.map(emoji => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                                                className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 text-2xl transition ${
                                                    formData.image === emoji 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stock Distribution Card */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Layers className="h-5 w-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">Stock Distribution</h2>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setDistributionMode('single')}
                                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                                            distributionMode === 'single' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Single Warehouse
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDistributionMode('multiple')}
                                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                                            distributionMode === 'multiple' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Multiple Warehouses
                                    </button>
                                </div>
                            </div>

                            {distributionMode === 'single' ? (
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Warehouse Selection */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Warehouse <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="selectedWarehouse"
                                            value={formData.selectedWarehouse}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {warehouses.map(wh => (
                                                <option key={wh.id} value={wh.id}>{wh.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Stock Quantity */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Initial Stock Quantity <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder="e.g., 100"
                                            className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 ${
                                                errors.stock 
                                                    ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                            }`}
                                        />
                                        {errors.stock && (
                                            <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="rounded-lg bg-blue-50 p-3">
                                        <div className="flex items-start gap-2">
                                            <Info className="mt-0.5 h-4 w-4 text-blue-600" />
                                            <p className="text-sm text-blue-800">
                                                Distribute stock across multiple warehouses. Total stock will be calculated automatically.
                                            </p>
                                        </div>
                                    </div>

                                    {warehouses.map(warehouse => (
                                        <div key={warehouse.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{warehouse.name}</p>
                                                <p className="text-xs text-gray-500">{warehouse.location}</p>
                                            </div>
                                            <input
                                                type="number"
                                                value={formData.warehouseStocks[warehouse.id]}
                                                onChange={(e) => handleWarehouseStockChange(warehouse.id, e.target.value)}
                                                min="0"
                                                placeholder="0"
                                                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    ))}

                                    {errors.warehouseStocks && (
                                        <p className="text-sm text-red-500">{errors.warehouseStocks}</p>
                                    )}

                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">Total Stock:</span>
                                            <span className="text-2xl font-bold text-gray-900">
                                                {calculateTotalStock()} units
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Inventory Settings Card */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <div className="mb-4 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Inventory Settings</h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Low Stock Threshold */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Low Stock Threshold <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="threshold"
                                        value={formData.threshold}
                                        onChange={handleChange}
                                        min="0"
                                        placeholder="e.g., 20"
                                        className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 ${
                                            errors.threshold 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        }`}
                                    />
                                    {errors.threshold && (
                                        <p className="mt-1 text-sm text-red-500">{errors.threshold}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        Alert when stock falls below this number
                                    </p>
                                </div>

                                <div className="rounded-lg bg-yellow-50 p-4">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-600" />
                                        <div>
                                            <p className="text-sm font-medium text-yellow-800">Low Stock Alert</p>
                                            <p className="mt-1 text-xs text-yellow-700">
                                                You'll be notified when stock reaches threshold level
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/stock')}
                                className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                            >
                                <Save className="h-5 w-5" />
                                Add Stock
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}