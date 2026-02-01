import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main content area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Topbar */}
                <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet /> {/* Nested routes render হবে এখানে */}
                </main>
            </div>
        </div>
    );
}
