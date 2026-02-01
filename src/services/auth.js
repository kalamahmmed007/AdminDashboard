// src/services/auth.js
import api from "./api";

export const AuthService = {
    login: ({ email, password }) => api.post("/auth/login", { email, password }),
    logout: () => api.post("/auth/logout"),
    me: () => api.get("/auth/me"),
};

