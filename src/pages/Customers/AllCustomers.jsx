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

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const pages = Math.ceil(filtered.length / ITEMS);
  const data = filtered.slice((page - 1) * ITEMS, page * ITEMS);

  return (
    <div className="p-6">
      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat title="Total" value={customers.length} />
        <Stat title="Active" value={customers.filter(c => c.status === "active").length} />
        <Stat title="New" value={customers.filter(c => c.isNew).length} />
      </div>

      {/* HEADER */}
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="rounded-xl bg-white shadow ring-1 ring-gray-200">
        {loading ? (
          <p className="p-6">Loading...</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2 text-gray-500">{c.email}</td>
                    <td className="flex justify-center gap-2 px-4 py-2">
                      <button
                        onClick={() => setEdit(c)}
                        className="text-xs text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(c.id)}
                        className="text-xs text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-between p-4">
              <span className="text-sm">Page {page} / {pages}</span>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                <button disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* EDIT MODAL */}
      {edit && (
        <Modal>
          <input
            className="mb-3 w-full border p-2"
            value={edit.name}
            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
          />
          <button
            onClick={() => {
              dispatch(updateCustomer({ id: edit.id, data: edit }));
              setEdit(null);
            }}
            className="btn-primary"
          >
            Save
          </button>
        </Modal>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <Modal>
          <p>Are you sure?</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                dispatch(deleteCustomer(deleteId));
                setDeleteId(null);
              }}
              className="btn-danger"
            >
              Delete
            </button>
            <button onClick={() => setDeleteId(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AllCustomers;

/* SMALL COMPONENTS */
const Stat = ({ title, value }) => (
  <div className="rounded-xl bg-white p-5 shadow ring-1 ring-gray-200">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const Modal = ({ children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-80 rounded-xl bg-white p-6">{children}</div>
  </div>
);
