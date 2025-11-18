// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Filter, MoreHorizontal } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// ---------------------- Chart Component ----------------------
// Dummy data for info cards
const recentActivity = [
  "User John purchased order #1023",
  "Payment received from ACME Ltd.",
  "New user signup: leena@example.com",
];
const tasks = ["Audit logs", "Review pending orders"];

// ---------------------- Helper Components ----------------------
function InfoCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg transition hover:shadow-xl">
      <h3 className="font-bold text-red-600">{title}</h3>
      <ul className="mt-3 space-y-1 text-sm text-slate-500">
        {items.map((item, index) => (
          <li key={index} className="font-semibold transition hover:text-red-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricCard({ title, value, change, positive }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow transition hover:shadow-md">
      <p className="mb-1 text-sm text-gray-500">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-xl font-bold">{value}</p>
        <span className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change}</span>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, positive }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow transition hover:shadow-md">
      <p className="mb-1 text-sm text-gray-600">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{value}</p>
        <span className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change}</span>
      </div>
    </div>
  );
}

function PlatformItem({ name, amount, change, icon, color }) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 bg-${color}-100 rounded-full flex items-center justify-center text-sm`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold">{amount}</span>
        <span className="text-sm text-gray-500">{change}</span>
        <div className={`w-6 h-6 bg-${color}-500 rounded-full`}></div>
      </div>
    </div>
  );
}

function SalesRow({ name, avatar, amount, deals, kpi, growth, wl }) {
  return (
    <div className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">{avatar}</div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <span className="text-sm font-medium">{amount}</span>
      <span className="rounded bg-gray-900 px-2 py-1 text-xs text-white">{deals}</span>
      <span className="text-sm">{kpi}</span>
      <span className="text-sm">{growth}</span>
      <span className="rounded bg-gray-900 px-2 py-1 text-xs text-white">{wl}</span>
    </div>
  );
}

// ---------------------- Main Dashboard ----------------------
export default function Dashboard() {
  const [stats, setStats] = useState({
    todaySales: 412800,
    orders: 1042,
    companyValue: 2430000,
    salesTrend: [400, 450, 420, 480, 500, 550, 600],
    ordersTrend: [1200, 1150, 1100, 1080, 1050, 1040, 1020],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard title="Today's Sales" value={`৳${stats.todaySales.toLocaleString()}`} change="+3.5%" positive />
        <MetricCard title="Company Value" value={`৳${stats.companyValue.toLocaleString()}`} change="+1.2%" positive />
        <MetricCard title="Orders" value={stats.orders.toLocaleString()} change="-0.5%" positive={false} />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Chart */}
          <div className="rounded-2xl bg-white p-5 shadow transition hover:shadow-lg">
            <Chart salesTrend={stats.salesTrend} ordersTrend={stats.ordersTrend} />
          </div>

          {/* Top Sales */}
          <div className="rounded-2xl bg-white p-5 shadow transition hover:shadow-lg">
            <h3 className="mb-2 font-bold text-red-600">Top Sales</h3>
            <TopSalesCard currency="৳" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <InfoCard title="Recent Activity" items={recentActivity} />
          <InfoCard title="Tasks" items={tasks} />
        </div>
      </div>

      {/* Platform & Sales Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Platform Performance */}
        <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <button className="p-1"><Filter size={16} /></button>
            <button className="rounded bg-gray-100 px-3 py-1 text-sm">Filters</button>
          </div>
          <PlatformItem name="Dribbble" amount="৳227,458" change="43%" icon="🎯" color="pink" />
          <PlatformItem name="Instagram" amount="৳142,823" change="27%" icon="📷" color="orange" />
          <PlatformItem name="Behance" amount="৳89,935" change="11%" icon="🔵" color="blue" />
          <PlatformItem name="Google" amount="৳37,028" change="7%" icon="G" color="red" />
        </div>

        {/* Sales Table */}
        <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <button className="rounded bg-gray-100 px-3 py-1 text-sm">Filters</button>
          </div>
          <SalesRow name="Armin A." avatar="👤" amount="৳200,633" deals="118" kpi="0.84" growth="34%" wl="29" />
          <SalesRow name="Mikasa A." avatar="👤" amount="৳156,841" deals="103" kpi="0.80" growth="39%" wl="33" />
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
