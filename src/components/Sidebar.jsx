import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activePage, setActivePage, isSidebarOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: "📊", page: "dashboard" },
    { label: "ToDo", icon: "✅", page: "todo" },
    { label: "Logs", icon: "📜", page: "Log" },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-white h-screen fixed top-0 left-0 flex flex-col transition-all duration-300 shadow-md`}
    >
      <div className="flex items-center justify-center p-4">
        {isSidebarOpen && <img src="/logo.png" alt="Logo" className="w-12" />}
      </div>
      <ul className="flex flex-col space-y-4 mt-6">
        {menuItems.map((item) => (
          <li
            key={item.page}
            className={`flex items-center space-x-2 p-4 cursor-pointer rounded-lg transition-colors duration-200 ${
              activePage === item.page
                ? "bg-purple-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setActivePage(item.page);
              navigate(`/${item.page}`);
            }}
          >
            <span className="text-2xl">{item.icon}</span>
            {isSidebarOpen && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
