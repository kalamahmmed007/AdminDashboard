import React, { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);
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
    }
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
    orders: '/api/dashboard/orders'
  };

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const [
        revenueRes, balancesRes, trafficRes, revenueChartRes,
        statusCardsRes, activitiesRes, ordersRes
      ] = await Promise.all([
        fetch(`${API_BASE_URL}${API_ENDPOINTS.revenue}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.balances}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.traffic}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.revenueChart}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.statusCards}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.activities}`),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.orders}`)
      ]);

      const [
        revenue, balances, traffic, revenueChart,
        statusCards, activities, orders
      ] = await Promise.all([
        revenueRes.json(), balancesRes.json(), trafficRes.json(),
        revenueChartRes.json(), statusCardsRes.json(), activitiesRes.json(),
        ordersRes.json()
      ]);

      setDashboardData({
        revenue,
        growthRate: revenue.growth,
        balances,
        traffic,
        revenueChart,
        statusCards,
        recentActivities: activities,
        orderStatus: orders
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
        { month: 'Jan', value: 20 },
        { month: 'Feb', value: 35 },
        { month: 'Mar', value: 25 },
        { month: 'Apr', value: 45 },
        { month: 'May', value: 30 },
        { month: 'Jun', value: 55 },
        { month: 'Jul', value: 40 },
        { month: 'Aug', value: 65 },
        { month: 'Sep', value: 50 },
        { month: 'Oct', value: 70 },
        { month: 'Nov', value: 60 },
        { month: 'Dec', value: 75 }
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
      }
    });
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const BalanceCard = ({ icon, title, amount, earnings, color }) => (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4 transition-all hover:shadow-md">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
        color === 'pink' ? 'bg-pink-100' :
        color === 'purple' ? 'bg-purple-100' :
        color === 'blue' ? 'bg-blue-100' :
        'bg-yellow-100'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <p className="text-lg font-bold text-gray-900">{amount}</p>
      </div>
      <div className={`text-xs font-bold ${earnings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {earnings >= 0 ? '▲' : '▼'} {Math.abs(earnings)}%
      </div>
    </div>
  );

  const StatusCard = ({ title, value, period, trend, color, icon }) => (
    <div className={`overflow-hidden rounded-2xl p-6 text-white shadow-lg ${
      color === 'pink' ? 'bg-gradient-to-br from-pink-400 to-pink-600' :
      color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
      color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
      'bg-gradient-to-br from-orange-400 to-orange-600'
    }`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold opacity-90">{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold">${value}</span>
        {color === 'blue' && (
          <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">
            Monthly
          </span>
        )}
      </div>
      <p className="mb-4 text-xs opacity-80">{period}</p>
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
      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xl ${
        color === 'pink' ? 'bg-pink-100' :
        color === 'purple' ? 'bg-purple-100' :
        color === 'blue' ? 'bg-blue-100' :
        color === 'yellow' ? 'bg-yellow-100' :
        'bg-green-100'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Overview of latest Month</p>
          </div>
          <div className="flex items-center gap-2">
            <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'daily' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`} onClick={() => setActiveTab('daily')}>DAILY</button>
            <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'weekly' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`} onClick={() => setActiveTab('weekly')}>WEEKLY</button>
            <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'monthly' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`} onClick={() => setActiveTab('monthly')}>MONTHLY</button>
            <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'yearly' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500'}`} onClick={() => setActiveTab('yearly')}>YEARLY</button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="space-y-6 lg:col-span-2">
            {/* Revenue Card with Chart */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">${dashboardData.revenue.current}</h2>
                  <p className="text-sm text-gray-500">Smart Month Earnings</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.growthRate}</p>
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
                  <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#999" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0' }} />
                  <Area type="monotone" dataKey="value" stroke="#9c27b0" fill="url(#revenueGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>

              <button className="mt-4 rounded-lg bg-pink-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-600">
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

            {/* Recent Activities */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Activities</h3>
              <div className="divide-y divide-gray-100">
                {dashboardData.recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </div>

            {/* Order Status Table */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Order Status</h3>
                <p className="text-sm text-gray-500">Transaction saved March</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-900">
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">INVOICE</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">CUSTOMERS</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">FROM</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">PRICE</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-gray-700">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.orderStatus.orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{order.customer}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{order.from}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-900">{order.price}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

              <div className="mt-4 flex items-center justify-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white">←</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm font-semibold text-white">1</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100">2</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100">3</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100">4</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100">5</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100">6</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">→</button>
              </div>

              <p className="mt-4 text-center text-xs text-gray-500">
                Showing 1 to 10 of {dashboardData.orderStatus.totalOrders} entries
              </p>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Traffic Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;