import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API base
const API = "http://localhost:5000/api/shipping";

/* THUNKS */
export const fetchShippingZones = createAsyncThunk("shipping/zones", async () => (await fetch(`${API}/zones`)).json());
export const addShippingZone = createAsyncThunk("shipping/zones/add", async (data) => (await fetch(`${API}/zones`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(data) })).json());
export const updateShippingZone = createAsyncThunk("shipping/zones/update", async ({id, data}) => { await fetch(`${API}/zones/${id}`, { method:"PUT", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(data) }); return {id, data}; });
export const deleteShippingZone = createAsyncThunk("shipping/zones/delete", async (id) => { await fetch(`${API}/zones/${id}`, {method:"DELETE"}); return id; });

export const fetchDeliveryMethods = createAsyncThunk("shipping/deliveryMethods", async () => (await fetch(`${API}/delivery-methods`)).json());
export const fetchCarriers = createAsyncThunk("shipping/carriers", async () => (await fetch(`${API}/carriers`)).json());
export const fetchTrackingConfig = createAsyncThunk("shipping/trackingConfig", async () => (await fetch(`${API}/tracking-config`)).json());

const shippingSlice = createSlice({
  name: "shipping",
  initialState: { zones: [], deliveryMethods: [], carriers: [], trackingConfig: {} },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShippingZones.fulfilled, (state, action) => { state.zones = action.payload })
      .addCase(addShippingZone.fulfilled, (state, action) => { state.zones.push(action.payload) })
      .addCase(updateShippingZone.fulfilled, (state, action) => { state.zones = state.zones.map(z => z.id === action.payload.id ? {...z, ...action.payload.data} : z) })
      .addCase(deleteShippingZone.fulfilled, (state, action) => { state.zones = state.zones.filter(z => z.id !== action.payload) })
      .addCase(fetchDeliveryMethods.fulfilled, (state, action) => { state.deliveryMethods = action.payload })
      .addCase(fetchCarriers.fulfilled, (state, action) => { state.carriers = action.payload })
      .addCase(fetchTrackingConfig.fulfilled, (state, action) => { state.trackingConfig = action.payload });
  },
});

export default shippingSlice.reducer;
