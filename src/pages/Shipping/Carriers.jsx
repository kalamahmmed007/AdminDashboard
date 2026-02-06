import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarriers } from "../../redux/slices/shippingSlice";

const Carriers = () => {
  const dispatch = useDispatch();
  const carriers = useSelector(s => s.shipping.carriers || []);

  useEffect(()=>{ dispatch(fetchCarriers()) }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Carriers</h1>
      <div className="rounded-xl bg-white p-4 shadow">
        {carriers.length === 0 ? <p className="text-gray-500">No carriers found.</p> : (
          <ul className="space-y-2">
            {carriers.map(c=>(
              <li key={c.id} className="rounded border p-3 hover:bg-gray-50">
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Carriers;
