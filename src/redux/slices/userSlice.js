import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth";
import { UsersService } from "../../services/users";

// Optional: fetch current logged-in user
export const fetchCurrentUser = createAsyncThunk(
    "user/fetchCurrent",
    async (_, { rejectWithValue }) => {
        try {
            const res = await UsersService.getCurrent(); // should return user object
            return res.data ?? res;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Optional: update user profile
export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await UsersService.updateProfile(payload);
            return res.data ?? res;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    current: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.current = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
