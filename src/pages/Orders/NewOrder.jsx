// src/pages/Orders/NewOrder.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder, fetchOrders } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Search, Plus, Minus, Trash2, User, MapPin, CreditCard,
  Package, ShoppingCart, Check
} from 'lucide-react';

export default function NewOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [searchProduct, setSearchProduct] = useState('');
  const [showProductSearch, setShowProductSearch] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [shippingInfo, setShippingInfo] = useState({ address: '', city: '', zipCode: '', country: '' });
  const [paymentInfo, setPaymentInfo] = useState({ method: 'credit_card', status: 'pending' }); // pending by default

  // Sample products (could be replaced by API call)
  const products = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', price: 79.99, stock: 50, image: '🎧' },
    { id: 2, name: 'Smart Watch', sku: 'SW-002', price: 199.99, stock: 30, image: '⌚' },
    { id: 3, name: 'Laptop Stand', sku: 'LS-003', price: 45.50, stock: 100, image: '💻' },
    { id: 4, name: 'USB-C Cable', sku: 'UC-004', price: 12.99, stock: 200, image: '🔌' },
    { id: 5, name: 'Phone Case', sku: 'PC-005', price: 24.99, stock: 150, image: '📱' },
    { id: 6, name: 'Bluetooth Speaker', sku: 'BS-006', price: 89.99, stock: 75, image: '🔊' }
  ];

  // Add product to order
  const addProduct = (product) => {
    const existing = orderItems.find(i => i.id === product.id);
    if (existing) {
      if (existing.quantity + 1 > product.stock) {
        toast.error(`❌ Cannot add more than available stock (${product.stock})`);
        return;
      }
      updateQuantity(product.id, existing.quantity + 1);
    } else {
      setOrderItems([...orderItems, { ...product, quantity: 1 }]);
    }
    setShowProductSearch(false);
    setSearchProduct('');
  };

  // Update product quantity with stock check
  const updateQuantity = (id, qty) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (qty > product.stock) {
      toast.error(`❌ Cannot exceed stock (${product.stock})`);
      return;
    }
    if (qty <= 0) return removeProduct(id);

    setOrderItems(orderItems.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const removeProduct = (id) => setOrderItems(orderItems.filter(i => i.id !== id));

  // Order calculations
  const calculateSubtotal = () => orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const calculateTax = () => calculateSubtotal() * 0.1;
  const calculateShipping = () => orderItems.length > 0 ? 15 : 0;
  const calculateTotal = () => calculateSubtotal() + calculateTax() + calculateShipping();

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const isStepValid = (num) => {
    if (num === 1) return orderItems.length > 0;
    if (num === 2) return customerInfo.name && customerInfo.email && customerInfo.phone;
    if (num === 3) return shippingInfo.address && shippingInfo.city && shippingInfo.zipCode;
    return true;
  };

  // Submit new order
  const handleSubmit = async () => {
    if (!isStepValid(4)) return toast.error("⚠️ Please complete all steps!");

    const payload = {
      customer: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      shipping: shippingInfo,
      paymentMethod: paymentInfo.method,
      paymentStatus: paymentInfo.status,
      items: orderItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shippingCost: calculateShipping(),
      total: calculateTotal(),
      status: "pending",
      priority: "normal",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    try {
      await dispatch(createOrder(payload)).unwrap();
      toast.success("✅ Order Created!");

      // Refresh orders: pending + all
      dispatch(fetchOrders({ status: "pending" }));
      dispatch(fetchOrders({}));

      // Reset form
      setOrderItems([]);
      setCustomerInfo({ name: '', email: '', phone: '' });
      setShippingInfo({ address: '', city: '', zipCode: '', country: '' });
      setPaymentInfo({ method: 'credit_card', status: 'pending' });
      setStep(1);

      navigate("/orders/pending");
    } catch (err) {
      toast.error("❌ Failed to create order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-3xl font-bold">Create New Order</h1>

        {/* Step indicators */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            {[{ num: 1, title: 'Products', icon: ShoppingCart },
              { num: 2, title: 'Customer', icon: User },
              { num: 3, title: 'Shipping', icon: MapPin },
              { num: 4, title: 'Payment', icon: CreditCard }].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-1 flex-col items-center">
                  <button
                    onClick={() => isStepValid(s.num - 1) && setStep(s.num)}
                    disabled={!isStepValid(s.num - 1) && s.num > step}
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition ${step === s.num ? 'bg-blue-600 text-white' : step > s.num ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step > s.num ? <Check className="h-6 w-6" /> : <s.icon className="h-6 w-6" />}
                  </button>
                  <span className={`text-sm font-medium ${step === s.num ? 'text-blue-600' : 'text-gray-600'}`}>{s.title}</span>
                </div>
                {idx < 3 && <div className={`flex-1 h-1 mx-2 ${step > s.num ? 'bg-green-600' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
            {/* Step 1: Products */}
            {step === 1 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Select Products</h2>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchProduct}
                    onChange={(e) => {
                      setSearchProduct(e.target.value);
                      setShowProductSearch(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowProductSearch(true)}
                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
                  />
                  {showProductSearch && searchProduct && (
                    <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                      {filteredProducts.map(p => (
                        <button
                          key={p.id}
                          onClick={() => addProduct(p)}
                          className="flex w-full items-center justify-between p-3 hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{p.image}</span>
                            <div>
                              <p className="font-medium">{p.name}</p>
                              <p className="text-xs text-gray-500">SKU: {p.sku} | Stock: {p.stock}</p>
                            </div>
                          </div>
                          <p className="font-semibold">${p.price}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Products */}
                <div className="space-y-3">
                  {orderItems.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p>No products added yet</p>
                    </div>
                  ) : (
                    orderItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 rounded-lg border p-3">
                        <span className="text-3xl">{item.image}</span>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">SKU: {item.sku} | Stock: {products.find(p => p.id === item.id)?.stock}</p>
                          <p className="text-sm font-semibold">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded border p-1 hover:bg-gray-50">
                            <Minus className="h-4 w-4"/>
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded border p-1 hover:bg-gray-50">
                            <Plus className="h-4 w-4"/>
                          </button>
                        </div>
                        <p className="w-20 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <button onClick={() => removeProduct(item.id)} className="rounded p-2 text-red-600 hover:bg-red-50">
                          <Trash2 className="h-5 w-5"/>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Customer */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-semibold">Customer Information</h2>
                <input type="text" placeholder="Name" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name:e.target.value})} className="w-full rounded border p-2"/>
                <input type="email" placeholder="Email" value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email:e.target.value})} className="w-full rounded border p-2"/>
                <input type="tel" placeholder="Phone" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone:e.target.value})} className="w-full rounded border p-2"/>
              </div>
            )}

            {/* Step 3: Shipping */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-semibold">Shipping Info</h2>
                <input type="text" placeholder="Address" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address:e.target.value})} className="w-full rounded border p-2"/>
                <input type="text" placeholder="City" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city:e.target.value})} className="w-full rounded border p-2"/>
                <input type="text" placeholder="Zip Code" value={shippingInfo.zipCode} onChange={e => setShippingInfo({...shippingInfo, zipCode:e.target.value})} className="w-full rounded border p-2"/>
                <input type="text" placeholder="Country" value={shippingInfo.country} onChange={e => setShippingInfo({...shippingInfo, country:e.target.value})} className="w-full rounded border p-2"/>
              </div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-semibold">Payment</h2>
                <select value={paymentInfo.method} onChange={e=>setPaymentInfo({...paymentInfo, method:e.target.value})} className="w-full rounded border p-2">
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
                <select value={paymentInfo.status} onChange={e=>setPaymentInfo({...paymentInfo, status:e.target.value})} className="w-full rounded border p-2">
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex justify-between">
              <button disabled={step===1} onClick={()=>setStep(step-1)} className="rounded border px-6 py-2 disabled:opacity-50">Previous</button>
              {step<4 ? 
                <button onClick={()=>setStep(step+1)} disabled={!isStepValid(step)} className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50">Next</button>
                :
                <button onClick={handleSubmit} className="rounded bg-green-600 px-6 py-2 text-white">Create Order</button>
              }
            </div>
          </div>

          {/* Order Summary */}
          <div className="sticky top-6 space-y-2 rounded-lg bg-white p-6 shadow lg:col-span-1">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            {orderItems.map(i=>(
              <div key={i.id} className="flex justify-between text-sm">
                <span>{i.name} x{i.quantity}</span>
                <span>${(i.price*i.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>${calculateSubtotal().toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span>Tax (10%)</span><span>${calculateTax().toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping</span><span>${calculateShipping().toFixed(2)}</span></div>
              <div className="flex justify-between border-t pt-2 text-lg font-bold"><span>Total</span><span>${calculateTotal().toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
