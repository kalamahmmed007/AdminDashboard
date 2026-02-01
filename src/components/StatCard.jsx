import React from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function StatCard({ title, value, delta, trendData }) {
  const isPositive = delta.startsWith("+");
  const chartData = trendData.map((v) => ({ value: v }));

  return (
    <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Title */}
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h1>

      {/* Value */}
      <div className="text-4xl font-bold text-red-500">{value}</div>

      {/* Delta */}
      <div
        className={`mt-1 flex items-center text-sm font-semibold ${isPositive ? "text-green-500" : "text-red-500"
          }`}
      >
        {isPositive ? (
          <ArrowUp size={16} className="mr-1" />
        ) : (
          <ArrowDown size={16} className="mr-1" />
        )}
        {delta}
      </div>

      {/* Chart */}
      <div className="mt-4 h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth={3}
              dot={false}
              animationDuration={1500}
            />
            <defs>
              <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="gradientRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1 rounded text-xs shadow-md">
        {payload[0].value}
      </div>
    );
  }
  return null;
}
