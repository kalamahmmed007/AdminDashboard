// src/pages/Products/Categories.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function Categories() {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Electronics', description: 'Gadgets and devices' },
        { id: 2, name: 'Clothing', description: 'Men & Women apparel' },
        { id: 3, name: 'Accessories', description: 'Bags, Watches, etc.' },
    ]);

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(prev => prev.filter(cat => cat.id !== id));
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Categories
                </h2>
                <Link
                    to="/products/categories/add"
                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md transition"
                >
                    <Plus size={16} /> Add Category
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
                                Description
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    {category.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                                    {category.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                                    <Link
                                        to={`/products/categories/edit/${category.id}`}
                                        className="text-sky-600 hover:text-sky-800"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400"
                                >
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
