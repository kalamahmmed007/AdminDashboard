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
import AddStock from '../pages/Products/AddStock';
import Productreview from '../pages/Products/Productreview';
import EditTag from '../pages/Products/EditTag';
import AddTag from '../pages/Products/AddTag';

// Customers
import AllCustomers from '../pages/Customers/AllCustomers';
import CustomerGroups from '../pages/Customers/CustomerGroups';
import CustomerSupport from '../pages/Customers/CustomerSupport';
import AbandonedCarts from '../pages/Customers/AbandonedCarts';

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

//sales
import Discounts from "../pages/Sales/Discounts";
import GiftCards from "../pages/Sales/GiftCards";
import LoyaltyPrograms from "../pages/Sales/LoyaltyPrograms";
import Affiliates from "../pages/Sales/Affiliates";
import ReturnRequests from "../pages/Sales/ReturnRequests";
import Invoices from "../pages/Sales/Invoices";

// Marketing
import Coupons from '../pages/Marketing/Coupons';
import EmailCampaign from '../pages/Marketing/EmailCampaign';
import Banners from '../pages/Marketing/Banners';
import AdCampaigns from '../pages/Marketing/Adcampaigns';
import Affilatemarketing from '../pages/Marketing/Affilatemarketing';
import Campaigns from '../pages/Marketing/Campaigns';

// Settings
import Settings from '../pages/Settings';
import ProfileSettings from '../pages/Settings/ProfileSettings';
import StoreSettings from '../pages/Settings/StoreSettings';
import PaymentSettings from '../pages/Settings/PaymentSettings';
import ShippingSettings from '../pages/Settings/ShippingSettings';
import TaxSettings from '../pages/Settings/TaxSettings';
import UserManagement from '../pages/Settings/UserManagement';
import NotificationSettings from '../pages/Settings/NotificationSettings';
import ApiAccessSettings from '../pages/Settings/APIAccess';
import RoleManagementSettings from '../pages/Settings/RoleManagement';
import AdminUsersSettings from '../pages/Settings/AdminUsers';

//Tasks
import AllTasks from '../pages/Tasks/AllTasks';
import AddTask from '../pages/Tasks/AddTask';

// Shipping
import ShippingZones from "../pages/Shipping/Shipingzone"; // Z capital
import DeliveryMethods from "../pages/Shipping/Deleverymethod"; // fixed typo
import Carriers from "../pages/Shipping/Carriers";
import TrackingConfig from "../pages/Shipping/Trackingconfig";





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
                    <Route path="stock-management/add" element={<AddStock />} />
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

                {/*Sales*/}
                <Route path="/sales">
                    <Route path="discounts" element={<Discounts />} />
                    <Route path="gift-cards" element={<GiftCards />} />
                    <Route path="loyalty" element={<LoyaltyPrograms />} />
                    <Route path="affiliates" element={<Affiliates />} />
                    <Route path="returns" element={<ReturnRequests />} />
                    <Route path="invoices" element={<Invoices />} />
               </Route>


                {/* Customers */}
                <Route path="customers" element={<Outlet />}>
                    <Route index element={<AllCustomers />} />
                    <Route path="all" element={<AllCustomers />} />
                    <Route path="groups" element={<CustomerGroups />} />
                    <Route path="support" element={<CustomerSupport />} />
                    <Route path="abandoned-carts" element={<AbandonedCarts />} />
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
                <Route path="settings" element={<Outlet />}>
                    <Route index element={<Settings />} />
                    <Route path="index" element={<Settings />} />
                    <Route path="store" element={<StoreSettings />} />
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="payment-methods" element={<PaymentSettings />} />
                    <Route path="shipping" element={<ShippingSettings />} />
                    <Route path="tax" element={<TaxSettings />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="notifications" element={<NotificationSettings />} />
                    <Route path="api-access" element={<ApiAccessSettings />} />
                    <Route path="roles" element={<RoleManagementSettings />} />
                    <Route path="admin-users" element={<AdminUsersSettings />} />
                </Route>

                {/* Tasks */}
                <Route path="tasks" element={<Outlet />}>
                    <Route index element={<AllTasks />} />
                    <Route path="all" element={<AllTasks />} />
                    <Route path="add" element={<AddTask />} />
                </Route>

                 {/* Shipping */}
                 <Route path="shipping" element={<Outlet />}>
                    <Route path="zones" element={<ShippingZones />} />
                    <Route path="delivery-methods" element={<DeliveryMethods />} />
                    <Route path="carriers" element={<Carriers />} />
                    <Route path="tracking-config" element={<TrackingConfig />} />
                </Route>

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
