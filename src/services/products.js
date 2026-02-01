// src/services/products.js
import api from "./api";

export const ProductsService = {
  list: (params) => api.get("/products", { params }),          // GET /api/products?search=&page=&limit=
  get: (id) => api.get(`/products/${id}`),                     // GET /api/products/:id
  create: (payload) => api.post("/products", payload),         // POST /api/products
  update: (id, payload) => api.put(`/products/${id}`, payload), // PUT /api/products/:id
  delete: (id) => api.delete(`/products/${id}`),              // DELETE /api/products/:id
  bulkDelete: (ids) => api.post("/products/bulk-delete", { ids }),
  bulkUpdateStatus: (ids, status) => api.post("/products/bulk-update-status", { ids, status }),
};
