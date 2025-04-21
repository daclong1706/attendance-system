import { useState } from "react";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import {
  MdAccountCircle,
  MdAssessment,
  MdCalendarMonth,
  MdGroup,
  MdSettings,
  MdSpaceDashboard,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

interface Props {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpenSidebar, toggleSidebar }: Props) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Đổi trạng thái mở/thu nhỏ
  };

  return (
    <>
      {isOpenSidebar && (
        <>
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 z-20 h-screen transform bg-white shadow-lg transition-transform duration-300 dark:bg-gray-900 ${
              isOpenSidebar ? "translate-x-0" : "-translate-x-full"
            } w-64`}
          >
            <div className="flex h-full flex-col p-4 shadow-xl dark:bg-gray-800">
              <nav className="mt-10 flex-grow text-[#A3AED0] dark:text-white">
                {getLinks().map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center rounded-md py-4 transition duration-300 ${
                        isOpenSidebar ? "space-x-2 pl-4" : "justify-center"
                      } ${isActive ? "text-indigo-500" : "hover:bg-indigo-300"}`
                    }
                    title={item.label}
                    onClick={toggleSidebar}
                  >
                    {item.icon}
                    {isOpenSidebar && <span>{item.label}</span>}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Background mờ khi mở sidebar trên điện thoại */}
          {isOpenSidebar && (
            <div
              className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
        </>
      )}
      <div
        className={`hidden h-screen bg-white md:flex dark:bg-gray-900 ${
          isSidebarCollapsed ? "w-24" : "w-64"
        } transform transition-all duration-300`}
      >
        {/* Nút thu nhỏ/mở rộng */}
        <div className="mx-3 my-6 flex w-full flex-col rounded-md p-2 shadow-2xl dark:bg-gray-800 dark:shadow-none">
          <button
            onClick={toggleSidebarCollapsed}
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
    </>
  );
};

export default Sidebar;
