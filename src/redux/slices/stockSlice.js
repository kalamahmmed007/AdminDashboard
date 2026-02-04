import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* =========================
   Async Thunks (API Ready)
========================= */

export const addStockAsync = createAsyncThunk(
  "stock/addStockAsync",
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   Initial State
========================= */

const initialState = {
  products: [
    {
      id: 1,
      name: "Wireless Headphones Pro",
      sku: "WHP-001",
      stock: 145,
      reserved: 12,
      threshold: 20,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      sku: "SWS-005",
      stock: 67,
      reserved: 8,
      threshold: 30,
      category: "Electronics",
    },
  ],
  loading: false,
  error: null,
};

/* =========================
   Slice
========================= */

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.stock += quantity;
      }
    },

    removeStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.stock = Math.max(0, product.stock - quantity);
      }
    },

    updateStock: (state, action) => {
      const { productId, stock } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.stock = stock;
      }
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addStockAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStockAsync.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const product = state.products.find(p => p.id === productId);
        if (product) {
          product.stock += quantity;
        }
        state.loading = false;
      })
      .addCase(addStockAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* =========================
   SELECTORS (🔥 THIS FIXES ERROR)
========================= */

export const selectProducts = (state) => state.stock.products;

export const selectCategories = (state) => {
  const categories = state.stock.products.map(p => p.category);
  return [...new Set(categories)];
};

export const selectStockLoading = (state) => state.stock.loading;
export const selectStockError = (state) => state.stock.error;

/* =========================
   Exports
========================= */

export const {
  addStock,
  removeStock,
  updateStock,
  addProduct,
} = stockSlice.actions;

export default stockSlice.reducer;
