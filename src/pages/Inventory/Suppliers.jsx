import React from "react";
import {
    Star,
    Clock,
    Package,
    Users,
    Mail,
    Phone,
    Edit2,
    MapPin,
    Globe,
    DollarSign,
} from "lucide-react";

// ==========================================
// INDIVIDUAL COMPONENTS
// ==========================================
export const SupplierCard = ({ supplier = {}, onClick = () => { } }) => {
    const statusClasses = {
        active: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        inactive: "bg-gray-100 text-gray-700",
    };

    return (
        <div
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            onClick={onClick}
        >
            {/* Card header */}
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-xl font-bold text-white">
                        {supplier.name?.charAt(0) || "?"}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{supplier.name || "No Name"}</h3>
                        <p className="text-sm text-gray-500">{supplier.category || "Unknown"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[supplier.status] || statusClasses.inactive
                            }`}
                    >
                        {supplier.status || "inactive"}
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="mb-1 text-xs text-gray-500">Total Orders</p>
                    <p className="text-lg font-bold text-gray-900">{supplier.totalOrders || 0}</p>
                </div>
                <div>
                    <p className="mb-1 text-xs text-gray-500">Total Spent</p>
                    <p className="text-lg font-bold text-gray-900">
                        ${supplier.totalSpent?.toLocaleString() || 0}
                    </p>
                </div>
            </div>

            {/* Additional info */}
            <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <Star className={`h-4 w-4 ${supplier.rating >= 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                    <span className="font-medium">{supplier.rating || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{supplier.leadTime || 0} days</span>
                </div>
                <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>{supplier.products || 0} SKUs</span>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// DEFAULT PAGE EXPORT
// ==========================================
const SuppliersPage = () => {
    const dummySuppliers = [
        {
            id: 1,
            name: "ABC Corp",
            category: "Electronics",
            status: "active",
            totalOrders: 120,
            totalSpent: 45200,
            rating: 4,
            leadTime: 3,
            products: 50,
            location: "New York",
            website: "www.abccorp.com",
        },
        {
            id: 2,
            name: "XYZ Ltd",
            category: "Food",
            status: "pending",
            totalOrders: 80,
            totalSpent: 23800,
            rating: 3,
            leadTime: 5,
            products: 20,
            location: "Los Angeles",
            website: "www.xyzltd.com",
        },
    ];

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dummySuppliers.map((s) => (
                    <SupplierCard key={s.id} supplier={s} />
                ))}
            </div>
        </div>
    );
};

export default SuppliersPage;
