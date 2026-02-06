import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryMethods } from "../../redux/slices/shippingSlice";

const DeliveryMethods = () => {
  const dispatch = useDispatch();
  const methods = useSelector(s => s.shipping.deliveryMethods || []);

  useEffect(()=>{ dispatch(fetchDeliveryMethods()) }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Delivery Methods</h1>
      <div className="rounded-xl bg-white p-4 shadow">
        {methods.length === 0 ? <p className="text-gray-500">No methods found.</p> : (
          <ul className="space-y-2">
            {methods.map(m=>(
              <li key={m.id} className="rounded border p-3 hover:bg-gray-50">
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-500">{m.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DeliveryMethods;
