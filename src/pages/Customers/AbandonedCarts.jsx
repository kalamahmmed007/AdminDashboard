import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbandonedCarts, deleteAbandonedCart } from "../../redux/slices/abandonedCartSlice";

const AbandonedCarts = () => {
  const dispatch = useDispatch();
  const carts = useSelector(s => s.abandonedCarts.carts || []);

  const [del, setDel] = useState(null);

  useEffect(() => {
    dispatch(fetchAbandonedCarts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Abandoned Carts</h1>

      <div className="rounded-xl bg-white p-4 shadow">
        {carts.length === 0 ? (
          <p className="text-gray-500">No abandoned carts.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {carts.map(c => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{c.customer}</td>
                  <td className="p-3">
                    {c.items.map(i => i.name).join(", ")}
                  </td>
                  <td className="p-3">${c.total.toFixed(2)}</td>
                  <td className="flex justify-center gap-2 p-3">
                    <button className="text-xs text-red-600" onClick={()=>setDel(c.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* DELETE MODAL */}
      {del && (
        <Modal>
          <p>Delete this abandoned cart?</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-danger" onClick={()=>{dispatch(deleteAbandonedCart(del)); setDel(null)}}>Delete</button>
            <button onClick={()=>setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default AbandonedCarts;

const Modal = ({children}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-96 rounded-xl bg-white p-6">{children}</div>
  </div>
)
