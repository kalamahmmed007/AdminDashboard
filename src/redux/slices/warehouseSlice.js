// src/redux/slices/warehouseSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  warehouses: [
    { id: "1", name: "Main Warehouse" },
    { id: "2", name: "Secondary Warehouse" },
    { id: "3", name: "Remote Warehouse" },
  ],
};

// Create slice
const warehouseSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {
    addWarehouse: (state, action) => {
      // action.payload = { id, name }
      state.warehouses.push(action.payload);
    },
    removeWarehouse: (state, action) => {
      // action.payload = id
      state.warehouses = state.warehouses.filter(
        (wh) => wh.id !== action.payload
      );
    },
  },
});

// Selector
export const selectWarehouses = (state) => state.warehouses.warehouses;

// Actions
export const { addWarehouse, removeWarehouse } = warehouseSlice.actions;

// Reducer
export default warehouseSlice.reducer;
