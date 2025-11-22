// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  ShoppingBag,
  FileText,
  DollarSign,
  Truck,
  Megaphone,
  Package,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const menuData = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, to: '/' },

    {
      id: 'users',
      title: 'Users',
      icon: Users,
      items: [
        { label: 'All Users', to: '/users/all' },
        { label: 'Add User', to: '/users/add' },
        { label: 'Roles & Permissions', to: '/users/roles' },
      ],
    },

    {
      id: 'orders',
      title: 'Orders',
      icon: FileText,
      items: [
        { label: 'All Orders', to: '/orders/all' },
        { label: 'Pending Orders', to: '/orders/pending' },
        { label: 'Completed Orders', to: '/orders/completed' },
        { label: 'New Order', to: '/orders/new' },
        { label: 'Order Details', to: '/orders/detail' },
        { label: 'Edit Order', to: '/orders/edit' },
        { label: 'Order Tracking', to: '/orders/tracking' },
        { label: 'Returns & Refunds', to: '/orders/returns' },
      ],
    },

    {
      id: 'products',
      title: 'Products',
      icon: ShoppingBag,
      items: [
        { label: 'All Products', to: '/products/all' },
        { label: 'Add Product', to: '/products/add' },
        {
          label: 'Categories',
          subItems: [
            { label: 'Electronics', to: '/products/categories/electronics' },
            { label: 'Clothing', to: '/products/categories/clothing' },
            { label: 'Accessories', to: '/products/categories/accessories' },
            { label: 'Brands', to: '/products/categories/brands' },
            { label: 'Attributes (Size, Color etc.)', to: '/products/categories/attributes' }
          ],
        },
        { label: 'Stock Management', to: '/products/stock-management' },
        { label: 'Product Reviews', to: '/products/productreview' },
        { label: 'Tags', to: '/products/tags' },
      ],
    },
    {
      id: 'sales',
      title: 'Sales',
      icon: DollarSign,
      items: [
        { label: 'Discounts', to: '/sales/discounts' },
        { label: 'Gift Cards', to: '/sales/gift-cards' },
        { label: 'Loyalty Programs', to: '/sales/loyalty' },
        { label: 'Affiliates', to: '/sales/affiliates' },
        { label: 'Return Requests', to: '/sales/returns' },
        { label: 'Invoices', to: '/sales/invoices' },
      ],
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: BarChart3,
      items: [
        { label: 'Customer Reports', to: '/analytics/customers' },
        { label: 'Product Reports', to: '/analytics/products' },
        { label: 'Revenue Analysis', to: '/analytics/revenue' },
        { label: 'Sales Report', to: '/analytics/sales' },
      ],
    },

    {
      id: 'marketing',
      title: 'Marketing',
      icon: Megaphone,
      items: [
        { label: 'Coupons', to: '/marketing/coupons' },
        { label: 'Email Campaigns', to: '/marketing/email' },
        { label: 'Banners', to: '/marketing/banners' },
        { label: 'SEO Settings', to: '/marketing/seo' },
        { label: 'Social Media', to: '/marketing/social-media' },
        { label: 'Affiliate Marketing', to: '/marketing/affiliate' },
        { label: 'Ad Campaigns', to: '/marketing/ads' },
        { label: 'Campaigns', to: '/marketing/Campaigns' },
        { label: 'Popups', to: '/marketing/popups' },
        { label: 'Newsletter Email Lists', to: '/marketing/newsletter' }
      ],
    },
    {
      id: 'customers',
      title: 'Customers',
      icon: Package,
      items: [
        { label: 'All Customers', to: '/customers/all' },
        { label: 'Customer Groups', to: '/customers/groups' },
        { label: 'Abandoned Carts', to: '/customers/abandoned-carts' },
        { label: 'Customer Support', to: '/customers/support' },
      ],
    },
    {
      id: 'shipping',
      title: 'Shipping',
      icon: Truck,
      items: [
        { label: 'Shipping Zones', to: '/shipping/zones' },
        { label: 'Delivery Methods', to: '/shipping/delivery-methods' },
        { label: 'Carriers', to: '/shipping/carriers' },
        { label: 'Tracking Config', to: '/shipping/tracking-config' },
      ],
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: ShoppingBag,
      items: [
        { label: 'Stock Levels', to: '/inventory/stock-levels' },
        { label: 'Low Stock Alerts', to: '/inventory/low-stock-alerts' },
        { label: 'Warehouse Management', to: '/inventory/warehouse-management' },
        { label: 'Suppliers', to: '/inventory/suppliers' },
      ],
    },

    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      items: [
        { label: 'Store Settings', to: '/settings/store' },
        { label: 'Payment Methods', to: '/settings/payment-methods' },
        { label: 'Shipping Settings', to: '/settings/shipping' },
        { label: 'Tax Settings', to: '/settings/tax' },
        { label: 'User Management', to: '/settings/user-management' },
        { label: 'Notification Settings', to: '/settings/notifications' },
        { label: 'API Access', to: '/settings/api-access' },
        { label: 'Role Management', to: '/settings/role-management' },
        { label: 'Admin Users', to: '/settings/admin-users' }
      ],
    },

    { id: 'logout', title: 'Logout', icon: LogOut, action: () => console.log('Logout clicked') },
  ];

  const renderItem = (item) => {
    const hasSub = item.items || item.subItems;
    const isExpanded = expanded[item.id];
    const isActive = item.to && location.pathname === item.to;

    if (item.action) {
      return (
        <button
          key={item.id}
          onClick={item.action}
          className="flex w-full items-center gap-2 rounded-lg p-3 text-left text-black transition-colors hover:bg-red-50"
        >
          {item.icon && <item.icon className="h-5 w-5 text-red-600" />}
          {item.title}
        </button>
      );
    }

    if (hasSub) {
      return (
        <div key={item.id} className="mb-1">
          <button
            onClick={() => toggle(item.id)}
            className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors
              ${isExpanded ? 'bg-red-50 text-black' : 'hover:bg-red-50 text-black'}`}
          >
            <span className="flex items-center gap-2">
              {item.icon && <item.icon className="h-5 w-5 text-red-600" />}
              {item.title}
            </span>
            {isExpanded ? <ChevronDown className="h-4 w-4 text-red-600" /> : <ChevronRight className="h-4 w-4 text-red-600" />}
          </button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {(item.items || item.subItems).map((sub, idx) => {
                const subActive = sub.to && location.pathname === sub.to;
                if (sub.subItems) {
                  return (
                    <div key={idx} className="ml-2">
                      <span className="block rounded-lg p-2 pl-4 text-sm font-medium text-black">{sub.label}</span>
                      {sub.subItems.map((s, i) => (
                        <Link
                          key={i}
                          to={s.to}
                          className={`block p-2 pl-6 rounded-lg text-sm text-black hover:bg-red-50 transition-colors ${location.pathname === s.to ? 'bg-red-50' : ''}`}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <Link
                    key={idx}
                    to={sub.to}
                    className={`block p-2 pl-4 rounded-lg text-sm text-black hover:bg-red-50 transition-colors ${subActive ? 'bg-red-50' : ''}`}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.to}
        className={`flex items-center gap-2 p-3 rounded-lg text-black transition-colors ${isActive ? 'bg-red-50' : 'hover:bg-red-50'}`}
      >
        {item.icon && <item.icon className="h-5 w-5 text-red-600" />}
        {item.title}
      </Link>
    );
  };

  return (
    <div className="h-screen w-64 overflow-y-auto border-r border-gray-200 bg-white text-black">
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-red-600">Admin Panel</h1>
      </div>
      <nav className="p-2">{menuData.map((item) => renderItem(item))}</nav>
    </div>
  );
}
