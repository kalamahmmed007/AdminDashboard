import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', uv: 400 },
  { name: 'Tue', uv: 300 },
  { name: 'Wed', uv: 500 },
  { name: 'Thu', uv: 200 },
  { name: 'Fri', uv: 700 },
  { name: 'Sat', uv: 600 },
  { name: 'Sun', uv: 800 },
];

export default function Chart() {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Weekly Traffic</div>
      <div style={{ height: 250 }} className="mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '4px',
              }}
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 2, fill: '#3b82f6' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
