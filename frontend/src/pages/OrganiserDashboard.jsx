import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser, clearAuth } from '../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { organiserService } from '../services/organiser.service';

function OrganiserDashboard() {
  const user = getUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalVolunteers: 0,
    recentEvents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await organiserService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-[6vw] py-5 bg-white border-b-0">
        <Link to="/" className="text-2xl font-bold text-[#2362ef]">
          Volunteer Connect
        </Link>
        <div className="flex items-center space-x-3">
          <span className="text-[#616161]">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border-[3px] border-[#111] shadow-[6px_6px_0_#111] font-bold bg-white text-[#111] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[8px_8px_0_#111]"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-[6vw] py-10 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#222]">
            Organiser <span className="text-[#2362ef]">Dashboard</span>
          </h1>
          <Link
            to="/events/create"
            className="px-8 py-3 border-[3px] border-[#111] shadow-[6px_6px_0_#111] font-bold bg-[#2362ef] text-white transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[8px_8px_0_#111]"
          >
            + Create Event
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border-[3px] border-[#111] shadow-[6px_6px_0_#111] rounded-lg p-6">
            <div className="text-4xl font-extrabold text-[#2362ef] mb-2">{stats.totalEvents}</div>
            <div className="text-[#616161] font-bold">Total Events</div>
          </div>
          <div className="bg-white border-[3px] border-[#111] shadow-[6px_6px_0_#111] rounded-lg p-6">
            <div className="text-4xl font-extrabold text-[#2362ef] mb-2">{stats.activeEvents}</div>
            <div className="text-[#616161] font-bold">Active Events</div>
          </div>
          <div className="bg-white border-[3px] border-[#111] shadow-[6px_6px_0_#111] rounded-lg p-6">
            <div className="text-4xl font-extrabold text-[#2362ef] mb-2">{stats.totalVolunteers}</div>
            <div className="text-[#616161] font-bold">Total Volunteers</div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white border-[3px] border-[#111] shadow-[8px_8px_0_#111] rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#222]">Recent Events</h2>
            <Link to="/events" className="text-[#2362ef] font-bold hover:underline">
              View All Events →
            </Link>
          </div>

          {loading ? (
            <p className="text-[#616161]">Loading events...</p>
          ) : stats.recentEvents.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[#616161] mb-4">No events created yet.</p>
              <Link
                to="/events/create"
                className="text-[#2362ef] font-bold hover:underline"
              >
                Create your first event
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border-[2px] border-[#eee] rounded hover:bg-[#fafafa]">
                  <div>
                    <h3 className="font-bold text-lg text-[#222]">{event.title}</h3>
                    <p className="text-sm text-[#616161]">
                      {new Date(event.date).toLocaleDateString()} • {event.locationText}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-[#616161]">
                      {event._count?.signups || 0} Volunteers
                    </span>
                    <Link
                      to={`/events/${event.id}/signups`}
                      className="px-4 py-2 border-[2px] border-[#111] text-sm font-bold bg-white text-[#111] hover:bg-gray-100"
                    >
                      Manage
                    </Link>
                    <Link
                      to={`/events/${event.id}/edit`}
                      className="px-4 py-2 border-[2px] border-[#111] text-sm font-bold bg-white text-[#111] hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-6 text-[#999] text-base mt-8">
        © 2025 Volunteer Connect — Built with <span className="text-[#e83e8c] text-xl">♥</span>
      </footer>
    </div>
  );
}

export default OrganiserDashboard;
