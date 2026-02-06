import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTicketsAPI,
  addTicketAPI,
  updateTicketAPI,
  deleteTicketAPI,
} from "../../services/supportService";

export const fetchTickets = createAsyncThunk("support/fetch", fetchTicketsAPI);
export const addTicket = createAsyncThunk("support/add", addTicketAPI);
export const updateTicket = createAsyncThunk(
  "support/update",
  async ({ id, data }) => {
    await updateTicketAPI(id, data);
    return { id, data };
  }
);
export const deleteTicket = createAsyncThunk(
  "support/delete",
  async (id) => {
    await deleteTicketAPI(id);
    return id;
  }
);

const supportSlice = createSlice({
  name: "support",
  initialState: { tickets: [] },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.data } : t
        );
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter(t => t.id !== action.payload);
      });
  },
});

export default supportSlice.reducer;
