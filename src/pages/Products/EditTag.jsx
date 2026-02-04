// src/pages/Products/EditTag.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditTag() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        color: '#3b82f6',
    });

    useEffect(() => {
        // এখানে আপনার backend থেকে tag data fetch করবেন
        // এখন demo data দিয়ে দেখাচ্ছি
        const demoTags = {
            1: { name: 'New Arrival', slug: 'new-arrival', description: 'Latest products', color: '#10b981' },
            2: { name: 'Best Seller', slug: 'best-seller', description: 'Top selling items', color: '#f59e0b' },
            3: { name: 'Discount', slug: 'discount', description: 'Discounted products', color: '#ef4444' },
        };

        const tagData = demoTags[id];
        if (tagData) {
            setFormData(tagData);
        }
        setLoading(false);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // এখানে আপনার backend API call হবে
        console.log('Updated Tag Data:', { id, ...formData });
        // Success হলে tags page এ redirect
        navigate('/products/tags');
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex h-64 items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-sky-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/products/tags')}
                    className="mb-4 flex items-center gap-2 text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Tags</span>
                </button>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Edit Tag
                </h2>
            </div>

            <div className="max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tag Name */}
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Tag Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g., New Arrival"
                            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label htmlFor="slug" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Slug <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            placeholder="e.g., new-arrival"
                            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500"
                        />
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            URL-friendly version
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Brief description of this tag..."
                            className="w-full resize-none rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500"
                        />
                    </div>

                    {/* Color Picker */}
                    <div>
                        <label htmlFor="color" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Tag Color
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="h-10 w-20 cursor-pointer rounded border border-slate-300 dark:border-slate-600"
                            />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                Selected: {formData.color}
                            </span>
                            <div 
                                className="rounded-full px-3 py-1 text-sm font-medium text-white"
                                style={{ backgroundColor: formData.color }}
                            >
                                {formData.name || 'Preview'}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-md bg-sky-600 px-6 py-2 font-medium text-white transition hover:bg-sky-700"
                        >
                            <Save size={18} />
                            Update Tag
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/products/tags')}
                            className="rounded-md border border-slate-300 px-6 py-2 font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}