import React, { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';

const EnhancedAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  const [dashboardData, setDashboardData] = useState({
    // KPI Stats
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      totalRevenue: 0,
      newCustomers: 0,
      todayRevenue: 0,
      weekRevenue: 0,
      monthRevenue: 0,
      totalDiscounts: 0,
      totalReturns: 0
    },
    
    // Sales Charts
    salesOverview: {
      revenueChart: [],
      ordersChart: [],
      salesByCategory: []
    },
    
    // Recent Orders
    recentOrders: [],
    
    // Customers
    topCustomers: [],
    recentCustomers: [],
    
    // Inventory
    lowStockProducts: [],
    
    // Abandoned Carts
    abandonedCarts: {
      count: 0,
      todayCount: 0,
      weekCount: 0,
      topProducts: []
    },
    
    // Support Tickets
    supportTickets: [],
    
    // Notifications
    systemNotifications: [],
    pendingApprovals: [],
    paymentFailures: [],
    
    // Original data
    revenue: {
      current: 0,
      growth: 0
    },
    growthRate: 0,
    balances: {
      wallet: 0,
      walletEarnings: 0,
      expectedSales: 0,
      expectedEarnings: 0,
      funding: 0,
      fundingEarnings: 0
    },
    traffic: {
      percentage: {
        facebook: 0,
        youtube: 0,
        directSearch: 0
      },
      chartData: []
    },
    revenueChart: [],
    statusCards: {
      revenueStatus: { value: 0, period: '', trend: [] },
      pageView: { value: 0, period: '', trend: [] },
      socialRate: { value: 0, period: '', trend: [] },
      marketStatus: { value: 0, period: '', trend: [] }
    },
    recentActivities: [],
    orderStatus: {
      totalOrders: 0,
      orders: []
    },
    notifications: [],
    performanceMetrics: [],
    topCountries: [],
    revenueByCategory: []
  });

  // API Configuration
  const API_BASE_URL = 'http://localhost:5000';
  
  const API_ENDPOINTS = {
    // KPI Stats
    stats: '/api/dashboard/stats',
    
    // Sales Overview
    salesOverview: '/api/dashboard/sales-overview',
    revenueChart: '/api/dashboard/revenue-chart',
    ordersChart: '/api/dashboard/orders-chart',
    salesByCategory: '/api/dashboard/sales-by-category',
    
    // Orders & Customers
    recentOrders: '/api/dashboard/recent-orders',
    topCustomers: '/api/dashboard/top-customers',
    recentCustomers: '/api/dashboard/recent-customers',
    
    // Inventory & Products
    lowStockProducts: '/api/dashboard/low-stock',
    
    // Abandoned Carts
    abandonedCarts: '/api/dashboard/abandoned-carts',
    
    // Support
    supportTickets: '/api/dashboard/support-tickets',
    
    // Notifications & Alerts
    systemNotifications: '/api/dashboard/notifications',
    pendingApprovals: '/api/dashboard/pending-approvals',
    paymentFailures: '/api/dashboard/payment-failures',
    
    // Additional Data
    traffic: '/api/dashboard/traffic',
    balances: '/api/dashboard/balances',
    activities: '/api/dashboard/activities',
    performanceMetrics: '/api/dashboard/performance',
    topCountries: '/api/dashboard/top-countries'
  };

  // Fetch Dashboard Data from API
  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      // Parallel API calls for better performance
      const [
        statsRes,
        salesOverviewRes,
        recentOrdersRes,
        topCustomersRes,
        recentCustomersRes,
        lowStockRes,
        abandonedCartsRes,
        supportTicketsRes,
        notificationsRes,
        approvalsRes,
        paymentFailuresRes,
        trafficRes,
        balancesRes,
        activitiesRes,
        performanceRes,
        countriesRes
      ] = await Promise.all([
        fetch(`${API_BASE_URL}${API_ENDPOINTS.stats}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Add your auth token
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.salesOverview}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.recentOrders}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.topCustomers}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.recentCustomers}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.lowStockProducts}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.abandonedCarts}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.supportTickets}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.systemNotifications}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.pendingApprovals}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.paymentFailures}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.traffic}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.balances}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.activities}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.performanceMetrics}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.topCountries}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        })
      ]);

      // Check if all responses are OK
      if (!statsRes.ok || !salesOverviewRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      // Parse JSON responses
      const [
        stats,
        salesOverview,
        recentOrders,
        topCustomers,
        recentCustomers,
        lowStockProducts,
        abandonedCarts,
        supportTickets,
        systemNotifications,
        pendingApprovals,
        paymentFailures,
        traffic,
        balances,
        recentActivities,
        performanceMetrics,
        topCountries
      ] = await Promise.all([
        statsRes.json(),
        salesOverviewRes.json(),
        recentOrdersRes.json(),
        topCustomersRes.json(),
        recentCustomersRes.json(),
        lowStockRes.json(),
        abandonedCartsRes.json(),
        supportTicketsRes.json(),
        notificationsRes.json(),
        approvalsRes.json(),
        paymentFailuresRes.json(),
        trafficRes.json(),
        balancesRes.json(),
        activitiesRes.json(),
        performanceRes.json(),
        countriesRes.json()
      ]);

      // Update state with API data
      setDashboardData({
        stats,
        salesOverview,
        recentOrders,
        topCustomers,
        recentCustomers,
        lowStockProducts,
        abandonedCarts,
        supportTickets,
        systemNotifications,
        pendingApprovals,
        paymentFailures,
        traffic,
        balances,
        recentActivities,
        performanceMetrics,
        topCountries,
        
        // Additional data from API
        revenue: stats.revenue || { current: 0, growth: 0 },
        growthRate: stats.growthRate || 0,
        revenueChart: salesOverview.revenueChart || [],
        statusCards: salesOverview.statusCards || {
          revenueStatus: { value: 0, period: '', trend: [] },
          pageView: { value: 0, period: '', trend: [] },
          socialRate: { value: 0, period: '', trend: [] },
          marketStatus: { value: 0, period: '', trend: [] }
        },
        orderStatus: {
          totalOrders: stats.totalOrders || 0,
          orders: recentOrders.slice(0, 5) || []
        },
        notifications: systemNotifications || [],
        revenueByCategory: salesOverview.salesByCategory || []
      });

      console.log('✅ Dashboard data loaded successfully from API');
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      console.log('⚠️ Loading mock data as fallback...');
      loadMockData(); // Fallback to mock data on error
    } finally {
      setIsRefreshing(false);
    }
  };

  // Mock Data (Fallback)
  

  useEffect(() => {
    // Fetch data on component mount
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Manual refresh handler
  const handleManualRefresh = () => {
    fetchDashboardData();
  };

  // Component: KPI Stats Card
  const KPICard = ({ icon, title, value, trend, trendValue, color }) => (
    <div className="overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-xs font-semibold ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '●'} {trendValue}
            </div>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
          color === 'blue' ? 'bg-blue-100' :
          color === 'green' ? 'bg-green-100' :
          color === 'purple' ? 'bg-purple-100' :
          color === 'pink' ? 'bg-pink-100' :
          color === 'yellow' ? 'bg-yellow-100' :
          'bg-gray-100'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const BalanceCard = ({ icon, title, amount, earnings, color }) => (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-lg">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl ${
        color === 'pink' ? 'bg-pink-100' :
        color === 'purple' ? 'bg-purple-100' :
        color === 'blue' ? 'bg-blue-100' :
        'bg-yellow-100'
      }`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-gray-500">{title}</p>
        <p className="truncate text-lg font-bold text-gray-900">{amount}</p>
      </div>
      <div className={`shrink-0 text-xs font-bold ${earnings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {earnings >= 0 ? '▲' : '▼'} {Math.abs(earnings)}%
      </div>
    </div>
  );

  const StatusCard = ({ title, value, period, trend, color, icon }) => (
    <div className={`overflow-hidden rounded-2xl p-4 sm:p-6 text-white shadow-lg transition-all hover:scale-[1.02] ${
      color === 'pink' ? 'bg-gradient-to-br from-pink-400 to-pink-600' :
      color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
      color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
      'bg-gradient-to-br from-orange-400 to-orange-600'
    }`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold opacity-90 sm:text-sm">{title}</h3>
        {icon && <span className="text-xl sm:text-2xl">{icon}</span>}
      </div>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold sm:text-3xl">${value}</span>
        {color === 'blue' && (
          <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">
            Monthly
          </span>
        )}
      </div>
      <p className="mb-3 text-xs opacity-80">{period}</p>
      {trend && (
        <ResponsiveContainer width="100%" height={40}>
          <AreaChart data={trend.map((v, i) => ({ value: v }))}>
            <Area type="monotone" dataKey="value" stroke="white" fill="white" fillOpacity={0.3} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );

  const ActivityItem = ({ title, subtitle, time, icon, color }) => (
    <div className="flex items-center gap-3 py-3">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl ${
        color === 'pink' ? 'bg-pink-100' :
        color === 'purple' ? 'bg-purple-100' :
        color === 'blue' ? 'bg-blue-100' :
        color === 'yellow' ? 'bg-yellow-100' :
        'bg-green-100'
      }`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-gray-900">{title}</p>
        <p className="truncate text-sm text-gray-500">{subtitle}</p>
      </div>
      <p className="shrink-0 text-xs text-gray-400">{time}</p>
    </div>
  );

  // Quick Actions Modal
  const QuickActionsModal = () => (
    showQuickActions && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowQuickActions(false)}>
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            <button onClick={() => setShowQuickActions(false)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 rounded-xl bg-blue-50 p-4 transition-all hover:bg-blue-100">
              <span className="text-3xl">📦</span>
              <span className="text-sm font-semibold text-gray-900">Add Order</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-xl bg-purple-50 p-4 transition-all hover:bg-purple-100">
              <span className="text-3xl">🏷️</span>
              <span className="text-sm font-semibold text-gray-900">Add Product</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-xl bg-green-50 p-4 transition-all hover:bg-green-100">
              <span className="text-3xl">👤</span>
              <span className="text-sm font-semibold text-gray-900">Add Customer</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-xl bg-pink-50 p-4 transition-all hover:bg-pink-100">
              <span className="text-3xl">🧾</span>
              <span className="text-sm font-semibold text-gray-900">Generate Invoice</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-xl bg-yellow-50 p-4 transition-all hover:bg-yellow-100">
              <span className="text-3xl">📊</span>
              <span className="text-sm font-semibold text-gray-900">View Reports</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-xl bg-red-50 p-4 transition-all hover:bg-red-100">
              <span className="text-3xl">⚙️</span>
              <span className="text-sm font-semibold text-gray-900">Settings</span>
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Quick Actions Modal */}
      <QuickActionsModal />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back! Here's what's happening today</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                isRefreshing 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isRefreshing ? '🔄 Refreshing...' : '🔄 Refresh'}
            </button>
            <button 
              onClick={() => setShowQuickActions(true)}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700"
            >
              ⚡ Quick Actions
            </button>
            <button className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'daily' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('daily')}>DAILY</button>
            <button className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'weekly' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('weekly')}>WEEKLY</button>
            <button className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'monthly' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('monthly')}>MONTHLY</button>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard icon="👥" title="Total Users" value={dashboardData.stats.totalUsers.toLocaleString()} trend="up" trendValue="+12.5%" color="blue" />
          <KPICard icon="✅" title="Active Users" value={dashboardData.stats.activeUsers.toLocaleString()} trend="up" trendValue="+8.3%" color="green" />
          <KPICard icon="📦" title="Total Orders" value={dashboardData.stats.totalOrders.toLocaleString()} trend="up" trendValue="+15.2%" color="purple" />
          <KPICard icon="💰" title="Total Revenue" value={`$${dashboardData.stats.totalRevenue.toLocaleString()}`} trend="up" trendValue="+22.4%" color="pink" />
        </div>

        {/* Revenue Summary Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-gradient-to-br from-green-400 to-green-600 p-4 text-white shadow-lg">
            <p className="text-xs font-semibold opacity-90">Today's Revenue</p>
            <p className="mt-1 text-2xl font-bold">${dashboardData.stats.todayRevenue.toLocaleString()}</p>
            <p className="mt-1 text-xs opacity-80">+5.2% from yesterday</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 p-4 text-white shadow-lg">
            <p className="text-xs font-semibold opacity-90">This Week</p>
            <p className="mt-1 text-2xl font-bold">${dashboardData.stats.weekRevenue.toLocaleString()}</p>
            <p className="mt-1 text-xs opacity-80">+8.7% from last week</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 p-4 text-white shadow-lg">
            <p className="text-xs font-semibold opacity-90">This Month</p>
            <p className="mt-1 text-2xl font-bold">${dashboardData.stats.monthRevenue.toLocaleString()}</p>
            <p className="mt-1 text-xs opacity-80">+12.3% from last month</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 p-4 text-white shadow-lg">
            <p className="text-xs font-semibold opacity-90">New Customers</p>
            <p className="mt-1 text-2xl font-bold">{dashboardData.stats.newCustomers}</p>
            <p className="mt-1 text-xs opacity-80">This month</p>
          </div>
        </div>

        {/* Order Status Summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Pending Orders</p>
                <p className="mt-1 text-xl font-bold text-yellow-600">{dashboardData.stats.pendingOrders}</p>
              </div>
              <span className="text-2xl">⏳</span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Completed Orders</p>
                <p className="mt-1 text-xl font-bold text-green-600">{dashboardData.stats.completedOrders}</p>
              </div>
              <span className="text-2xl">✓</span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Discounts</p>
                <p className="mt-1 text-xl font-bold text-orange-600">${dashboardData.stats.totalDiscounts.toLocaleString()}</p>
              </div>
              <span className="text-2xl">🎁</span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Returns</p>
                <p className="mt-1 text-xl font-bold text-red-600">${dashboardData.stats.totalReturns.toLocaleString()}</p>
              </div>
              <span className="text-2xl">↩️</span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Abandoned Carts</p>
                <p className="mt-1 text-xl font-bold text-purple-600">{dashboardData.abandonedCarts.count}</p>
              </div>
              <span className="text-2xl">🛒</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="space-y-6 lg:col-span-2">
            {/* Sales Overview Chart */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Sales Overview - Last 7 Days</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={dashboardData.salesOverview.revenueChart}>
                  <defs>
                    <linearGradient id="revenueGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#999" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#999" style={{ fontSize: '11px' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#revenueGradient2)" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Orders Status Pie Chart */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Orders by Status</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={dashboardData.salesOverview.ordersChart}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {dashboardData.salesOverview.ordersChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {dashboardData.salesOverview.ordersChart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sales by Category */}
              <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Sales by Category</h3>
                <div className="space-y-3">
                  {dashboardData.salesOverview.salesByCategory.map((cat, idx) => (
                    <div key={idx}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-700">{cat.category}</span>
                        <span className="font-semibold text-gray-900">${cat.value.toLocaleString()}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" 
                          style={{ width: `${cat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
                  View All Orders
                </button>
              </div>
              
              <div className="-mx-4 overflow-x-auto sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-900">
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">Order ID</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">Customer</th>
                        <th className="hidden px-4 py-3 text-left text-xs font-bold uppercase text-gray-700 sm:table-cell">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-4 py-4 text-sm text-gray-700">{order.customer}</td>
                          <td className="hidden px-4 py-4 text-xs text-gray-500 sm:table-cell">{order.date}</td>
                          <td className="px-4 py-4 text-sm font-semibold text-gray-900">${order.amount}</td>
                          <td className="px-4 py-4">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Top Customers</h3>
              <div className="space-y-3">
                {dashboardData.topCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-xl">
                        {customer.avatar}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">${customer.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{customer.totalOrders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Low Stock Alerts</h3>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                  {dashboardData.lowStockProducts.length} Items
                </span>
              </div>
              <div className="space-y-3">
                {dashboardData.lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-600">SKU: {product.sku} • {product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-red-700">{product.currentStock} left</p>
                      <p className="text-xs text-gray-600">Min: {product.threshold}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                Manage Inventory
              </button>
            </div>

            {/* Support Tickets */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Support Tickets</h3>
              <div className="space-y-3">
                {dashboardData.supportTickets.map((ticket) => (
                  <div key={ticket.id} className="rounded-lg border border-gray-100 p-3 hover:bg-gray-50">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{ticket.id}</p>
                        <p className="text-sm text-gray-600">{ticket.customer}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                        ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-gray-700">{ticket.issue}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`rounded-full px-2 py-1 font-semibold ${
                        ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                        ticket.status === 'In Progress' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className="text-gray-500">{ticket.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Notifications Panel */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {dashboardData.systemNotifications.filter(n => !n.read).length}
                </span>
              </div>
              <div className="space-y-3">
                {dashboardData.systemNotifications.map((notif) => (
                  <div key={notif.id} className={`rounded-lg border p-3 ${
                    !notif.read ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-white'
                  }`}>
                    <div className="mb-1 flex items-start justify-between">
                      <p className="flex-1 text-sm font-semibold text-gray-900">{notif.title}</p>
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                    </div>
                    <p className="mb-1 text-xs text-gray-600">{notif.message}</p>
                    <p className="text-xs text-gray-400">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Pending Approvals</h3>
                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                  {dashboardData.pendingApprovals.length}
                </span>
              </div>
              <div className="space-y-3">
                {dashboardData.pendingApprovals.map((approval) => (
                  <div key={approval.id} className={`rounded-lg border p-3 ${
                    approval.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white'
                  }`}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-900">{approval.type}</span>
                      {approval.urgent && <span className="text-xs font-bold text-red-600">URGENT</span>}
                    </div>
                    <p className="mb-1 text-sm text-gray-700">
                      {approval.customer || approval.vendor || approval.seller}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">
                        {approval.amount ? `$${approval.amount.toLocaleString()}` : `${approval.items} items`}
                      </p>
                      <button className="rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white hover:bg-green-600">
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Failures */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Payment Failures</h3>
              <div className="space-y-3">
                {dashboardData.paymentFailures.map((failure) => (
                  <div key={failure.id} className="rounded-lg border border-red-100 bg-red-50 p-3">
                    <p className="mb-1 text-sm font-semibold text-gray-900">{failure.orderId}</p>
                    <p className="mb-1 text-xs text-gray-700">{failure.customer}</p>
                    <p className="mb-2 text-sm font-bold text-red-700">${failure.amount}</p>
                    <p className="mb-2 text-xs text-gray-600">{failure.reason}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-600">
                        Retry
                      </button>
                      <button className="flex-1 rounded bg-gray-500 px-2 py-1 text-xs font-semibold text-white hover:bg-gray-600">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abandoned Carts */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Abandoned Carts</h3>
                <span className="text-2xl font-bold text-purple-600">{dashboardData.abandonedCarts.count}</span>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-xs text-gray-600">Today</p>
                  <p className="text-xl font-bold text-purple-600">{dashboardData.abandonedCarts.todayCount}</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-xs text-gray-600">This Week</p>
                  <p className="text-xl font-bold text-purple-600">{dashboardData.abandonedCarts.weekCount}</p>
                </div>
              </div>
              <h4 className="mb-2 text-sm font-semibold text-gray-700">Top Abandoned Products</h4>
              <div className="space-y-2">
                {dashboardData.abandonedCarts.topProducts.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.product}</span>
                    <span className="font-semibold text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Customers */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Customers</h3>
              <div className="space-y-3">
                {dashboardData.recentCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{customer.avatar}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Card */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Traffic Sources</h3>
              <div className="relative mx-auto mb-6 h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.traffic.chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {dashboardData.traffic.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{dashboardData.traffic.percentage.facebook}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm font-medium text-gray-700">YouTube</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{dashboardData.traffic.percentage.youtube}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span className="text-sm font-medium text-gray-700">Direct Search</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{dashboardData.traffic.percentage.directSearch}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;