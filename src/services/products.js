import { ProductsAPI } from "../services/api";

export const ProductsService = {
  list: (params) => ProductsAPI.list(params),          // GET /api/products?search=&page=&limit=
  get: (id) => ProductsAPI.get(id),                     // GET /api/products/:id
  create: (payload) => ProductsAPI.create(payload),         // POST /api/products
  update: (id, payload) => ProductsAPI.update(id, payload), // PUT /api/products/:id
  delete: (id) => ProductsAPI.delete(id),              // DELETE /api/products/:id
  bulkDelete: (ids) => ProductsAPI.bulkDelete(ids),
  bulkUpdateStatus: (ids, status) => ProductsAPI.bulkUpdateStatus(ids, status),
};
