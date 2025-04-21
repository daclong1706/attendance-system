import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <div className="relative flex min-h-screen flex-col md:flex-row">
      <Sidebar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />

      <div className="h-screen flex-grow overflow-auto p-6 dark:bg-gray-900 dark:text-white">
        <Header toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
