// src/pages/Dashboard.jsx
import React from "react";
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
    <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg hover:shadow-xl transition">
      <h3 className="font-bold text-red-600">{title}</h3>
      <ul className="mt-3 text-sm text-slate-500 dark:text-slate-400 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="hover:text-red-600 transition font-semibold">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Today Sales"
          value="4,128"
          delta="+3.5% vs last week"
          trendData={[400, 450, 420, 480, 500, 550, 600]}
          valueClassName="text-red-600 font-bold"
        />
        <StatCard
          title="Company Value"
          value="$24,300"
          delta="+1.2% vs last week"
          trendData={[2300, 2450, 2400, 2500, 2600, 2430, 2480]}
          valueClassName="text-red-600 font-bold"
        />
        <StatCard
          title="Orders"
          value="1,042"
          delta="-0.5% vs last week"
          trendData={[1200, 1150, 1100, 1080, 1050, 1040, 1020]}
          valueClassName="text-red-600 font-bold"
        />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Chart */}
          <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg hover:shadow-xl transition">
            <Chart />
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
