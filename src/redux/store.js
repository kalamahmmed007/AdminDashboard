// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import uiReducer from "./slices/uiSlice";
import stockReducer from "./slices/stockSlice";
import warehouseReducer from "./slices/warehouseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    stock: stockReducer,
    orders: orderReducer,
    warehouses: warehouseReducer,
    ui: uiReducer,
  },
});

export default store;
