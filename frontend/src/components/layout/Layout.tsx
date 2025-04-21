import { DarkThemeToggle } from "flowbite-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col md:flex-row">
      {/* Mobile Toggle Button */}
      <Sidebar />

      {/* Main Content */}
      <div className="h-screen flex-grow overflow-auto p-6 dark:bg-gray-900 dark:text-white">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
