// src/pages/Orders/EditOrder.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrdersService } from "../../services/orders";
import ProductSelectModal from "../../components/Products/ProductSelectModal";
import { formatPrice } from "../../utils/formatPrice";

export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [lastRemoved, setLastRemoved] = useState(null);
  const [undoVisible, setUndoVisible] = useState(false);

  // fetch order
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const { data } = await OrdersService.get(id);
      setOrder({
        ...data,
        items: data.items?.map((it) => ({ ...it })) ?? [],
        shippingCost: data.shippingCost ?? 0,
        discount: data.discount ?? 0,
        notes: data.notes ?? "",
        payment: data.payment ?? { method: "", status: "", txId: "" },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, [id]);

  // handle item quantity change
  const handleQtyChange = (index, qty) => {
    if (!order) return;
    const updated = order.items.map((it, i) =>
      i === index ? { ...it, quantity: Math.max(1, qty) } : it
    );
    setOrder({ ...order, items: updated });
  };

  // remove + undo
  const handleRemoveItem = (index) => {
    if (!order) return;
    const removed = order.items[index];
    const updated = [...order.items];
    updated.splice(index, 1);
    setOrder({ ...order, items: updated });
    setLastRemoved({ item: removed, index });
    setUndoVisible(true);
    setTimeout(() => setUndoVisible(false), 6000);
  };

  const handleUndo = () => {
    if (!lastRemoved || !order) return;
    const items = [...order.items];
    items.splice(lastRemoved.index, 0, lastRemoved.item);
    setOrder({ ...order, items });
    setLastRemoved(null);
    setUndoVisible(false);
  };

  // add product
  const handleAddProduct = (product) => {
    if (!order) return;
    const idx = order.items.findIndex(
      (it) => it.productId === (product._id ?? product.id)
    );
    if (idx >= 0) {
      const items = [...order.items];
      items[idx].quantity = (items[idx].quantity || 1) + 1;
      setOrder({ ...order, items });
      return;
    }
    const newItem = {
      productId: product._id ?? product.id,
      name: product.name,
      sku: product.sku ?? "",
      price: product.price ?? product.unitPrice ?? 0,
      quantity: 1,
      vendor: product.vendor ?? "",
      bin: product.bin ?? "",
    };
    setOrder({ ...order, items: [...order.items, newItem] });
  };

  // nested field update
  const updateField = (path, value) => {
    const keys = path.split(".");
    const copy = { ...order };
    let cur = copy;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      cur[k] = cur[k] ? { ...cur[k] } : {};
      cur = cur[k];
    }
    cur[keys[keys.length - 1]] = value;
    setOrder(copy);
  };

  // totals
  const subtotal = useMemo(() => {
    if (!order) return 0;
    return order.items.reduce(
      (s, it) => s + (Number(it.price || 0) * Number(it.quantity || 0)),
      0
    );
  }, [order]);
  const shippingCost = Number(order?.shippingCost || 0);
  const discount = Number(order?.discount || 0);
  const grandTotal = Math.max(0, subtotal + shippingCost - discount);

  // save
  const handleSave = async () => {
    if (!order) return;
    if (!order.customer?.name) return alert("Customer name is required");
    setSaving(true);
    try {
      const payload = {
        ...order,
        items: order.items.map((it) => ({
          productId: it.productId,
          name: it.name,
          sku: it.sku,
          price: it.price,
          quantity: it.quantity,
          vendor: it.vendor,
          bin: it.bin,
        })),
      };
      await OrdersService.update(id, payload);
      navigate(`/orders/${id}`);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !order) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Edit Order #{order.orderNumber ?? (order._id ?? id).slice(0, 8)}
          </h1>
          <p className="text-sm text-gray-500">
            Created: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={order.status}
            onChange={(e) => setOrder({ ...order, status: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="paid">Paid</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {saving ? "Saving…" : "Save Order"}
          </button>

          <button
            onClick={() => navigate(`/orders/${id}`)}
            className="px-4 py-2 border rounded-md"
          >
            Back
          </button>
        </div>
      </div>

      {/* Left: Items / Right: Summary & Customer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Items</h2>
            <button
              onClick={() => setProductModalOpen(true)}
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              + Add Product
            </button>
          </div>

          <div className="bg-white border rounded shadow-sm divide-y">
            {order.items.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No items in this order. Add products to continue.
              </div>
            )}

            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 bg-gray-50 rounded border flex items-center justify-center text-xs">
                    IMG
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-xs text-gray-500 truncate">SKU: {item.sku}</div>
                    <div className="text-xs text-gray-400">Vendor: {item.vendor}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">{formatPrice(item.price)}</div>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQtyChange(i, Number(e.target.value))}
                    className="w-20 border rounded px-2 py-1"
                  />

                  <div className="text-sm w-28 text-right">
                    {formatPrice((item.price || 0) * (item.quantity || 0))}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(i)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white border rounded p-4">
            <h3 className="font-medium mb-3">Summary</h3>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Shipping</span>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setOrder({ ...order, shippingCost: Number(e.target.value) })}
                className="w-28 border rounded px-2 py-1 text-right"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Discount</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setOrder({ ...order, discount: Number(e.target.value) })}
                className="w-28 border rounded px-2 py-1 text-right"
              />
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">Grand total</div>
                <div className="text-lg font-semibold">{formatPrice(grandTotal)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded p-4">
            <h3 className="font-medium mb-3">Customer</h3>
            <input
              value={order.customer?.name || ""}
              onChange={(e) => updateField("customer.name", e.target.value)}
              placeholder="Name"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              value={order.customer?.email || ""}
              onChange={(e) => updateField("customer.email", e.target.value)}
              placeholder="Email"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              value={order.customer?.phone || ""}
              onChange={(e) => updateField("customer.phone", e.target.value)}
              placeholder="Phone"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="bg-white border rounded p-4">
            <h3 className="font-medium mb-3">Shipping Address</h3>
            <input
              value={order.shipping?.address || ""}
              onChange={(e) => updateField("shipping.address", e.target.value)}
              placeholder="Address"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              value={order.shipping?.city || ""}
              onChange={(e) => updateField("shipping.city", e.target.value)}
              placeholder="City"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              value={order.shipping?.postcode || ""}
              onChange={(e) => updateField("shipping.postcode", e.target.value)}
              placeholder="Postcode"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </aside>
      </div>

      {/* Product Modal */}
      <ProductSelectModal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onSelect={handleAddProduct}
      />

      {/* Undo toast */}
      {undoVisible && (
        <div className="fixed right-6 bottom-6 bg-white border rounded shadow px-4 py-3 flex items-center gap-3">
          <div className="text-sm">Item removed</div>
          <button onClick={handleUndo} className="px-3 py-1 bg-blue-600 text-white rounded">
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
