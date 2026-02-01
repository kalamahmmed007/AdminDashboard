// src/pages/Orders/PendingOrders.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrder } from "../../redux/slices/orderSlice";
import {
  Printer,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function PendingOrders() {
  const dispatch = useDispatch();
  const { items: orders, loading } = useSelector((state) => state.orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch pending orders
  useEffect(() => {
    dispatch(fetchOrders({ status: "pending" }));
  }, [dispatch]);

  // Toggle order selection
  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleAllOrders = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id || order._id));
    }
  };

  // Approve a single order
  const approveOrder = async (orderId) => {
    try {
      await dispatch(
        updateOrder({
          id: orderId,
          payload: { status: "completed", completedDate: new Date().toISOString() },
        })
      ).unwrap();
      toast.success("✅ Order marked as completed!");
      setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
    } catch (err) {
      toast.error("❌ Failed to approve order.");
    }
  };

  // Reject a single order
  const rejectOrder = async (orderId) => {
    try {
      await dispatch(
        updateOrder({
          id: orderId,
          payload: { status: "rejected" },
        })
      ).unwrap();
      toast.error("❌ Order rejected.");
      setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
    } catch (err) {
      toast.error("❌ Failed to reject order.");
    }
  };

  // Bulk approve selected orders
  const bulkApprove = async () => {
    for (const orderId of selectedOrders) {
      await approveOrder(orderId);
    }
    setSelectedOrders([]);
  };

  // Priority helpers
  const getPriorityColor = (priority) => {
    const colors = {
      urgent: "bg-red-100 text-red-800 border-red-300",
      high: "bg-orange-100 text-orange-800 border-orange-300",
      normal: "bg-blue-100 text-blue-800 border-blue-300",
    };
    return colors[priority] || colors.normal;
  };

  const getPriorityIcon = (priority) => {
    if (priority === "urgent") return <AlertCircle className="h-3 w-3" />;
    if (priority === "high") return <Clock className="h-3 w-3" />;
    return null;
  };

  // Filter & sort orders
  const filteredOrders = (orders || [])
    .filter((order) => order.status === "pending")
    .filter(
      (order) =>
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "newest") return b.hoursWaiting - a.hoursWaiting;
    if (sortBy === "oldest") return a.hoursWaiting - b.hoursWaiting;
    if (sortBy === "amount-high") return parseFloat(b.total) - parseFloat(a.total);
    if (sortBy === "amount-low") return parseFloat(a.total) - parseFloat(b.total);
    return 0;
  });

  // Stats
  const totalPending = filteredOrders.length;
  const urgentCount = filteredOrders.filter((o) => o.priority === "urgent").length;
  const highCount = filteredOrders.filter((o) => o.priority === "high").length;
  const pendingValue = filteredOrders
    .reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0)
    .toFixed(2);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Clock className="h-16 w-16 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pending Orders</h1>
            <p className="mt-1 text-gray-600">Orders waiting for approval or payment confirmation</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">{totalPending} Orders Pending</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold text-gray-900">{totalPending}</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-red-500 bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
              </div>
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-orange-500 bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">{highCount}</p>
              </div>
              <Clock className="h-10 w-10 text-orange-500" />
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Value</p>
                <p className="text-2xl font-bold text-gray-900">${pendingValue}</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search pending orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-yellow-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Amount: High to Low</option>
              <option value="amount-low">Amount: Low to High</option>
            </select>

            {selectedOrders.length > 0 && (
              <button
                onClick={bulkApprove}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Approve Selected ({selectedOrders.length})
              </button>
            )}

            <button className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-200">
          {sortedOrders.map((order) => (
            <div key={order.id || order._id} className="flex items-start gap-4 p-6 transition hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedOrders.includes(order.id || order._id)}
                onChange={() => toggleOrderSelection(order.id || order._id)}
                className="mt-1 rounded border-gray-300"
              />
              <div className="flex-1">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-600">{order.id}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(order.priority)}`}>
                      {getPriorityIcon(order.priority)}
                      {order.priority?.toUpperCase() || "NORMAL"}
                    </span>
                    {order.hoursWaiting > 24 && (
                      <span className="inline-flex items-center gap-1 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                        <AlertCircle className="h-3 w-3" />
                        {order.hoursWaiting}h waiting
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">${order.total}</span>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-900">{order.date}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Method</p>
                    <p className="text-sm font-medium text-gray-900">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Items</p>
                    <p className="text-sm font-medium text-gray-900">{order.items?.length || order.items} item(s)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => approveOrder(order.id || order._id)}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve & Process
                  </button>
                  <button
                    onClick={() => rejectOrder(order.id || order._id)}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </button>
                  <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50">
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedOrders.length === 0 && (
          <div className="p-12 text-center">
            <Clock className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-red-600">No Pending Orders</h3>
            <p className="text-red-600">All orders have been processed or there are no matching results.</p>
          </div>
        )}
      </div>
    </div>
  );
}
