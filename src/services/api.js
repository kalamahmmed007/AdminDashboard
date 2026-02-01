// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// optional: attach auth token
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const OrdersAPI = {
  list: (params) => api.get("/orders", { params }),
  get: (id) => api.get(`/orders/${id}`),
  create: (payload) => api.post("/orders", payload),
  update: (id, payload) => api.put(`/orders/${id}`, payload),
  patchStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  delete: (id) => api.delete(`/orders/${id}`),
  bulkDelete: (ids) => api.post("/orders/bulk-delete", { ids }),
  bulkUpdateStatus: (ids, status) => api.post("/orders/bulk-update-status", { ids, status }),
};

export default api;
