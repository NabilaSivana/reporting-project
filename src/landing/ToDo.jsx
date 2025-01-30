import React from "react";
import { useNavigate } from "react-router-dom";

const Todo = ({ isSidebarOpen, todoList }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`transition-all duration-300 p-6 mt-20 ${
        isSidebarOpen ? "ml-64" : "ml-20"
      } max-w-full`}
    >
      <h2 className="font-semibold text-lg mb-4">ToDo List</h2>
      <input
        className="border rounded-md p-2 w-full mb-4"
        placeholder="Search"
      />

      {todoList.length === 0 ? (
        <p className="text-gray-500">Tidak ada tugas saat ini.</p>
      ) : (
        todoList.map((task, index) => (
          <div
            key={index}
            className="border p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
          >
            <div className="flex-1">
              <p className="font-bold text-base sm:text-lg">{task.name}</p>
              <p className="text-gray-500 text-sm sm:text-base">
                Tenggat: {task.deadline}
              </p>
            </div>
            <button
              className="mt-2 sm:mt-0 px-4 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-200"
              onClick={() => navigate("/todo/report")}
            >
              Report
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Todo;
