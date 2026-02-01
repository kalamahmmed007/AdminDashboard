// src/pages/Orders/AllOrders.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  updateOrder,
} from "../../redux/slices/orderSlice";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  User,
  Search,
  Download,
  Eye,
  Star,
  Package,
} from "lucide-react";

export default function AllOrders() {
  const dispatch = useDispatch();
  const { items: orders } = useSelector((state) => state.orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    dispatch(fetchOrders({ status: "all" }));
  }, [dispatch]);

  // Selection logic
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
      setSelectedOrders(orders.map((o) => o.id || o._id));
    }
  };

  const approveOrder = (orderId) => {
    dispatch(
      updateOrder({ id: orderId, payload: { status: "completed", completedDate: new Date().toISOString() } })
    );
    setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
  };

  const rejectOrder = (orderId) => {
    dispatch(updateOrder({ id: orderId, payload: { status: "rejected" } }));
    setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
  };

  const bulkApprove = () => {
    selectedOrders.forEach((orderId) => approveOrder(orderId));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: "bg-red-100 text-red-800 border-red-300",
      high: "bg-orange-100 text-orange-800 border-orange-300",
      normal: "bg-blue-100 text-blue-800 border-blue-300",
    };
    return colors[priority];
  };

  const getPriorityIcon = (priority) => {
    if (priority === "urgent") return <AlertCircle className="h-3 w-3" />;
    if (priority === "high") return <Clock className="h-3 w-3" />;
    return null;
  };

  // Filtered orders
  const filteredOrders = (orders || [])
    .filter((order) =>
      statusFilter === "all" ? true : order.status === statusFilter
    )
    .filter(
      (order) =>
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Stats
  const totalPending = orders.filter((o) => o.status === "pending").length;
  const totalCompleted = orders.filter((o) => o.status === "completed").length;
  const totalRejected = orders.filter((o) => o.status === "rejected").length;
  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + parseFloat(o.total.slice(1)), 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
            <p className="mt-1 text-gray-600">View and manage all orders</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{totalPending}</p>
          </div>
          <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{totalCompleted}</p>
          </div>
          <div className="rounded-lg border-l-4 border-red-500 bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-gray-900">{totalRejected}</p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          {selectedOrders.length > 0 && (
            <button
              onClick={bulkApprove}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4" />
              Approve Selected ({selectedOrders.length})
            </button>
          )}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length}
                    onChange={toggleAllOrders}
                  />
                </th>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id || order._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id || order._id)}
                      onChange={() => toggleOrderSelection(order.id || order._id)}
                    />
                  </td>
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : order.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.total}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="flex gap-2 px-4 py-2">
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => approveOrder(order.id || order._id)}
                          className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectOrder(order.id || order._id)}
                          className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button className="rounded bg-gray-300 px-2 py-1 hover:bg-gray-400">
                      <Eye className="inline h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              No orders match your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
