import { NavLink } from "react-router-dom";
import { LuPanelRightOpen, LuPanelLeftOpen } from "react-icons/lu";
import { FaUserFriends } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import {
  MdAccountCircle,
  MdAssessment,
  MdCalendarMonth,
  MdGroup,
  MdSettings,
  MdSpaceDashboard,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { useState } from "react";

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Trạng thái thu nhỏ/mở rộng
  const role = "admin"; // Thay đổi role tùy người dùng

  const adminLinks = [
    {
      path: "/",
      label: "Dashboard",
      icon: <MdSpaceDashboard className="h-5 w-5" />,
    },
    {
      path: "/user-management",
      label: "Người dùng",
      icon: <MdAccountCircle className="h-5 w-5" />,
    },
    {
      path: "/class-management",
      label: "Lớp học",
      icon: <MdGroup className="h-5 w-5" />,
    },
    {
      path: "/schedule-management",
      label: "Thời khóa biểu",
      icon: <MdCalendarMonth className="h-5 w-5" />,
    },
    {
      path: "/reports",
      label: "Báo cáo",
      icon: <MdAssessment className="h-5 w-5" />,
    },
    {
      path: "/settings",
      label: "Cài đặt",
      icon: <MdSettings className="h-5 w-5" />,
    },
  ];

  // const teacherLinks = [
  //   { path: "/", label: "Dashboard" },
  //   { path: "/attendance", label: "Điểm danh" },
  //   { path: "/class-management", label: "Danh sách lớp" },
  //   { path: "/schedule", label: "Thời khóa biểu" },
  //   { path: "/reports", label: "Báo cáo lớp học" },
  // ];

  // const studentLinks = [
  //   { path: "/", label: "Dashboard" },
  //   { path: "/schedule", label: "Lịch học" },
  //   { path: "/attendance-status", label: "Tình trạng điểm danh" },
  //   { path: "/notifications", label: "Thông báo" },
  //   { path: "/personal-report", label: "Báo cáo cá nhân" },
  // ];

  const getLinks = () => {
    if (role === "admin") return adminLinks;
    // if (role === "teacher") return teacherLinks;
    // if (role === "student") return studentLinks;
    return [];
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Đổi trạng thái mở/thu nhỏ
  };

  return (
    <div
      className={`flex h-screen bg-white dark:bg-gray-900 ${
        isSidebarCollapsed ? "w-24" : "w-64"
      } transform transition-all duration-300`}
    >
      {/* Nút thu nhỏ/mở rộng */}
      <div className="mx-3 my-6 flex w-full flex-col rounded-md p-2 shadow-2xl dark:bg-gray-800 dark:shadow-none">
        <button
          onClick={toggleSidebar}
          className="mb-6 flex items-center justify-center rounded-md p-2 hover:text-indigo-500 dark:text-white"
        >
          {isSidebarCollapsed ? (
            <LuPanelLeftOpen className="h-5 w-5" />
          ) : (
            <LuPanelRightOpen className="h-5 w-5" />
          )}
        </button>

        {/* Các liên kết */}
        <nav className="flex-grow text-[#A3AED0] dark:text-white">
          {getLinks().map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `flex w-full items-center rounded-md ${
                  isSidebarCollapsed ? "justify-center" : "space-x-2 pl-4"
                } py-4 transition duration-300 ${
                  isActive ? "text-indigo-500" : "hover:bg-indigo-300"
                }`
              }
              title={link.label}
            >
              {link.icon}
              {!isSidebarCollapsed && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
