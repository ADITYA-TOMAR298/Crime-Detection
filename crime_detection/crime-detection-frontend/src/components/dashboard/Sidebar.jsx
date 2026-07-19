import {
  LayoutDashboard,
  History,
  Bell,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar() {

  const menus = [

    {
      title: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "History",
      icon: History,
    },

    {
      title: "Alerts",
      icon: Bell,
    },

    {
      title: "Settings",
      icon: Settings,
    },

    {
      title: "Profile",
      icon: User,
    },

  ];

  return (

    <aside className="w-72 border-r border-slate-800 min-h-[calc(100vh-80px)] bg-slate-900">

      <div className="p-6">

        {menus.map((menu) => (

          <button
            key={menu.title}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 transition mb-2"
          >

            <menu.icon size={22} />

            {menu.title}

          </button>

        ))}

      </div>

    </aside>

  );

}