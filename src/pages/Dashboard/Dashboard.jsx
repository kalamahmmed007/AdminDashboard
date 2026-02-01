import React, { useState, useEffect } from "react";
import {
  TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign,
  Package, CheckCircle, Clock, AlertCircle, ArrowUpRight,
  ArrowDownRight, MoreVertical, RefreshCw, Server, Info, 
  Zap, CreditCard, Target, Award, Wifi, WifiOff
} from 'react-icons/fi';
import { 
  FaInstagram, FaFacebook, FaTwitter, FaLinkedin,
  FaMobileAlt, FaLaptop, FaHeadphones, FaTabletAlt, FaClock
} from 'react-icons/fa';
import { MdWatch } from 'react-icons/md';
import { AiOutlineLineChart } from 'react-icons/ai';
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
  const API_BASE_URL = 'https://api.yourdomain.com'; // আপনার API URL এখানে দিন
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
      // Fetch all data in parallel
      const [
        kpiRes,
        salesTrendRes,
        salesBreakdownRes,
        topProductsRes,
        platformsRes,
        salesTeamRes,
        recentOrdersRes,
        tasksRes,
        statsRes
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

      // Parse all responses
      const [
        kpiData,
        salesTrend,
        salesBreakdown,
        topProducts,
        platforms,
        salesTeam,
        recentOrders,
        tasks,
        stats
      ] = await Promise.all([
        kpiRes.json(),
        salesTrendRes.json(),
        salesBreakdownRes.json(),
        topProductsRes.json(),
        platformsRes.json(),
        salesTeamRes.json(),
        recentOrdersRes.json(),
        tasksRes.json(),
        statsRes.json()
      ]);

      // Update state with fetched data
      setDashboardData({
        kpiData,
        salesTrend,
        salesBreakdown,
        topProducts,
        platforms,
        salesTeam,
        recentOrders,
        tasks,
        stats
      });

      setLastUpdate(new Date());
      setIsOnline(true);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
      setIsOnline(false);
      
      // Use mock data as fallback
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
        { name: 'iPhone 15 Pro', icon: 'FaMobileAlt', revenue: 45200, growth: 12.5, stock: 'In Stock', color: '#3b82f6' },
        { name: 'MacBook Air M2', icon: 'FaLaptop', revenue: 38900, growth: 8.3, stock: 'In Stock', color: '#8b5cf6' },
        { name: 'AirPods Pro', icon: 'FaHeadphones', revenue: 22400, growth: -2.1, stock: 'Low Stock', color: '#ec4899' },
        { name: 'iPad Pro', icon: 'FaTabletAlt', revenue: 19800, growth: 15.7, stock: 'In Stock', color: '#6366f1' },
        { name: 'Apple Watch', icon: 'MdWatch', revenue: 16300, growth: 5.2, stock: 'Out of Stock', color: '#f59e0b' }
      ],
      platforms: [
        { name: 'Instagram', icon: 'FaInstagram', revenue: 12450, growth: 18.2, color: '#e1306c' },
        { name: 'Facebook', icon: 'FaFacebook', revenue: 8920, growth: -3.5, color: '#1877f2' },
        { name: 'Twitter', icon: 'FaTwitter', revenue: 15680, growth: 25.4, color: '#1da1f2' },
        { name: 'LinkedIn', icon: 'FaLinkedin', revenue: 5230, growth: 12.1, color: '#0a66c2' }
      ],
      salesTeam: [
        { name: 'Sarah Johnson', sales: 48200, kpi: 95, growth: 12.5, deals: 24, avatar: 'SJ' },
        { name: 'Mike Chen', sales: 42800, kpi: 88, growth: 8.3, deals: 21, avatar: 'MC' },
        { name: 'Emily Davis', sales: 39500, kpi: 82, growth: -2.1, deals: 18, avatar: 'ED' },
        { name: 'James Wilson', sales: 36200, kpi: 78, growth: 15.7, deals: 19, avatar: 'JW' }
      ],
      recentOrders: [
        { id: '#ORD-2451', customer: 'John Doe', amount: 245, status: 'Completed', time: '2 min ago', icon: 'CheckCircle' },
        { id: '#ORD-2452', customer: 'Jane Smith', amount: 189, status: 'Processing', time: '5 min ago', icon: 'Clock' },
        { id: '#ORD-2453', customer: 'Bob Johnson', amount: 432, status: 'Pending', time: '12 min ago', icon: 'AlertCircle' },
        { id: '#ORD-2454', customer: 'Alice Brown', amount: 156, status: 'Completed', time: '18 min ago', icon: 'CheckCircle' }
      ],
      tasks: [
        { title: 'Review new supplier contracts', priority: 'high', time: 'Due in 2 hours', icon: 'AlertCircle' },
        { title: 'Approve inventory purchase orders', priority: 'medium', time: 'Due today', icon: 'Package' },
        { title: 'Update product descriptions', priority: 'low', time: 'Due tomorrow', icon: 'Info' },
        { title: 'Customer feedback analysis', priority: 'medium', time: 'Due in 3 days', icon: 'Users' }
      ],
      stats: {
        refunds: 23,
        supportTickets: 12,
        approvals: 8
      }
    });
  };

  // Icon mapping for React Icons
  const iconMap = {
    FaMobileAlt, FaLaptop, FaHeadphones, FaTabletAlt, MdWatch,
    FaInstagram, FaFacebook, FaTwitter, FaLinkedin,
    CheckCircle, Clock, AlertCircle, Package, Info, Users
  };

  const getIcon = (iconName) => {
    return iconMap[iconName] || Package;
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

  const KPICard = ({ title, value, change, icon: Icon, trend, bgColor, iconColor }) => (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div className={`p-3 rounded-xl ${bgColor} shadow-md`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {change}%
        </div>
      </div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">{title}</h3>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="flex items-center gap-2 text-gray-600">
              {isOnline ? (
                <>
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span>Real-time data synchronization active</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span>Using cached data (offline mode)</span>
                </>
              )}
            </p>
            {error && (
              <p className="mt-1 text-sm text-red-600">⚠️ {error}</p>
            )}
          </div>
          <button 
            onClick={fetchDashboardData}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Syncing...' : 'Sync Data'}
          </button>
        </div>

        {/* Top KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard 
            title="Today's Sales" 
            value={`$${dashboardData.kpiData.todaySales.toLocaleString()}`} 
            change={12.5} 
            icon={DollarSign} 
            trend="up"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <KPICard 
            title="Total Orders" 
            value={dashboardData.kpiData.totalOrders.toLocaleString()} 
            change={8.2} 
            icon={ShoppingCart} 
            trend="up"
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <KPICard 
            title="Total Revenue" 
            value={`$${dashboardData.kpiData.totalRevenue.toLocaleString()}`} 
            change={15.3} 
            icon={CreditCard} 
            trend="up"
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <KPICard 
            title="New Customers" 
            value={dashboardData.kpiData.newCustomers} 
            change={2.4} 
            icon={Users} 
            trend="down"
            bgColor="bg-red-100"
            iconColor="text-red-600"
          />
          <KPICard 
            title="Profit / Loss" 
            value={`$${dashboardData.kpiData.profitLoss.toLocaleString()}`} 
            change={18.7} 
            icon={Target} 
            trend="up"
            bgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
          <KPICard 
            title="Growth %" 
            value={`${dashboardData.kpiData.growthPercent}%`} 
            change={5.2} 
            icon={Award} 
            trend="up"
            bgColor="bg-pink-100"
            iconColor="text-pink-600"
          />
        </div>

        {/* Main Analytics Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Sales & Orders Trend
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={dashboardData.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <DollarSign className="h-6 w-6 text-green-600" />
              Monthly Revenue
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dashboardData.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="revenue" fill="#10b981" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sales Breakdown */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Package className="h-6 w-6 text-purple-600" />
              Sales Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie 
                  data={dashboardData.salesBreakdown} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={70} 
                  outerRadius={100} 
                  paddingAngle={5} 
                  dataKey="value"
                >
                  {dashboardData.salesBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {dashboardData.salesBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full shadow-md" style={{ backgroundColor: item.color }}></div>
                    <span className="font-semibold text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl lg:col-span-2">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <ShoppingCart className="h-6 w-6 text-pink-600" />
              Recent Orders
            </h3>
            <div className="space-y-3">
              {dashboardData.recentOrders.map((order, idx) => {
                const OrderIcon = getIcon(order.icon);
                return (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-transparent p-4 transition-all hover:border-blue-200 hover:bg-blue-50">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg ${
                        order.status === 'Completed' ? 'bg-green-500' :
                        order.status === 'Processing' ? 'bg-blue-500' :
                        'bg-orange-500'
                      }`}>
                        <OrderIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${order.amount.toFixed(2)}</p>
                      <div className="mt-1 flex items-center justify-end gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-xs text-gray-500">{order.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Award className="h-6 w-6 text-orange-600" />
            Top Selling Products
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">Growth</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700">Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.topProducts.map((product, idx) => {
                  const ProductIcon = getIcon(product.icon);
                  return (
                    <tr key={idx} className="border-b border-gray-100 transition-all hover:bg-blue-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="rounded-xl p-3 shadow-lg" style={{ backgroundColor: product.color }}>
                            <ProductIcon className="h-6 w-6 text-white" />
                          </div>
                          <span className="text-lg font-bold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-xl font-bold text-gray-900">${product.revenue.toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <div className={`flex items-center gap-2 font-bold ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                          <span className="text-lg">{Math.abs(product.growth)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          product.stock === 'In Stock' ? 'bg-green-100 text-green-700' :
                          product.stock === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Performance & Sales Team */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Zap className="h-6 w-6 text-yellow-600" />
              Platform Performance
            </h3>
            <div className="space-y-4">
              {dashboardData.platforms.map((platform, idx) => {
                const PlatformIcon = getIcon(platform.icon);
                return (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-transparent p-5 transition-all hover:border-blue-200 hover:bg-blue-50">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl p-4 shadow-lg" style={{ backgroundColor: platform.color }}>
                        <PlatformIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{platform.name}</p>
                        <p className="text-sm font-semibold text-gray-600">${platform.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 font-bold text-lg ${platform.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {platform.growth >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                      {Math.abs(platform.growth)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Users className="h-6 w-6 text-indigo-600" />
              Sales Team Performance
            </h3>
            <div className="space-y-4">
              {dashboardData.salesTeam.map((member, idx) => (
                <div key={idx} className="rounded-xl border border-transparent p-5 transition-all hover:border-blue-200 hover:bg-blue-50">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{member.name}</p>
                        <p className="text-sm font-semibold text-gray-600">{member.deals} deals closed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${member.sales.toLocaleString()}</p>
                      <div className={`text-sm font-bold ${member.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {member.growth >= 0 ? '+' : ''}{member.growth}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="h-3 rounded-full bg-blue-600 transition-all duration-500" 
                        style={{ width: `${member.kpi}%` }}
                      ></div>
                    </div>
                    <span className="min-w-[45px] text-sm font-bold text-gray-700">{member.kpi}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks & Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Tasks & Todo
              </h3>
              <button className="rounded-lg px-4 py-2 text-sm font-bold text-blue-600 transition-all hover:bg-blue-50 hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {dashboardData.tasks.map((task, idx) => {
                const TaskIcon = getIcon(task.icon);
                return (
                  <div key={idx} className="flex items-center gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-blue-200 hover:bg-blue-50">
                    <input type="checkbox" className="h-6 w-6 cursor-pointer rounded-lg border-2 border-gray-300" />
                    <TaskIcon className={`h-6 w-6 ${
                      task.priority === 'high' ? 'text-red-600' :
                      task.priority === 'medium' ? 'text-orange-600' :
                      'text-gray-600'
                    }`} />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{task.title}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-sm font-semibold text-gray-600">{task.time}</span>
                      </div>
                    </div>
                    <button className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-900">Refunds</h4>
                <AlertCircle className="h-7 w-7 text-red-600" />
              </div>
              <p className="mb-2 text-4xl font-extrabold text-red-600">{dashboardData.stats.refunds}</p>
              <p className="text-sm font-semibold text-gray-700">Pending review</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-900">Support Tickets</h4>
                <FaClock className="h-7 w-7 text-blue-600" />
              </div>
              <p className="mb-2 text-4xl font-extrabold text-blue-600">{dashboardData.stats.supportTickets}</p>
              <p className="text-sm font-semibold text-gray-700">Open tickets</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-900">Approvals</h4>
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
              <p className="mb-2 text-4xl font-extrabold text-green-600">{dashboardData.stats.approvals}</p>
              <p className="text-sm font-semibold text-gray-700">Pending approval</p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="rounded-xl border border-gray-200 bg-blue-600 p-6 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <RefreshCw className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
                <div>
                  <p className="text-sm font-semibold text-blue-100">Last Updated</p>
                  <p className="text-lg font-bold">{getTimeSinceUpdate()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Server className="h-6 w-6" />
                  <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-100">Server Status</p>
                  <p className="text-lg font-bold">{isOnline ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Info className="h-6 w-6" />
                <div>
                  <p className="text-sm font-semibold text-blue-100">Version</p>
                  <p className="text-lg font-bold">v2.4.1</p>
                </div>
              </div>
            </div>
            <button 
              onClick={fetchDashboardData}
              disabled={isRefreshing}
              className="rounded-xl bg-white px-6 py-3 font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
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