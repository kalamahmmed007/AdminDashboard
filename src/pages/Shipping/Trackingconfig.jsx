import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackingConfig } from "../../redux/slices/shippingSlice";

const TrackingConfig = () => {
  const dispatch = useDispatch();
  const config = useSelector(s => s.shipping.trackingConfig || {});

  useEffect(()=>{ dispatch(fetchTrackingConfig()) }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Tracking Config</h1>
      <div className="rounded-xl bg-white p-4 shadow">
        {Object.keys(config).length === 0 ? (
          <p className="text-gray-500">No tracking config found.</p>
        ) : (
          <ul className="space-y-2">
            {Object.entries(config).map(([key,value])=>(
              <li key={key} className="rounded border p-3 hover:bg-gray-50">
                <p className="font-medium">{key}</p>
                <p className="text-sm text-gray-500">{value}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TrackingConfig;
