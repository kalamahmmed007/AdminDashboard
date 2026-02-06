import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReturns, addReturn, updateReturn, deleteReturn } from "../../redux/slices/salesSlice";

const ReturnRequests = () => {
  const dispatch = useDispatch();
  const returns = useSelector(s=>s.sales.returns || []);

  const [newItem,setNewItem] = useState({ orderId:"", reason:"" });
  const [edit,setEdit]=useState(null);
  const [del,setDel]=useState(null);

  useEffect(()=>{ dispatch(fetchReturns()) }, [dispatch]);

  return(
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Return Requests</h1>

      {/* ADD */}
      <div className="mb-4 flex gap-2">
        <input placeholder="Order ID" className="rounded border px-3 py-2" value={newItem.orderId} onChange={e=>setNewItem({...newItem,orderId:e.target.value})}/>
        <input placeholder="Reason" className="rounded border px-3 py-2" value={newItem.reason} onChange={e=>setNewItem({...newItem,reason:e.target.value})}/>
        <button className="rounded bg-blue-600 px-4 text-white" onClick={()=>{dispatch(addReturn(newItem)); setNewItem({orderId:"", reason:""})}}>Add</button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow">
        {returns.length===0 ? <p className="text-gray-500">No return requests.</p> : (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {returns.map(r=>(
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{r.orderId}</td>
                  <td className="p-3">{r.reason}</td>
                  <td className="flex justify-center gap-2 p-3">
                    <button className="text-xs text-blue-600" onClick={()=>setEdit(r)}>Edit</button>
                    <button className="text-xs text-red-600" onClick={()=>setDel(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {edit && (
        <Modal>
          <input className="mb-2 w-full border p-2" value={edit.orderId} onChange={e=>setEdit({...edit,orderId:e.target.value})}/>
          <input className="mb-2 w-full border p-2" value={edit.reason} onChange={e=>setEdit({...edit,reason:e.target.value})}/>
          <button className="btn-primary" onClick={()=>{dispatch(updateReturn({id:edit.id,data:edit})); setEdit(null)}}>Save</button>
        </Modal>
      )}

      {del && (
        <Modal>
          <p>Delete this return request?</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-danger" onClick={()=>{dispatch(deleteReturn(del)); setDel(null)}}>Delete</button>
            <button onClick={()=>setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}

    </div>
  )
}

export default ReturnRequests;

const Modal = ({children})=>(<div className="fixed inset-0 flex items-center justify-center bg-black/40"><div className="w-96 rounded-xl bg-white p-6">{children}</div></div>);
