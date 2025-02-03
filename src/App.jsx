import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./landing/LoginForm";
import Dashboard from "./landing/Dashboard";
import Todo from "./landing/ToDo";
import Report from "./landing/Report";
import Sidebar from "./components/Sidebar";
import Header from "./components/HeaderTemp";

// Layout for the main page with Sidebar and Header
const MainLayout = ({ children }) => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex-1">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="p-6 bg-gray-100">{children(isSidebarOpen)}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              {(isSidebarOpen) => <Dashboard isSidebarOpen={isSidebarOpen} />}
            </MainLayout>
          }
        />

        <Route
          path="/todo"
          element={
            <MainLayout>
              {(isSidebarOpen) => <Todo isSidebarOpen={isSidebarOpen} />}
            </MainLayout>
          }
        />

        <Route
          path="/todo/report"
          element={
            <MainLayout>
              {(isSidebarOpen) => <Report isSidebarOpen={isSidebarOpen} />}
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
