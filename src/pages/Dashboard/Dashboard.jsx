// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Filter, MoreHorizontal } from "lucide-react";
import {
  TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign,
  Package, CheckCircle, Clock, AlertCircle, ArrowUpRight,
  ArrowDownRight, Instagram, Facebook, Globe, MoreVertical,
  RefreshCw, Server, Info
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const salesTrendData = [
    { month: 'Jan', sales: 4200, orders: 120 },
    { month: 'Feb', sales: 3800, orders: 98 },
    { month: 'Mar', sales: 5100, orders: 145 },
    { month: 'Apr', sales: 6200, orders: 178 },
    { month: 'May', sales: 5800, orders: 165 },
    { month: 'Jun', sales: 7200, orders: 210 }
  ];

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 19000 },
    { month: 'Jun', revenue: 25000 }
  ];

  const salesBreakdownData = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Clothing', value: 25, color: '#8b5cf6' },
    { name: 'Food', value: 20, color: '#ec4899' },
    { name: 'Books', value: 12, color: '#10b981' },
    { name: 'Other', value: 8, color: '#f59e0b' }
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', image: '📱', revenue: '$45,200', growth: 12.5, stock: 'In Stock' },
    { name: 'MacBook Air M2', image: '💻', revenue: '$38,900', growth: 8.3, stock: 'In Stock' },
    { name: 'AirPods Pro', image: '🎧', revenue: '$22,400', growth: -2.1, stock: 'Low Stock' },
    { name: 'iPad Pro', image: '📱', revenue: '$19,800', growth: 15.7, stock: 'In Stock' },
    { name: 'Apple Watch', image: '⌚', revenue: '$16,300', growth: 5.2, stock: 'Out of Stock' }
  ];

  const platforms = [
    { name: 'Instagram', icon: Instagram, revenue: '$12,450', growth: 18.2, color: 'bg-pink-500' },
    { name: 'Facebook', icon: Facebook, revenue: '$8,920', growth: -3.5, color: 'bg-blue-600' },
    { name: 'Google', icon: Globe, revenue: '$15,680', growth: 25.4, color: 'bg-red-500' },
    { name: 'Dribbble', icon: Globe, revenue: '$5,230', growth: 12.1, color: 'bg-purple-500' }
  ];

  const salesTeam = [
    { name: 'Sarah Johnson', sales: '$48,200', kpi: 95, growth: 12.5, deals: 24 },
    { name: 'Mike Chen', sales: '$42,800', kpi: 88, growth: 8.3, deals: 21 },
    { name: 'Emily Davis', sales: '$39,500', kpi: 82, growth: -2.1, deals: 18 },
    { name: 'James Wilson', sales: '$36,200', kpi: 78, growth: 15.7, deals: 19 }
  ];

  const recentOrders = [
    { id: '#ORD-2451', customer: 'John Doe', amount: '$245.00', status: 'Completed', time: '2 min ago' },
    { id: '#ORD-2452', customer: 'Jane Smith', amount: '$189.00', status: 'Processing', time: '5 min ago' },
    { id: '#ORD-2453', customer: 'Bob Johnson', amount: '$432.00', status: 'Pending', time: '12 min ago' },
    { id: '#ORD-2454', customer: 'Alice Brown', amount: '$156.00', status: 'Completed', time: '18 min ago' }
  ];

  const tasks = [
    { title: 'Review new supplier contracts', priority: 'high', time: 'Due in 2 hours' },
    { title: 'Approve inventory purchase orders', priority: 'medium', time: 'Due today' },
    { title: 'Update product descriptions', priority: 'low', time: 'Due tomorrow' },
    { title: 'Customer feedback analysis', priority: 'medium', time: 'Due in 3 days' }
  ];

  const KPICard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {change}%
        </div>
      </div>
      <h3 className="mb-1 text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Top KPI Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard title="Today's Sales" value="$12,426" change={12.5} icon={DollarSign} trend="up" />
          <KPICard title="Total Orders" value="1,245" change={8.2} icon={ShoppingCart} trend="up" />
          <KPICard title="Total Revenue" value="$89,542" change={15.3} icon={TrendingUp} trend="up" />
          <KPICard title="New Customers" value="342" change={-2.4} icon={Users} trend="down" />
          <KPICard title="Profit / Loss" value="$23,456" change={18.7} icon={DollarSign} trend="up" />
          <KPICard title="Growth %" value="24.8%" change={5.2} icon={TrendingUp} trend="up" />
        </div>

        {/* Main Analytics Charts */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Sales & Orders Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sales Breakdown */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Sales Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={salesBreakdownData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {salesBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {salesBreakdownData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Orders</h3>
            <div className="space-y-3">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Selling Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Growth</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{product.image}</span>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900">{product.revenue}</td>
                    <td className="px-4 py-4">
                      <div className={`flex items-center gap-1 ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        <span className="font-semibold">{Math.abs(product.growth)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock === 'In Stock' ? 'bg-green-100 text-green-700' :
                        product.stock === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Performance & Sales Team */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Platform Performance</h3>
            <div className="space-y-4">
              {platforms.map((platform, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${platform.color}`}>
                      <platform.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{platform.name}</p>
                      <p className="text-sm text-gray-600">{platform.revenue}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 font-semibold ${platform.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {platform.growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(platform.growth)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Sales Team Performance</h3>
            <div className="space-y-4">
              {salesTeam.map((member, idx) => (
                <div key={idx} className="rounded-lg p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 font-semibold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.deals} deals closed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{member.sales}</p>
                      <div className={`text-sm font-semibold ${member.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {member.growth >= 0 ? '+' : ''}{member.growth}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${member.kpi}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{member.kpi}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks & Quick Stats */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tasks & Todo</h3>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50">
                  <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-gray-600">{task.time}</span>
                    </div>
                  </div>
                  <button className="rounded-lg p-2 hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Refunds</h4>
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">23</p>
              <p className="text-sm text-gray-600">Pending review</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Support Tickets</h4>
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Open tickets</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Approvals</h4>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Pending approval</p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-semibold text-gray-900">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Server Status</p>
                  <p className="font-semibold text-green-600">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Version</p>
                  <p className="font-semibold text-gray-900">v2.4.1</p>
                </div>
              </div>
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700">
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;