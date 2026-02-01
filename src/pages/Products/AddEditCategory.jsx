// src/pages/Products/AddEditCategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddEditCategory() {
    const { id } = useParams(); // edit mode হলে id থাকবে
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
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
                {id ? 'Edit Category' : 'Add Category'}
            </h2>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md transition"
                >
                    {id ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    );
}
