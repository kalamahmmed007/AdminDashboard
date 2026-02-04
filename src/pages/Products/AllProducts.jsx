import { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye, Copy, Archive, ChevronDown, Grid, List, ArrowUpDown, Package, DollarSign, TrendingUp, AlertTriangle, X, ChevronLeft, ChevronRight, Star, Tag } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
    const [viewMode, setViewMode] = useState('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Products', value: '1,234', icon: Package, color: 'blue', change: '+24 this month' },
        { label: 'Active Listings', value: '1,180', icon: TrendingUp, color: 'green', change: '95.6% of total' },
        { label: 'Low Stock Items', value: '23', icon: AlertTriangle, color: 'yellow', change: 'Needs attention' },
        { label: 'Total Value', value: '$284,520', icon: DollarSign, color: 'purple', change: 'Inventory worth' }
    ];

    const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports'];
    const statuses = ['All', 'Active', 'Draft', 'Archived', 'Out of Stock'];

    const products = [
        { id: 1, name: 'Wireless Headphones Pro', sku: 'WHP-001', image: '🎧', category: 'Electronics', price: 79.99, comparePrice: 99.99, stock: 145, status: 'active', rating: 4.8, sales: 892 },
        { id: 2, name: 'Smart Watch Series 5', sku: 'SWS-005', image: '⌚', category: 'Electronics', price: 199.99, comparePrice: null, stock: 67, status: 'active', rating: 4.6, sales: 654 },
        { id: 3, name: 'USB-C Fast Charger', sku: 'UFC-010', image: '🔌', category: 'Electronics', price: 29.99, comparePrice: 39.99, stock: 234, status: 'active', rating: 4.4, sales: 1203 },
        { id: 4, name: 'Premium Leather Wallet', sku: 'PLW-003', image: '👛', category: 'Accessories', price: 89.99, comparePrice: null, stock: 12, status: 'active', rating: 4.9, sales: 445 },
        { id: 5, name: 'Running Shoes Elite', sku: 'RSE-007', image: '👟', category: 'Sports', price: 129.99, comparePrice: 159.99, stock: 0, status: 'out_of_stock', rating: 4.7, sales: 567 },
        { id: 6, name: 'Cotton T-Shirt Basic', sku: 'CTB-022', image: '👕', category: 'Clothing', price: 24.99, comparePrice: null, stock: 456, status: 'active', rating: 4.3, sales: 2341 },
        { id: 7, name: 'Bluetooth Speaker Mini', sku: 'BSM-004', image: '🔊', category: 'Electronics', price: 49.99, comparePrice: 69.99, stock: 89, status: 'active', rating: 4.5, sales: 723 },
        { id: 8, name: 'Yoga Mat Premium', sku: 'YMP-011', image: '🧘', category: 'Sports', price: 45.99, comparePrice: null, stock: 5, status: 'active', rating: 4.8, sales: 334 },
        { id: 9, name: 'Ceramic Plant Pot Set', sku: 'CPP-015', image: '🪴', category: 'Home & Garden', price: 34.99, comparePrice: 44.99, stock: 78, status: 'draft', rating: 0, sales: 0 },
        { id: 10, name: 'Vintage Sunglasses', sku: 'VSG-008', image: '🕶️', category: 'Accessories', price: 59.99, comparePrice: null, stock: 34, status: 'archived', rating: 4.2, sales: 189 }
    ];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus.toLowerCase().replace(' ', '_');
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-100 text-green-800',
            draft: 'bg-gray-100 text-gray-800',
            archived: 'bg-yellow-100 text-yellow-800',
            out_of_stock: 'bg-red-100 text-red-800'
        };
        const labels = { active: 'Active', draft: 'Draft', archived: 'Archived', out_of_stock: 'Out of Stock' };
        return <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
    };

    const getStockBadge = (stock) => {
        if (stock === 0) return <span className="font-medium text-red-600">Out of stock</span>;
        if (stock <= 10) return <span className="font-medium text-yellow-600">{stock} left</span>;
        return <span className="text-gray-900">{stock}</span>;
    };

    const toggleSelectAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map(p => p.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedProducts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    };

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };


    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <p className="mt-1 text-gray-600">Manage your product inventory</p>
                    </div>
                    <button onClick={() => navigate("/products/add-product")} className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        <Plus className="h-5 w-5" />
                        Add Product
                    </button>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="rounded-lg bg-white p-5 shadow">
                            <div className="flex items-center gap-4">
                                <div className={`rounded-lg p-3 ${stat.color === 'blue' ? 'bg-blue-100' :
                                        stat.color === 'green' ? 'bg-green-100' :
                                            stat.color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'
                                    }`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color === 'blue' ? 'text-blue-600' :
                                            stat.color === 'green' ? 'text-green-600' :
                                                stat.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'
                                        }`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                    <p className="text-xs text-gray-400">{stat.change}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters Bar */}
                <div className="mb-4 rounded-lg bg-white p-4 shadow">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                                ))}
                            </select>

                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status.toLowerCase().replace(' ', '_')}>{status}</option>
                                ))}
                            </select>
                        </div>

                        {/* View Toggle & Bulk Actions */}
                        <div className="flex items-center gap-3">
                            {selectedProducts.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">{selectedProducts.length} selected</span>
                                    <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
                                        <Archive className="h-4 w-4" />
                                    </button>
                                    <button className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                            <div className="flex rounded-lg border border-gray-300">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`p-2 ${viewMode === 'table' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                >
                                    <List className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                >
                                    <Grid className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table View */}
                {viewMode === 'table' && (
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <table className="w-full">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                                            onChange={toggleSelectAll}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Product</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">SKU</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Stock</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Sales</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className={`hover:bg-gray-50 ${selectedProducts.includes(product.id) ? 'bg-blue-50' : ''}`}>
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => toggleSelect(product.id)}
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
                                                    {product.image}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{product.name}</p>
                                                    {product.rating > 0 && (
                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                            {product.rating}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-mono text-sm text-gray-500">{product.sku}</td>
                                        <td className="px-4 py-4">
                                            <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                                <Tag className="h-3 w-3" />
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">${product.price}</p>
                                                {product.comparePrice && (
                                                    <p className="text-xs text-gray-400 line-through">${product.comparePrice}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm">{getStockBadge(product.stock)}</td>
                                        <td className="px-4 py-4">{getStatusBadge(product.status)}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">{product.sales.toLocaleString()}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="rounded p-1.5 hover:bg-gray-100" title="View">
                                                    <Eye className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <button className="rounded p-1.5 hover:bg-gray-100" title="Edit">
                                                    <Edit className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <button className="rounded p-1.5 hover:bg-gray-100" title="Duplicate">
                                                    <Copy className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <button onClick={() => openDeleteModal(product)} className="rounded p-1.5 hover:bg-red-50" title="Delete">
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Products Grid View */}
                {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md">
                                <div className="relative">
                                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-100 text-5xl">
                                        {product.image}
                                    </div>
                                    <div className="absolute right-2 top-2">{getStatusBadge(product.status)}</div>
                                    {product.comparePrice && (
                                        <div className="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                                            Sale
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <h3 className="truncate font-medium text-gray-900">{product.name}</h3>
                                    <p className="text-xs text-gray-500">{product.sku}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div>
                                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                                            {product.comparePrice && (
                                                <span className="ml-2 text-sm text-gray-400 line-through">${product.comparePrice}</span>
                                            )}
                                        </div>
                                        {product.rating > 0 && (
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                {product.rating}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Stock: {getStockBadge(product.stock)}</span>
                                        <span className="text-gray-500">{product.sales} sold</span>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
                                            Edit
                                        </button>
                                        <button className="rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-50">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50" disabled>
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">1</button>
                        <button className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100">2</button>
                        <button className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100">3</button>
                        <button className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="rounded-lg bg-white p-12 text-center shadow">
                        <Package className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                        <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters.</p>
                        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            Add New Product
                        </button>
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            {showDeleteModal && productToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
                            <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="mb-4 flex items-center gap-3 rounded-lg bg-red-50 p-4">
                            <div className="text-3xl">{productToDelete.image}</div>
                            <div>
                                <p className="font-medium text-gray-900">{productToDelete.name}</p>
                                <p className="text-sm text-gray-500">{productToDelete.sku}</p>
                            </div>
                        </div>
                        <p className="mb-4 text-sm text-gray-600">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}