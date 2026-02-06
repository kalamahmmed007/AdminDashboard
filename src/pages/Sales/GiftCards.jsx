import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftCards, addGiftCard, updateGiftCard, deleteGiftCard } from "../../redux/slices/salesSlice";

const GiftCards = () => {
  const dispatch = useDispatch();
  const giftCards = useSelector(s => s.sales.giftCards || []);

  const [newItem, setNewItem] = useState({ code: "", value: "" });
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  useEffect(()=>{ dispatch(fetchGiftCards()) }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Gift Cards</h1>

      {/* ADD FORM */}
      <div className="mb-4 flex gap-2">
        <input placeholder="Code" className="rounded border px-3 py-2" value={newItem.code} onChange={e=>setNewItem({...newItem, code:e.target.value})}/>
        <input placeholder="Value" type="number" className="rounded border px-3 py-2" value={newItem.value} onChange={e=>setNewItem({...newItem, value:e.target.value})}/>
        <button className="rounded bg-blue-600 px-4 text-white" onClick={()=>{dispatch(addGiftCard(newItem)); setNewItem({code:"", value:""})}}>Add</button>
      </div>

      {/* TABLE */}
      <div className="rounded-xl bg-white p-4 shadow">
        {giftCards.length === 0 ? <p className="text-gray-500">No gift cards.</p> : (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Value</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {giftCards.map(g=>(
                <tr key={g.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{g.code}</td>
                  <td className="p-3">${g.value}</td>
                  <td className="flex justify-center gap-2 p-3">
                    <button className="text-xs text-blue-600" onClick={()=>setEdit(g)}>Edit</button>
                    <button className="text-xs text-red-600" onClick={()=>setDel(g.id)}>Delete</button>
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
          <input className="mb-2 w-full border p-2" value={edit.code} onChange={e=>setEdit({...edit, code:e.target.value})}/>
          <input type="number" className="mb-2 w-full border p-2" value={edit.value} onChange={e=>setEdit({...edit, value:e.target.value})}/>
          <button className="btn-primary" onClick={()=>{dispatch(updateGiftCard({id:edit.id, data:edit})); setEdit(null)}}>Save</button>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {del && (
        <Modal>
          <p>Delete this gift card?</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-danger" onClick={()=>{dispatch(deleteGiftCard(del)); setDel(null)}}>Delete</button>
            <button onClick={()=>setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default GiftCards;

const Modal = ({children})=>(<div className="fixed inset-0 flex items-center justify-center bg-black/40"><div className="w-96 rounded-xl bg-white p-6">{children}</div></div>);
