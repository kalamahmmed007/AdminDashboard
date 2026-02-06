import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices, addInvoice, updateInvoice, deleteInvoice } from "../../redux/slices/salesSlice";

const Invoices = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(s=>s.sales.invoices || []);

  const [newItem,setNewItem]=useState({ number:"", total:"" });
  const [edit,setEdit]=useState(null);
  const [del,setDel]=useState(null);

  useEffect(()=>{ dispatch(fetchInvoices()) },[dispatch]);

  return(
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Invoices</h1>

      {/* ADD */}
      <div className="mb-4 flex gap-2">
        <input placeholder="Invoice #" className="rounded border px-3 py-2" value={newItem.number} onChange={e=>setNewItem({...newItem,number:e.target.value})}/>
        <input placeholder="Total" type="number" className="rounded border px-3 py-2" value={newItem.total} onChange={e=>setNewItem({...newItem,total:e.target.value})}/>
        <button className="rounded bg-blue-600 px-4 text-white" onClick={()=>{dispatch(addInvoice(newItem)); setNewItem({number:"", total:""})}}>Add</button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow">
        {invoices.length===0?<p className="text-gray-500">No invoices.</p>:(
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Invoice #</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(i=>(
                <tr key={i.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{i.number}</td>
                  <td className="p-3">${i.total}</td>
                  <td className="flex justify-center gap-2 p-3">
                    <button className="text-xs text-blue-600" onClick={()=>setEdit(i)}>Edit</button>
                    <button className="text-xs text-red-600" onClick={()=>setDel(i.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {edit && (
        <Modal>
          <input className="mb-2 w-full border p-2" value={edit.number} onChange={e=>setEdit({...edit,number:e.target.value})}/>
          <input type="number" className="mb-2 w-full border p-2" value={edit.total} onChange={e=>setEdit({...edit,total:e.target.value})}/>
          <button className="btn-primary" onClick={()=>{dispatch(updateInvoice({id:edit.id,data:edit})); setEdit(null)}}>Save</button>
        </Modal>
      )}

      {del && (
        <Modal>
          <p>Delete this invoice?</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-danger" onClick={()=>{dispatch(deleteInvoice(del)); setDel(null)}}>Delete</button>
            <button onClick={()=>setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}

    </div>
  )
}

export default Invoices;

const Modal = ({children})=>(<div className="fixed inset-0 flex items-center justify-center bg-black/40"><div className="w-96 rounded-xl bg-white p-6">{children}</div></div>);
