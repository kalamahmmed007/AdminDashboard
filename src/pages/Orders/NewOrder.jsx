// src/pages/Orders/NewOrder.jsx
import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function NewOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    // Step 1: Customer Info
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // Step 2: Order Items
    const [items, setItems] = useState([]);

    // Step 3: Order Meta / Details
    const [orderMeta, setOrderMeta] = useState({
        status: "Pending",
        notes: "",
        shippingMethod: "Standard",
        shippingWeight: "",
        shippingDimensions: "",
        tax: 0,
        discount: 0,
    });

    // Step 4: Optional Advanced / Flags
    const [flags, setFlags] = useState({
        paymentStatus: "Unpaid",
        priority: "Normal",
        promoCode: "",
    });

    const subtotal = useMemo(
        () => items.reduce((acc, item) => acc + item.quantity * item.price, 0),
        [items]
    );
    const total = subtotal + Number(orderMeta.tax || 0) - Number(orderMeta.discount || 0);

    const handleCreateOrder = async () => {
        try {
            const payload = { customer, items, orderMeta, flags };
            const res = await dispatch(createOrder(payload)).unwrap();
            toast.success("Order created successfully!");
            navigate(`/orders/${res._id ?? res.id}`);
        } catch (err) {
            toast.error("Failed to create order!");
            console.error(err);
        }
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const steps = ["Customer Info", "Order Items", "Order Meta", "Advanced Flags"];

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-6">
            <h1 className="text-2xl font-semibold">Create New Order</h1>

            {/* Train-like step progress */}
            <div className="mb-8 flex items-center">
                {steps.map((label, index) => {
                    const completed = step > index + 1;
                    const active = step === index + 1;
                    return (
                        <div key={index} className="flex flex-1 items-center">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${active
                                            ? "bg-red-600"
                                            : completed
                                                ? "bg-green-600"
                                                : "bg-gray-300"
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <div className="mt-1 text-center text-xs">{label}</div>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-1 mx-2 ${step > index + 1 ? "bg-green-600" : "bg-gray-300"
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Step content */}
            {step === 1 && (
                <div className="space-y-4">
                    <input
                        className="w-full rounded border px-3 py-2"
                        placeholder="Customer Name"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    />
                    <input
                        className="w-full rounded border px-3 py-2"
                        placeholder="Email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
                    <input
                        className="w-full rounded border px-3 py-2"
                        placeholder="Phone"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    />
                    <input
                        className="w-full rounded border px-3 py-2"
                        placeholder="Address"
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    />
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <input
                                className="flex-1 rounded border px-2 py-1"
                                placeholder="Product Name"
                                value={item.name}
                                onChange={(e) =>
                                    setItems(items.map((it, idx) => (idx === i ? { ...it, name: e.target.value } : it)))
                                }
                            />
                            <input
                                className="w-20 rounded border px-2 py-1"
                                placeholder="SKU"
                                value={item.sku}
                                onChange={(e) =>
                                    setItems(items.map((it, idx) => (idx === i ? { ...it, sku: e.target.value } : it)))
                                }
                            />
                            <input
                                type="number"
                                min={1}
                                className="w-20 rounded border px-2 py-1"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={(e) =>
                                    setItems(items.map((it, idx) => (idx === i ? { ...it, quantity: Number(e.target.value) } : it)))
                                }
                            />
                            <input
                                type="number"
                                min={0}
                                className="w-24 rounded border px-2 py-1"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) =>
                                    setItems(items.map((it, idx) => (idx === i ? { ...it, price: Number(e.target.value) } : it)))
                                }
                            />
                            <button
                                className="rounded bg-red-600 px-2 py-1 text-white"
                                onClick={() => setItems(items.filter((_, idx) => idx !== i))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                        onClick={() => setItems([...items, { name: "", sku: "", quantity: 1, price: 0 }])}
                    >
                        Add Item
                    </button>
                    <div className="text-right font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <select
                        className="w-full rounded border px-3 py-2"
                        value={orderMeta.status}
                        onChange={(e) => setOrderMeta({ ...orderMeta, status: e.target.value })}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Fulfilled">Fulfilled</option>
                        <option value="Unfulfilled">Unfulfilled</option>
                    </select>
                    <textarea
                        className="w-full rounded border px-3 py-2"
                        placeholder="Notes / Comments"
                        value={orderMeta.notes}
                        onChange={(e) => setOrderMeta({ ...orderMeta, notes: e.target.value })}
                    />
                    <input
                        className="w-full rounded border px-3 py-2"
                        placeholder="Shipping Method"
                        value={orderMeta.shippingMethod}
                        onChange={(e) => setOrderMeta({ ...orderMeta, shippingMethod: e.target.value })}
                    />
                    <input
                        className="w-full rounded border px-3 py-2"
                        placeholder="Weight"
                        value={orderMeta.shippingWeight}
                        onChange={(e) => setOrderMeta({ ...orderMeta, shippingWeight: e.target.value })}
                    />
                    <input
                        className="w-full rounded border px-3 py-2"
                        placeholder="Dimensions"
                        value={orderMeta.shippingDimensions}
                        onChange={(e) => setOrderMeta({ ...orderMeta, shippingDimensions: e.target.value })}
                    />
                    <input
                        type="number"
                        className="w-full rounded border px-3 py-2"
                        placeholder="Tax"
                        value={orderMeta.tax}
                        onChange={(e) => setOrderMeta({ ...orderMeta, tax: Number(e.target.value) })}
                    />
                    <input
                        type="number"
                        className="w-full rounded border px-3 py-2"
                        placeholder="Discount"
                        value={orderMeta.discount}
                        onChange={(e) => setOrderMeta({ ...orderMeta, discount: Number(e.target.value) })}
                    />
                    <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-4">
                    <select
                        className="w-full rounded border px-3 py-2"
                        value={flags.paymentStatus}
                        onChange={(e) => setFlags({ ...flags, paymentStatus: e.target.value })}
                    >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Partially Paid">Partially Paid</option>
                    </select>
                    <select
                        className="w-full rounded border px-3 py-2"
                        value={flags.priority}
                        onChange={(e) => setFlags({ ...flags, priority: e.target.value })}
                    >
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                    <input
                        className="w-full rounded border px-3 py-2"
                        placeholder="Promo code / Loyalty info"
                        value={flags.promoCode}
                        onChange={(e) => setFlags({ ...flags, promoCode: e.target.value })}
                    />
                </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-6 flex gap-3">
                {step > 1 && <button className="rounded border px-4 py-2" onClick={prevStep}>Previous</button>}
                {step < 4 && <button className="rounded bg-red-600 px-4 py-2 text-white" onClick={nextStep}>Next</button>}
                {step === 4 && <button className="rounded bg-green-600 px-4 py-2 text-white" onClick={handleCreateOrder}>Create Order</button>}
            </div>
        </div>
    );
}
