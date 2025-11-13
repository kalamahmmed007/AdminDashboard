import React, { useState } from "react";
import { ImagePlus, Trash2, Edit, Upload } from "lucide-react";

export default function Banners() {
    const [banners, setBanners] = useState([
        {
            id: 1,
            title: "Winter Sale 2025",
            image: "https://via.placeholder.com/300x120?text=Winter+Sale",
            link: "https://example.com/sale",
            active: true,
        },
        {
            id: 2,
            title: "New Arrivals",
            image: "https://via.placeholder.com/300x120?text=New+Arrivals",
            link: "https://example.com/new",
            active: false,
        },
    ]);

    const [form, setForm] = useState({ title: "", image: "", link: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.image || !form.link) return alert("Please fill all fields");
        setBanners([...banners, { id: Date.now(), ...form, active: true }]);
        setForm({ title: "", image: "", link: "" });
    };

    const handleDelete = (id) => setBanners(banners.filter((b) => b.id !== id));

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">📢 Banners / Ads</h1>

            {/* Add Banner Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5 mb-8 border border-gray-200 dark:border-slate-700"
            >
                <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
                    Add New Banner
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Banner Title"
                        className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Banner Image URL"
                        className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Redirect Link"
                        className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                        value={form.link}
                        onChange={(e) => setForm({ ...form, link: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                    <Upload size={18} /> Upload Banner
                </button>
            </form>

            {/* Banner List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md overflow-hidden hover:shadow-xl transition"
                    >
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {banner.title}
                            </h3>
                            <a
                                href={banner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                {banner.link}
                            </a>
                            <div className="flex justify-between items-center mt-3">
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${banner.active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {banner.active ? "Active" : "Inactive"}
                                </span>
                                <div className="flex gap-2">
                                    <button className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded">
                                        <Edit size={16} className="text-blue-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner.id)}
                                        className="p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded"
                                    >
                                        <Trash2 size={16} className="text-red-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {banners.length === 0 && (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    <ImagePlus size={40} className="mx-auto mb-2 opacity-50" />
                    <p>No banners found. Add one above!</p>
                </div>
            )}
        </div>
    );
}
