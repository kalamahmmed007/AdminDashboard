import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../../components/Orders/OrdersTable";
import Card from "../../components/Card";
import debounce from "lodash.debounce";

export default function AllOrders() {
  const dummyOrders = [
    { id: "101", customer: "John Doe", status: "Pending", total: 120.5, date: "2025-11-14" },
    { id: "102", customer: "Alice Smith", status: "Fulfilled", total: 75.0, date: "2025-11-13" },
    { id: "103", customer: "Bob Johnson", status: "Return", total: 200.0, date: "2025-11-12" },
    { id: "104", customer: "Leena Brown", status: "Pending", total: 50.0, date: "2025-11-11" },
    { id: "105", customer: "Mike Davis", status: "Cancelled", total: 90.0, date: "2025-11-10" },
  ];

  const [orders, setOrders] = useState(dummyOrders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 5;

  // debounce search
  const handleSearchDebounced = useCallback(
    debounce((val) => setQuery(val), 300),
    []
  );

  const handleSearch = (e) => {
    handleSearchDebounced(e.target.value);
  };

  // filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesQuery =
        !query ||
        o.id.includes(query) ||
        o.customer.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  // pagination
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredOrders.slice(start, end);
  }, [filteredOrders, page]);

  // Top card counts
  const counts = useMemo(() => {
    const all = orders.length;
    const completed = orders.filter((o) => o.status === "Fulfilled").length;
    const pending = orders.filter((o) => o.status === "Pending").length;
    const cancelled = orders.filter((o) => o.status === "Cancelled").length;
    const returned = orders.filter((o) => o.status === "Return").length;
    return { all, completed, pending, cancelled, returned };
  }, [orders]);

  // 3-dot menu actions
  const handleDelete = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const handleEdit = (id) => {
    alert(`Edit order ${id} (frontend-only)`);
  };

  const totalPages = Math.ceil(filteredOrders.length / limit);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Orders</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card title="All Orders" value={counts.all} />
        <Card title="Completed" value={counts.completed} />
        <Card title="Pending" value={counts.pending} />
        <Card title="Cancelled" value={counts.cancelled} />
        <Card title="Returned" value={counts.returned} />
      </div>

      {/* Filters & New Order */}
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <input
          placeholder="Search ID or Customer"
          className="rounded border px-3 py-2 md:w-1/3"
          onChange={handleSearch}
        />
        <select
          className="rounded border px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Fulfilled">Fulfilled</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Return">Return</option>
        </select>
        <button
          onClick={() => navigate(`/orders/${o.id}`)}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          + New Order
        </button>
      </div>
    </div>

      {/* Orders Table */ }
  <div className="overflow-x-auto rounded border bg-white shadow">
    <table className="min-w-full">
      <thead className="bg-gray-100">
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
        {paginatedOrders.map((o) => (
          <tr key={o.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{o.id}</td>
            <td className="px-4 py-2">{o.customer}</td>
            <td className="px-4 py-2">
              <select
                className="rounded border px-2 py-1"
                value={o.status}
                onChange={(e) => handleStatusChange(o.id, e.target.value)}
              >
                <option>Pending</option>
                <option>Fulfilled</option>
                <option>Cancelled</option>
                <option>Return</option>
              </select>
            </td>
            <td className="px-4 py-2">${o.total}</td>
            <td className="px-4 py-2">{o.date}</td>
            <td className="flex gap-2 px-4 py-2">
              <button
                className="rounded bg-yellow-100 px-2 py-1"
                onClick={() => handleEdit(o.id)}
              >
                Edit
              </button>
              <button
                className="rounded bg-red-100 px-2 py-1 text-red-600"
                onClick={() => handleDelete(o.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */ }
  <div className="flex items-center justify-between text-sm text-gray-600">
    <div>
      Showing {paginatedOrders.length} of {filteredOrders.length}
    </div>
    <div className="flex gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="rounded border px-3 py-1">Page {page}</span>
      <button
        disabled={page >= totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
    </div >
  );
}
