// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersService } from "../../../src/services/orders";
import { OrdersAPI } from "../../services/api";
// thunks
export const fetchOrders = createAsyncThunk("orders/fetch", async (params, { rejectWithValue }) => {
    try {
        const res = await OrdersAPI.list(params);
        // ensure consistent shape
        return { items: res.data.items ?? res.data, total: res.data.total ?? (res.data.items?.length ?? res.data.length ?? 0) };
    } catch (e) {
        return rejectWithValue(e.response?.data || e.message);
    }
});

export const fetchOrder = createAsyncThunk("orders/fetchOne", async (id, { rejectWithValue }) => {
    try {
        const res = await OrdersAPI.get(id);
        return res.data;
    } catch (e) {
        return rejectWithValue(e.response?.data || e.message);
    }
});

export const createOrder = createAsyncThunk("orders/create", async (payload, { rejectWithValue }) => {
    try {
        const res = await OrdersAPI.create(payload);
        return res.data;
    } catch (e) {
        return rejectWithValue(e.response?.data || e.message);
    }
});

export const updateOrder = createAsyncThunk("orders/update", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const res = await OrdersAPI.update(id, payload);
        return res.data;
    } catch (e) {
        return rejectWithValue(e.response?.data || e.message);
    }
});

// slice
const orderSlice = createSlice({
    name: "orders",
    initialState: {
        items: [],
        total: 0,
        current: null,
        loading: false,
        error: null,
        meta: { page: 1, limit: 10, filters: {} },
    },
    reducers: {
        setMeta(state, action) {
            state.meta = { ...state.meta, ...action.payload };
        },
        clearCurrent(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(fetchOrders.fulfilled, (s, a) => { s.loading = false; s.items = a.payload.items; s.total = a.payload.total; })
            .addCase(fetchOrders.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

            .addCase(fetchOrder.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(fetchOrder.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
            .addCase(fetchOrder.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

            .addCase(createOrder.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(createOrder.fulfilled, (s, a) => { s.loading = false; s.items.unshift(a.payload); s.total += 1; })
            .addCase(createOrder.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

            .addCase(updateOrder.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(updateOrder.fulfilled, (s, a) => {
                s.loading = false;
                s.items = s.items.map(i => (i._id === a.payload._id || i.id === a.payload.id) ? a.payload : i);
                if (s.current && (s.current._id === a.payload._id || s.current.id === a.payload.id)) s.current = a.payload;
            })
            .addCase(updateOrder.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
    },
});

export const { setMeta, clearCurrent } = orderSlice.actions;
export default orderSlice.reducer;
