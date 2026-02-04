import React, { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [dashboardData, setDashboardData] = useState({
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
  const API_BASE_URL = 'https://api.yourdomain.com';
  const API_ENDPOINTS = {
    revenue: '/api/dashboard/revenue',
    balances: '/api/dashboard/balances',
    traffic: '/api/dashboard/traffic',
    revenueChart: '/api/dashboard/revenue-chart',
    statusCards: '/api/dashboard/status-cards',
    activities: '/api/dashboard/activities',
    orders: '/api/dashboard/orders',
    notifications: '/api/dashboard/notifications',
    performance: '/api/dashboard/performance',
    countries: '/api/dashboard/top-countries',
    categories: '/api/dashboard/revenue-categories'
  };

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const [
        revenueRes, balancesRes, trafficRes, revenueChartRes,
        statusCardsRes, activitiesRes, ordersRes, notificationsRes,
        performanceRes, countriesRes, categoriesRes
      ] = await Promise.all([
        fetch(`${API_BASE_URL}${API_ENDPOINTS.revenue}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.balances}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.traffic}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.revenueChart}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.statusCards}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.activities}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.orders}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.notifications}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.performance}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.countries}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.categories}`)
      ]);

      const [
        revenue, balances, traffic, revenueChart,
        statusCards, activities, orders, notifications,
        performance, countries, categories
      ] = await Promise.all([
        revenueRes.json(), balancesRes.json(), trafficRes.json(),
        revenueChartRes.json(), statusCardsRes.json(), activitiesRes.json(),
        ordersRes.json(), notificationsRes.json(), performanceRes.json(),
        countriesRes.json(), categoriesRes.json()
      ]);

      setDashboardData({
        revenue,
        growthRate: revenue.growth,
        balances,
        traffic,
        revenueChart,
        statusCards,
        recentActivities: activities,
        orderStatus: orders,
        notifications,
        performanceMetrics: performance,
        topCountries: countries,
        revenueByCategory: categories
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      loadMockData();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Mock Data
  const loadMockData = () => {
    setDashboardData({
      revenue: {
        current: 3468.96,
        growth: 2.65
      },
      growthRate: 82,
      balances: {
        wallet: 4667.63,
        walletEarnings: 12.5,
        expectedSales: 2683.53,
        expectedEarnings: -8.3,
        funding: 892667.63,
        fundingEarnings: 15.2
      },
      traffic: {
        percentage: {
          facebook: 33,
          youtube: 55,
          directSearch: 12
        },
        chartData: [
          { name: 'Facebook', value: 33, color: '#e91e63' },
          { name: 'YouTube', value: 55, color: '#9c27b0' },
          { name: 'Direct Search', value: 12, color: '#ffc107' }
        ]
      },
      revenueChart: [
        { month: 'Jan', value: 20, target: 25 },
        { month: 'Feb', value: 35, target: 30 },
        { month: 'Mar', value: 25, target: 28 },
        { month: 'Apr', value: 45, target: 40 },
        { month: 'May', value: 30, target: 35 },
        { month: 'Jun', value: 55, target: 50 },
        { month: 'Jul', value: 40, target: 45 },
        { month: 'Aug', value: 65, target: 60 },
        { month: 'Sep', value: 50, target: 55 },
        { month: 'Oct', value: 70, target: 65 },
        { month: 'Nov', value: 60, target: 62 },
        { month: 'Dec', value: 75, target: 70 }
      ],
      statusCards: {
        revenueStatus: {
          value: 432,
          period: 'Jan 01 - Jan 10',
          trend: [20, 35, 25, 45, 30, 50, 40, 60]
        },
        pageView: {
          value: 432,
          period: 'Jan 01 - Jan 10',
          trend: [30, 40, 35, 50, 45, 60, 55, 70]
        },
        socialRate: {
          value: 432,
          period: 'Jan 01 - Jan 10',
          trend: [25, 30, 35, 40, 50, 45, 55, 60]
        },
        marketStatus: {
          value: 432,
          period: 'Jan 01 - Jan 10',
          trend: [40, 30, 45, 35, 50, 60, 55, 65]
        }
      },
      recentActivities: [
        { id: 1, title: 'Task Updated', subtitle: 'Jeroen Updated Task', time: '20 Mins', icon: '📋', color: 'pink' },
        { id: 2, title: 'Deal Added', subtitle: 'Deals Updated', time: '5 Day Ago', icon: '💼', color: 'purple' },
        { id: 3, title: 'Undefined Article', subtitle: 'Email Undefined Article', time: '10 Mins Ago', icon: '📧', color: 'blue' },
        { id: 4, title: 'Dock Updated', subtitle: 'Mail', time: '3 Day Ago', icon: '📬', color: 'yellow' },
        { id: 5, title: 'Deployed Comment', subtitle: 'Sundae Created Comment', time: '5 Day Ago', icon: '💬', color: 'green' }
      ],
      orderStatus: {
        totalOrders: 124,
        orders: [
          { id: '12345', customer: 'Cindy Dunn', from: 'Brazil', price: '$250', status: 'Medium' },
          { id: '12346', customer: 'Yoana', from: 'Italy', price: '$2400', status: 'Done' },
          { id: '12347', customer: 'Denzyl Cosh', from: 'Russia', price: '$865', status: 'Low' },
          { id: '12348', customer: 'Belgin Bastark', from: 'Jordan', price: '$645', status: 'Medium' },
          { id: '12349', customer: 'Jack Daunds', from: 'Spain', price: '$2,650', status: 'High' }
        ]
      },
      notifications: [
        { id: 1, title: 'New Order Received', message: 'Order #12350 from John Doe', time: '5 mins ago', read: false, type: 'order' },
        { id: 2, title: 'Payment Confirmed', message: 'Payment of $2,400 received', time: '15 mins ago', read: false, type: 'payment' },
        { id: 3, title: 'Low Stock Alert', message: 'Product XYZ is running low', time: '1 hour ago', read: true, type: 'alert' },
        { id: 4, title: 'New Customer', message: 'Sarah Wilson registered', time: '2 hours ago', read: true, type: 'customer' }
      ],
      performanceMetrics: [
        { metric: 'Sales', score: 85 },
        { metric: 'Marketing', score: 70 },
        { metric: 'Support', score: 92 },
        { metric: 'Development', score: 78 },
        { metric: 'Quality', score: 88 }
      ],
      topCountries: [
        { country: 'USA', flag: '🇺🇸', revenue: 45200, percentage: 35 },
        { country: 'UK', flag: '🇬🇧', revenue: 32100, percentage: 25 },
        { country: 'Germany', flag: '🇩🇪', revenue: 25600, percentage: 20 },
        { country: 'France', flag: '🇫🇷', revenue: 15800, percentage: 12 },
        { country: 'Japan', flag: '🇯🇵', revenue: 10200, percentage: 8 }
      ],
      revenueByCategory: [
        { category: 'Electronics', value: 45000, color: '#3b82f6' },
        { category: 'Fashion', value: 32000, color: '#ec4899' },
        { category: 'Home & Garden', value: 28000, color: '#10b981' },
        { category: 'Sports', value: 18000, color: '#f59e0b' }
      ]
    });
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Overview of Latest Month</h2>
            <p className="text-sm text-gray-500">Track your business performance</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'daily' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('daily')}>DAILY</button>
            <button className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'weekly' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('weekly')}>WEEKLY</button>
            <button className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'monthly' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('monthly')}>MONTHLY</button>
            <button className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'yearly' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('yearly')}>YEARLY</button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="space-y-6 lg:col-span-2">
            {/* Revenue Card with Chart */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">${dashboardData.revenue.current}</h2>
                  <p className="text-sm text-gray-500">Smart Month Earnings</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">{dashboardData.growthRate}</p>
                  <p className="text-sm text-gray-500">Growth rate</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={dashboardData.revenueChart}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f8bbd0" stopOpacity={0.8}/>
                      <stop offset="50%" stopColor="#ce93d8" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#9575cd" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#999" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#999" style={{ fontSize: '11px' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="value" stroke="#9c27b0" fill="url(#revenueGradient)" strokeWidth={3} />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>

              <button className="mt-4 w-full rounded-lg bg-pink-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-600 sm:w-auto">
                DOWNLOAD SUMMARY
              </button>
            </div>

            {/* Balance Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <BalanceCard
                icon="💰"
                title="Wallet Balance"
                amount={`$${dashboardData.balances.wallet}`}
                earnings={dashboardData.balances.walletEarnings}
                color="pink"
              />
              <BalanceCard
                icon="💼"
                title="Expected Sales"
                amount={`$${dashboardData.balances.expectedSales}`}
                earnings={dashboardData.balances.expectedEarnings}
                color="blue"
              />
              <BalanceCard
                icon="💳"
                title="Wallet Earnings"
                amount={`$${dashboardData.balances.expectedSales}`}
                earnings={dashboardData.balances.expectedEarnings}
                color="purple"
              />
              <BalanceCard
                icon="🎯"
                title="Funding"
                amount={`$${dashboardData.balances.funding}`}
                earnings={dashboardData.balances.fundingEarnings}
                color="yellow"
              />
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatusCard
                title="Revenue Status"
                value={dashboardData.statusCards.revenueStatus.value}
                period={dashboardData.statusCards.revenueStatus.period}
                trend={dashboardData.statusCards.revenueStatus.trend}
                color="pink"
              />
              <StatusCard
                title="Page View"
                value={dashboardData.statusCards.pageView.value}
                period={dashboardData.statusCards.pageView.period}
                trend={dashboardData.statusCards.pageView.trend}
                color="purple"
              />
              <StatusCard
                title="Social Rate"
                value={dashboardData.statusCards.socialRate.value}
                period={dashboardData.statusCards.socialRate.period}
                trend={dashboardData.statusCards.socialRate.trend}
                color="blue"
                icon="📊"
              />
              <StatusCard
                title="Market Status"
                value={dashboardData.statusCards.marketStatus.value}
                period={dashboardData.statusCards.marketStatus.period}
                trend={dashboardData.statusCards.marketStatus.trend}
                color="orange"
              />
            </div>

            {/* NEW: Performance Radar Chart */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={dashboardData.performanceMetrics}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" style={{ fontSize: '12px' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fontSize: '11px' }} />
                  <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* NEW: Revenue by Category */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Revenue by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dashboardData.revenueByCategory} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#999" style={{ fontSize: '11px' }} />
                  <YAxis type="category" dataKey="category" stroke="#999" style={{ fontSize: '11px' }} width={100} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {dashboardData.revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activities */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Activities</h3>
              <div className="divide-y divide-gray-100">
                {dashboardData.recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </div>

            {/* Order Status Table */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-gray-900">Order Status</h3>
                <div className="flex items-center gap-2">
                  <select 
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="all">All Orders</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                    <option value="done">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="-mx-4 overflow-x-auto sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-900">
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">INVOICE</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">CUSTOMERS</th>
                        <th className="hidden px-4 py-3 text-left text-xs font-bold uppercase text-gray-700 sm:table-cell">FROM</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">PRICE</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.orderStatus.orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-4 py-4 text-sm text-gray-700">{order.customer}</td>
                          <td className="hidden px-4 py-4 text-sm text-gray-700 sm:table-cell">{order.from}</td>
                          <td className="px-4 py-4 text-sm font-semibold text-gray-900">{order.price}</td>
                          <td className="px-4 py-4">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                              order.status === 'High' ? 'bg-pink-100 text-pink-700' :
                              order.status === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'Done' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
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

              <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-xs text-gray-500">
                  Showing 1 to 10 of {dashboardData.orderStatus.totalOrders} entries
                </p>
                <div className="flex items-center gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500 text-white hover:bg-pink-600">←</button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500 text-sm font-semibold text-white">1</button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">2</button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">3</button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300">→</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Traffic Card */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Traffic</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span> Active
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> Done
                  </span>
                </div>
              </div>

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
                      startAngle={90}
                      endAngle={-270}
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

            {/* NEW: Top Countries */}
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Top Countries</h3>
              <div className="space-y-3">
                {dashboardData.topCountries.map((country, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{country.country}</p>
                        <p className="text-xs text-gray-500">${country.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" 
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-gray-600">{country.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;