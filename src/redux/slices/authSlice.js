import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthAPI } from "../../services/api";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await AuthAPI.login({ email, password });

      // Save token to localStorage
      localStorage.setItem("userInfo", JSON.stringify(res));

      return res; // { user, token }
    } catch (err) {
      // always return string error
      const message =
        err.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("userInfo"))?.user || null,
  token: JSON.parse(localStorage.getItem("userInfo"))?.token || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
