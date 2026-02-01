// src/services/orders.js
import { OrdersAPI } from "../services/api.js";

export const OrdersService = {
  list: (params) => OrdersAPI.list(params).then((res) => res.data),         // GET /orders
  get: (id) => OrdersAPI.get(id).then((res) => res.data),                  // GET /orders/:id
  create: (payload) => OrdersAPI.create(payload).then((res) => res.data),  // POST /orders
  update: (id, payload) => OrdersAPI.update(id, payload).then((res) => res.data), // PUT /orders/:id
  patchStatus: (id, status) => OrdersAPI.patchStatus(id, status).then((res) => res.data),
  remove: (id) => OrdersAPI.delete(id).then((res) => res.data),           // DELETE /orders/:id
  bulkDelete: (ids) => OrdersAPI.bulkDelete(ids).then((res) => res.data),
  bulkUpdateStatus: (ids, status) => OrdersAPI.bulkUpdateStatus(ids, status).then((res) => res.data),
};
