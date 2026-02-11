// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsService } from "../../services/products";
import { ProductsAPI } from "../../services/api";

// Async thunks
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params = {}, { rejectWithValue }) => {
        try {
            const res = await ProductsAPI.list(params); // expects { items, total }
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await ProductsAPI.get(id);
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await ProductsAPI.create(payload);
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            const res = await ProductsAPI.update(id, payload);
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await ProductsAPI.delete(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Slice
const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        total: 0,
        current: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrentProduct: (state) => {
            state.current = null;
        },
        clearProducts: (state) => {
            state.items = [];
            state.total = 0;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items ?? action.payload.data ?? [];
                state.total = action.payload.total ?? state.items.length;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetchProductById
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // createProduct
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateProduct
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.items.findIndex((i) => i._id === action.payload._id);
                if (idx >= 0) state.items[idx] = action.payload;
                if (state.current?._id === action.payload._id) state.current = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteProduct
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((i) => i._id !== action.payload);
                if (state.current?._id === action.payload) state.current = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentProduct, clearProducts } = productSlice.actions;

export default productSlice.reducer;
