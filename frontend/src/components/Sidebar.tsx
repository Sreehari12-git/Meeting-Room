import { NavLink, useNavigate } from "react-router-dom"
import { getCurrentUser, logoutUser } from "../api/authApi";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getCurrentUser();
      setRole(response.data.role);
    }
    fetchUser();
  }, [])

  const logout = async () => {
    try {
      await logoutUser();
      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <aside className="flex flex-col h-screen w-64 bg-gray-900 text-gray-300 px-4 py-8 shadow-xl">
      <div className="mb-10 px-2">
        <h1 className="text-white text-xl font-bold tracking-widest uppercase">RoomBook</h1>
        <p className="text-gray-500 text-xs mt-1 tracking-wider">{role}</p>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {role === "ADMIN" && (
          <>
            <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
              ${isActive? "bg-indigo-600 text-white shadow-md": "hover:bg-gray-800 hover:text-white"}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/create-room"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Add Room
            </NavLink>
            <NavLink
              to="/create-user"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Add User
            </NavLink>
          </>
        )}

        {role === "EMPLOYEE" && (
          <>
            <NavLink
              to="/check-availability"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Check Availability
            </NavLink>
            <NavLink
              to="/book-room"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Book Room
            </NavLink>
            <NavLink
              to="/booking-history"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Booking History
            </NavLink>
          </>
        )}
      </nav>

      {/* Divider + Logout */}
      <div className="border-t border-gray-700 pt-4 mt-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;