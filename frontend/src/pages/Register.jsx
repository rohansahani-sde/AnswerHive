import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import {  toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await api.post("/auth/register", form);

      // Save token + userId
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);

      setMessage("✅ User registered successfully!");
      toast.success("User registered successfully!");
      // console.log("Registered:", res.data);

      navigate("/questions");
    } catch (err) {
      console.log("Register error:", err.response?.data);
      setMessage(err.response?.data?.message || "❌ Error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-gray-700">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
          Create Account ✨
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Join us and start asking & answering!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition font-semibold shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("success")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Extra Links */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
