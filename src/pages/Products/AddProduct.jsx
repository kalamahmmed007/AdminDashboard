// src/pages/Products/AddProduct.jsx
import React, { useState } from 'react';

export default function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
    });

    const [image, setImage] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = e => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: Redux / API call logic here
        console.log('Product submitted:', { ...product, image });
        alert('Product submitted! Check console for details.');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
                Add New Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                        Category
                    </label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full p-2 border rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                        Product Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-slate-700 dark:text-slate-200"
                    />
                    {image && (
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Selected: {image.name}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md font-medium transition"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
