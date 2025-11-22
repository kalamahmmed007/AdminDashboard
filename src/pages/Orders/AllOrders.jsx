import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import debounce from 'lodash.debounce';
import { Search, Filter, Download, Eye, Edit, Trash2, MoreVertical, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AllOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const orders = [
    {
      id: '#ORD-2024-001',
      customer: 'John Doe',
      email: 'john@example.com',
      date: '2024-11-20',
      total: '$459.00',
      status: 'completed',
      items: 3,
      payment: 'Paid'
    },
    {
      id: '#ORD-2024-002',
      customer: 'Sarah Smith',
      email: 'sarah@example.com',
      date: '2024-11-21',
      total: '$289.50',
      status: 'processing',
      items: 2,
      payment: 'Paid'
    },
    {
      id: '#ORD-2024-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      date: '2024-11-21',
      total: '$125.00',
      status: 'pending',
      items: 1,
      payment: 'Pending'
    },
    {
      id: '#ORD-2024-004',
      customer: 'Emily Brown',
      email: 'emily@example.com',
      date: '2024-11-22',
      total: '$892.00',
      status: 'shipped',
      items: 5,
      payment: 'Paid'
    },
    {
      id: '#ORD-2024-005',
      customer: 'David Lee',
      email: 'david@example.com',
      date: '2024-11-22',
      total: '$340.00',
      status: 'cancelled',
      items: 2,
      payment: 'Refunded'
    },
    {
      id: '#ORD-2024-006',
      customer: 'Lisa Wang',
      email: 'lisa@example.com',
      date: '2024-11-22',
      total: '$567.50',
      status: 'processing',
      items: 4,
      payment: 'Paid'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="h-4 w-4" />,
      processing: <Package className="h-4 w-4" />,
      shipped: <Truck className="h-4 w-4" />,
      completed: <CheckCircle className="h-4 w-4" />,
      cancelled: <XCircle className="h-4 w-4" />
    };
    return icons[status];
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleAllOrders = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(order => order.id));
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
          <p className="mt-1 text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <Package className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">23</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">45</p>
              </div>
              <Package className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">88</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="mb-6 rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter and Actions */}
              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === orders.length}
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-sm font-medium text-blue-600">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                        <span className="text-xs text-gray-500">{order.email}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.items}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {order.total}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${order.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="rounded p-1 hover:bg-gray-100" title="View">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="rounded p-1 hover:bg-gray-100" title="Edit">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="rounded p-1 hover:bg-gray-100" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                        <button className="rounded p-1 hover:bg-gray-100" title="More">
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
              <span className="font-medium">156</span> results
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                Previous
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                1
              </button>
              <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                2
              </button>
              <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                3
              </button>
              <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}