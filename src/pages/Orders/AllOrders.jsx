import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../../components/Orders/OrdersTable";
import debounce from "lodash.debounce";

export default function AllOrders() {
  const navigate = useNavigate();

  // Dummy orders
  const dummyOrders = [
    {
      id: "101",
      customer: "John Doe",
      status: "Pending",
      total: 120.5,
      date: "2025-11-14",
    },
    {
      id: "102",
      customer: "Alice Smith",
      status: "Fulfilled",
      total: 75.0,
      date: "2025-11-13",
    },
    {
      id: "103",
      customer: "Bob Johnson",
      status: "Unfulfilled",
      total: 200.0,
      date: "2025-11-12",
    },
    {
      id: "104",
      customer: "Leena Brown",
      status: "Pending",
      total: 50.0,
      date: "2025-11-11",
    },
  ];

  const [items, setItems] = useState(dummyOrders);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((val) => setQuery(val), 300),
    []
  );
  const handleSearch = (e) => debouncedSearch(e.target.value);

  // Filter and paginate
  const filteredItems = items
    .filter((o) =>
      (query ? o.id.includes(query) || o.customer.toLowerCase().includes(query.toLowerCase()) : true) &&
      (status === "All" ? true : o.status === status)
    )
    .slice((page - 1) * limit, page * limit);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <button
          onClick={() => navigate("/orders/new")}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          + New Order
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center gap-3">
        <input
          placeholder="Search ID or customer"
          className="w-full max-w-sm rounded border px-3 py-2"
          onChange={handleSearch}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Fulfilled">Fulfilled</option>
          <option value="Unfulfilled">Unfulfilled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded border bg-white shadow-sm">
        <OrdersTable
          orders={filteredItems}
          loading={false}
          onRowClick={(order) => navigate(`/orders/${order.id}`)}
        />
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
        <div>
          Showing {filteredItems.length} of {items.length}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded border px-3 py-1 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <div className="rounded border px-3 py-1">Page {page}</div>
          <button
            className="rounded border px-3 py-1 disabled:opacity-50"
            disabled={page >= Math.ceil(items.length / limit)}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
