import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  updateCustomer,
  deleteCustomer,
} from "../../redux/slices/customerSlice";

const ITEMS = 5;

const AllCustomers = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((s) => s.customers);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Filter and search logic
  let filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      (filterStatus === "active" && c.status === "active") ||
      (filterStatus === "inactive" && c.status !== "active") ||
      (filterStatus === "new" && c.isNew);
    
    return matchesSearch && matchesStatus;
  });

  // Sort logic
  filtered = filtered.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "email") return a.email.localeCompare(b.email);
    return 0;
  });

  const pages = Math.ceil(filtered.length / ITEMS);
  const data = filtered.slice((page - 1) * ITEMS, page * ITEMS);

  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const newCustomers = customers.filter((c) => c.isNew).length;
  const inactiveCustomers = customers.length - activeCustomers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Customer Management
          </h1>
          <p className="text-gray-600">
            Manage and track all your customer information
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Customers"
            value={customers.length}
            icon="👥"
            color="blue"
            trend="+12.5%"
          />
          <StatCard
            title="Active Customers"
            value={activeCustomers}
            icon="✅"
            color="green"
            trend="+8.2%"
          />
          <StatCard
            title="New This Month"
            value={newCustomers}
            icon="🆕"
            color="purple"
            trend="+23.1%"
          />
          <StatCard
            title="Inactive"
            value={inactiveCustomers}
            icon="⏸️"
            color="orange"
            trend="-5.4%"
          />
        </div>

        {/* FILTERS & SEARCH BAR */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 lg:max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={filterStatus === "all"}
                onClick={() => {
                  setFilterStatus("all");
                  setPage(1);
                }}
              >
                All
              </FilterButton>
              <FilterButton
                active={filterStatus === "active"}
                onClick={() => {
                  setFilterStatus("active");
                  setPage(1);
                }}
              >
                Active
              </FilterButton>
              <FilterButton
                active={filterStatus === "inactive"}
                onClick={() => {
                  setFilterStatus("inactive");
                  setPage(1);
                }}
              >
                Inactive
              </FilterButton>
              <FilterButton
                active={filterStatus === "new"}
                onClick={() => {
                  setFilterStatus("new");
                  setPage(1);
                }}
              >
                New
              </FilterButton>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
        </div>

        {/* CUSTOMER TABLE */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
          {loading ? (
            <div className="flex items-center justify-center p-16">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                <p className="text-sm font-medium text-gray-600">
                  Loading customers...
                </p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <div className="mx-auto mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                No customers found
              </h3>
              <p className="text-sm text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                        Badge
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {data.map((c, idx) => (
                      <tr
                        key={c.id}
                        className="transition-colors hover:bg-gray-50"
                        style={{
                          animation: `fadeIn 0.3s ease-in ${idx * 0.05}s both`,
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-lg font-bold text-white shadow-md">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {c.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {c.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {c.email}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-6 py-4">
                          {c.isNew && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                              ✨ New
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEdit(c)}
                              className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition-all hover:bg-blue-100 hover:shadow-md"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => setDeleteId(c.id)}
                              className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-100 hover:shadow-md"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-gray-100 lg:hidden">
                {data.map((c, idx) => (
                  <div
                    key={c.id}
                    className="p-4 transition-colors hover:bg-gray-50"
                    style={{
                      animation: `fadeIn 0.3s ease-in ${idx * 0.05}s both`,
                    }}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xl font-bold text-white shadow-md">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{c.name}</p>
                          <p className="text-sm text-gray-600">{c.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={c.status} />
                        {c.isNew && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">
                            ✨ New
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEdit(c)}
                        className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition-all hover:bg-blue-100"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(c.id)}
                        className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-100"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {(page - 1) * ITEMS + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-900">
                    {Math.min(page * ITEMS, filtered.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {filtered.length}
                  </span>{" "}
                  customers
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
                  >
                    ←
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {[...Array(pages)].map((_, i) => {
                      const pageNum = i + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === pages ||
                        Math.abs(pageNum - page) <= 1
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                              page === pageNum
                                ? "bg-blue-500 text-white shadow-md"
                                : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === page - 2 || pageNum === page + 2) {
                        return (
                          <span
                            key={pageNum}
                            className="flex h-10 w-10 items-center justify-center text-gray-400"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    disabled={page === pages}
                    onClick={() => setPage((p) => p + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
                  >
                    →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {edit && (
        <Modal onClose={() => setEdit(null)}>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xl font-bold text-white shadow-md">
              {edit.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Edit Customer</h2>
              <p className="text-sm text-gray-600">ID: {edit.id}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={edit.email}
                onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                placeholder="Enter customer email"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={edit.status}
                onChange={(e) => setEdit({ ...edit, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                dispatch(updateCustomer({ id: edit.id, data: edit }));
                setEdit(null);
              }}
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
            >
              💾 Save Changes
            </button>
            <button
              onClick={() => setEdit(null)}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <Modal onClose={() => setDeleteId(null)}>
          <div className="mb-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
              ⚠️
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Delete Customer
            </h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this customer? This action cannot
              be undone.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                dispatch(deleteCustomer(deleteId));
                setDeleteId(null);
              }}
              className="flex-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-red-600 hover:to-red-700 hover:shadow-lg"
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => setDeleteId(null)}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Add fadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AllCustomers;

/* COMPONENTS */

const StatCard = ({ title, value, icon, color, trend }) => {
  const colors = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-400 to-orange-600",
  };

  const bgColors = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    orange: "bg-orange-50",
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">{value}</h2>
          {trend && (
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                trend.startsWith("+")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {trend.startsWith("+") ? "↗" : "↘"} {trend}
            </div>
          )}
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bgColors[color]} text-2xl transition-transform group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
      active
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

const StatusBadge = ({ status }) => {
  const isActive = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"}`}></span>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

const Modal = ({ children, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="animate-modalSlideIn w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
    <style>{`
      @keyframes modalSlideIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      .animate-modalSlideIn {
        animation: modalSlideIn 0.2s ease-out;
      }
    `}</style>
  </div>
);