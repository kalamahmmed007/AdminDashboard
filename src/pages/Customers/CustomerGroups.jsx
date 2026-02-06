import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroups,
  addGroup,
  updateGroup,
  deleteGroup,
} from "../../redux/slices/customerGroupSlice";

const CustomerGroups = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((s) => s.customerGroups);

  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Customer Groups</h1>

      {/* ADD */}
      <div className="mb-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New group name"
          className="rounded border px-3 py-2"
        />
        <button
          onClick={() => {
            dispatch(addGroup({ name }));
            setName("");
          }}
          className="rounded bg-blue-600 px-4 text-white"
        >
          Add
        </button>
      </div>

      {/* TABLE */}
      <div className="rounded-xl bg-white shadow ring-1 ring-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Group</th>
              <th className="p-3">Customers</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="p-3">{g.name}</td>
                <td className="p-3 text-center">{g.customers}</td>
                <td className="flex justify-center gap-3 p-3">
                  <button
                    onClick={() => setEdit(g)}
                    className="text-xs text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDel(g.id)}
                    className="text-xs text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {edit && (
        <Modal>
          <input
            className="mb-3 w-full border p-2"
            value={edit.name}
            onChange={(e) =>
              setEdit({ ...edit, name: e.target.value })
            }
          />
          <button
            onClick={() => {
              dispatch(updateGroup({ id: edit.id, data: edit }));
              setEdit(null);
            }}
            className="btn-primary"
          >
            Save
          </button>
        </Modal>
      )}

      {/* DELETE */}
      {del && (
        <Modal>
          <p>Delete this group?</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                dispatch(deleteGroup(del));
                setDel(null);
              }}
              className="btn-danger"
            >
              Delete
            </button>
            <button onClick={() => setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CustomerGroups;

const Modal = ({ children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-80 rounded-xl bg-white p-6">{children}</div>
  </div>
);
