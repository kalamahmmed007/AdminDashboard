import React from "react";
import {
    Warehouse,
    MapPin,
    MoreHorizontal,
    Edit2,
    ArrowLeftRight,
    ArrowRight,
    Boxes,
    Plus,
    Minus,
    ChevronDown,
    BarChart3,
} from "lucide-react";

// ==========================================
// YOUR NAMED COMPONENTS
// ==========================================
export const WarehouseCard = ({ warehouse = {}, onClick = () => { } }) => {
    const getCapacityColor = (capacity = 0) => {
        if (capacity > 80) return "bg-red-500";
        if (capacity > 60) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <div
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            onClick={onClick}
        >
            {/* ... your existing WarehouseCard JSX ... */}
        </div>
    );
};

export const WarehouseHeader = ({ warehouse = {}, onEdit = () => { }, onSettings = () => { } }) => {
    return (
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg">
            {/* ... your existing WarehouseHeader JSX ... */}
        </div>
    );
};

export const WarehouseStatusBadge = ({ status }) => {
    const config = {
        active: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
        maintenance: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Maintenance" },
        inactive: { bg: "bg-gray-100", text: "text-gray-700", label: "Inactive" },
    };
    const { bg, text, label } = config[status] || config.active;

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${bg} ${text}`}>
            <span className={`h-2 w-2 rounded-full ${status === "active" ? "bg-green-500" : status === "maintenance" ? "bg-yellow-500" : "bg-gray-500"}`} />
            {label}
        </span>
    );
};

// ==========================================
// DEFAULT PAGE EXPORT FOR ROUTING
// ==========================================
const WarehousesPage = () => {
    const dummyWarehouses = [
        { id: 1, name: "Central Warehouse", location: "New York", capacity: 75, units: 1200, value: 452000, totalSKUs: 350, totalUnits: 1200 },
        { id: 2, name: "West Warehouse", location: "Los Angeles", capacity: 45, units: 800, value: 238000, totalSKUs: 200, totalUnits: 800 },
    ];

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold text-gray-900">Warehouses</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {dummyWarehouses.map((w) => (
                    <WarehouseCard key={w.id} warehouse={w} />
                ))}
            </div>
        </div>
    );
};

export default WarehousesPage;
