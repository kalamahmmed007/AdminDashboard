<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign,
  Package, CheckCircle, Clock, AlertCircle, ArrowUpRight,
  ArrowDownRight, Instagram, Facebook, MoreVertical,
  RefreshCw, Server, Info, Zap, Activity, CreditCard,
  Target, Award, Smartphone, Laptop, Headphones, Tablet,
  Watch, Twitter, Linkedin, Youtube, Wifi, WifiOff
} from 'lucide-react';
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
        { name: 'iPhone 15 Pro', icon: 'Smartphone', revenue: 45200, growth: 12.5, stock: 'In Stock', color: 'bg-blue-500' },
        { name: 'MacBook Air M2', icon: 'Laptop', revenue: 38900, growth: 8.3, stock: 'In Stock', color: 'bg-purple-500' },
        { name: 'AirPods Pro', icon: 'Headphones', revenue: 22400, growth: -2.1, stock: 'Low Stock', color: 'bg-pink-500' },
        { name: 'iPad Pro', icon: 'Tablet', revenue: 19800, growth: 15.7, stock: 'In Stock', color: 'bg-indigo-500' },
        { name: 'Apple Watch', icon: 'Watch', revenue: 16300, growth: 5.2, stock: 'Out of Stock', color: 'bg-amber-500' }
      ],
      platforms: [
        { name: 'Instagram', icon: 'Instagram', revenue: 12450, growth: 18.2, color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500' },
        { name: 'Facebook', icon: 'Facebook', revenue: 8920, growth: -3.5, color: 'bg-blue-600' },
        { name: 'Twitter', icon: 'Twitter', revenue: 15680, growth: 25.4, color: 'bg-sky-500' },
        { name: 'LinkedIn', icon: 'Linkedin', revenue: 5230, growth: 12.1, color: 'bg-blue-700' }
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

  // Icon mapping
  const iconMap = {
    Smartphone, Laptop, Headphones, Tablet, Watch,
    Instagram, Facebook, Twitter, Linkedin, Youtube,
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

  const KPICard = ({ title, value, change, icon: Icon, trend, gradient }) => (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${gradient}`}></div>
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className={`p-3 rounded-xl ${trend === 'up' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-gradient-to-br from-rose-400 to-rose-600'} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {change}%
          </div>
        </div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">{title}</h3>
        <p className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-extrabold text-transparent">{value}</p>
      </div>
=======
import React from "react";
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
    { name: 'Electronics', value: 35, color: '#dc2626' },
    { name: 'Clothing', value: 25, color: '#ef4444' },
    { name: 'Food', value: 20, color: '#000000' },
    { name: 'Books', value: 12, color: '#404040' },
    { name: 'Other', value: 8, color: '#737373' }
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', image: '📱', revenue: '$45,200', growth: 12.5, stock: 'In Stock' },
    { name: 'MacBook Air M2', image: '💻', revenue: '$38,900', growth: 8.3, stock: 'In Stock' },
    { name: 'AirPods Pro', image: '🎧', revenue: '$22,400', growth: -2.1, stock: 'Low Stock' },
    { name: 'iPad Pro', image: '📱', revenue: '$19,800', growth: 15.7, stock: 'In Stock' },
    { name: 'Apple Watch', image: '⌚', revenue: '$16,300', growth: 5.2, stock: 'Out of Stock' }
  ];

  const platforms = [
    { name: 'Instagram', icon: Instagram, revenue: '$12,450', growth: 18.2, color: 'bg-red-600' },
    { name: 'Facebook', icon: Facebook, revenue: '$8,920', growth: -3.5, color: 'bg-black' },
    { name: 'Google', icon: Globe, revenue: '$15,680', growth: 25.4, color: 'bg-red-500' },
    { name: 'Dribbble', icon: Globe, revenue: '$5,230', growth: 12.1, color: 'bg-gray-800' }
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
        <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-red-100' : 'bg-gray-100'}`}>
          <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-red-600' : 'text-gray-600'}`} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-red-600' : 'text-gray-600'}`}>
          {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {change}%
        </div>
      </div>
      <h3 className="mb-1 text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-dark mb-4 bg-clip-text text-4xl font-bold">
              Overview
            </h1>
            
            
          </div>
          <button 
            onClick={fetchDashboardData}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
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
            gradient="bg-gradient-to-br from-emerald-50 to-emerald-100"
          />
          <KPICard 
            title="Total Orders" 
            value={dashboardData.kpiData.totalOrders.toLocaleString()} 
            change={8.2} 
            icon={ShoppingCart} 
            trend="up"
            gradient="bg-gradient-to-br from-blue-50 to-blue-100"
          />
          <KPICard 
            title="Total Revenue" 
            value={`$${dashboardData.kpiData.totalRevenue.toLocaleString()}`} 
            change={15.3} 
            icon={CreditCard} 
            trend="up"
            gradient="bg-gradient-to-br from-purple-50 to-purple-100"
          />
          <KPICard 
            title="New Customers" 
            value={dashboardData.kpiData.newCustomers} 
            change={2.4} 
            icon={Users} 
            trend="down"
            gradient="bg-gradient-to-br from-rose-50 to-rose-100"
          />
          <KPICard 
            title="Profit / Loss" 
            value={`$${dashboardData.kpiData.profitLoss.toLocaleString()}`} 
            change={18.7} 
            icon={Target} 
            trend="up"
            gradient="bg-gradient-to-br from-amber-50 to-amber-100"
          />
          <KPICard 
            title="Growth %" 
            value={`${dashboardData.kpiData.growthPercent}%`} 
            change={5.2} 
            icon={Award} 
            trend="up"
            gradient="bg-gradient-to-br from-pink-50 to-pink-100"
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
              <AreaChart data={dashboardData.salesTrend}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
                <Area type="monotone" dataKey="orders" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorOrders)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <DollarSign className="h-6 w-6 text-emerald-600" />
              Monthly Revenue
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dashboardData.salesTrend}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="revenue" fill="url(#barGradient)" radius={[12, 12, 0, 0]} />
=======
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
                <Line type="monotone" dataKey="sales" stroke="#dc2626" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#000000" strokeWidth={2} />
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
                <Bar dataKey="revenue" fill="#dc2626" radius={[8, 8, 0, 0]} />
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
                </div>
              ))}
            </div>
          </div>

<<<<<<< HEAD
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
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-transparent p-4 transition-all hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg ${
                        order.status === 'Completed' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                        order.status === 'Processing' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                        'bg-gradient-to-br from-amber-400 to-amber-600'
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
                          order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-xs text-gray-500">{order.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
=======
          {/* Recent Activity */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Orders</h3>
            <div className="space-y-3">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <ShoppingCart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Completed' ? 'bg-red-100 text-red-700' :
                          order.status === 'Processing' ? 'bg-gray-100 text-gray-700' :
                            'bg-gray-200 text-gray-800'
                        }`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </div>
                  </div>
                </div>
              ))}
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
<<<<<<< HEAD
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Award className="h-6 w-6 text-amber-600" />
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
                    <tr key={idx} className="border-b border-gray-100 transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${product.color} shadow-lg`}>
                            <ProductIcon className="h-6 w-6 text-white" />
                          </div>
                          <span className="text-lg font-bold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-xl font-bold text-gray-900">${product.revenue.toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <div className={`flex items-center gap-2 font-bold ${product.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {product.growth >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                          <span className="text-lg">{Math.abs(product.growth)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          product.stock === 'In Stock' ? 'bg-emerald-100 text-emerald-700' :
                          product.stock === 'Low Stock' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  );
                })}
=======
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
                      <div className={`flex items-center gap-1 ${product.growth >= 0 ? 'text-red-600' : 'text-gray-600'}`}>
                        {product.growth >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        <span className="font-semibold">{Math.abs(product.growth)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock === 'In Stock' ? 'bg-red-100 text-red-700' :
                          product.stock === 'Low Stock' ? 'bg-gray-200 text-gray-800' :
                            'bg-gray-800 text-white'
                        }`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Performance & Sales Team */}
<<<<<<< HEAD
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
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-transparent p-5 transition-all hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-xl ${platform.color} shadow-lg`}>
                        <PlatformIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{platform.name}</p>
                        <p className="text-sm font-semibold text-gray-600">${platform.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 font-bold text-lg ${platform.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
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
                <div key={idx} className="rounded-xl border border-transparent p-5 transition-all hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold text-white shadow-lg">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{member.name}</p>
                        <p className="text-sm font-semibold text-gray-600">{member.deals} deals closed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${member.sales.toLocaleString()}</p>
                      <div className={`text-sm font-bold ${member.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
=======
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
                  <div className={`flex items-center gap-1 font-semibold ${platform.growth >= 0 ? 'text-red-600' : 'text-gray-600'}`}>
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-black font-semibold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.deals} deals closed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{member.sales}</p>
                      <div className={`text-sm font-semibold ${member.growth >= 0 ? 'text-red-600' : 'text-gray-600'}`}>
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
                        {member.growth >= 0 ? '+' : ''}{member.growth}%
                      </div>
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="flex items-center gap-3">
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500" 
                        style={{ width: `${member.kpi}%` }}
                      ></div>
                    </div>
                    <span className="min-w-[45px] text-sm font-bold text-gray-700">{member.kpi}%</span>
=======
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-red-600" style={{ width: `${member.kpi}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{member.kpi}%</span>
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks & Quick Stats */}
<<<<<<< HEAD
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
                  <div key={idx} className="flex items-center gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                    <input type="checkbox" className="h-6 w-6 cursor-pointer rounded-lg border-2 border-gray-300" />
                    <TaskIcon className={`h-6 w-6 ${
                      task.priority === 'high' ? 'text-rose-600' :
                      task.priority === 'medium' ? 'text-amber-600' :
                      'text-gray-600'
                    }`} />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{task.title}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          task.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                          task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
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
=======
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tasks & Todo</h3>
              <button className="text-sm font-semibold text-red-600 hover:text-red-700">View All</button>
            </div>
            <div className="space-y-3">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50">
                  <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-gray-200 text-gray-800' :
                            'bg-gray-100 text-gray-600'
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
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
            </div>
          </div>

          <div className="space-y-4">
<<<<<<< HEAD
            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-rose-50 to-rose-100 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-900">Refunds</h4>
                <AlertCircle className="h-7 w-7 text-rose-600" />
              </div>
              <p className="mb-2 text-4xl font-extrabold text-rose-600">{dashboardData.stats.refunds}</p>
              <p className="text-sm font-semibold text-gray-700">Pending review</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-900">Support Tickets</h4>
                <Clock className="h-7 w-7 text-blue-600" />
              </div>
              <p className="mb-2 text-4xl font-extrabold text-blue-600">{dashboardData.stats.supportTickets}</p>
              <p className="text-sm font-semibold text-gray-700">Open tickets</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-900">Approvals</h4>
                <CheckCircle className="h-7 w-7 text-emerald-600" />
              </div>
              <p className="mb-2 text-4xl font-extrabold text-emerald-600">{dashboardData.stats.approvals}</p>
              <p className="text-sm font-semibold text-gray-700">Pending approval</p>
=======
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Refunds</h4>
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">23</p>
              <p className="text-sm text-gray-600">Pending review</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Support Tickets</h4>
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Open tickets</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Approvals</h4>
                <CheckCircle className="h-5 w-5 text-red-500" />
              </div>
              <p className="mb-1 text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Pending approval</p>
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
            </div>
          </div>
        </div>

        {/* System Info */}
<<<<<<< HEAD
        <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">
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
                  <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
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
=======
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
                <Server className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Server Status</p>
                  <p className="font-semibold text-red-600">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Version</p>
                  <p className="font-semibold text-gray-900">v2.4.1</p>
                </div>
              </div>
            </div>
            <button className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700">
>>>>>>> fcc48b2ee30611b227d3680b43acbcc419f171d6
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;