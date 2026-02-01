// src/services/dashboard.js
import api from "./api";

export const DashboardService = {
    getStats: () => api.get("/dashboard/stats"), // returns todaySales, orders, companyValue
};
