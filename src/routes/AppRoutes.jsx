// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Layout from '../components/Layout';
import PrivateRoute from './ProtectedRoute';

// Pages
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';

// 👥 Users
import AllUsers from '../pages/Users/AllUsers';
import AddUser from '../pages/Users/AddUser';
import Roles from '../pages/Users/Roles';

// 📦 Orders
import AllOrders from '../pages/Orders/AllOrders';
import PendingOrders from '../pages/Orders/PendingOrders';
import CompletedOrders from '../pages/Orders/CompletedOrders';
import NewOrderPage from "../pages/Orders/NewOrder";
import OrderDetailPage from "../pages/Orders/OrderDetail";
import EditOrderPage from "../pages/Orders/EditOrder";

// 🛒 Products
import AllProducts from '../pages/Products/AllProducts';
import AddProduct from '../pages/Products/AddProduct';
import Categories from '../pages/Products/Categories';
import Tags from '../pages/Products/Tags';
import Inventory from '../pages/Products/Inventory';

// 📊 Analytics
import CustomerReports from '../pages/Analytics/CustomerReports';
import ProductReports from '../pages/Analytics/ProductReports';
import RevenueAnalysis from '../pages/Analytics/RevenueAnalysis';
import SalesReport from '../pages/Analytics/SalesReport';

// 🎯 Marketing
import Coupons from '../pages/Marketing/Coupons';
import EmailCampaign from '../pages/Marketing/EmailCampaign';
import Banners from '../pages/Marketing/Banners';

// ⚙️ Settings
import Settings from '../pages/Settings';

export default function AppRoutes() {
    return (
        <Routes>

            {/* 🔐 Login Page (no layout) */}
            <Route path="/login" element={<Login />} />

            {/* 🌐 Protected Routes */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >

                {/* 🏠 Dashboard */}
                <Route index element={<Dashboard />} />

                {/* 👥 Users */}
                <Route path="users" element={<Outlet />}>
                    <Route index element={<AllUsers />} />
                    <Route path="all" element={<AllUsers />} />
                    <Route path="add" element={<AddUser />} />
                    <Route path="roles" element={<Roles />} />
                </Route>

                {/* 📦 Orders */}
                <Route path="orders" element={<Outlet />}>
                    <Route index element={<AllOrders />} />
                    <Route path="all" element={<AllOrders />} />
                    <Route path="pending" element={<PendingOrders />} />
                    <Route path="completed" element={<CompletedOrders />} />
                    <Route path="new" element={<NewOrderPage />} />
                    <Route path=":orderId" element={<OrderDetailPage />} />
                    <Route path=":orderId/edit" element={<EditOrderPage />} />
                </Route>

                {/* 🛒 Products */}
                <Route path="products" element={<Outlet />}>
                    <Route index element={<AllProducts />} />
                    <Route path="all" element={<AllProducts />} />
                    <Route path="add" element={<AddProduct />} />
                    <Route path="categories" element={<Outlet />}>
                        <Route index element={<Categories />} />
                        <Route path="electronics" element={<Categories />} />
                        <Route path="clothing" element={<Categories />} />
                        <Route path="accessories" element={<Categories />} />
                    </Route>
                    <Route path="tags" element={<Tags />} />
                    <Route path="inventory" element={<Inventory />} />
                </Route>

                {/* 📊 Analytics */}
                <Route path="analytics" element={<Outlet />}>
                    <Route path="customers" element={<CustomerReports />} />
                    <Route path="products" element={<ProductReports />} />
                    <Route path="revenue" element={<RevenueAnalysis />} />
                    <Route path="sales" element={<SalesReport />} />
                </Route>

                {/* 🎯 Marketing */}
                <Route path="marketing" element={<Outlet />}>
                    <Route path="coupons" element={<Coupons />} />
                    <Route path="email" element={<EmailCampaign />} />
                    <Route path="banners" element={<Banners />} />
                </Route>

                {/* ⚙️ Settings */}
                <Route path="settings" element={<Settings />} />

                {/* 🚫 404 */}
                <Route
                    path="*"
                    element={
                        <div className="mt-20 text-center text-2xl text-red-500">
                            404 | Page Not Found
                        </div>
                    }
                />
            </Route>
        </Routes>
    );
}
