import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header
      className={`bg-white shadow-md p-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-purple-600 focus:outline-none"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Report Service</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Admin</span>
          <div className="bg-yellow-300 w-8 h-8 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
