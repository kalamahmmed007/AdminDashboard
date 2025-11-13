import React, { useState } from "react";
import { Sun, Moon, Bell, MessageSquare } from "lucide-react";

export default function Topbar({ darkMode, toggleTheme }) {
  const [search, setSearch] = useState("");

  return (
    <header className="flex items-center justify-between p-4 border-b dark:border-slate-700 bg-white dark:bg-slate-900">
      {/* Left: Brand */}
      <div className="flex items-center space-x-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Dashboard
        </h2>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition" title="Notifications">
          <Bell size={16} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Messages */}
        <button className="relative p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition" title="Messages">
          <MessageSquare size={16} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600" />
          <div className="text-sm">
            <div className="font-medium text-slate-900 dark:text-slate-100">Admin</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">You</div>
          </div>
        </div>
      </div>
    </header>
  );
}
