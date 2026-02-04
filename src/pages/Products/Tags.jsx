// src/pages/Products/Tags.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Tag } from 'lucide-react';

export default function Tags() {
    const [tags, setTags] = useState([
        { id: 1, name: 'New Arrival', slug: 'new-arrival', color: '#10b981', description: 'Latest products' },
        { id: 2, name: 'Best Seller', slug: 'best-seller', color: '#f59e0b', description: 'Top selling items' },
        { id: 3, name: 'Discount', slug: 'discount', color: '#ef4444', description: 'Discounted products' },
        { id: 4, name: 'Featured', slug: 'featured', color: '#8b5cf6', description: 'Featured products' },
    ]);

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this tag?')) {
            setTags(prev => prev.filter(tag => tag.id !== id));
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Product Tags
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Manage tags to organize and categorize your products
                    </p>
                </div>
                <Link
                    to="/products/tags/add"
                    className="flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md"
                >
                    <Plus size={18} /> Add Tag
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 p-4 text-white shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-sky-100">Total Tags</p>
                            <p className="mt-1 text-3xl font-bold">{tags.length}</p>
                        </div>
                        <div className="rounded-lg bg-white/20 p-3">
                            <Tag size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Tags</p>
                            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">{tags.length}</p>
                        </div>
                        <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                            <Tag size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Most Used</p>
                            <p className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">Best Seller</p>
                        </div>
                        <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900/30">
                            <Tag size={24} className="text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tags Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Tag
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Slug
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Description
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
                        {tags.map(tag => (
                            <tr key={tag.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                                    #{tag.id}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="h-3 w-3 rounded-full" 
                                            style={{ backgroundColor: tag.color }}
                                        />
                                        <span 
                                            className="rounded-full px-3 py-1 text-sm font-medium text-white"
                                            style={{ backgroundColor: tag.color }}
                                        >
                                            {tag.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-400">
                                    {tag.slug}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                    {tag.description || '-'}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            to={`/products/tags/edit/${tag.id}`}
                                            className="rounded-md p-2 text-sky-600 transition hover:bg-sky-50 hover:text-sky-800 dark:hover:bg-sky-900/30"
                                            title="Edit Tag"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(tag.id)}
                                            className="rounded-md p-2 text-red-600 transition hover:bg-red-50 hover:text-red-800 dark:hover:bg-red-900/30"
                                            title="Delete Tag"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {tags.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                                        <Tag size={48} className="mb-3 opacity-30" />
                                        <p className="text-lg font-medium">No tags found</p>
                                        <p className="mt-1 text-sm">Create your first tag to get started</p>
                                        <Link
                                            to="/products/tags/add"
                                            className="mt-4 flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700"
                                        >
                                            <Plus size={16} /> Add Your First Tag
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Info */}
            {tags.length > 0 && (
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                    Showing {tags.length} tag{tags.length !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
}