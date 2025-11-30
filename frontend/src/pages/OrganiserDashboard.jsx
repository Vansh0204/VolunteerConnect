import React from "react";
import { getUser, clearAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

export default function OrganiserDashboard() {
  const user = getUser();
  const navigate = useNavigate();
  const logout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-2 border-[#111] pb-4">
          <h1 className="text-3xl font-bold">Organiser Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="font-medium">Welcome, {user?.name}</span>
            <button onClick={logout} className="border-2 border-[#111] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold">Logout</button>
          </div>
        </div>

        <div className="bg-white border-2 border-[#111] shadow-[8px_8px_0_#111] rounded-xl p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Coming Soon! 🚧</h2>
          <p className="text-lg text-gray-600">
            The Organiser Dashboard is currently under construction.
            <br />
            Member 4 will be implementing the features here.
          </p>
        </div>
      </div>
    </div>
  );
}
