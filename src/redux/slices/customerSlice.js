import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCustomersAPI,
  updateCustomerAPI,
  deleteCustomerAPI,
} from "../../services/customerService";

export const fetchCustomers = createAsyncThunk(
  "customers/fetch",
  fetchCustomersAPI
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }) => {
    await updateCustomerAPI(id, data);
    return { id, data };
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id) => {
    await deleteCustomerAPI(id);
    return id;
  }
);




const customerSlice = createSlice({
  name: "customers",
  initialState: { customers: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.map((c) =>
          c.id === action.payload.id
            ? { ...c, ...action.payload.data }
            : c
        );
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export default customerSlice.reducer;
