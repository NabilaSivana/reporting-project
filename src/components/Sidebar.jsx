import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: "📊", page: "" },
    { label: "ToDo", icon: "✅", page: "todo" },
    { label: "Logs", icon: "📜", page: "log" },
  ];

  useEffect(() => {
    const currentPath =
      location.pathname === "/" ? "" : location.pathname.slice(1);
    setActivePage(currentPath);
  }, [location.pathname, setActivePage]);

  return (
    <>
      {/* Overlay (hanya di layar kecil, muncul saat sidebar terbuka) */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 transition-all duration-300
          ${isSidebarOpen ? "w-64" : "w-0 md:w-20"} 
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          ${isSidebarOpen || "md:block hidden"}`} // Hilang sepenuhnya di layar kecil jika tertutup
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
                setIsSidebarOpen(false); // Tutup sidebar setelah klik menu
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
