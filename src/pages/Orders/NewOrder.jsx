// src/pages/Orders/NewOrder.jsx
import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Search, Plus, Minus, Trash2, User, MapPin, CreditCard, Package, ShoppingCart, X, Check } from 'lucide-react';

export default function NewOrder() {
    const [step, setStep] = useState(1);
    const [orderItems, setOrderItems] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [showProductSearch, setShowProductSearch] = useState(false);

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        searchQuery: ''
    });

    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const [paymentInfo, setPaymentInfo] = useState({
        method: 'credit_card',
        status: 'paid'
    });

    // Sample products
    const products = [
        { id: 1, name: 'Wireless Headphones', sku: 'WH-001', price: 79.99, stock: 50, image: '🎧' },
        { id: 2, name: 'Smart Watch', sku: 'SW-002', price: 199.99, stock: 30, image: '⌚' },
        { id: 3, name: 'Laptop Stand', sku: 'LS-003', price: 45.50, stock: 100, image: '💻' },
        { id: 4, name: 'USB-C Cable', sku: 'UC-004', price: 12.99, stock: 200, image: '🔌' },
        { id: 5, name: 'Phone Case', sku: 'PC-005', price: 24.99, stock: 150, image: '📱' },
        { id: 6, name: 'Bluetooth Speaker', sku: 'BS-006', price: 89.99, stock: 75, image: '🔊' }
    ];

    // Sample customers
    const customers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900' },
        { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', phone: '+1 234-567-8901' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234-567-8902' }
    ];

    const addProduct = (product) => {
        const existingItem = orderItems.find(item => item.id === product.id);
        if (existingItem) {
            updateQuantity(product.id, existingItem.quantity + 1);
        } else {
            setOrderItems([...orderItems, { ...product, quantity: 1 }]);
        }
        setShowProductSearch(false);
        setSearchProduct('');
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeProduct(productId);
            return;
        }
        setOrderItems(orderItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeProduct = (productId) => {
        setOrderItems(orderItems.filter(item => item.id !== productId));
    };

    const selectCustomer = (customer) => {
        setCustomerInfo({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            searchQuery: customer.name
        });
    };

    const calculateSubtotal = () => {
        return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax
    };

    const calculateShipping = () => {
        return orderItems.length > 0 ? 15.00 : 0;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax() + calculateShipping();
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchProduct.toLowerCase())
    );

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(customerInfo.searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(customerInfo.searchQuery.toLowerCase())
    );

    const handleSubmit = () => {
        console.log('Order submitted:', {
            customer: customerInfo,
            shipping: shippingInfo,
            payment: paymentInfo,
            items: orderItems,
            totals: {
                subtotal: calculateSubtotal(),
                tax: calculateTax(),
                shipping: calculateShipping(),
                total: calculateTotal()
            }
        });
        alert('Order created successfully!');
    };

    const isStepValid = (stepNumber) => {
        if (stepNumber === 1) return orderItems.length > 0;
        if (stepNumber === 2) return customerInfo.name && customerInfo.email && customerInfo.phone;
        if (stepNumber === 3) return shippingInfo.address && shippingInfo.city && shippingInfo.zipCode;
        return true;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
                    <p className="mt-1 text-gray-600">Add products and customer details to create a new order</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center justify-between">
                        {[
                            { num: 1, title: 'Products', icon: ShoppingCart },
                            { num: 2, title: 'Customer', icon: User },
                            { num: 3, title: 'Shipping', icon: MapPin },
                            { num: 4, title: 'Payment', icon: CreditCard }
                        ].map((s, index) => (
                            <React.Fragment key={s.num}>
                                <div className="flex flex-1 flex-col items-center">
                                    <button
                                        onClick={() => isStepValid(s.num - 1) && setStep(s.num)}
                                        disabled={!isStepValid(s.num - 1) && s.num > step}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition ${step === s.num
                                                ? 'bg-blue-600 text-white'
                                                : step > s.num
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-200 text-gray-500'
                                            } ${isStepValid(s.num - 1) || s.num <= step ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                    >
                                        {step > s.num ? <Check className="h-6 w-6" /> : <s.icon className="h-6 w-6" />}
                                    </button>
                                    <span className={`text-sm font-medium ${step === s.num ? 'text-blue-600' : 'text-gray-600'}`}>
                                        {s.title}
                                    </span>
                                </div>
                                {index < 3 && (
                                    <div className={`flex-1 h-1 mx-2 ${step > s.num ? 'bg-green-600' : 'bg-gray-200'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="rounded-lg bg-white p-6 shadow">
                            {/* Step 1: Products */}
                            {step === 1 && (
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Select Products</h2>

                                    {/* Product Search */}
                                    <div className="mb-4">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search products by name or SKU..."
                                                value={searchProduct}
                                                onChange={(e) => {
                                                    setSearchProduct(e.target.value);
                                                    setShowProductSearch(e.target.value.length > 0);
                                                }}
                                                onFocus={() => setShowProductSearch(true)}
                                                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        {/* Product Search Results */}
                                        {showProductSearch && searchProduct && (
                                            <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                                {filteredProducts.map(product => (
                                                    <button
                                                        key={product.id}
                                                        onClick={() => addProduct(product)}
                                                        className="flex w-full items-center justify-between border-b p-3 text-left last:border-b-0 hover:bg-gray-50"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-2xl">{product.image}</span>
                                                            <div>
                                                                <p className="font-medium text-gray-900">{product.name}</p>
                                                                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-gray-900">${product.price}</p>
                                                            <p className="text-xs text-gray-500">{product.stock} in stock</p>
                                                        </div>
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
                                                <p className="text-sm">Search and add products to start creating an order</p>
                                            </div>
                                        ) : (
                                            orderItems.map(item => (
                                                <div key={item.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                                                    <span className="text-3xl">{item.image}</span>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                                        <p className="text-sm font-semibold text-gray-900">${item.price}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="rounded-lg border border-gray-300 p-1 hover:bg-gray-50"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="rounded-lg border border-gray-300 p-1 hover:bg-gray-50"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <p className="w-24 text-right font-semibold text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <button
                                                        onClick={() => removeProduct(item.id)}
                                                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Customer */}
                            {step === 2 && (
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Customer Information</h2>

                                    {/* Customer Search */}
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Search Existing Customer
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Search by name or email..."
                                            value={customerInfo.searchQuery}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, searchQuery: e.target.value })}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                        {customerInfo.searchQuery && filteredCustomers.length > 0 && (
                                            <div className="mt-2 divide-y rounded-lg border border-gray-200">
                                                {filteredCustomers.map(customer => (
                                                    <button
                                                        key={customer.id}
                                                        onClick={() => selectCustomer(customer)}
                                                        className="w-full p-3 text-left hover:bg-gray-50"
                                                    >
                                                        <p className="font-medium text-gray-900">{customer.name}</p>
                                                        <p className="text-sm text-gray-500">{customer.email}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 border-t pt-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Full Name *</label>
                                            <input
                                                type="text"
                                                value={customerInfo.name}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Email *</label>
                                            <input
                                                type="email"
                                                value={customerInfo.email}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Phone *</label>
                                            <input
                                                type="tel"
                                                value={customerInfo.phone}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Shipping */}
                            {step === 3 && (
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Shipping Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Address *</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.address}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">City *</label>
                                                <input
                                                    type="text"
                                                    value={shippingInfo.city}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">State</label>
                                                <input
                                                    type="text"
                                                    value={shippingInfo.state}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">ZIP Code *</label>
                                                <input
                                                    type="text"
                                                    value={shippingInfo.zipCode}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">Country</label>
                                                <input
                                                    type="text"
                                                    value={shippingInfo.country}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Payment */}
                            {step === 4 && (
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Payment Details</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Payment Method</label>
                                            <select
                                                value={paymentInfo.method}
                                                onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="credit_card">Credit Card</option>
                                                <option value="debit_card">Debit Card</option>
                                                <option value="paypal">PayPal</option>
                                                <option value="bank_transfer">Bank Transfer</option>
                                                <option value="cash_on_delivery">Cash on Delivery</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Payment Status</label>
                                            <select
                                                value={paymentInfo.status}
                                                onChange={(e) => setPaymentInfo({ ...paymentInfo, status: e.target.value })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="paid">Paid</option>
                                                <option value="pending">Pending</option>
                                                <option value="failed">Failed</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-6 flex justify-between border-t pt-6">
                                <button
                                    onClick={() => setStep(Math.max(1, step - 1))}
                                    disabled={step === 1}
                                    className="rounded-lg border border-gray-300 px-6 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                {step < 4 ? (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        disabled={!isStepValid(step)}
                                        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                                    >
                                        Create Order
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>

                            <div className="mb-4 space-y-3">
                                {orderItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.name} x{item.quantity}
                                        </span>
                                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-t pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (10%)</span>
                                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">${calculateShipping().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-blue-600">${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            {customerInfo.name && (
                                <div className="mt-4 border-t pt-4">
                                    <p className="mb-2 text-sm font-medium text-gray-700">Customer</p>
                                    <p className="text-sm text-gray-900">{customerInfo.name}</p>
                                    <p className="text-xs text-gray-500">{customerInfo.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
