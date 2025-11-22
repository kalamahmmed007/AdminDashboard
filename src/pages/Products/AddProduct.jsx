import { useState } from "react";
import { ArrowLeft, Save, Eye, Upload, X, Plus, Trash2, GripVertical, Image, DollarSign, Package, Tag, Layers, Settings, Info, ChevronDown, ChevronUp, Bold, Italic, List, Link, AlertCircle, CheckCircle } from 'lucide-react';

export default function AddProduct() {
    const [activeTab, setActiveTab] = useState('general');
    const [showPreview, setShowPreview] = useState(false);
    const [saved, setSaved] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        description: '',
        shortDescription: '',
        sku: '',
        barcode: '',
        price: '',
        comparePrice: '',
        costPrice: '',
        category: '',
        subcategory: '',
        brand: '',
        tags: [],
        status: 'draft',
        stock: '',
        lowStockThreshold: '10',
        trackInventory: true,
        allowBackorders: false,
        weight: '',
        weightUnit: 'lb',
        dimensions: { length: '', width: '', height: '' },
        images: [],
        variants: [],
        seoTitle: '',
        seoDescription: '',
        slug: ''
    });

    const [newTag, setNewTag] = useState('');
    const [expandedSections, setExpandedSections] = useState({
        pricing: true,
        inventory: true,
        shipping: false,
        seo: false
    });

    const categories = ['Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports', 'Beauty', 'Toys'];
    const subcategories = {
        Electronics: ['Phones', 'Laptops', 'Audio', 'Wearables', 'Accessories'],
        Clothing: ['Men', 'Women', 'Kids', 'Shoes', 'Activewear'],
        Accessories: ['Bags', 'Watches', 'Jewelry', 'Sunglasses', 'Wallets']
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Package },
        { id: 'media', label: 'Media', icon: Image },
        { id: 'pricing', label: 'Pricing', icon: DollarSign },
        { id: 'inventory', label: 'Inventory', icon: Layers },
        { id: 'shipping', label: 'Shipping', icon: Tag },
        { id: 'seo', label: 'SEO', icon: Settings }
    ];

    const mockImages = ['🎧', '📦', '🎁', '📱'];
    const [uploadedImages, setUploadedImages] = useState([]);

    const addTag = () => {
        if (newTag.trim() && !product.tags.includes(newTag.trim())) {
            setProduct({ ...product, tags: [...product.tags, newTag.trim()] });
            setNewTag('');
        }
    };

    const removeTag = (tag) => {
        setProduct({ ...product, tags: product.tags.filter(t => t !== tag) });
    };

    const addImage = () => {
        const randomEmoji = mockImages[Math.floor(Math.random() * mockImages.length)];
        setUploadedImages([...uploadedImages, { id: Date.now(), src: randomEmoji }]);
    };

    const removeImage = (id) => {
        setUploadedImages(uploadedImages.filter(img => img.id !== id));
    };

    const handleSave = (status) => {
        setProduct({ ...product, status });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const toggleSection = (section) => {
        setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
    };

    const generateSlug = () => {
        const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setProduct({ ...product, slug });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b bg-white shadow-sm">
                <div className="mx-auto max-w-6xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Add New Product</h1>
                                <p className="text-sm text-gray-500">Fill in the details to create a new product</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {saved && (
                                <span className="flex items-center gap-1 text-sm text-green-600">
                                    <CheckCircle className="h-4 w-4" /> Saved
                                </span>
                            )}
                            <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                <Eye className="h-4 w-4" />
                                Preview
                            </button>
                            <button onClick={() => handleSave('draft')} className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                Save Draft
                            </button>
                            <button onClick={() => handleSave('active')} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                <Save className="h-4 w-4" />
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Information */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Basic Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Product Name *</label>
                                    <input
                                        type="text"
                                        value={product.name}
                                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                        placeholder="Enter product name"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Short Description</label>
                                    <input
                                        type="text"
                                        value={product.shortDescription}
                                        onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
                                        placeholder="Brief description for product cards"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                        maxLength={160}
                                    />
                                    <p className="mt-1 text-xs text-gray-400">{product.shortDescription.length}/160 characters</p>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Full Description</label>
                                    <div className="overflow-hidden rounded-lg border border-gray-300">
                                        <div className="flex gap-1 border-b bg-gray-50 px-2 py-1">
                                            <button className="rounded p-1.5 hover:bg-gray-200"><Bold className="h-4 w-4" /></button>
                                            <button className="rounded p-1.5 hover:bg-gray-200"><Italic className="h-4 w-4" /></button>
                                            <button className="rounded p-1.5 hover:bg-gray-200"><List className="h-4 w-4" /></button>
                                            <button className="rounded p-1.5 hover:bg-gray-200"><Link className="h-4 w-4" /></button>
                                        </div>
                                        <textarea
                                            value={product.description}
                                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                            placeholder="Detailed product description..."
                                            rows={5}
                                            className="w-full px-4 py-3 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Media */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Media</h2>

                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8">
                                {uploadedImages.length === 0 ? (
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">Drag and drop images here, or click to browse</p>
                                        <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB each</p>
                                        <button onClick={addImage} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                            Upload Images
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="grid grid-cols-4 gap-4">
                                            {uploadedImages.map((img, idx) => (
                                                <div key={img.id} className={`relative rounded-lg bg-gray-100 p-4 ${idx === 0 ? 'ring-2 ring-blue-500' : ''}`}>
                                                    <div className="flex h-20 items-center justify-center text-4xl">{img.src}</div>
                                                    <button onClick={() => removeImage(img.id)} className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                    {idx === 0 && <span className="absolute bottom-1 left-1 rounded bg-blue-600 px-1.5 py-0.5 text-xs text-white">Main</span>}
                                                </div>
                                            ))}
                                            <button onClick={addImage} className="flex h-28 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400">
                                                <Plus className="h-8 w-8 text-gray-400" />
                                            </button>
                                        </div>
                                        <p className="mt-3 text-xs text-gray-500">Drag to reorder. First image will be the main product image.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="rounded-lg bg-white shadow">
                            <button onClick={() => toggleSection('pricing')} className="flex w-full items-center justify-between p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>
                                {expandedSections.pricing ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </button>
                            {expandedSections.pricing && (
                                <div className="border-t px-6 pb-6 pt-4">
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Price *</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                                <input
                                                    type="number"
                                                    value={product.price}
                                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                                    placeholder="0.00"
                                                    className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-4 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Compare at Price</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                                <input
                                                    type="number"
                                                    value={product.comparePrice}
                                                    onChange={(e) => setProduct({ ...product, comparePrice: e.target.value })}
                                                    placeholder="0.00"
                                                    className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-4 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-400">Original price for sale display</p>
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Cost per Item</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                                <input
                                                    type="number"
                                                    value={product.costPrice}
                                                    onChange={(e) => setProduct({ ...product, costPrice: e.target.value })}
                                                    placeholder="0.00"
                                                    className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-4 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-400">For profit calculation</p>
                                        </div>
                                    </div>
                                    {product.price && product.costPrice && (
                                        <div className="mt-4 rounded-lg bg-green-50 p-3">
                                            <p className="text-sm text-green-800">
                                                Profit margin: <span className="font-semibold">${(product.price - product.costPrice).toFixed(2)}</span> ({((1 - product.costPrice / product.price) * 100).toFixed(1)}%)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Inventory */}
                        <div className="rounded-lg bg-white shadow">
                            <button onClick={() => toggleSection('inventory')} className="flex w-full items-center justify-between p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Inventory</h2>
                                {expandedSections.inventory ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </button>
                            {expandedSections.inventory && (
                                <div className="space-y-4 border-t px-6 pb-6 pt-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">SKU</label>
                                            <input
                                                type="text"
                                                value={product.sku}
                                                onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                                                placeholder="ABC-12345"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Barcode</label>
                                            <input
                                                type="text"
                                                value={product.barcode}
                                                onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
                                                placeholder="ISBN, UPC, etc."
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="trackInventory"
                                            checked={product.trackInventory}
                                            onChange={(e) => setProduct({ ...product, trackInventory: e.target.checked })}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <label htmlFor="trackInventory" className="text-sm text-gray-700">Track inventory quantity</label>
                                    </div>
                                    {product.trackInventory && (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Quantity in Stock</label>
                                                <input
                                                    type="number"
                                                    value={product.stock}
                                                    onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                                                    placeholder="0"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Low Stock Alert</label>
                                                <input
                                                    type="number"
                                                    value={product.lowStockThreshold}
                                                    onChange={(e) => setProduct({ ...product, lowStockThreshold: e.target.value })}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Shipping */}
                        <div className="rounded-lg bg-white shadow">
                            <button onClick={() => toggleSection('shipping')} className="flex w-full items-center justify-between p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Shipping</h2>
                                {expandedSections.shipping ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </button>
                            {expandedSections.shipping && (
                                <div className="space-y-4 border-t px-6 pb-6 pt-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Weight</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={product.weight}
                                                    onChange={(e) => setProduct({ ...product, weight: e.target.value })}
                                                    placeholder="0"
                                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                                />
                                                <select
                                                    value={product.weightUnit}
                                                    onChange={(e) => setProduct({ ...product, weightUnit: e.target.value })}
                                                    className="rounded-lg border border-gray-300 px-3 py-2"
                                                >
                                                    <option value="lb">lb</option>
                                                    <option value="kg">kg</option>
                                                    <option value="oz">oz</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Dimensions (inches)</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <input type="number" placeholder="Length" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
                                            <input type="number" placeholder="Width" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
                                            <input type="number" placeholder="Height" className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-sm font-semibold text-gray-900">Product Status</h3>
                            <select
                                value={product.status}
                                onChange={(e) => setProduct({ ...product, status: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                            >
                                <option value="draft">Draft</option>
                                <option value="active">Active</option>
                                <option value="archived">Archived</option>
                            </select>
                            <p className="mt-2 text-xs text-gray-500">
                                {product.status === 'draft' && 'Product will not be visible to customers'}
                                {product.status === 'active' && 'Product will be visible in your store'}
                                {product.status === 'archived' && 'Product is hidden but data is preserved'}
                            </p>
                        </div>

                        {/* Organization */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-sm font-semibold text-gray-900">Organization</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">Category</label>
                                    <select
                                        value={product.category}
                                        onChange={(e) => setProduct({ ...product, category: e.target.value, subcategory: '' })}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                {product.category && subcategories[product.category] && (
                                    <div>
                                        <label className="mb-1 block text-sm text-gray-600">Subcategory</label>
                                        <select
                                            value={product.subcategory}
                                            onChange={(e) => setProduct({ ...product, subcategory: e.target.value })}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="">Select subcategory</option>
                                            {subcategories[product.category].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                        </select>
                                    </div>
                                )}
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">Brand</label>
                                    <input
                                        type="text"
                                        value={product.brand}
                                        onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                                        placeholder="Enter brand name"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">Tags</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                            placeholder="Add tag"
                                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                        <button onClick={addTag} className="rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200">
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    {product.tags.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {product.tags.map(tag => (
                                                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
                                                    {tag}
                                                    <button onClick={() => removeTag(tag)}><X className="h-3 w-3" /></button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-sm font-semibold text-gray-900">Search Engine Listing</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">Page Title</label>
                                    <input
                                        type="text"
                                        value={product.seoTitle}
                                        onChange={(e) => setProduct({ ...product, seoTitle: e.target.value })}
                                        placeholder={product.name || 'Product title'}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">URL Slug</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={product.slug}
                                            onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                                            placeholder="product-url-slug"
                                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                        <button onClick={generateSlug} className="rounded-lg bg-gray-100 px-3 py-2 text-xs hover:bg-gray-200">
                                            Generate
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">Meta Description</label>
                                    <textarea
                                        value={product.seoDescription}
                                        onChange={(e) => setProduct({ ...product, seoDescription: e.target.value })}
                                        placeholder="Brief description for search engines"
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}