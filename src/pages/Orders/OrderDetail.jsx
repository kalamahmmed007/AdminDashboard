import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrdersService } from "../../services/orders";
import { formatPrice } from "../../utils/formatPrice";
import { jsPDF } from "jspdf";
import OrderTimeline from "../../components/Orders/OrderTimeline";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, User, Mail, Phone, CreditCard, Calendar, Download, Printer, Edit, MessageSquare, AlertCircle, X } from 'lucide-react';

export default function OrderDetails() {
    const [orderStatus, setOrderStatus] = useState('processing');
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('TRK1234567890');
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [newNote, setNewNote] = useState('');

    const order = {
        id: '#ORD-2024-001',
        date: '2024-11-18 10:30 AM',
        status: 'processing',
        customer: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 234-567-8900',
            avatar: '👤'
        },
        shipping: {
            address: '123 Main Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            method: 'Express Shipping'
        },
        payment: {
            method: 'Credit Card',
            status: 'Paid',
            transactionId: 'TXN-2024-001',
            cardLast4: '4242',
            paidDate: '2024-11-18 10:31 AM'
        },
        items: [
            {
                id: 1,
                name: 'Wireless Headphones',
                sku: 'WH-001',
                image: '🎧',
                quantity: 2,
                price: 79.99,
                total: 159.98
            },
            {
                id: 2,
                name: 'Smart Watch',
                sku: 'SW-002',
                image: '⌚',
                quantity: 1,
                price: 199.99,
                total: 199.99
            },
            {
                id: 3,
                name: 'USB-C Cable',
                sku: 'UC-004',
                image: '🔌',
                quantity: 3,
                price: 12.99,
                total: 38.97
            }
        ],
        timeline: [
            {
                status: 'Order Placed',
                date: '2024-11-18 10:30 AM',
                description: 'Order was successfully placed',
                icon: CheckCircle,
                color: 'green',
                completed: true
            },
            {
                status: 'Payment Confirmed',
                date: '2024-11-18 10:31 AM',
                description: 'Payment received and confirmed',
                icon: CreditCard,
                color: 'green',
                completed: true
            },
            {
                status: 'Processing',
                date: '2024-11-18 11:00 AM',
                description: 'Order is being prepared',
                icon: Package,
                color: 'blue',
                completed: true
            },
            {
                status: 'Shipped',
                date: 'Pending',
                description: 'Order will be shipped soon',
                icon: Truck,
                color: 'gray',
                completed: false
            },
            {
                status: 'Delivered',
                date: 'Pending',
                description: 'Order will be delivered',
                icon: CheckCircle,
                color: 'gray',
                completed: false
            }
        ],
        notes: [
            {
                id: 1,
                author: 'Admin',
                date: '2024-11-18 11:00 AM',
                text: 'Customer requested gift wrapping'
            },
            {
                id: 2,
                author: 'System',
                date: '2024-11-18 10:31 AM',
                text: 'Payment verification completed successfully'
            }
        ],
        subtotal: 398.94,
        tax: 39.89,
        discount: 0,
        total: 438.83
    };

    const statusOptions = [
        { value: 'pending', label: 'Pending', color: 'yellow' },
        { value: 'processing', label: 'Processing', color: 'blue' },
        { value: 'shipped', label: 'Shipped', color: 'purple' },
        { value: 'completed', label: 'Completed', color: 'green' },
        { value: 'cancelled', label: 'Cancelled', color: 'red' }
    ];

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            processing: 'bg-blue-100 text-blue-800 border-blue-300',
            shipped: 'bg-purple-100 text-purple-800 border-purple-300',
            completed: 'bg-green-100 text-green-800 border-green-300',
            cancelled: 'bg-red-100 text-red-800 border-red-300'
        };
        return colors[status] || colors.pending;
    };

    const updateOrderStatus = (newStatus) => {
        setOrderStatus(newStatus);
        setShowStatusModal(false);
        console.log('Status updated to:', newStatus);
    };

    const addNote = () => {
        if (newNote.trim()) {
            console.log('Adding note:', newNote);
            setNewNote('');
            setShowNoteModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6">
                    <button className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Orders
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
                            <p className="mt-1 text-gray-600">Order {order.id} - {order.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                                <Printer className="h-4 w-4" />
                                Print
                            </button>
                            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                                <Download className="h-4 w-4" />
                                Invoice
                            </button>
                            <button
                                onClick={() => setShowStatusModal(true)}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                <Edit className="h-4 w-4" />
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${getStatusColor(orderStatus)}`}>
                        <Package className="h-4 w-4" />
                        {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Order Items */}
                        <div className="rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
                            </div>
                            <div className="space-y-4 p-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-3xl">
                                            {item.image}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                            <p className="mt-1 text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">${item.price} each</p>
                                            <p className="font-semibold text-gray-900">${item.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t bg-gray-50 p-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium text-gray-900">${order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-medium text-gray-900">${order.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping ({order.shipping.method})</span>
                                        <span className="font-medium text-gray-900">${order.shipping.toFixed(2)}</span>
                                    </div>
                                    {order.discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount</span>
                                            <span>-${order.discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t pt-2 text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-blue-600">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Timeline */}
                        <div className="rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Order Timeline</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {order.timeline.map((event, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${event.completed ? `bg-${event.color}-100` : 'bg-gray-100'
                                                    }`}>
                                                    <event.icon className={`w-5 h-5 ${event.completed ? `text-${event.color}-600` : 'text-gray-400'
                                                        }`} />
                                                </div>
                                                {index < order.timeline.length - 1 && (
                                                    <div className={`w-0.5 h-12 ${event.completed ? 'bg-green-300' : 'bg-gray-200'
                                                        }`} />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-8">
                                                <h3 className={`font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'
                                                    }`}>
                                                    {event.status}
                                                </h3>
                                                <p className="text-sm text-gray-500">{event.description}</p>
                                                <p className="mt-1 text-xs text-gray-400">{event.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Notes */}
                        <div className="rounded-lg bg-white shadow">
                            <div className="flex items-center justify-between border-b border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Order Notes</h2>
                                <button
                                    onClick={() => setShowNoteModal(true)}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    + Add Note
                                </button>
                            </div>
                            <div className="space-y-4 p-6">
                                {order.notes.map((note) => (
                                    <div key={note.id} className="border-l-4 border-blue-500 py-2 pl-4">
                                        <div className="mb-1 flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">{note.author}</span>
                                            <span className="text-xs text-gray-500">{note.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{note.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Customer</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                                        {order.customer.avatar}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                                        <button className="text-sm text-blue-600 hover:text-blue-700">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2 border-t pt-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span className="text-gray-700">{order.customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span className="text-gray-700">{order.customer.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Information */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Shipping Address</h3>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 h-5 w-5 text-gray-400" />
                                    <div className="text-sm text-gray-700">
                                        <p>{order.shipping.address}</p>
                                        <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                                        <p>{order.shipping.country}</p>
                                    </div>
                                </div>
                                <div className="border-t pt-3">
                                    <p className="text-sm text-gray-600">Shipping Method</p>
                                    <p className="text-sm font-medium text-gray-900">{order.shipping.method}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Method</span>
                                    <span className="font-medium text-gray-900">{order.payment.method}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Status</span>
                                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                        {order.payment.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Transaction ID</span>
                                    <span className="font-mono text-xs text-gray-900">{order.payment.transactionId}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Card</span>
                                    <span className="font-medium text-gray-900">**** {order.payment.cardLast4}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Paid Date</span>
                                    <span className="text-gray-900">{order.payment.paidDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tracking Information */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Tracking</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">Tracking Number</label>
                                    <input
                                        type="text"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                    />
                                </div>
                                <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                    Update Tracking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Status Modal */}
            {showStatusModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Update Order Status</h3>
                            <button
                                onClick={() => setShowStatusModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {statusOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => updateOrderStatus(option.value)}
                                    className={`w-full text-left px-4 py-3 rounded-lg border ${orderStatus === option.value
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-sm font-medium ${getStatusColor(option.value)}`}>
                                        {option.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Add Note Modal */}
            {showNoteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Add Order Note</h3>
                            <button
                                onClick={() => setShowNoteModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Enter your note here..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => setShowNoteModal(false)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNote}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}