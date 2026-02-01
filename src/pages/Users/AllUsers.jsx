import React, { useState } from "react";
import {
  Users, Search, Filter, MoreVertical, Mail, Phone,
  MapPin, Calendar, TrendingUp, TrendingDown, UserPlus,
  Download, Edit, Trash2, Eye, CheckCircle, XCircle,
  Clock, DollarSign, ShoppingBag, Award, UserCheck,
  Lock, Unlock, MessageSquare, Star, Grid, List
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Sample user data
  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+880 1712-345678',
      location: 'Dhaka, Bangladesh',
      joinDate: 'Jan 15, 2024',
      status: 'active',
      orders: 24,
      totalSpent: 12450,
      lastOrder: '2 days ago',
      avatar: 'SJ',
      plan: 'Premium',
      growth: 12.5,
      rating: 4.8,
      lifetime: 345
    },
    {
      id: 2,
      name: 'Mohammed Rahman',
      email: 'rahman.m@example.com',
      phone: '+880 1823-456789',
      location: 'Chittagong, Bangladesh',
      joinDate: 'Feb 08, 2024',
      status: 'active',
      orders: 18,
      totalSpent: 8920,
      lastOrder: '1 week ago',
      avatar: 'MR',
      plan: 'Basic',
      growth: 8.3,
      rating: 4.5,
      lifetime: 234
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily.chen@example.com',
      phone: '+880 1934-567890',
      location: 'Sylhet, Bangladesh',
      joinDate: 'Mar 22, 2024',
      status: 'inactive',
      orders: 32,
      totalSpent: 15680,
      lastOrder: '3 weeks ago',
      avatar: 'EC',
      plan: 'Premium',
      growth: -2.1,
      rating: 4.9,
      lifetime: 456
    },
    {
      id: 4,
      name: 'Ahmed Khan',
      email: 'ahmed.k@example.com',
      phone: '+880 1745-678901',
      location: 'Rajshahi, Bangladesh',
      joinDate: 'Jan 30, 2024',
      status: 'active',
      orders: 42,
      totalSpent: 22340,
      lastOrder: '1 day ago',
      avatar: 'AK',
      plan: 'Premium',
      growth: 15.7,
      rating: 5.0,
      lifetime: 567
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      phone: '+880 1856-789012',
      location: 'Khulna, Bangladesh',
      joinDate: 'Apr 12, 2024',
      status: 'pending',
      orders: 5,
      totalSpent: 1230,
      lastOrder: '5 days ago',
      avatar: 'LA',
      plan: 'Basic',
      growth: 5.2,
      rating: 4.2,
      lifetime: 89
    },
    {
      id: 6,
      name: 'Fatima Akter',
      email: 'fatima.a@example.com',
      phone: '+880 1967-890123',
      location: 'Dhaka, Bangladesh',
      joinDate: 'Feb 25, 2024',
      status: 'active',
      orders: 28,
      totalSpent: 11450,
      lastOrder: '3 days ago',
      avatar: 'FA',
      plan: 'Premium',
      growth: 10.4,
      rating: 4.7,
      lifetime: 312
    },
    {
      id: 7,
      name: 'David Miller',
      email: 'david.m@example.com',
      phone: '+880 1678-901234',
      location: 'Barisal, Bangladesh',
      joinDate: 'Mar 05, 2024',
      status: 'active',
      orders: 15,
      totalSpent: 6780,
      lastOrder: '1 week ago',
      avatar: 'DM',
      plan: 'Basic',
      growth: 7.8,
      rating: 4.4,
      lifetime: 198
    },
    {
      id: 8,
      name: 'Nusrat Jahan',
      email: 'nusrat.j@example.com',
      phone: '+880 1789-012345',
      location: 'Mymensingh, Bangladesh',
      joinDate: 'Apr 18, 2024',
      status: 'inactive',
      orders: 9,
      totalSpent: 3240,
      lastOrder: '2 weeks ago',
      avatar: 'NJ',
      plan: 'Basic',
      growth: -4.2,
      rating: 4.0,
      lifetime: 123
    },
    {
      id: 9,
      name: 'Karim Hossain',
      email: 'karim.h@example.com',
      phone: '+880 1890-123456',
      location: 'Dhaka, Bangladesh',
      joinDate: 'Jan 20, 2024',
      status: 'active',
      orders: 36,
      totalSpent: 18900,
      lastOrder: '4 days ago',
      avatar: 'KH',
      plan: 'Premium',
      growth: 14.2,
      rating: 4.8,
      lifetime: 423
    },
    {
      id: 10,
      name: 'Jennifer Lee',
      email: 'jennifer.l@example.com',
      phone: '+880 1901-234567',
      location: 'Chittagong, Bangladesh',
      joinDate: 'Feb 14, 2024',
      status: 'active',
      orders: 21,
      totalSpent: 9870,
      lastOrder: '6 days ago',
      avatar: 'JL',
      plan: 'Basic',
      growth: 6.8,
      rating: 4.3,
      lifetime: 267
    },
    {
      id: 11,
      name: 'Rahim Ahmed',
      email: 'rahim.a@example.com',
      phone: '+880 1712-345679',
      location: 'Sylhet, Bangladesh',
      joinDate: 'Mar 10, 2024',
      status: 'pending',
      orders: 3,
      totalSpent: 890,
      lastOrder: '1 week ago',
      avatar: 'RA',
      plan: 'Basic',
      growth: 2.5,
      rating: 4.1,
      lifetime: 45
    },
    {
      id: 12,
      name: 'Sophia Brown',
      email: 'sophia.b@example.com',
      phone: '+880 1823-456790',
      location: 'Dhaka, Bangladesh',
      joinDate: 'Apr 05, 2024',
      status: 'active',
      orders: 19,
      totalSpent: 8450,
      lastOrder: '2 days ago',
      avatar: 'SB',
      plan: 'Premium',
      growth: 9.7,
      rating: 4.6,
      lifetime: 234
    }
  ];

  const stats = [
    { title: 'Total Users', value: '2,845', change: 12.5, icon: Users, trend: 'up' },
    { title: 'Active Users', value: '2,234', change: 8.2, icon: UserCheck, trend: 'up' },
    { title: 'New This Month', value: '342', change: 15.3, icon: UserPlus, trend: 'up' },
    { title: 'Premium Users', value: '856', change: 18.7, icon: Award, trend: 'up' }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 2100 },
    { month: 'Feb', users: 2300 },
    { month: 'Mar', users: 2450 },
    { month: 'Apr', users: 2600 },
    { month: 'May', users: 2720 },
    { month: 'Jun', users: 2845 }
  ];

  const planDistribution = [
    { name: 'Premium', value: 35, color: '#dc2626' },
    { name: 'Basic', value: 45, color: '#000000' },
    { name: 'Free', value: 20, color: '#737373' }
  ];

  const topSpenders = users
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
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
    </div>
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">All Users</h1>
          <p className="text-gray-600">Manage and monitor all registered users across the platform</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Analytics Section */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">User Growth Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#dc2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Plan Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {planDistribution.map((item, idx) => (
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
        </div>

        {/* Top Spenders */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Spenders</h3>
          <div className="space-y-3">
            {topSpenders.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-black font-semibold text-white">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.orders} orders • {user.lifetime} days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${user.totalSpent.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-red-500 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">{user.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded p-2 transition-colors ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded p-2 transition-colors ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700">
                <UserPlus className="h-4 w-4" />
                Add User
              </button>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-red-50 p-3">
              <p className="text-sm font-medium text-red-900">{selectedUsers.length} users selected</p>
              <button className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700">
                <Mail className="h-3 w-3" />
                Send Email
              </button>
              <button className="flex items-center gap-1 rounded bg-black px-3 py-1 text-sm font-semibold text-white hover:bg-gray-800">
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Users Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-black text-lg font-semibold text-white">
                      {user.avatar}
                    </div>
                  </div>
                  <button className="rounded-lg p-2 hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <div className="mb-3">
                  <h3 className="mb-1 font-semibold text-gray-900">{user.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-red-100 text-red-700' :
                        user.status === 'inactive' ? 'bg-gray-200 text-gray-800' :
                          'bg-gray-100 text-gray-600'
                      }`}>
                      {user.status}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${user.plan === 'Premium' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
                      }`}>
                      {user.plan}
                    </span>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3">
                  <div>
                    <p className="text-xs text-gray-600">Orders</p>
                    <p className="text-lg font-semibold text-gray-900">{user.orders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Spent</p>
                    <p className="text-lg font-semibold text-gray-900">${user.totalSpent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-red-500 text-red-500" />
                    <span className="text-sm font-semibold text-gray-900">{user.rating}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${user.growth >= 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {user.growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(user.growth)}%
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Last order: {user.lastOrder}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                    <Eye className="mr-1 inline h-4 w-4" />
                    View
                  </button>
                  <button className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                    <Edit className="mr-1 inline h-4 w-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Plan</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Orders</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Spent</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Growth</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-black font-semibold text-white">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-red-100 text-red-700' :
                          user.status === 'inactive' ? 'bg-gray-200 text-gray-800' :
                            'bg-gray-100 text-gray-600'
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${user.plan === 'Premium' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
                        }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">{user.orders}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">${user.totalSpent.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`flex items-center gap-1 ${user.growth >= 0 ? 'text-red-600' : 'text-gray-600'}`}>
                        {user.growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="font-semibold">{Math.abs(user.growth)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg p-2 hover:bg-gray-100">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="rounded-lg p-2 hover:bg-gray-100">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="rounded-lg p-2 hover:bg-gray-100">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="rounded-lg p-2 hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{users.length}</span> users
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              Previous
            </button>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">
              1
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              2
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              3
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;