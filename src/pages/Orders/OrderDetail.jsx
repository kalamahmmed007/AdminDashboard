// src/pages/Orders/OrderDetails.jsx
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrdersService } from "../../services/orders";
import { formatPrice } from "../../utils/formatPrice";
import { jsPDF } from "jspdf";

export default function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const invoiceRef = useRef();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const data = await OrdersService.get(id);
            setOrder(data);
        } catch (err) {
            alert("Failed to load order");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await OrdersService.remove(id);
            navigate("/orders");
        } catch (err) {
            alert("Couldn't delete order");
        } finally {
            setDeleting(false);
            setShowModal(false);
        }
    };

    const handleDownloadPDF = () => {
        if (!order) return;
        const doc = new jsPDF();
        doc.text("Invoice", 10, 10);
        doc.text(`Order #${order.orderNumber ?? order._id?.slice(0, 8)}`, 10, 20);
        doc.text(`Customer: ${order.customer?.name}`, 10, 30);
        const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        doc.text(`Total: ${formatPrice(subtotal)}`, 10, 40);
        doc.save(`Invoice_${order._id ?? order.id}.pdf`);
    };

    if (loading || !order) return <div className="p-6">Loading…</div>;

    const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const timeline = ["pending", "paid", "shipped", "delivered"];

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Order #{order.orderNumber ?? order._id?.slice(0, 8)}
                    </h1>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm capitalize
              ${order.status === "pending" ? "bg-yellow-100 text-yellow-700"
                                : order.status === "paid" ? "bg-green-100 text-green-700"
                                    : order.status === "shipped" ? "bg-purple-100 text-purple-700"
                                        : order.status === "delivered" ? "bg-emerald-100 text-emerald-700"
                                            : "bg-gray-100 text-gray-700"}`}
                    >
                        {order.status}
                    </span>

                    {/* Timeline */}
                    <div className="flex gap-2 mt-2 text-xs">
                        {timeline.map((t) => (
                            <div
                                key={t}
                                className={`px-2 py-1 rounded-full text-white ${timeline.indexOf(order.status) >= timeline.indexOf(t) ? "bg-green-600" : "bg-gray-300"}`}
                            >
                                {t[0].toUpperCase()}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button onClick={() => navigate(`/orders/${id}/edit`)} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Edit
                    </button>
                    <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-red-600 text-white rounded">
                        Delete
                    </button>
                    <button onClick={handleDownloadPDF} className="px-4 py-2 bg-gray-800 text-white rounded">
                        Invoice PDF
                    </button>
                </div>
            </div>

            {/* Items */}
            <div className="bg-white border rounded shadow">
                <h2 className="px-4 py-3 border-b font-medium text-lg">Items</h2>
                <div>
                    {order.items.map((item, i) => (
                        <div key={i} className="p-4 border-b flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center text-xs border">IMG</div>
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-400">SKU: {item.sku ?? "—"}</p>
                                    <p className="text-xs text-gray-400">Vendor: {item.vendor ?? "—"}</p>
                                </div>
                            </div>
                            <div className="text-right min-w-[120px]">
                                <p className="text-sm">{formatPrice(item.price)}</p>
                                <p className="text-sm">Qty: {item.quantity}</p>
                                <p className="font-semibold text-base">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white border rounded p-4 space-y-3">
                <h3 className="font-medium">Order Summary</h3>
                <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-sm text-gray-600"><span>Shipping</span><span>{formatPrice(order.shippingCost ?? 0)}</span></div>
                <div className="flex justify-between text-sm text-gray-600"><span>Discount</span><span>{formatPrice(order.discount ?? 0)}</span></div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(subtotal + (order.shippingCost || 0) - (order.discount || 0))}</span>
                </div>
            </div>

            {/* Customer */}
            <div className="bg-white border rounded p-4">
                <h3 className="font-medium mb-3">Customer Info</h3>
                <p><b>Name:</b> {order.customer?.name}</p>
                <p><b>Email:</b> {order.customer?.email}</p>
                <p><b>Phone:</b> {order.customer?.phone}</p>
            </div>

            {/* Shipping */}
            <div className="bg-white border rounded p-4">
                <h3 className="font-medium mb-3">Shipping Address</h3>
                <p>{order.shipping?.address}</p>
                <p>{order.shipping?.city}</p>
                <p>{order.shipping?.postcode}</p>
            </div>

            {/* Notes */}
            {order.notes && (
                <div className="bg-white border rounded p-4">
                    <h3 className="font-medium mb-3">Notes</h3>
                    <p className="text-gray-700">{order.notes}</p>
                </div>
            )}

            {/* Delete Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
                        <p className="text-sm text-gray-600 mb-6">Are you sure you want to permanently delete this order?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                                {deleting ? "Deleting…" : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
