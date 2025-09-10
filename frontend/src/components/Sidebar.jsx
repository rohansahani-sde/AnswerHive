import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("token");
          toast.success("Logout successfully!");
          navigate("/login");
        }else{
          toast.info("Logout cancelled!");
        }
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#1B1F29] shadow-lg flex flex-col transform transition-transform duration-300 z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* <div className="p-6 text-xl font-bold text-blue-400 text-center border-b border-white/10">
        🚀 QnA Hub
      </div> */}

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link
          to="/questions"
          className="block px-4 py-2 rounded-md text-gray-300 hover:bg-[#2C363F] hover:text-white transition"
          onClick={toggleSidebar}
        >
          ❓ Questions
        </Link>
        <Link
          to="/questions/me"
          className="block px-4 py-2 rounded-md text-gray-300 hover:bg-[#2C363F] hover:text-white transition"
          onClick={toggleSidebar}
        >
          🔗 My Questions
        </Link>
        <Link
          to="/me"
          className="block px-4 py-2 rounded-md text-gray-300 hover:bg-[#2C363F] hover:text-white transition"
          onClick={toggleSidebar}
        >
          👤 Profile
        </Link>
        <Link
          to="/edit"
          className="block px-4 py-2 rounded-md text-gray-300 hover:bg-[#2C363F] hover:text-white transition"
          onClick={toggleSidebar}
        >
          ✏️ Edit Profile
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
      >
        🚪 Logout
      </button>
    </aside>
  );
};

export default Sidebar;
