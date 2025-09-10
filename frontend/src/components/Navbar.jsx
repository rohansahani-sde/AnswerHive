import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      toast.success("Logout successfully!");
      navigate("/login");
    }else{
      toast.info("Logout cancelled!");
    }
  };
  // if (window.confirm("Are you sure you want to logout?")) {
  // }

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim()) {
        navigate(`/search?search=${encodeURIComponent(search)}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111827] border-b border-gray-800 px-6 py-3 flex justify-between items-center shadow-md">
      <h1
        onClick={() => navigate("/questions")}
        className="text-2xl font-bold text-blue-400 cursor-pointer"
      >
        AnswerHive
      </h1>

      <nav className="flex items-center gap-4">
        <Link to="/ask">
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium text-white">
            Ask Question
          </button>
        </Link>

        <Link to="/notifications" className="hover:text-blue-400">
          🔔
        </Link>

        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="bg-gray-800 text-gray-300 px-3 py-2 rounded-lg text-sm outline-none w-60 focus:ring-2 focus:ring-blue-500"
        />

        {token ? (
          <button
            onClick={handleLogout}
            className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300">
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
