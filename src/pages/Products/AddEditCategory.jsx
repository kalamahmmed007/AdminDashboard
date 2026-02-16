// src/pages/Products/AddEditCategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddEditCategory() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [category, setCategory] = useState({ name: '', description: '' });

    useEffect(() => {
        if (id) {
            // Edit mode: fetch existing category (simulate)
            const existing = { name: 'Electronics', description: 'Gadgets & devices' };
            setCategory(existing);
        }
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (id) {
            alert('Category updated!');
        } else {
            alert('Category added!');
        }
        navigate('/products/categories');
    };

    return (
        <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {id ? 'Edit Category' : 'Add Category'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow dark:bg-slate-800">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                        required
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700"
                >
                    {id ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    );
}
