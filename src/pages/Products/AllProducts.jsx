// src/pages/Products/AllProducts.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

export default function AllProducts() {
    // Sample data, replace with API/Redux data later
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Smartphone X1',
            category: 'Electronics',
            price: 499.99,
            stock: 25,
        },
        {
            id: 2,
            name: 'Leather Jacket',
            category: 'Clothing',
            price: 149.99,
            stock: 10,
        },
        {
            id: 3,
            name: 'Wireless Earbuds',
            category: 'Accessories',
            price: 79.99,
            stock: 50,
        },
    ]);

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(prev => prev.filter(product => product.id !== id));
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    All Products
                </h2>
                <Link
                    to="/products/add"
                    className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md transition"
                >
                    Add Product
                </Link>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    {product.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    {product.stock}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                                    <Link
                                        to={`/products/edit/${product.id}`}
                                        className="text-sky-600 hover:text-sky-800"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400"
                                >
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
