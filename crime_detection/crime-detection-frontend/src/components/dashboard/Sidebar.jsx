import {
  LayoutDashboard,
  History,
  Camera,
  User,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

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
          className="mt-8 flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 w-full"
        >

          <LogOut size={22} />

          Logout

        </button>

      </div>

    </aside>

  );

}