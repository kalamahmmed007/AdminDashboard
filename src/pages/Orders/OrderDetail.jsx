import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrdersService } from "../../services/orders";
import { formatPrice } from "../../utils/formatPrice";
import { jsPDF } from "jspdf";
import OrderTimeline from "../../components/Orders/OrderTimeline";

export default function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

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
        let y = 40;
        order.items.forEach((item) => {
            doc.text(`${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`, 10, y);
            y += 10;
        });
        const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        doc.text(`Subtotal: ${formatPrice(subtotal)}`, 10, y + 10);
        doc.save(`Invoice_${order._id ?? order.id}.pdf`);
    };

    if (loading || !order) return <div className="p-6">Loading…</div>;

    const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <div className="mx-auto max-w-5xl space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">
                        Order #{order.orderNumber ?? order._id?.slice(0, 8)}
                    </h1>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>

                    {/* Status Badge */}
                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm capitalize
              ${order.status === "pending" ? "bg-yellow-100 text-yellow-700"
                                : order.status === "paid" ? "bg-blue-100 text-blue-700"
                                    : order.status === "shipped" ? "bg-orange-100 text-orange-700"
                                        : order.status === "delivered" ? "bg-green-100 text-green-700"
                                            : order.status === "cancelled" ? "bg-red-100 text-red-700"
                                                : order.status === "return" ? "bg-purple-100 text-purple-700"
                                                    : "bg-gray-100 text-gray-700"}`}
                    >
                        {order.status}
                    </span>

                    {/* Timeline */}
                    <OrderTimeline
                        status={order.status}
                        timestamps={{
                            placed: order.timestamps?.placed,
                            paid: order.timestamps?.paid,
                            shipped: order.timestamps?.shipped,
                            delivered: order.timestamps?.delivered,
                        }}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/orders/${id}/edit`)}
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="rounded bg-red-600 px-4 py-2 text-white"
                    >
                        Delete
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="rounded bg-gray-800 px-4 py-2 text-white"
                    >
                        Invoice PDF
                    </button>
                </div>
            </div>

            {/* Items */}
            <div className="rounded border bg-white shadow">
                <h2 className="border-b px-4 py-3 text-lg font-medium">Items</h2>
                {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded border bg-gray-100 text-xs">IMG</div>
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-gray-400">SKU: {item.sku ?? "—"}</p>
                                <p className="text-xs text-gray-400">Vendor: {item.vendor ?? "—"}</p>
                            </div>
                        </div>
                        <div className="min-w-[120px] text-right">
                            <p className="text-sm">{formatPrice(item.price)}</p>
                            <p className="text-sm">Qty: {item.quantity}</p>
                            <p className="text-base font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="space-y-3 rounded border bg-white p-4">
                <h3 className="font-medium">Order Summary</h3>
                <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-sm text-gray-600"><span>Shipping</span><span>{formatPrice(order.shippingCost ?? 0)}</span></div>
                <div className="flex justify-between text-sm text-gray-600"><span>Discount</span><span>{formatPrice(order.discount ?? 0)}</span></div>
                <div className="flex justify-between border-t pt-3 text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(subtotal + (order.shippingCost || 0) - (order.discount || 0))}</span>
                </div>
            </div>

            {/* Customer Info */}
            <div className="rounded border bg-white p-4">
                <h3 className="mb-3 font-medium">Customer Info</h3>
                <p><b>Name:</b> {order.customer?.name}</p>
                <p><b>Email:</b> {order.customer?.email}</p>
                <p><b>Phone:</b> {order.customer?.phone}</p>
            </div>

            {/* Shipping */}
            <div className="rounded border bg-white p-4">
                <h3 className="mb-3 font-medium">Shipping Address</h3>
                <p>{order.shipping?.address}</p>
                <p>{order.shipping?.city}</p>
                <p>{order.shipping?.postcode}</p>
            </div>

            {/* Notes */}
            {order.notes && (
                <div className="rounded border bg-white p-4">
                    <h3 className="mb-3 font-medium">Notes</h3>
                    <p className="text-gray-700">{order.notes}</p>
                </div>
            )}

            {/* Delete Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-80 rounded bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-medium">Confirm Delete</h3>
                        <p className="mb-6 text-sm text-gray-600">Are you sure you want to permanently delete this order?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowModal(false)} className="rounded border px-4 py-2">Cancel</button>
                            <button onClick={handleDelete} className="rounded bg-red-600 px-4 py-2 text-white">
                                {deleting ? "Deleting…" : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
