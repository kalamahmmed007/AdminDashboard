import React, { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, AreaChart, Area
} from 'recharts';

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState(null);
  
  // State for all dashboard data
  const [dashboardData, setDashboardData] = useState({
    kpiData: {
      todaySales: 0,
      totalOrders: 0,
      totalRevenue: 0,
      newCustomers: 0,
      profitLoss: 0,
      growthPercent: 0
    },
    salesTrend: [],
    salesBreakdown: [],
    topProducts: [],
    platforms: [],
    salesTeam: [],
    recentOrders: [],
    tasks: [],
    stats: {
      refunds: 0,
      supportTickets: 0,
      approvals: 0
    }
  });

  // API configuration
  const API_BASE_URL = 'https://api.yourdomain.com';
  const API_ENDPOINTS = {
    kpi: '/api/dashboard/kpi',
    salesTrend: '/api/dashboard/sales-trend',
    salesBreakdown: '/api/dashboard/sales-breakdown',
    topProducts: '/api/dashboard/top-products',
    platforms: '/api/dashboard/platforms',
    salesTeam: '/api/dashboard/sales-team',
    recentOrders: '/api/dashboard/recent-orders',
    tasks: '/api/dashboard/tasks',
    stats: '/api/dashboard/stats'
  };

  // Fetch data from API
  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      const [
        kpiRes, salesTrendRes, salesBreakdownRes, topProductsRes,
        platformsRes, salesTeamRes, recentOrdersRes, tasksRes, statsRes
      ] = await Promise.all([
        fetch(`${API_BASE_URL}${API_ENDPOINTS.kpi}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.salesTrend}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.salesBreakdown}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.topProducts}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.platforms}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.salesTeam}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.recentOrders}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.tasks}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.stats}`)
      ]);

      const [
        kpiData, salesTrend, salesBreakdown, topProducts,
        platforms, salesTeam, recentOrders, tasks, stats
      ] = await Promise.all([
        kpiRes.json(), salesTrendRes.json(), salesBreakdownRes.json(),
        topProductsRes.json(), platformsRes.json(), salesTeamRes.json(),
        recentOrdersRes.json(), tasksRes.json(), statsRes.json()
      ]);

      setDashboardData({
        kpiData, salesTrend, salesBreakdown, topProducts,
        platforms, salesTeam, recentOrders, tasks, stats
      });

      setLastUpdate(new Date());
      setIsOnline(true);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
      setIsOnline(false);
      loadMockData();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Mock data for development/testing
  const loadMockData = () => {
    setDashboardData({
      kpiData: {
        todaySales: 12426,
        totalOrders: 1245,
        totalRevenue: 89542,
        newCustomers: 342,
        profitLoss: 23456,
        growthPercent: 24.8
      },
      salesTrend: [
        { month: 'Jan', sales: 4200, orders: 120, revenue: 12000 },
        { month: 'Feb', sales: 3800, orders: 98, revenue: 15000 },
        { month: 'Mar', sales: 5100, orders: 145, revenue: 18000 },
        { month: 'Apr', sales: 6200, orders: 178, revenue: 22000 },
        { month: 'May', sales: 5800, orders: 165, revenue: 19000 },
        { month: 'Jun', sales: 7200, orders: 210, revenue: 25000 }
      ],
      salesBreakdown: [
        { name: 'Electronics', value: 35, color: '#3b82f6' },
        { name: 'Clothing', value: 25, color: '#8b5cf6' },
        { name: 'Food', value: 20, color: '#ec4899' },
        { name: 'Books', value: 12, color: '#f59e0b' },
        { name: 'Other', value: 8, color: '#10b981' }
      ],
      topProducts: [
        { name: 'iPhone 15 Pro', icon: '📱', revenue: 45200, growth: 12.5, stock: 'In Stock', color: '#3b82f6' },
        { name: 'MacBook Air M2', icon: '💻', revenue: 38900, growth: 8.3, stock: 'In Stock', color: '#8b5cf6' },
        { name: 'AirPods Pro', icon: '🎧', revenue: 22400, growth: -2.1, stock: 'Low Stock', color: '#ec4899' },
        { name: 'iPad Pro', icon: '📱', revenue: 19800, growth: 15.7, stock: 'In Stock', color: '#6366f1' },
        { name: 'Apple Watch', icon: '⌚', revenue: 16300, growth: 5.2, stock: 'Out of Stock', color: '#f59e0b' }
      ],
      platforms: [
        { name: 'Instagram', icon: '📷', revenue: 12450, growth: 18.2, color: '#e1306c' },
        { name: 'Facebook', icon: '👥', revenue: 8920, growth: -3.5, color: '#1877f2' },
        { name: 'Twitter', icon: '🐦', revenue: 15680, growth: 25.4, color: '#1da1f2' },
        { name: 'LinkedIn', icon: '💼', revenue: 5230, growth: 12.1, color: '#0a66c2' }
      ],
      salesTeam: [
        { name: 'Sarah Johnson', sales: 48200, kpi: 95, growth: 12.5, deals: 24, avatar: 'SJ' },
        { name: 'Mike Chen', sales: 42800, kpi: 88, growth: 8.3, deals: 21, avatar: 'MC' },
        { name: 'Emily Davis', sales: 39500, kpi: 82, growth: -2.1, deals: 18, avatar: 'ED' },
        { name: 'James Wilson', sales: 36200, kpi: 78, growth: 15.7, deals: 19, avatar: 'JW' }
      ],
      recentOrders: [
        { id: '#ORD-2451', customer: 'John Doe', amount: 245, status: 'Completed', time: '2 min ago' },
        { id: '#ORD-2452', customer: 'Jane Smith', amount: 189, status: 'Processing', time: '5 min ago' },
        { id: '#ORD-2453', customer: 'Bob Johnson', amount: 432, status: 'Pending', time: '12 min ago' },
        { id: '#ORD-2454', customer: 'Alice Brown', amount: 156, status: 'Completed', time: '18 min ago' }
      ],
      tasks: [
        { title: 'Review new supplier contracts', priority: 'high', time: 'Due in 2 hours' },
        { title: 'Approve inventory purchase orders', priority: 'medium', time: 'Due today' },
        { title: 'Update product descriptions', priority: 'low', time: 'Due tomorrow' },
        { title: 'Customer feedback analysis', priority: 'medium', time: 'Due in 3 days' }
      ],
      stats: {
        refunds: 23,
        supportTickets: 12,
        approvals: 8
      }
    });
  };

  // Initial data load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getTimeSinceUpdate = () => {
    const seconds = Math.floor((new Date() - lastUpdate) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  };

  const KPICard = ({ title, value, change, icon, trend }) => (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-3xl">{icon}</div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
          trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {trend === 'up' ? '↑' : '↓'} {change}%
        </div>
      </div>
      <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>
          <button 
            onClick={fetchDashboardData}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            {isRefreshing ? 'Syncing...' : 'Sync Data'}
          </button>
        </div>

        {/* Top KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard 
            title="Today's Sales" 
            value={`$${dashboardData.kpiData.todaySales.toLocaleString()}`} 
            change={12.5} 
            icon="💰" 
            trend="up"
          />
          <KPICard 
            title="Total Orders" 
            value={dashboardData.kpiData.totalOrders.toLocaleString()} 
            change={8.2} 
            icon="🛒" 
            trend="up"
          />
          <KPICard 
            title="Total Revenue" 
            value={`$${dashboardData.kpiData.totalRevenue.toLocaleString()}`} 
            change={15.3} 
            icon="💳" 
            trend="up"
          />
          <KPICard 
            title="New Customers" 
            value={dashboardData.kpiData.newCustomers} 
            change={2.4} 
            icon="👥" 
            trend="down"
          />
          <KPICard 
            title="Profit / Loss" 
            value={`$${dashboardData.kpiData.profitLoss.toLocaleString()}`} 
            change={18.7} 
            icon="🎯" 
            trend="up"
          />
          <KPICard 
            title="Growth %" 
            value={`${dashboardData.kpiData.growthPercent}%`} 
            change={5.2} 
            icon="📈" 
            trend="up"
          />
        </div>

        {/* Main Analytics Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              📊 Sales & Orders Trend
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={dashboardData.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                <Area type="monotone" dataKey="orders" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              💵 Monthly Revenue
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dashboardData.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sales Breakdown */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              📦 Sales Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie 
                  data={dashboardData.salesBreakdown} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={90} 
                  paddingAngle={5} 
                  dataKey="value"
                >
                  {dashboardData.salesBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2">
              {dashboardData.salesBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded p-2 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg lg:col-span-2">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              🛍️ Recent Orders
            </h3>
            <div className="space-y-3">
              {dashboardData.recentOrders.map((order, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-all hover:border-blue-200 hover:bg-blue-50">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${
                      order.status === 'Completed' ? 'bg-green-100' :
                      order.status === 'Processing' ? 'bg-blue-100' :
                      'bg-yellow-100'
                    }`}>
                      {order.status === 'Completed' ? '✓' : order.status === 'Processing' ? '⏱️' : '⚠️'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${order.amount.toFixed(2)}</p>
                    <div className="mt-1 flex items-center justify-end gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
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
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
            🏆 Top Selling Products
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Growth</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.topProducts.map((product, idx) => (
                  <tr key={idx} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{product.icon}</div>
                        <span className="font-semibold text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-lg font-bold text-gray-900">${product.revenue.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <div className={`flex items-center gap-1 font-medium ${
                        product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.growth >= 0 ? '↑' : '↓'}
                        <span>{Math.abs(product.growth)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock === 'In Stock' ? 'bg-green-100 text-green-700' :
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
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              ⚡ Platform Performance
            </h3>
            <div className="space-y-3">
              {dashboardData.platforms.map((platform, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-all hover:border-blue-200 hover:bg-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{platform.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900">{platform.name}</p>
                      <p className="text-sm text-gray-600">${platform.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 font-medium ${
                    platform.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {platform.growth >= 0 ? '↑' : '↓'} {Math.abs(platform.growth)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              👨‍💼 Sales Team Performance
            </h3>
            <div className="space-y-4">
              {dashboardData.salesTeam.map((member, idx) => (
                <div key={idx} className="rounded-lg border border-gray-100 p-4 transition-all hover:border-blue-200 hover:bg-blue-50">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.deals} deals closed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${member.sales.toLocaleString()}</p>
                      <p className={`text-sm font-medium ${
                        member.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {member.growth >= 0 ? '+' : ''}{member.growth}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="h-2 rounded-full bg-blue-600 transition-all duration-500" 
                        style={{ width: `${member.kpi}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{member.kpi}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks & Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                ✓ Tasks & Todo
              </h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {dashboardData.tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 transition-all hover:border-blue-200 hover:bg-blue-50">
                  <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-sm text-gray-600">{task.time}</span>
                    </div>
                  </div>
                  <button className="rounded p-2 hover:bg-gray-100">⋮</button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Refunds</h4>
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-3xl font-bold text-red-600">{dashboardData.stats.refunds}</p>
              <p className="mt-1 text-sm text-gray-600">Pending review</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Support Tickets</h4>
                <span className="text-2xl">🎫</span>
              </div>
              <p className="text-3xl font-bold text-blue-600">{dashboardData.stats.supportTickets}</p>
              <p className="mt-1 text-sm text-gray-600">Open tickets</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Approvals</h4>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{dashboardData.stats.approvals}</p>
              <p className="mt-1 text-sm text-gray-600">Pending approval</p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className={isRefreshing ? 'animate-spin text-xl' : 'text-xl'}>🔄</span>
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Updated</p>
                  <p className="font-semibold text-gray-900">{getTimeSinceUpdate()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative text-xl">
                  🖥️
                  <span className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Server Status</p>
                  <p className="font-semibold text-gray-900">{isOnline ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">ℹ️</span>
                <div>
                  <p className="text-sm font-medium text-gray-600">Version</p>
                  <p className="font-semibold text-gray-900">v2.4.1</p>
                </div>
              </div>
            </div>
            <button 
              onClick={fetchDashboardData}
              disabled={isRefreshing}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;