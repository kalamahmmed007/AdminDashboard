import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShippingZones, addShippingZone, updateShippingZone, deleteShippingZone } from "../../redux/slices/shippingSlice";

const ShippingZones = () => {
  const dispatch = useDispatch();
  const zones = useSelector(s => s.shipping.zones || []);

  const [newZone, setNewZone] = useState({name:"", description:""});
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  useEffect(()=>{ dispatch(fetchShippingZones()) }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Shipping Zones</h1>

      {/* ADD */}
      <div className="mb-4 flex gap-2">
        <input placeholder="Zone Name" className="rounded border px-3 py-2" value={newZone.name} onChange={e=>setNewZone({...newZone, name:e.target.value})}/>
        <input placeholder="Description" className="rounded border px-3 py-2" value={newZone.description} onChange={e=>setNewZone({...newZone, description:e.target.value})}/>
        <button className="rounded bg-blue-600 px-4 text-white" onClick={()=>{dispatch(addShippingZone(newZone)); setNewZone({name:"", description:""})}}>Add</button>
      </div>

      {/* TABLE */}
      <div className="rounded-xl bg-white p-4 shadow">
        {zones.length === 0 ? <p className="text-gray-500">No zones found.</p> : (
          <ul className="space-y-2">
            {zones.map(z => (
              <li key={z.id} className="flex items-center justify-between rounded border p-3 hover:bg-gray-50">
                <div>
                  <p className="font-medium">{z.name}</p>
                  <p className="text-sm text-gray-500">{z.description}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600" onClick={()=>setEdit(z)}>Edit</button>
                  <button className="text-xs text-red-600" onClick={()=>setDel(z.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* EDIT MODAL */}
      {edit && (
        <Modal>
          <input className="mb-2 w-full border p-2" value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})}/>
          <input className="mb-2 w-full border p-2" value={edit.description} onChange={e=>setEdit({...edit,description:e.target.value})}/>
          <button className="btn-primary" onClick={()=>{dispatch(updateShippingZone({id:edit.id,data:edit})); setEdit(null)}}>Save</button>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {del && (
        <Modal>
          <p>Delete this zone?</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-danger" onClick={()=>{dispatch(deleteShippingZone(del)); setDel(null)}}>Delete</button>
            <button onClick={()=>setDel(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ShippingZones;

const Modal = ({children}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-96 rounded-xl bg-white p-6">{children}</div>
  </div>
);
