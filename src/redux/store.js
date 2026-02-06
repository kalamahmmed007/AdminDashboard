// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import uiReducer from "./slices/uiSlice";
import stockReducer from "./slices/stockSlice";
import warehouseReducer from "./slices/warehouseSlice";
import taskReducer from "./slices/taskSlice";
import visitorReducer from "./slices/visitorSlice";
import custmonersReducer from "./slices/customerSlice";
import groupReducer from "./slices/customerGroupSlice";
import supportReducer from "./slices/supportSlice";
import shippingReducer from "./slices/shippingSlice";
import abandonedCartReducer from "./slices/abandonedCartSlice";
import salesReducer from "./slices/salesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    stock: stockReducer,
    orders: orderReducer,
    warehouses: warehouseReducer,
    tasks: taskReducer,
    ui: uiReducer,
    visitors: visitorReducer,
    customers: custmonersReducer,
    support: supportReducer,
    sales: salesReducer,
    shipping: shippingReducer,
    customerGroups: groupReducer,
    abandonedCarts: abandonedCartReducer,
  },
});

export default store;
