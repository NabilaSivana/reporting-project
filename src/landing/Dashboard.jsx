import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const localizer = momentLocalizer(moment);

const Dashboard = ({ isSidebarOpen, setTodoList }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([
    {
      title: "Design Conference",
      start: new Date(2025, 0, 3),
      end: new Date(2025, 0, 3),
      allDay: true,
    },
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const [isMobile, setIsMobile] = useState(false);

  // Check window size for mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fungsi navigasi bulan
  const handlePrevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month").toDate());
  };

  // Fungsi Accept
  const handleAccept = () => {
    console.log("Navigating to /todo...");
    setTodoList((prev) => [
      ...prev,
      { name: "Judul Pelayanan", deadline: "6 Januari" },
    ]);
    navigate("/todo");
  };

  return (
    <div
      className={`transition-all duration-300 p-6 mt-20 grid gap-6 ${
        isMobile ? "grid-cols-1" : "grid-cols-3"
      } ${isSidebarOpen ? "ml-64" : "ml-20"}`}
    >
      {/* Filter Section */}
      <div className="col-span-4 flex justify-start items-center bg-white p-4 rounded-md shadow-md w-fit">
        <div className="flex items-center space-x-4">
          {isMobile ? (
            <>
              <button
                className="text-purple-600 flex items-center"
                onClick={() => setIsFilterPopupOpen(true)}
              >
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filter
              </button>
              <button
                className="flex items-center text-red-600"
                onClick={() => {
                  /* Reset filter logic */
                }}
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Reset Filter
              </button>
            </>
          ) : (
            <>
              <button className="text-purple-600 flex items-center">
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filter
              </button>
              <select className="border px-3 py-1 rounded-md">
                <option>Filter by Date</option>
              </select>
              <select className="border px-3 py-1 rounded-md">
                <option>City</option>
              </select>
              <button className="flex items-center text-red-600">
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Reset Filter
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter Popup */}
      {isMobile && isFilterPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsFilterPopupOpen(false)}
        >
          <div
            className="bg-white p-4 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold">Filter Options</h3>
            <select className="border px-3 py-1 rounded-md mb-2">
              <option>Filter by Date</option>
            </select>
            <select className="border px-3 py-1 rounded-md mb-2">
              <option>City</option>
            </select>
            <button
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md"
              onClick={() => setIsFilterPopupOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Calendar Section */}
      <div className="col-span-2 bg-white p-6 rounded-md shadow-md h-[500px] w-full overflow-x-auto">
        {/* Header Navigasi Bulan */}
        <div className="flex justify-between items-center mb-4 space-x-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-md bg-gray-200"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {moment(currentDate).format("MMMM YYYY")}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-md bg-gray-200"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setView(Views.MONTH)}
              className={`p-2 rounded-md text-sm ${
                view === Views.MONTH
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView(Views.WEEK)}
              className={`p-2 rounded-md text-sm ${
                view === Views.WEEK ? "bg-purple-500 text-white" : "bg-gray-100"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView(Views.DAY)}
              className={`p-2 rounded-md text-sm ${
                view === Views.DAY ? "bg-purple-500 text-white" : "bg-gray-100"
              }`}
            >
              Day
            </button>
          </div>
        </div>

        {/* Kalender */}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          style={{ height: "100%", minWidth: "300px" }}
          views={{ month: true, week: true, day: true }}
          view={view}
          onView={setView}
          toolbar={false}
          components={{
            header: ({ label }) => (
              <div className="bg-purple-500 text-white p-2 font-bold">
                {label}
              </div>
            ),
          }}
        />
      </div>

      {/* Report Section */}
      <div
        className={`bg-white p-6 rounded-md shadow-md w-full mt-4 ${
          isMobile ? "col-span-4" : ""
        }`}
      >
        <h2 className="font-semibold text-lg mb-4">Report</h2>
        <div
          className="border p-3 rounded-md w-full cursor-pointer flex justify-between items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="font-semibold text-purple-600">Judul Pelayanan</span>
          <span>{isDropdownOpen ? "▲" : "▼"}</span>
        </div>
        {isDropdownOpen && (
          <div className="mt-2 p-3 border rounded-md">
            <p className="font-semibold">Nama Engineer</p>
            <p>- Tanggal: YYYY-MM-DD</p>
            <p>- Jam: 00:00</p>
            <p>- Status: Menunggu Konfirmasi</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => navigate("/todo")}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Accept
              </button>
              <button className="px-4 py-1 bg-red-400 text-white rounded-md">
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
