import React, { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";
import TopSalesCard from "../../components/TopSalesCard";
import Chart from "../../components/Chart";

const recentActivity = [
  "User John purchased order #1023",
  "Payment received from ACME Ltd.",
  "New user signup: leena@example.com",
];

const tasks = ["Audit logs", "Review pending orders"];

function InfoCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg transition hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <h3 className="font-bold text-red-600">{title}</h3>
      <ul className="mt-3 space-y-1 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => (
          <li key={index} className="font-semibold transition hover:text-red-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    todaySales: 4128,
    orders: 1042,
    companyValue: 24300,
    salesTrend: [400, 450, 420, 480, 500, 550, 600],
    ordersTrend: [1200, 1150, 1100, 1080, 1050, 1040, 1020],
  });

  const [loading, setLoading] = useState(true);

  // simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="space-y-6 p-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Today Sales"
          value={stats.todaySales.toLocaleString()}
          delta="+3.5% vs last week"
          trendData={stats.salesTrend}
          valueClassName="font-bold text-red-600"
        />
        <StatCard
          title="Company Value"
          value={`$${stats.companyValue.toLocaleString()}`}
          delta="+1.2% vs last week"
          trendData={stats.salesTrend}
          valueClassName="font-bold text-red-600"
        />
        <StatCard
          title="Orders"
          value={stats.orders.toLocaleString()}
          delta="-0.5% vs last week"
          trendData={stats.ordersTrend}
          valueClassName="font-bold text-red-600"
        />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg transition hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <Chart salesTrend={stats.salesTrend} ordersTrend={stats.ordersTrend} />
          </div>

          {/* Top Sales */}
          <TopSalesCard />
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <InfoCard title="Recent Activity" items={recentActivity} />
          <InfoCard title="Tasks" items={tasks} />
        </div>
      </div>
    </div>
  );
}
