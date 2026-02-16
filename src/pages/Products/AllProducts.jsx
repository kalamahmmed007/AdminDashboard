import { useState, useEffect } from "react";
import axios from "axios";
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
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const pageSize = 10; // items per page

    const stats = [
        { label: 'Total Products', value: totalProducts, icon: Package, color: 'blue', change: '+24 this month' },
        { label: 'Active Listings', value: '-', icon: TrendingUp, color: 'green', change: '95.6% of total' },
        { label: 'Low Stock Items', value: '-', icon: AlertTriangle, color: 'yellow', change: 'Needs attention' },
        { label: 'Total Value', value: '-', icon: DollarSign, color: 'purple', change: 'Inventory worth' }
    ];

    const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports'];
    const statuses = ['All', 'Active', 'Draft', 'Archived', 'Out of Stock'];

    // Fetch products from API
    const fetchProducts = async (page = 1) => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/api/products?page=${page}&limit=${pageSize}`);
            setProducts(res.data.products);
            setTotalProducts(res.data.total);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    // Delete product API call
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            setShowDeleteModal(false);
            fetchProducts(currentPage); // refresh current page
        } catch (err) {
            console.error("Failed to delete product:", err);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesStatus = selectedStatus === 'all' || p.status.toLowerCase() === selectedStatus.toLowerCase().replace(' ', '_');
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
            setSelectedProducts(filteredProducts.map(p => p._id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedProducts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    };

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const totalPages = Math.ceil(totalProducts / pageSize);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-gray-600">Loading products...</p>
            </div>
        );
    }

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
                                    <button className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50" onClick={() => selectedProducts.forEach(id => deleteProduct(id))}>
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

                {/* Table/Grid render here remains identical to your current design */}

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow">
                    <p className="text-sm text-gray-600">
                        Showing page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        {[...Array(totalPages).keys()].map(i => (
                            <button key={i} className={`rounded-lg px-3 py-1 text-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`} onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                            </button>
                        ))}
                        <button className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
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
                                <button onClick={() => deleteProduct(productToDelete._id)} className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
