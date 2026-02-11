// src/services/api.js
import axios from "axios";

// ==============================
// BASE CONFIG
// ==============================
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==============================
// AUTH API
// ==============================
export const AuthAPI = {
  login: async (payload) => {
    const res = await api.post("/auth/login", payload);
    // optionally save token
    if (res.data?.token) localStorage.setItem("adminToken", res.data.token);
    return res.data;
  },
  register: async (payload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },
  logout: async () => {
    localStorage.removeItem("adminToken");
  },
  me: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};

// ==============================
// PRODUCTS API
// ==============================
export const ProductsAPI = {
  list: async (params = {}) => {
    const res = await api.get("/products", { params });
    return res.data; // expects { items, total }
  },
  get: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
  create: async (payload) => {
    const res = await api.post("/products", payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await api.put(`/products/${id}`, payload);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};

// ==============================
// ORDERS API
// ==============================
export const OrdersAPI = {
  list: async (params = {}) => {
    const res = await api.get("/orders", { params });
    return res.data;
  },
  get: async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },
  create: async (payload) => {
    const res = await api.post("/orders", payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await api.put(`/orders/${id}`, payload);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/orders/${id}`);
    return res.data;
  },
};

// ==============================
// USERS API
// ==============================
export const UsersAPI = {
  getMe: async () => {
    const res = await api.get("/users/me");
    return res.data;
  },
  updateMe: async (payload) => {
    const res = await api.put("/users/me", payload);
    return res.data;
  },
  list: async (params = {}) => {
    const res = await api.get("/users", { params });
    return res.data;
  },
  get: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
  create: async (payload) => {
    const res = await api.post("/users", payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await api.put(`/users/${id}`, payload);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};