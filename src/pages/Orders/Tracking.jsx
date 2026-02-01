import { useState } from "react";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Search, RefreshCw, Copy, ExternalLink, Box, Warehouse, Home, AlertTriangle, Calendar, Hash } from 'lucide-react';

export default function Tracking() {
    const [trackingInput, setTrackingInput] = useState('');
    const [selectedShipment, setSelectedShipment] = useState(0);
    const [copied, setCopied] = useState(false);

    const shipments = [
        {
            id: 'TRK1234567890',
            orderId: '#ORD-2024-001',
            status: 'in_transit',
            carrier: 'FedEx',
            estimatedDelivery: 'Nov 22, 2024',
            origin: 'Los Angeles, CA',
            destination: 'New York, NY 10001',
            weight: '2.4 lbs',
            customer: 'John Doe',
            items: 3,
            timeline: [
                { status: 'Order Placed', date: 'Nov 18, 10:30 AM', location: 'Online', completed: true, icon: Package },
                { status: 'Picked Up', date: 'Nov 18, 2:15 PM', location: 'Los Angeles, CA', completed: true, icon: Warehouse },
                { status: 'In Transit', date: 'Nov 19, 8:00 AM', location: 'Phoenix, AZ Hub', completed: true, icon: Truck },
                { status: 'In Transit', date: 'Nov 20, 6:30 PM', location: 'Dallas, TX Hub', completed: true, icon: Truck, current: true },
                { status: 'Out for Delivery', date: 'Expected Nov 22', location: 'New York, NY', completed: false, icon: Box },
                { status: 'Delivered', date: 'Expected Nov 22', location: 'New York, NY 10001', completed: false, icon: Home }
            ]
        },
        {
            id: 'TRK9876543210',
            orderId: '#ORD-2024-002',
            status: 'delivered',
            carrier: 'UPS',
            estimatedDelivery: 'Nov 17, 2024',
            origin: 'Seattle, WA',
            destination: 'Chicago, IL 60601',
            weight: '1.2 lbs',
            customer: 'Jane Smith',
            items: 1,
            timeline: [
                { status: 'Order Placed', date: 'Nov 14, 9:00 AM', location: 'Online', completed: true, icon: Package },
                { status: 'Picked Up', date: 'Nov 14, 1:30 PM', location: 'Seattle, WA', completed: true, icon: Warehouse },
                { status: 'In Transit', date: 'Nov 15, 7:00 AM', location: 'Denver, CO Hub', completed: true, icon: Truck },
                { status: 'Out for Delivery', date: 'Nov 17, 8:00 AM', location: 'Chicago, IL', completed: true, icon: Box },
                { status: 'Delivered', date: 'Nov 17, 2:45 PM', location: 'Chicago, IL 60601', completed: true, icon: Home }
            ]
        },
        {
            id: 'TRK5555666677',
            orderId: '#ORD-2024-003',
            status: 'exception',
            carrier: 'USPS',
            estimatedDelivery: 'Nov 21, 2024',
            origin: 'Miami, FL',
            destination: 'Boston, MA 02101',
            weight: '3.8 lbs',
            customer: 'Bob Wilson',
            items: 2,
            timeline: [
                { status: 'Order Placed', date: 'Nov 16, 11:00 AM', location: 'Online', completed: true, icon: Package },
                { status: 'Picked Up', date: 'Nov 16, 4:00 PM', location: 'Miami, FL', completed: true, icon: Warehouse },
                { status: 'In Transit', date: 'Nov 17, 9:00 AM', location: 'Atlanta, GA Hub', completed: true, icon: Truck },
                { status: 'Delivery Exception', date: 'Nov 19, 3:00 PM', location: 'Boston, MA', completed: true, icon: AlertTriangle, exception: true },
                { status: 'Rescheduled', date: 'Expected Nov 23', location: 'Boston, MA 02101', completed: false, icon: Calendar }
            ]
        }
    ];

    const shipment = shipments[selectedShipment];

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            in_transit: 'bg-blue-100 text-blue-800 border-blue-300',
            out_for_delivery: 'bg-purple-100 text-purple-800 border-purple-300',
            delivered: 'bg-green-100 text-green-800 border-green-300',
            exception: 'bg-red-100 text-red-800 border-red-300'
        };
        return colors[status] || colors.pending;
    };

    const getStatusLabel = (status) => {
        const labels = {
            pending: 'Pending',
            in_transit: 'In Transit',
            out_for_delivery: 'Out for Delivery',
            delivered: 'Delivered',
            exception: 'Exception'
        };
        return labels[status] || 'Unknown';
    };

    const copyTracking = () => {
        navigator.clipboard.writeText(shipment.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSearch = () => {
        const found = shipments.findIndex(s => s.id.toLowerCase() === trackingInput.toLowerCase());
        if (found !== -1) setSelectedShipment(found);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-6">
                    <button className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Orders
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Shipment Tracking</h1>
                            <p className="mt-1 text-gray-600">Track and manage all shipments</p>
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                            <RefreshCw className="h-4 w-4" />
                            Refresh All
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6 rounded-lg bg-white p-4 shadow">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={trackingInput}
                                onChange={(e) => setTrackingInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Enter tracking number..."
                                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                        >
                            Track
                        </button>
                    </div>
                </div>

                {/* Shipment Selector */}
                <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
                    {shipments.map((s, idx) => (
                        <button
                            key={s.id}
                            onClick={() => setSelectedShipment(idx)}
                            className={`flex-shrink-0 rounded-lg border-2 p-4 transition-all ${selectedShipment === idx
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`rounded-full p-2 ${s.status === 'delivered' ? 'bg-green-100' :
                                    s.status === 'exception' ? 'bg-red-100' : 'bg-blue-100'
                                    }`}>
                                    {s.status === 'delivered' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                                        s.status === 'exception' ? <AlertTriangle className="h-5 w-5 text-red-600" /> :
                                            <Truck className="h-5 w-5 text-blue-600" />}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900">{s.orderId}</p>
                                    <p className="text-xs text-gray-500">{s.customer}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Tracking Info */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Status Card */}
                        <div className="rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-xl font-semibold text-gray-900">{shipment.id}</h2>
                                            <button
                                                onClick={copyTracking}
                                                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                            {copied && <span className="text-xs text-green-600">Copied!</span>}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Order {shipment.orderId}</p>
                                    </div>
                                    <span className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${getStatusColor(shipment.status)}`}>
                                        {shipment.status === 'in_transit' && <Truck className="h-4 w-4" />}
                                        {shipment.status === 'delivered' && <CheckCircle className="h-4 w-4" />}
                                        {shipment.status === 'exception' && <AlertTriangle className="h-4 w-4" />}
                                        {getStatusLabel(shipment.status)}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="p-6">
                                <div className="mb-6">
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-gray-600">Shipment Progress</span>
                                        <span className="font-medium text-gray-900">
                                            {Math.round((shipment.timeline.filter(t => t.completed).length / shipment.timeline.length) * 100)}%
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className={`h-2 rounded-full transition-all ${shipment.status === 'exception' ? 'bg-red-500' :
                                                shipment.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${(shipment.timeline.filter(t => t.completed).length / shipment.timeline.length) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Route Visualization */}
                                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                                    <div className="text-center">
                                        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                            <Warehouse className="h-5 w-5 text-green-600" />
                                        </div>
                                        <p className="text-xs font-medium text-gray-900">Origin</p>
                                        <p className="text-xs text-gray-500">{shipment.origin}</p>
                                    </div>
                                    <div className="mx-4 flex-1">
                                        <div className="relative">
                                            <div className="h-0.5 w-full bg-gray-300" />
                                            <Truck className={`absolute top-1/2 -translate-y-1/2 h-6 w-6 ${shipment.status === 'delivered' ? 'right-0 text-green-600' :
                                                shipment.status === 'exception' ? 'right-1/3 text-red-600' :
                                                    'left-1/2 -translate-x-1/2 text-blue-600'
                                                }`} />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`mb-2 flex h-10 w-10 mx-auto items-center justify-center rounded-full ${shipment.status === 'delivered' ? 'bg-green-100' : 'bg-gray-200'
                                            }`}>
                                            <Home className={`h-5 w-5 ${shipment.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`} />
                                        </div>
                                        <p className="text-xs font-medium text-gray-900">Destination</p>
                                        <p className="text-xs text-gray-500">{shipment.destination}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Tracking History</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {shipment.timeline.map((event, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${event.exception ? 'bg-red-100' :
                                                    event.current ? 'bg-blue-500 ring-4 ring-blue-100' :
                                                        event.completed ? 'bg-green-100' : 'bg-gray-100'
                                                    }`}>
                                                    <event.icon className={`h-5 w-5 ${event.exception ? 'text-red-600' :
                                                        event.current ? 'text-white' :
                                                            event.completed ? 'text-green-600' : 'text-gray-400'
                                                        }`} />
                                                </div>
                                                {index < shipment.timeline.length - 1 && (
                                                    <div className={`w-0.5 h-12 ${event.completed ? 'bg-green-300' : 'bg-gray-200'}`} />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-8">
                                                <div className="flex items-center gap-2">
                                                    <h3 className={`font-medium ${event.exception ? 'text-red-600' :
                                                        event.current ? 'text-blue-600' :
                                                            event.completed ? 'text-gray-900' : 'text-gray-500'
                                                        }`}>
                                                        {event.status}
                                                    </h3>
                                                    {event.current && (
                                                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                                    <MapPin className="h-3 w-3" />
                                                    {event.location}
                                                </div>
                                                <p className="mt-1 text-xs text-gray-400">{event.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Delivery Estimate */}
                        <div className={`rounded-lg p-6 shadow ${shipment.status === 'delivered' ? 'bg-green-50 border border-green-200' :
                            shipment.status === 'exception' ? 'bg-red-50 border border-red-200' :
                                'bg-blue-50 border border-blue-200'
                            }`}>
                            <div className="flex items-center gap-3">
                                {shipment.status === 'delivered' ? (
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                ) : shipment.status === 'exception' ? (
                                    <AlertTriangle className="h-8 w-8 text-red-600" />
                                ) : (
                                    <Clock className="h-8 w-8 text-blue-600" />
                                )}
                                <div>
                                    <p className={`text-sm ${shipment.status === 'delivered' ? 'text-green-700' :
                                        shipment.status === 'exception' ? 'text-red-700' : 'text-blue-700'
                                        }`}>
                                        {shipment.status === 'delivered' ? 'Delivered On' :
                                            shipment.status === 'exception' ? 'Delayed - New ETA' : 'Estimated Delivery'}
                                    </p>
                                    <p className={`text-xl font-bold ${shipment.status === 'delivered' ? 'text-green-800' :
                                        shipment.status === 'exception' ? 'text-red-800' : 'text-blue-800'
                                        }`}>
                                        {shipment.estimatedDelivery}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Shipment Details */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Shipment Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Carrier</span>
                                    <span className="font-medium text-gray-900">{shipment.carrier}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Weight</span>
                                    <span className="font-medium text-gray-900">{shipment.weight}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Items</span>
                                    <span className="font-medium text-gray-900">{shipment.items} item(s)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Customer</span>
                                    <span className="font-medium text-gray-900">{shipment.customer}</span>
                                </div>
                            </div>
                            <div className="mt-4 border-t pt-4">
                                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                    <ExternalLink className="h-4 w-4" />
                                    Track on {shipment.carrier}
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                    Send Tracking Update
                                </button>
                                <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                    View Order Details
                                </button>
                                <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                    Contact Customer
                                </button>
                                {shipment.status === 'exception' && (
                                    <button className="w-full rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 hover:bg-red-100">
                                        Resolve Exception
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}