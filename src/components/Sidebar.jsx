import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBarChart2, FiCheckSquare, FiFileText } from "react-icons/fi"; // Menggunakan React Icons

const Sidebar = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <FiBarChart2 />, page: "dashboard" },
    { label: "ToDo", icon: <FiCheckSquare />, page: "todo" },
    { label: "Logs", icon: <FiFileText />, page: "log" },
  ];

  useEffect(() => {
    const currentPath =
      location.pathname === "/" ? "" : location.pathname.slice(1);
    setActivePage(currentPath);
  }, [location.pathname, setActivePage]);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 transition-all duration-300
          ${isSidebarOpen ? "w-64" : "hidden md:w-20"} 
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          ${isSidebarOpen || "md:block hidden"}`}
      >
        <div className="flex items-center justify-center p-4 text-lg font-bold">
          {isSidebarOpen ? "Reporting Scheduling" : "Rs"}
        </div>
        <ul className="flex flex-col space-y-4 mt-6">
          {menuItems.map((item) => (
            <li
              key={item.page}
              className={`flex items-center space-x-3 p-4 cursor-pointer rounded-lg transition-colors duration-200 text-lg 
                ${
                  activePage === item.page
                    ? "bg-purple-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              onClick={() => {
                setActivePage(item.page);
                navigate(`/${item.page}`);
                setIsSidebarOpen(false);
              }}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
