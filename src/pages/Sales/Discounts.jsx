import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscounts, addDiscount, updateDiscount, deleteDiscount } from "../../redux/slices/salesSlice";

const Discounts = () => {
  const dispatch = useDispatch();
  const discounts = useSelector(s => s.sales.discounts || []);

  const [newItem, setNewItem] = useState({ name: "", amount: "" });
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  useEffect(() => { dispatch(fetchDiscounts()) }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Discounts</h1>

      {/* ADD FORM */}
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Discount Name"
          className="rounded border px-3 py-2"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          placeholder="Amount %"
          type="number"
          className="rounded border px-3 py-2"
          value={newItem.amount}
          onChange={e => setNewItem({ ...newItem, amount: e.target.value })}
        />
        <button
          className="rounded bg-blue-600 px-4 text-white"
          onClick={() => { dispatch(addDiscount(newItem)); setNewItem({ name: "", amount: "" }) }}
        >
          Add
        </button>
      </div>

      {/* TABLE */}
      <div className="rounded-xl bg-white p-4 shadow">
        {discounts.length === 0 ? <p className="text-gray-500">No discounts.</p> : (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map(d => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{d.name}</td>
                  <td className="p-3">{d.amount}%</td>
                  <td className="flex justify-center gap-2 p-3">
                    <button className="text-xs text-blue-600" onClick={() => setEdit(d)}>Edit</button>
                    <button className="text-xs text-red-600" onClick={() => setDel(d.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* EDIT MODAL */}
      {edit && (
        <Modal>
          <input
            className="mb-2 w-full border p-2"
            value={edit.name}
            onChange={e => setEdit({ ...edit, name: e.target.value })}
          />
          <input
            type="number"
            className="mb-2 w-full border p-2"
            value={edit.amount}
            onChange={e => setEdit({ ...edit, amount: e.target.value })}
          />
          <button className="btn-primary" onClick={() => { dispatch(updateDiscount({ id: edit.id, data: edit })); setEdit(null) }}>
            Save
          </button>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {del && (
        <Modal>
          <p>Delete this discount?</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-danger" onClick={() => { dispatch(deleteDiscount(del)); setDel(null) }}>Delete</button>
            <button onClick={() => setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Discounts;

const Modal = ({ children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-96 rounded-xl bg-white p-6">{children}</div>
  </div>
);
