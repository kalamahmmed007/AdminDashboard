import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoyalty, addLoyalty, updateLoyalty, deleteLoyalty } from "../../redux/slices/salesSlice";

const LoyaltyPrograms = () => {
  const dispatch = useDispatch();
  const loyalty = useSelector(s=>s.sales.loyalty || []);

  const [newItem,setNewItem]=useState({name:"", points:""});
  const [edit,setEdit]=useState(null);
  const [del,setDel]=useState(null);

  useEffect(()=>{ dispatch(fetchLoyalty()) },[dispatch]);

  return(
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Loyalty Programs</h1>
      <div className="mb-4 flex gap-2">
        <input placeholder="Program Name" className="rounded border px-3 py-2" value={newItem.name} onChange={e=>setNewItem({...newItem,name:e.target.value})}/>
        <input placeholder="Points" type="number" className="rounded border px-3 py-2" value={newItem.points} onChange={e=>setNewItem({...newItem,points:e.target.value})}/>
        <button className="rounded bg-blue-600 px-4 text-white" onClick={()=>{dispatch(addLoyalty(newItem)); setNewItem({name:"",points:""})}}>Add</button>
      </div>
      <div className="rounded-xl bg-white p-4 shadow">
        {loyalty.length===0?<p className="text-gray-500">No loyalty programs.</p>:(
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Points</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loyalty.map(l=>(
                <tr key={l.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{l.name}</td>
                  <td className="p-3">{l.points}</td>
                  <td className="flex justify-center gap-2 p-3">
                    <button className="text-xs text-blue-600" onClick={()=>setEdit(l)}>Edit</button>
                    <button className="text-xs text-red-600" onClick={()=>setDel(l.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {edit && (
        <Modal>
          <input className="mb-2 w-full border p-2" value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})}/>
          <input type="number" className="mb-2 w-full border p-2" value={edit.points} onChange={e=>setEdit({...edit,points:e.target.value})}/>
          <button className="btn-primary" onClick={()=>{dispatch(updateLoyalty({id:edit.id,data:edit})); setEdit(null)}}>Save</button>
        </Modal>
      )}

      {del && (
        <Modal>
          <p>Delete this loyalty program?</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-danger" onClick={()=>{dispatch(deleteLoyalty(del)); setDel(null)}}>Delete</button>
            <button onClick={()=>setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}

    </div>
  )
}

export default LoyaltyPrograms;

const Modal = ({children})=>(<div className="fixed inset-0 flex items-center justify-center bg-black/40"><div className="w-96 rounded-xl bg-white p-6">{children}</div></div>);
