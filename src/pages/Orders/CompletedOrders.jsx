// src/pages/Orders/CompletedOrders.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import {
  Printer,
  Search,
  Download,
  Eye,
  Star,
  MessageSquare,
  Package,
  Calendar,
  DollarSign,
  CheckCircle,
  FileText,
  RefreshCw,
} from "lucide-react";

export default function CompletedOrders() {
  const dispatch = useDispatch();
  const { items: orders, loading } = useSelector((state) => state.orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Fetch completed orders from Redux
  useEffect(() => {
    dispatch(fetchOrders({ status: "completed" }));
  }, [dispatch]);

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

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

  const downloadInvoice = (invoiceNo) => {
    console.log("Downloading invoice:", invoiceNo);
    // connect API for invoice download here
  };

  const filteredOrders = (orders || [])
    .filter((order) => order.status === "completed")
    .filter((order) => {
      const matchesSearch =
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesDate = true;
      if (dateFilter !== "all") {
        const today = new Date();
        const completedDate = new Date(order.completedDate);
        const diffDays = Math.floor(
          (today - completedDate) / (1000 * 60 * 60 * 24)
        );

        if (dateFilter === "today") matchesDate = diffDays === 0;
        if (dateFilter === "week") matchesDate = diffDays <= 7;
        if (dateFilter === "month") matchesDate = diffDays <= 30;
      }

      return matchesSearch && matchesDate;
    });

  const totalRevenue = (orders || [])
    .filter((o) => o.status === "completed")
    .reduce(
      (sum, order) => sum + parseFloat((order.total || "$0").replace(/[$,]/g, "")),
      0
    );

  const avgRating = filteredOrders.length
    ? (
        filteredOrders.reduce((sum, order) => sum + (order.rating || 0), 0) /
        filteredOrders.length
      ).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Completed Orders</h1>
              <p className="mt-1 text-gray-600">Successfully delivered and completed orders</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {filteredOrders.length} Orders Completed
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Completed</p>
                <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{avgRating} / 5.0</p>
                <div className="mt-1">{renderStars(Math.round(avgRating))}</div>
              </div>
              <Star className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-purple-500 bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Reviews</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredOrders.filter((o) => o.hasReview).length}
                </p>
              </div>
              <MessageSquare className="h-10 w-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters + Actions */}
        <div className="mb-6 rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search completed orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>

                <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">
                  <Download className="h-4 w-4" /> Export
                </button>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === filteredOrders.length}
                      onChange={toggleAllOrders}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Completed Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredOrders.map((order) => (
                  <tr key={order.id || order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id || order._id)}
                        onChange={() => toggleOrderSelection(order.id || order._id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-600">{order.id}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                        <span className="text-xs text-gray-500">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.orderDate}</td>
                    <td className="flex items-center gap-2 px-6 py-4 text-sm text-green-600">
                      <Calendar className="h-4 w-4" /> {order.completedDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.items}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {renderStars(order.rating)}
                        {order.hasReview && (
                          <span className="flex items-center gap-1 text-xs text-purple-600">
                            <MessageSquare className="h-3 w-3" /> Review
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="rounded p-1 hover:bg-gray-100" title="View Details">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => downloadInvoice(order.invoiceNo)}
                          className="rounded p-1 hover:bg-gray-100"
                          title="Download Invoice"
                        >
                          <FileText className="h-4 w-4 text-blue-600" />
                        </button>
                        <button className="rounded p-1 hover:bg-gray-100" title="Reorder">
                          <RefreshCw className="h-4 w-4 text-green-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="p-12 text-center">
              <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-red-600">No Completed Orders</h3>
              <p className="text-red-600">No orders match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
