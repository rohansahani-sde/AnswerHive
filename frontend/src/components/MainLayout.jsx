import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#0f1117] text-gray-200 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="flex">
        <Sidebar />

        {/* Main content with margin to avoid overlap */}
        <main className="flex-1 ml-64 mt-16 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
