import { useState } from "react";
import { ProductsService } from "../../services/products";

export default function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        sku: "",
        description: "",
        shortDescription: "",
        category: "",
        brand: "",
        price: "",
        discountPrice: "",
        costPrice: "",
        tax: "",
        stockQuantity: "",
        stockStatus: "in-stock",
        lowStockAlert: "",
        mainImage: null,
        galleryImages: [],
        video: null,
        size: "",
        color: "",
        material: "",
        weight: "",
        variantPricing: "",
        variantSku: "",
        metaTitle: "",
        metaDescription: "",
        slug: "",
        tags: "",
        featured: false,
        newProduct: false,
        bestseller: false,
        shippingWeight: "",
        shippingDimensions: "",
        customAttributes: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setProduct({ ...product, [name]: checked });
        } else if (type === "file") {
            if (name === "mainImage" || name === "video") {
                setProduct({ ...product, [name]: files[0] });
            } else if (name === "galleryImages") {
                setProduct({ ...product, galleryImages: Array.from(files) });
            }
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            for (let key in product) {
                if (key === "galleryImages") {
                    product.galleryImages.forEach((file) => formData.append("galleryImages", file));
                } else if (product[key] !== null && product[key] !== "") {
                    formData.append(key, product[key]);
                }
            }

            const response = await ProductsService.create(formData);
            alert("Product added successfully!");
            console.log(response.data);
            // Optionally reset form
            setProduct({
                name: "",
                sku: "",
                description: "",
                shortDescription: "",
                category: "",
                brand: "",
                price: "",
                discountPrice: "",
                costPrice: "",
                tax: "",
                stockQuantity: "",
                stockStatus: "in-stock",
                lowStockAlert: "",
                mainImage: null,
                galleryImages: [],
                video: null,
                size: "",
                color: "",
                material: "",
                weight: "",
                variantPricing: "",
                variantSku: "",
                metaTitle: "",
                metaDescription: "",
                slug: "",
                tags: "",
                featured: false,
                newProduct: false,
                bestseller: false,
                shippingWeight: "",
                shippingDimensions: "",
                customAttributes: "",
            });
        } catch (err) {
            console.error(err);
            alert("Failed to add product. Check console.");
        }
    };

    return (
        <div className="mx-auto max-w-5xl rounded bg-white p-6 shadow">
            <h1 className="mb-6 text-2xl font-bold">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-2">
                    <h2 className="font-semibold">Basic Info</h2>
                    <input type="text" name="name" placeholder="Product Name" className="w-full rounded border px-3 py-2" value={product.name} onChange={handleChange} required />
                    <input type="text" name="sku" placeholder="SKU / Product Code" className="w-full rounded border px-3 py-2" value={product.sku} onChange={handleChange} />
                    <textarea name="description" placeholder="Description" className="w-full rounded border px-3 py-2" value={product.description} onChange={handleChange} required />
                    <textarea name="shortDescription" placeholder="Short Description" className="w-full rounded border px-3 py-2" value={product.shortDescription} onChange={handleChange} />
                    <input type="text" name="category" placeholder="Category" className="w-full rounded border px-3 py-2" value={product.category} onChange={handleChange} />
                    <input type="text" name="brand" placeholder="Brand" className="w-full rounded border px-3 py-2" value={product.brand} onChange={handleChange} />
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                    <h2 className="font-semibold">Pricing</h2>
                    <input type="number" name="price" placeholder="Price" className="w-full rounded border px-3 py-2" value={product.price} onChange={handleChange} required />
                    <input type="number" name="discountPrice" placeholder="Discount Price" className="w-full rounded border px-3 py-2" value={product.discountPrice} onChange={handleChange} />
                    <input type="number" name="costPrice" placeholder="Cost Price" className="w-full rounded border px-3 py-2" value={product.costPrice} onChange={handleChange} />
                    <input type="number" name="tax" placeholder="Tax (%)" className="w-full rounded border px-3 py-2" value={product.tax} onChange={handleChange} />
                </div>

                {/* Stock & Inventory */}
                <div className="space-y-2">
                    <h2 className="font-semibold">Stock & Inventory</h2>
                    <input type="number" name="stockQuantity" placeholder="Stock Quantity" className="w-full rounded border px-3 py-2" value={product.stockQuantity} onChange={handleChange} required />
                    <input type="text" name="stockStatus" placeholder="Stock Status" className="w-full rounded border px-3 py-2" value={product.stockStatus} onChange={handleChange} />
                    <input type="number" name="lowStockAlert" placeholder="Low Stock Alert" className="w-full rounded border px-3 py-2" value={product.lowStockAlert} onChange={handleChange} />
                </div>

                {/* Media */}
                <div className="space-y-2">
                    <h2 className="font-semibold">Media</h2>
                    <input type="file" name="mainImage" onChange={handleChange} />
                    <input type="file" name="galleryImages" multiple onChange={handleChange} />
                    <input type="file" name="video" onChange={handleChange} />
                </div>

                {/* Attributes / Variants */}
                <div className="space-y-2">
                    <h2 className="font-semibold">Attributes / Variants</h2>
                    <input type="text" name="size" placeholder="Size" className="w-full rounded border px-3 py-2" value={product.size} onChange={handleChange} />
                    <input type="text" name="color" placeholder="Color" className="w-full rounded border px-3 py-2" value={product.color} onChange={handleChange} />
                    <input type="text" name="material" placeholder="Material" className="w-full rounded border px-3 py-2" value={product.material} onChange={handleChange} />
                    <input type="text" name="weight" placeholder="Weight" className="w-full rounded border px-3 py-2" value={product.weight} onChange={handleChange} />
                    <input type="number" name="variantPricing" placeholder="Variant Pricing" className="w-full rounded border px-3 py-2" value={product.variantPricing} onChange={handleChange} />
                    <input type="text" name="variantSku" placeholder="Variant SKU" className="w-full rounded border px-3 py-2" value={product.variantSku} onChange={handleChange} />
                </div>

                {/* SEO / Meta */}
                <div className="space-y-2">
                    <h2 className="font-semibold">SEO / Meta</h2>
                    <input type="text" name="metaTitle" placeholder="Meta Title" className="w-full rounded border px-3 py-2" value={product.metaTitle} onChange={handleChange} />
                    <input type="text" name="metaDescription" placeholder="Meta Description" className="w-full rounded border px-3 py-2" value={product.metaDescription} onChange={handleChange} />
                    <input type="text" name="slug" placeholder="Slug / URL" className="w-full rounded border px-3 py-2" value={product.slug} onChange={handleChange} />
                    <input type="text" name="tags" placeholder="Tags (comma separated)" className="w-full rounded border px-3 py-2" value={product.tags} onChange={handleChange} />
                </div>

                {/* Optional Advanced */}
                <div className="space-y-2">
                    <h2 className="font-semibold">Optional Advanced</h2>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="featured" checked={product.featured} onChange={handleChange} />
                        <span>Featured</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="newProduct" checked={product.newProduct} onChange={handleChange} />
                        <span>New Product</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="bestseller" checked={product.bestseller} onChange={handleChange} />
                        <span>Bestseller</span>
                    </label>
                    <input type="text" name="shippingWeight" placeholder="Shipping Weight" className="w-full rounded border px-3 py-2" value={product.shippingWeight} onChange={handleChange} />
                    <input type="text" name="shippingDimensions" placeholder="Shipping Dimensions" className="w-full rounded border px-3 py-2" value={product.shippingDimensions} onChange={handleChange} />
                    <input type="text" name="customAttributes" placeholder="Custom Attributes (JSON)" className="w-full rounded border px-3 py-2" value={product.customAttributes} onChange={handleChange} />
                </div>

                <button type="submit" className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                    Add Product
                </button>
            </form>
        </div>
    );
}
