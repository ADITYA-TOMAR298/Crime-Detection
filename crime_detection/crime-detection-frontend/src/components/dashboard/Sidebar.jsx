import {
  LayoutDashboard,
  History,
  Camera,
  User,
  UserRoundPlus,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

export default function Sidebar() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Logout failed. Please try again.");
    }
  };

  const menus = [

    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "History",
      path: "/history",
      icon: History,
    },

    {
      title: "Camera Setup",
      path: "/camera-setup",
      icon: Camera,
    },

    {
      title: "Profile",
      path: "/profile",
      icon: User,
    },

    {
      title: "Add Criminal Information",
      path: "/criminals",
      icon: UserRoundPlus,
    },

  ];

  return (

    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-[calc(100vh-80px)]">

      <div className="p-6">

        {menus.map((menu) => (

          <NavLink
            key={menu.title}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl mb-2 transition ${
                isActive
                  ? "bg-red-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >

            <menu.icon size={22} />

            {menu.title}

          </NavLink>

        ))}

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 w-full"
        >

          <LogOut size={22} />

          Logout

        </button>

      </div>

    </aside>

  );

}
