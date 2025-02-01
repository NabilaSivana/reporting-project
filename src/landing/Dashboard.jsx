import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

  const handleAccept = () => {
    setTodoList((prev) => [
      ...prev,
      { name: "Judul Pelayanan", deadline: "6 Januari" },
    ]);
    navigate("/todo"); // Navigate to the ToDo page after pressing Accept
  };

  return (
    <div
      className={`transition-all duration-300 p-6 mt-20 grid gap-6 grid-cols-1 md:grid-cols-3 ${
        isSidebarOpen ? "ml-5" : "ml-5"
      }`}
    >
      {/* Calendar Section */}
      <div className="col-span-2 bg-white p-6 rounded-md shadow-md h-[500px] w-full overflow-x-auto">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", minWidth: "300px" }} // Make calendar take full height and adjust for small screens
          views={["month", "week", "day"]}
          className="custom-calendar"
        />
      </div>

      {/* Report Section */}
      <div className="bg-white p-6 rounded-md shadow-md h-[500px] w-full">
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
                className="px-4 py-1 bg-green-500 text-white rounded-md"
                onClick={handleAccept}
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
