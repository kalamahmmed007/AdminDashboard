import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   API CALLS
========================= */

// get all visitors (table)
export const fetchVisitors = createAsyncThunk(
  "visitors/fetchVisitors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/visitors");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch visitors");
    }
  }
);

// get visitor analytics (cards)
export const fetchVisitorStats = createAsyncThunk(
  "visitors/fetchVisitorStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/visitors/stats");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch visitor stats");
    }
  }
);

/* =========================
   SLICE
========================= */

const visitorSlice = createSlice({
  name: "visitors",
  initialState: {
    visitors: [],          // full visitor list
    stats: {
      total: 0,
      today: 0,
      live: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    // socket.io live update
    setLiveVisitors: (state, action) => {
      state.stats.live = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- FETCH VISITORS ---------- */
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.visitors = action.payload;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH STATS ---------- */
      .addCase(fetchVisitorStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVisitorStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchVisitorStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLiveVisitors } = visitorSlice.actions;
export default visitorSlice.reducer;
