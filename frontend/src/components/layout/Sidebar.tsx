import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { icons } from "../../constant/icon";
import { Button } from "flowbite-react";

interface Props {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpenSidebar, toggleSidebar }: Props) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;
  const navigate = useNavigate();

  const adminLinks = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: icons.dashboard,
    },
    {
      path: "/admin/user-management",
      label: "Người dùng",
      icon: icons.userManagement,
    },
    {
      path: "/admin/class-management",
      label: "Lớp học",
      icon: icons.classManagement,
    },
    {
      path: "/admin/schedule-management",
      label: "Thời khóa biểu",
      icon: icons.scheduleManagement,
    },
    {
      path: "/admin/reports",
      label: "Báo cáo",
      icon: icons.reports,
    },
    {
      path: "/admin/settings",
      label: "Cài đặt",
      icon: icons.settings,
    },
  ];

  const teacherLinks = [
    { path: "/teacher/dashboard", label: "Dashboard", icon: icons.dashboard },
    { path: "/teacher/attendance", label: "Điểm danh", icon: icons.attendance },
    {
      path: "/teacher/class",
      label: "Danh sách lớp",
      icon: icons.classManagement,
    },
    {
      path: "/teacher/schedule",
      label: "Thời khóa biểu",
      icon: icons.scheduleManagement,
    },
    { path: "/teacher/reports", label: "Báo cáo lớp học", icon: icons.reports },
  ];

  const studentLinks = [
    { path: "/student/dashboard", label: "Dashboard", icon: icons.dashboard },
    {
      path: "/student/schedule",
      label: "Lịch học",
      icon: icons.scheduleManagement,
    },
    {
      path: "/student/attendance-status",
      label: "Tình trạng điểm danh",
      icon: icons.attendance,
    },
    {
      path: "/student/notifications",
      label: "Thông báo",
      icon: icons.notification,
    },
    {
      path: "/student/personal-report",
      label: "Báo cáo cá nhân",
      icon: icons.reports,
    },
  ];

  const getLinks = () => {
    if (role === "admin") return adminLinks;
    if (role === "teacher") return teacherLinks;
    if (role === "student") return studentLinks;
    return [];
  };

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
          <div className="my-2">
            <Button onClick={handleLogout} color="red" className="w-full">
              <FaSignOutAlt
                className={`${!isSidebarCollapsed ? "mr-2" : ""} h-5 w-5`}
              />
              {!isSidebarCollapsed && <span>Đăng xuất</span>}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
