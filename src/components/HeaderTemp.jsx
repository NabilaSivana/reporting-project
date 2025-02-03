import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  // Menentukan nama halaman berdasarkan path URL
  const getPageName = () => {
    const path = location.pathname.replace("/", "");
    return path.charAt(0).toUpperCase() + path.slice(1) || "Dashboard";
  };

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Contoh jika pakai localStorage
    navigate("/login");
  };

  return (
    <header
      className={`bg-white shadow-md p-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSidebarOpen ? "md:ml-64" : "md:ml-20"
      }`}
    >
      {/* Bagian Kiri: Menu & Nama Halaman */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-purple-600 focus:outline-none"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">{getPageName()}</h1>
      </div>

      {/* Bagian Kanan: Notifikasi & Profil */}
      <div className="flex items-center space-x-6">
        {/* Notifikasi */}
        <div className="relative">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        {/* Profil */}
        <div className="relative">
          <button
            className="flex items-center space-x-3"
            onClick={() => setShowLogout(!showLogout)}
          >
            {/* Lingkaran Foto Profil */}
            <div className="bg-yellow-300 w-9 h-9 rounded-full"></div>
            {/* Nama Profil (Sekarang ada di kanan) */}
            <span className="font-semibold">Engineer</span>
          </button>

          {/* Pop-up Logout */}
          {showLogout && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
