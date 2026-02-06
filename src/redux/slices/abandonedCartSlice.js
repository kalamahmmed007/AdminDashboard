import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fake API
const API = "http://localhost:5000/api/abandoned-carts";

export const fetchAbandonedCarts = createAsyncThunk(
  "abandoned/fetch",
  async () => {
    const res = await fetch(API);
    return res.json();
  }
);

export const deleteAbandonedCart = createAsyncThunk(
  "abandoned/delete",
  async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    return id;
  }
);

const abandonedCartSlice = createSlice({
  name: "abandonedCarts",
  initialState: { carts: [] },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAbandonedCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(deleteAbandonedCart.fulfilled, (state, action) => {
        state.carts = state.carts.filter(c => c.id !== action.payload);
      });
  },
});

export default abandonedCartSlice.reducer;
