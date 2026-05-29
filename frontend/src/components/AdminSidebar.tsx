import { NavLink, useNavigate } from "react-router-dom"
import { logoutUser } from "../api/authApi";

const AdminSidebar = () => {
  const baseClass = "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-150";
  const activeClass = "bg-gray-800 text-white";

  const navigate = useNavigate();

  const logout = async() => {
    try {
        await logoutUser();
        navigate("/");
    }
    catch(error) {
        console.log(error);
    }
  }

  return (
    <div className="h-screen w-60 bg-gray-900 border-r border-gray-800 flex flex-col px-4 py-6">
      <div className="mb-8 px-4">
        <h2 className="text-white text-lg font-bold tracking-tight">Admin Panel</h2>
        <p className="text-gray-500 text-xs mt-0.5">Manage your workspace</p>
      </div>

      <nav className="flex flex-col gap-1">
        <NavLink
          to="/admin"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Dashboard
        </NavLink>

        <NavLink
          to="/room"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M3 10h18M3 14h18M10 3v18M14 3v18" strokeLinecap="round" />
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
          Meeting Room
        </NavLink>

        <NavLink
          to="/user"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
          </svg>
          Users
        </NavLink>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-150 cursor-pointer"
            onClick={logout}>
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
          </svg>
          Logout
        </button>
      </div>

    </div>
  );
};

export default AdminSidebar;
