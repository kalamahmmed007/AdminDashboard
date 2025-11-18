// src/pages/Products/AllProducts.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import debounce from 'lodash.debounce';

export default function AllProducts() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Smartphone X1', category: 'Electronics', price: 499.99, stock: 25 },
        { id: 2, name: 'Leather Jacket', category: 'Clothing', price: 149.99, stock: 10 },
        { id: 3, name: 'Wireless Earbuds', category: 'Accessories', price: 79.99, stock: 50 },
        { id: 4, name: 'Laptop Pro', category: 'Electronics', price: 1200, stock: 5 },
        { id: 5, name: 'Sneakers Y2', category: 'Footwear', price: 99.99, stock: 20 },
        { id: 6, name: 'Watch Z3', category: 'Accessories', price: 199.99, stock: 15 },
    ]);

    const [query, setQuery] = useState('');
    const [sortKey, setSortKey] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const limit = 5;

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(prev => prev.filter(product => product.id !== id));
        }
    };

    const handleSearchDebounced = useCallback(
        debounce((val) => { setQuery(val); setPage(1); }, 300),
        []
    );

    const handleSearch = (e) => handleSearchDebounced(e.target.value);

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        );
    }, [products, query]);

    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts].sort((a, b) => {
            if (sortKey === 'price' || sortKey === 'stock') {
                return sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
            } else {
                return sortOrder === 'asc'
                    ? a[sortKey].toString().localeCompare(b[sortKey].toString())
                    : b[sortKey].toString().localeCompare(a[sortKey].toString());
            }
        });
        return sorted;
    }, [filteredProducts, sortKey, sortOrder]);

    const paginatedProducts = useMemo(() => {
        const start = (page - 1) * limit;
        return sortedProducts.slice(start, start + limit);
    }, [sortedProducts, page]);

    const totalPages = Math.ceil(sortedProducts.length / limit);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-slate-900">All Products</h2>
                <div className="flex flex-wrap gap-2">
                    <input
                        placeholder="Search by name or category"
                        className="rounded border px-3 py-2 md:w-64"
                        onChange={handleSearch}
                    />
                    <select
                        className="rounded border px-3 py-2"
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value)}
                    >
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                        <option value="price">Price</option>
                        <option value="stock">Stock</option>
                    </select>
                    <select
                        className="rounded border px-3 py-2"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <Link
                        to="/products/add"
                        className="rounded-md bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700"
                    >
                        Add Product
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg bg-white shadow">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            {['ID', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map((h, i) => (
                                <th key={i} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {paginatedProducts.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 text-sm text-slate-900">{product.id}</td>
                                <td className="px-6 py-4 text-sm text-slate-900">{product.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-900">{product.category}</td>
                                <td className="px-6 py-4 text-sm text-slate-900">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm text-slate-900">{product.stock}</td>
                                <td className="flex justify-end gap-2 px-6 py-4 text-right text-sm">
                                    <Link to={`/products/edit/${product.id}`} className="text-sky-600 hover:text-sky-800"><Edit size={18} /></Link>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {paginatedProducts.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-slate-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div>
                    Showing {paginatedProducts.length} of {sortedProducts.length}
                </div>
                <div className="flex gap-2">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded border px-3 py-1 disabled:opacity-50">Prev</button>
                    <span className="rounded border px-3 py-1">Page {page}</span>
                    <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
}
