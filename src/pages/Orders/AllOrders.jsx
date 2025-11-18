import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, Printer, FileText } from 'lucide-react';
import Card from '../../components/Card';
import debounce from 'lodash.debounce';

const AllOrders = () => {
  const navigate = useNavigate();

  const dummyOrders = [
    { id: "101", customer: "John Doe", status: "Pending", total: 120.5, date: "2025-11-14" },
    { id: "102", customer: "Alice Smith", status: "Fulfilled", total: 75.0, date: "2025-11-13" },
    { id: "103", customer: "Bob Johnson", status: "Return", total: 200.0, date: "2025-11-12" },
    { id: "104", customer: "Leena Brown", status: "Pending", total: 50.0, date: "2025-11-11" },
    { id: "105", customer: "Mike Davis", status: "Cancelled", total: 90.0, date: "2025-11-10" },
  ];

  const [orders, setOrders] = useState(dummyOrders);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const limit = 5;

  const handleSearchDebounced = useCallback(
    debounce((val) => setQuery(val), 300),
    []
  );

  const handleSearch = (e) => {
    handleSearchDebounced(e.target.value);
    setPage(1);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesQuery =
        !query ||
        o.id.includes(query) ||
        o.customer.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredOrders.slice(start, start + limit);
  }, [filteredOrders, page]);

  const counts = useMemo(() => ({
    all: orders.length,
    completed: orders.filter(o => o.status === 'Complete').length,
    pending: orders.filter(o => o.status === 'Pending').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length,
    returned: orders.filter(o => o.status === 'Return').length
  }), [orders]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleEdit = (id) => {
    alert(`Edit order ${id} (frontend-only)`);
  };

  const totalPages = Math.ceil(filteredOrders.length / limit);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-400 text-black';
      case 'Fulfilled': return 'bg-green-500 text-white';
      case 'Cancelled': return 'bg-red-500 text-white';
      case 'Return': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold">All Orders</h1>
          <p className="text-sm text-gray-500">Check all orders at a single place. Easy to manage.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <FileText size={18} /> Export Order List
        </button>
      </div>

      {/* Top Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card title="All Orders" value={counts.all} className="!rounded-3xl bg-gradient-to-br from-blue-100 to-blue-50 shadow-sm" />
        <Card title="Completed" value={counts.completed} className="rounded-2xl bg-gradient-to-br from-green-100 to-green-50 shadow-sm" />
        <Card title="Pending" value={counts.pending} className="rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-sm" />
        <Card title="Cancelled" value={counts.cancelled} className="rounded-2xl bg-gradient-to-br from-red-100 to-red-50 shadow-sm" />
        <Card title="Returned" value={counts.returned} className="rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 shadow-sm" />
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col items-center gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by ID or Customer"
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-gray-400 focus:outline-none"
          />
        </div>

        <select
          className="rounded border px-3 py-2"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Fulfilled">Fulfilled</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Return">Return</option>
        </select>

        <button
          onClick={() => navigate("/orders/new")}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          + New Order
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map(o => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{o.id}</td>
                <td className="px-4 py-2">{o.customer}</td>
                <td className="px-4 py-2">
                  <select
                    className={`rounded border px-2 py-1 ${getStatusColor(o.status)}`}
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Complete</option>
                    <option>Cancelled</option>
                    <option>Return</option>
                    <option>Fulfilled</option>
                  </select>
                </td>
                <td className="px-4 py-2">${o.total}</td>
                <td className="px-4 py-2">{o.date}</td>
                <td className="flex gap-2 px-4 py-2">
                  <button className="rounded bg-yellow-100 px-2 py-1 text-black" onClick={() => handleEdit(o.id)}>Edit</button>
                  <button className="rounded bg-red-100 px-2 py-1 text-red-600" onClick={() => handleDelete(o.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {paginatedOrders.length} of {filteredOrders.length}
        </div>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded border px-3 py-1 disabled:opacity-50">Prev</button>
          <span className="rounded border px-3 py-1">Page {page}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
