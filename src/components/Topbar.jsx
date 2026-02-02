import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Bell, MessageSquare, Search, X, Settings, User, LogOut, HelpCircle, ChevronDown } from "lucide-react";

export default function Topbar({ darkMode, toggleTheme }) {
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const messageRef = useRef(null);
  const userMenuRef = useRef(null);

  // Mock data - Replace with API calls
  useEffect(() => {
    loadNotifications();
    loadMessages();
  }, []);

  const loadNotifications = () => {
    const mockNotifications = [
      {
        id: 1,
        title: "New Order Received",
        message: "Order #12345 has been placed",
        time: "2 mins ago",
        read: false,
        type: "order",
        icon: "🛍️"
      },
      {
        id: 2,
        title: "Payment Confirmed",
        message: "Payment of $2,450 received from John Doe",
        time: "15 mins ago",
        read: false,
        type: "payment",
        icon: "💳"
      },
      {
        id: 3,
        title: "Low Stock Alert",
        message: "Product 'iPhone 15 Pro' is running low",
        time: "1 hour ago",
        read: true,
        type: "alert",
        icon: "⚠️"
      },
      {
        id: 4,
        title: "New Customer",
        message: "Sarah Wilson has registered",
        time: "3 hours ago",
        read: true,
        type: "user",
        icon: "👤"
      },
      {
        id: 5,
        title: "Review Posted",
        message: "New 5-star review on Product #789",
        time: "5 hours ago",
        read: true,
        type: "review",
        icon: "⭐"
      }
    ];
    setNotifications(mockNotifications);
    setUnreadNotifications(mockNotifications.filter(n => !n.read).length);
  };

  const loadMessages = () => {
    const mockMessages = [
      {
        id: 1,
        sender: "John Doe",
        avatar: "JD",
        message: "Hey, can you help me with the order?",
        time: "5 mins ago",
        read: false,
        online: true
      },
      {
        id: 2,
        sender: "Sarah Wilson",
        avatar: "SW",
        message: "Thanks for the quick response!",
        time: "20 mins ago",
        read: false,
        online: true
      },
      {
        id: 3,
        sender: "Mike Chen",
        avatar: "MC",
        message: "The product looks great!",
        time: "1 hour ago",
        read: true,
        online: false
      },
      {
        id: 4,
        sender: "Emily Davis",
        avatar: "ED",
        message: "When will my order be shipped?",
        time: "2 hours ago",
        read: true,
        online: false
      }
    ];
    setMessages(mockMessages);
    setUnreadMessages(mockMessages.filter(m => !m.read).length);
  };

  // Search functionality
  useEffect(() => {
    if (search.trim()) {
      performSearch(search);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [search]);

  const performSearch = (query) => {
    // Mock search results - Replace with actual API call
    const mockResults = [
      { id: 1, type: "order", title: `Order #${query}`, subtitle: "View order details" },
      { id: 2, type: "customer", title: `Customer: ${query}`, subtitle: "View customer profile" },
      { id: 3, type: "product", title: `Product: ${query}`, subtitle: "View product details" },
      { id: 4, type: "page", title: `Go to ${query} page`, subtitle: "Navigation" }
    ];
    setSearchResults(mockResults);
    setShowSearchResults(true);
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.querySelector('input')?.focus();
      }
      // Escape to close dropdowns
      if (e.key === 'Escape') {
        setShowSearchResults(false);
        setShowNotifications(false);
        setShowMessages(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadNotifications(prev => Math.max(0, prev - 1));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadNotifications(0);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    const notif = notifications.find(n => n.id === id);
    if (!notif?.read) {
      setUnreadNotifications(prev => Math.max(0, prev - 1));
    }
  };

  const markMessageAsRead = (id) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    ));
    setUnreadMessages(prev => Math.max(0, prev - 1));
  };

  const handleSearchResultClick = (result) => {
    console.log("Navigate to:", result);
    setSearch("");
    setShowSearchResults(false);
    // Add your navigation logic here
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* Middle: Search Bar */}
      <div className="relative mx-4 flex-1" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search... (Ctrl+K)"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-10 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="p-2">
              <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase text-slate-500">
                Search Results
              </div>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSearchResultClick(result)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                    {result.type === 'order' && '📦'}
                    {result.type === 'customer' && '👤'}
                    {result.type === 'product' && '🛍️'}
                    {result.type === 'page' && '📄'}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {result.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {result.subtitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Toggle Theme"
        >
          {darkMode ? (
            <Sun size={20} className="text-slate-600 dark:text-slate-300" />
          ) : (
            <Moon size={20} className="text-slate-600 dark:text-slate-300" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowUserMenu(false);
            }}
            className="relative rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Notifications"
          >
            <Bell size={20} className="text-slate-600 dark:text-slate-300" />
            {unreadNotifications > 0 && (
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full z-50 mt-2 w-96 rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Notifications
                </h3>
                {unreadNotifications > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`border-b border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50 ${
                        !notif.read ? 'bg-sky-50/50 dark:bg-sky-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{notif.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {notif.title}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {notif.message}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {notif.time}
                              </p>
                            </div>
                            <button
                              onClick={() => deleteNotification(notif.id)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {!notif.read && (
                            <button
                              onClick={() => markNotificationAsRead(notif.id)}
                              className="mt-2 text-xs font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-slate-200 p-3 text-center dark:border-slate-700">
                <button className="text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative" ref={messageRef}>
          <button
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
            className="relative rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Messages"
          >
            <MessageSquare size={20} className="text-slate-600 dark:text-slate-300" />
            {unreadMessages > 0 && (
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                {unreadMessages}
              </span>
            )}
          </button>

          {/* Messages Dropdown */}
          {showMessages && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="border-b border-slate-200 p-4 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Messages
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-500">
                    No messages
                  </div>
                ) : (
                  messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => markMessageAsRead(msg.id)}
                      className={`flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50 ${
                        !msg.read ? 'bg-green-50/50 dark:bg-green-900/10' : ''
                      }`}
                    >
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white">
                          {msg.avatar}
                        </div>
                        {msg.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-800"></span>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {msg.sender}
                          </p>
                          {!msg.read && (
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          )}
                        </div>
                        <p className="truncate text-sm text-slate-600 dark:text-slate-400">
                          {msg.message}
                        </p>
                        <p className="text-xs text-slate-500">{msg.time}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="border-t border-slate-200 p-3 text-center dark:border-slate-700">
                <button className="text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400">
                  View all messages
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
              setShowMessages(false);
            }}
            className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-600 text-sm font-bold text-white">
              AD
            </div>
            <div className="hidden text-left sm:block">
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Admin
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                admin@example.com
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="border-b border-slate-200 p-4 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  admin@example.com
                </p>
              </div>
              <div className="p-2">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
                  <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-900 dark:text-slate-100">Profile</span>
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
                  <Settings className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-900 dark:text-slate-100">Settings</span>
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
                  <HelpCircle className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-900 dark:text-slate-100">Help & Support</span>
                </button>
              </div>
              <div className="border-t border-slate-200 p-2 dark:border-slate-700">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}