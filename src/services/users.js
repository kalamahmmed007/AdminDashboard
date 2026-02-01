// src/services/users.js
import api from "./api";

export const UsersService = {
    getCurrent: () => api.get("/users/me"),
    updateProfile: (payload) => api.put("/users/me", payload),
    list: (params) => api.get("/users", { params }),
    get: (id) => api.get(`/users/${id}`),
    create: (payload) => api.post("/users", payload),
    update: (id, payload) => api.put(`/users/${id}`, payload),
    delete: (id) => api.delete(`/users/${id}`),
};
