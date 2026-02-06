import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, addTicket, updateTicket, deleteTicket } from "../../redux/slices/supportSlice";

const CustomerSupport = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector(s => s.support);

  const [newTicket, setNewTicket] = useState({ customer: "", subject: "", message: "" });
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Customer Support</h1>

      {/* ADD TICKET */}
      <div className="mb-4 flex gap-2">
        <input placeholder="Customer" className="rounded border px-3 py-2" value={newTicket.customer} onChange={e => setNewTicket({...newTicket, customer: e.target.value})}/>
        <input placeholder="Subject" className="rounded border px-3 py-2" value={newTicket.subject} onChange={e => setNewTicket({...newTicket, subject: e.target.value})}/>
        <input placeholder="Message" className="rounded border px-3 py-2" value={newTicket.message} onChange={e => setNewTicket({...newTicket, message: e.target.value})}/>
        <button className="rounded bg-blue-600 px-4 text-white" onClick={() => {dispatch(addTicket(newTicket)); setNewTicket({customer:"",subject:"",message:""});}}>Add</button>
      </div>

      {/* TABLE */}
      <div className="rounded-xl bg-white shadow ring-1 ring-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.customer}</td>
                <td className="p-3">{t.subject}</td>
                <td className="p-3 text-center">{t.status}</td>
                <td className="flex justify-center gap-2 p-3">
                  <button className="text-xs text-blue-600" onClick={()=>setEdit(t)}>Edit</button>
                  <button className="text-xs text-red-600" onClick={()=>setDel(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {edit && (
        <Modal>
          <input className="mb-2 w-full border p-2" value={edit.subject} onChange={e=>setEdit({...edit, subject:e.target.value})} />
          <textarea className="mb-2 w-full border p-2" value={edit.message} onChange={e=>setEdit({...edit, message:e.target.value})}/>
          <select className="mb-2 w-full border p-2" value={edit.status} onChange={e=>setEdit({...edit, status:e.target.value})}>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
          <button className="btn-primary" onClick={()=>{dispatch(updateTicket({id:edit.id,data:edit})); setEdit(null)}}>Save</button>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {del && (
        <Modal>
          <p>Delete this ticket?</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-danger" onClick={()=>{dispatch(deleteTicket(del)); setDel(null)}}>Delete</button>
            <button onClick={()=>setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CustomerSupport;

const Modal = ({ children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-96 rounded-xl bg-white p-6">{children}</div>
  </div>
)
