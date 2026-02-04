// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Layout from '../components/Layout';
import PrivateRoute from './ProtectedRoute';

// Pages
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';

// Users
import AllUsers from '../pages/Users/AllUsers';
import AddUser from '../pages/Users/AddUser';
import Roles from '../pages/Users/Roles';

// Orders
import AllOrders from '../pages/Orders/AllOrders';
import PendingOrders from '../pages/Orders/PendingOrders';
import CompletedOrders from '../pages/Orders/CompletedOrders';
import NewOrderPage from '../pages/Orders/NewOrder';
import OrderDetailPage from '../pages/Orders/OrderDetail';
import EditOrderPage from '../pages/Orders/EditOrder';
import Tracking from '../pages/Orders/Tracking';
import Refunds from '../pages/Orders/Refunds';


// Products
import AllProducts from '../pages/Products/AllProducts';
import AddProduct from '../pages/Products/AddProduct';
import Categories from '../pages/Products/Categories';
import Tags from '../pages/Products/Tags';
import Inventory from '../pages/Products/Inventory';
import StockManagement from '../pages/Products/StockManagement';
import Productreview from '../pages/Products/Productreview';
import EditTag from '../pages/Products/EditTag';
import AddTag from '../pages/Products/AddTag';

// Analytics
import CustomerReports from '../pages/Analytics/CustomerReports';
import ProductReports from '../pages/Analytics/ProductReports';
import RevenueAnalysis from '../pages/Analytics/RevenueAnalysis';
import SalesReport from '../pages/Analytics/SalesReport';

//Inventory
import LowStockAlerts from "../pages/Inventory/lowstockalerts";
import StockLevels from "../pages/Inventory/stocklevels";
import WarehouseManagement from "../pages/Inventory/warehousemanagement";
import Suppliers from '../pages/Inventory/suppliers';
// Marketing
import Coupons from '../pages/Marketing/Coupons';
import EmailCampaign from '../pages/Marketing/EmailCampaign';
import Banners from '../pages/Marketing/Banners';
import AdCampaigns from '../pages/Marketing/Adcampaigns';
import Affilatemarketing from '../pages/Marketing/Affilatemarketing';
import Campaigns from '../pages/Marketing/Campaigns';

// Settings
import Settings from '../pages/Settings';



export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                {/* Dashboard */}
                <Route index element={<Dashboard />} />

                {/* Users */}
                <Route path="users" element={<Outlet />}>
                    <Route index element={<AllUsers />} />
                    <Route path="all" element={<AllUsers />} />
                    <Route path="add" element={<AddUser />} />
                    <Route path="roles" element={<Roles />} />
                </Route>

                {/* Orders */}
                <Route path="orders" element={<Outlet />}>
                    <Route index element={<AllOrders />} />
                    <Route path="all" element={<AllOrders />} />
                    <Route path="pending" element={<PendingOrders />} />
                    <Route path="completed" element={<CompletedOrders />} />
                    <Route path="new" element={<NewOrderPage />} />
                    <Route path="tracking" element={<Tracking />} />
                    <Route path="returns" element={<Refunds />} />
                    {/* Dynamic Routes */}
                    <Route path=":orderId" element={<OrderDetailPage />} />
                    <Route path=":orderId/edit" element={<EditOrderPage />} />
                </Route>

                {/* Products */}
                <Route path="products" element={<Outlet />}>
                    <Route index element={<AllProducts />} />
                    <Route path="all" element={<AllProducts />} />                   
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="categories" element={<Outlet />}>
                        <Route index element={<Categories />} />
                        <Route path="electronics" element={<Categories />} />
                        <Route path="clothing" element={<Categories />} />
                        <Route path="accessories" element={<Categories />} />
                    </Route>
                    <Route path="stock-management" element={<StockManagement />} />
                    <Route path="productreview" element={<Productreview />} />
                    <Route path="tags" element={<Tags />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="tags/edit/:id" element={<EditTag />} />
                    <Route path="tags/add" element={<AddTag />} />
                </Route>

                {/* Analytics */}
                <Route path="analytics" element={<Outlet />}>
                    <Route path="customers" element={<CustomerReports />} />
                    <Route path="products" element={<ProductReports />} />
                    <Route path="revenue" element={<RevenueAnalysis />} />
                    <Route path="sales" element={<SalesReport />} />
                </Route>

                {/* Marketing */}
                <Route path="marketing" element={<Outlet />}>
                    <Route path="coupons" element={<Coupons />} />
                    <Route path="email" element={<EmailCampaign />} />
                    <Route path="banners" element={<Banners />} />
                    <Route path="ad-campaigns" element={<AdCampaigns />} />
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="affiliate-marketing" element={<Affilatemarketing />} />
                </Route>

                {/* Inventory */}
                <Route path="inventory" element={<Outlet />}>
                    <Route path="low-stock-alerts" element={<LowStockAlerts />} />
                    <Route path="stock-levels" element={<StockLevels />} />
                    <Route path="warehouse-management" element={<WarehouseManagement />} />
                    <Route path="suppliers" element={<Suppliers />} />
                </Route>

                {/* Settings */}
                <Route path="settings" element={<Settings />} />

                {/* 404 */}
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
