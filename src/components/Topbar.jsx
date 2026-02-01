import React, { useState } from "react";
import { Sun, Moon, Bell, MessageSquare } from "lucide-react";

export default function Topbar({ darkMode, toggleTheme }) {
  const [search, setSearch] = useState("");

  return (
    <header className="flex items-center justify-between border-b bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      {/* Middle: Search Bar */}
      <div className="mx-4 flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        />
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button className="relative rounded p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800" title="Notifications">
          <Bell size={16} />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Messages */}
        <button className="relative rounded p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800" title="Messages">
          <MessageSquare size={16} />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500" />
        </button>

        {/* User Profile */}
        <div className="flex cursor-pointer items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300 dark:bg-slate-600" />
          <div className="text-sm">
            <div className="font-medium text-slate-900 dark:text-slate-100">Admin</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">You</div>
          </div>
        </div>
      </div>
    </header>
  );
}
