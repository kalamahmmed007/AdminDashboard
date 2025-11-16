// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Package, Users, BarChart2, Settings, Mail, LogOut } from 'lucide-react';
import { logout } from '../utils/logout';

const menuItems = [
  { to: '/', label: 'Dashboard', icon: <Home size={20} /> },
  {
    label: 'Orders',
    icon: <ShoppingCart size={20} />,
    subMenu: [
      { to: '/orders/all', label: 'All Orders' },
      { to: '/orders/pending', label: 'Pending' },
      { to: '/orders/completed', label: 'Completed' },
      { to: '/orders/canceled', label: 'Canceled' },
      { to: '/orders/returns', label: 'Returns' },
    ],
  },
  {
    label: 'Products',
    icon: <Package size={20} />,
    subMenu: [
      { to: '/products/all', label: 'All Products' },
      { to: '/products/add', label: 'Add Product' },
      {
        label: 'Categories',
        subMenu: [
          { to: '/products/categories/electronics', label: 'Electronics' },
          { to: '/products/categories/clothing', label: 'Clothing' },
          { to: '/products/categories/accessories', label: 'Accessories' },
        ],
      },
      { to: '/products/tags', label: 'Tags' },
      { to: '/products/inventory', label: 'Inventory' },
    ],
  },
  {
    label: 'Users',
    icon: <Users size={20} />,
    subMenu: [
      { to: '/users/all', label: 'All Customers' },
      { to: '/users/add', label: 'Add Customer' },
      { to: '/users/groups', label: 'Groups' },
      { to: '/users/roles', label: 'Roles & Permissions' },
    ],
  },
  {
    label: 'Analytics',
    icon: <BarChart2 size={20} />,
    subMenu: [
      { to: '/analytics/sales', label: 'Sales Reports' },
      { to: '/analytics/customers', label: 'Customer Reports' },
      { to: '/analytics/products', label: 'Product Reports' },
      { to: '/analytics/revenue', label: 'Revenue Analysis' },
    ],
  },
  {
    label: 'Marketing',
    icon: <Mail size={20} />,
    subMenu: [
      { to: '/marketing/coupons', label: 'Coupons' },
      { to: '/marketing/email', label: 'Email Campaigns' },
      { to: '/marketing/banners', label: 'Banners' },
    ],
  },
  { to: '/settings', label: 'Settings', icon: <Settings size={20} /> },

  // LOGOUT (special)
  { label: 'Logout', icon: <LogOut size={20} /> },
];

const SidebarItem = ({ item, loc }) => {
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;
  const isActive = item.to && (loc.pathname === item.to || loc.pathname.startsWith(item.to));

  // Auto open submenu on route change
  const [open, setOpen] = useState(
    hasSubMenu && item.subMenu.some(sub => sub.to && loc.pathname.startsWith(sub.to))
  );

  useEffect(() => {
    if (hasSubMenu) {
      setOpen(item.subMenu.some(sub => sub.to && loc.pathname.startsWith(sub.to)));
    }
  }, [loc.pathname]);

  // 🔥 Special Case: Logout Button
  if (item.label === 'Logout') {
    return (
      <button
        onClick={logout}
        className="flex w-full items-center gap-2 rounded-md p-2 text-left text-red-600 transition hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900"
      >
        {item.icon}
        <span className="flex-1">Logout</span>
      </button>
    );
  }

  return (
    <div>
      {!hasSubMenu ? (
        <Link
          to={item.to}
          className={`flex items-center gap-2 p-2 rounded-md transition 
            ${isActive
              ? 'bg-sky-100 dark:bg-sky-900 font-semibold text-sky-700 dark:text-sky-300'
              : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
        >
          {item.icon}
          <span className="flex-1">{item.label}</span>
        </Link>
      ) : (
        <div>
          <div
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition
            ${open
                ? 'bg-slate-200 dark:bg-slate-700 font-medium'
                : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            <span>{open ? '▾' : '▸'}</span>
          </div>
          {open && (
            <div className="ml-6 mt-1 space-y-1">
              {item.subMenu.map((sub, idx) =>
                sub.subMenu ? (
                  <SidebarItem key={idx} item={sub} loc={loc} />
                ) : (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    className={`block p-2 rounded-md text-sm 
                    ${loc.pathname === sub.to || loc.pathname.startsWith(sub.to)
                        ? 'bg-sky-100 dark:bg-sky-900 font-semibold text-sky-700 dark:text-sky-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                  >
                    {sub.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({ open = true, setOpen }) {
  const loc = useLocation();

  if (!open) return null;

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4 dark:border-slate-700">
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          eCommerce Admin
        </h1>
        <button
          onClick={() => setOpen(o => !o)}
          className="rounded p-1 transition hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          ☰
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item, idx) => (
          <SidebarItem key={idx} item={item} loc={loc} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        v1.0.0
      </div>
    </aside>
  );
}
