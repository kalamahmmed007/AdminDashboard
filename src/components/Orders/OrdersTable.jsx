import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { formatPrice } from "../../utils/formatPrice";

const STATUS_STYLES = {
    Pending: "bg-yellow-100 text-yellow-700",
    Complete: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Return: "bg-purple-100 text-purple-700",
};

const ALL_STATUSES = ["Pending", "Complete", "Cancelled", "Return"];

export default function OrdersTable({ orders, onRowClick, setOrders }) {
    const [hoveredId, setHoveredId] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

    const handleStatusChange = (orderId, newStatus) => {
        if (setOrders) {
            setOrders((prev) =>
                prev.map((o) => (o.id ?? o._id) === orderId ? { ...o, status: newStatus } : o)
            );
        }
        setActiveMenu(null);
    };

    const generateInvoice = (order) => {
        const doc = new jsPDF();
        doc.text(`Invoice #${order.id.slice(0, 6)}`, 10, 10);
        doc.text(`Customer: ${order.customer}`, 10, 20);
        let y = 30;
        order.items?.forEach((item) => {
            doc.text(`${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`, 10, y);
            y += 10;
        });
        const subtotal = order.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) ?? 0;
        doc.text(`Subtotal: ${formatPrice(subtotal)}`, 10, y + 10);
        doc.save(`invoice_${order.id.slice(0, 6)}.pdf`);
    };

    return (
        <table className="relative w-full text-sm">
            <thead className="bg-gray-50">
                <tr>
                    <th className="p-3">Order</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="p-6 text-center">No orders</td>
                    </tr>
                ) : (
                    orders.map((order) => {
                        const orderId = order.id ?? order._id;
                        const remainingStatuses = ALL_STATUSES.filter(s => s !== order.status);

                        return (
                            <tr
                                key={orderId}
                                className="relative cursor-pointer border-b hover:bg-gray-50"
                                onMouseEnter={() => setHoveredId(orderId)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <td className="p-3" onClick={() => onRowClick(order)}>#{orderId.slice(0, 6)}</td>
                                <td className="p-3" onClick={() => onRowClick(order)}>{order.customer}</td>
                                <td className="p-3">{order.items?.length ?? 0}</td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded-full text-xs ${STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="relative flex justify-center gap-2 p-3">
                                    <button
                                        className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300"
                                        onClick={(e) => { e.stopPropagation(); generateInvoice(order); }}
                                    >
                                        Invoice
                                    </button>

                                    {/* 3-dot status menu */}
                                    <div className="relative">
                                        <button
                                            className="rounded bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
                                            onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === orderId ? null : orderId); }}
                                        >
                                            &#x22EE;
                                        </button>
                                        {activeMenu === orderId && (
                                            <div className="absolute right-0 top-full z-10 mt-2 w-36 rounded border bg-white shadow-lg">
                                                {remainingStatuses.map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={(e) => { e.stopPropagation(); handleStatusChange(orderId, s); }}
                                                        className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${s === "Cancelled" || s === "Return" ? "text-red-500" : ""}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                )}
            </tbody>
        </table>
    );
}
