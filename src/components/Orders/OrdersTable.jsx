// src/components/Orders/OrdersTable.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersService } from "../../services/orders";
import { formatPrice } from "../../utils/formatPrice";
import { jsPDF } from "jspdf";

const STATUS_STYLES = {
    Pending: "bg-yellow-100 text-yellow-700",
    Fulfilled: "bg-green-100 text-green-700",
    Unfulfilled: "bg-red-100 text-red-700",
};

export default function OrdersTable({ orders, loading, onRowClick }) {
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState(null);

    const handleDelete = async (id) => {
        if (!confirm("Delete this order permanently?")) return;
        try {
            await OrdersService.remove(id);
            alert("Deleted successfully. Refresh the list!");
        } catch (err) {
            console.error(err);
            alert("Failed to delete order");
        }
    };

    const generateInvoice = (order) => {
        const doc = new jsPDF();
        doc.text(`Invoice #${order.orderNumber ?? order._id?.slice(0, 8)}`, 10, 10);
        doc.text(`Customer: ${order.customer?.name}`, 10, 20);
        let y = 30;
        order.items.forEach((item) => {
            doc.text(`${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`, 10, y);
            y += 10;
        });
        const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        doc.text(`Subtotal: ${formatPrice(subtotal)}`, 10, y + 10);
        doc.save(`invoice_${order.orderNumber ?? order._id?.slice(0, 8)}.pdf`);
    };

    return (
        <table className="w-full text-sm">
            <thead className="bg-gray-50">
                <tr>
                    <th className="p-3">Order</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="5" className="p-6 text-center">Loading...</td>
                    </tr>
                ) : orders.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="p-6 text-center">No orders</td>
                    </tr>
                ) : (
                    orders.map((order) => (
                        <tr
                            key={order._id ?? order.id}
                            className="border-b hover:bg-gray-50 cursor-pointer relative"
                            onMouseEnter={() => setHoveredId(order._id ?? order.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => onRowClick(order)}
                        >
                            <td className="p-3">#{order.orderNumber ?? (order._id ?? order.id).slice(0, 6)}</td>
                            <td className="p-3">{order.customer?.name ?? order.customer}</td>
                            <td className="p-3">{order.items?.length ?? 0}</td>
                            <td className="p-3">
                                <span className={`px-3 py-1 rounded-full text-xs ${STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-3 flex gap-2">
                                <button
                                    className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={(e) => { e.stopPropagation(); generateInvoice(order); }}
                                >
                                    Invoice
                                </button>
                                <button
                                    className="px-2 py-1 text-xs bg-red-200 rounded hover:bg-red-300"
                                    onClick={(e) => { e.stopPropagation(); handleDelete(order._id ?? order.id); }}
                                >
                                    Delete
                                </button>
                            </td>

                            {/* Mini Hover Tooltip */}
                            {hoveredId === (order._id ?? order.id) && (
                                <td className="absolute top-full left-0 w-64 bg-white border shadow-md p-3 text-xs z-10">
                                    <div className="mb-2 font-medium">Timeline</div>
                                    <div className="flex flex-col gap-1">
                                        {["Pending", "Paid", "Shipped", "Delivered"].map((step) => (
                                            <div key={step} className={`flex items-center gap-2 ${step.toLowerCase() === order.status ? "font-semibold text-blue-600" : "text-gray-400"}`}>
                                                <div className="w-2 h-2 rounded-full border" />
                                                <span>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
