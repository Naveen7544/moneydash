import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Flame, Star, Video, LineChart, Wallet } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard /> },
  { name: "Trending", path: "/trending", icon: <Flame /> },
  { name: "Editors Picks", path: "/editors-picks", icon: <Star /> },
  { name: "Videos", path: "/videos", icon: <Video /> },
  { name: "Markets", path: "/markets", icon: <LineChart /> },
  { name: "Portfolio", path: "/portfolio", icon: <Wallet /> },
];

function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-slate-800 p-6 text-white">
      <h2 className="text-2xl font-bold text-emerald-400 mb-8">MoneyDash</h2>
      <nav className="flex flex-col space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700 transition ${
                isActive ? "bg-emerald-600 text-white" : "text-slate-300"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
