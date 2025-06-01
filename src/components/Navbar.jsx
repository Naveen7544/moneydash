import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; 
import MostActiveStocks from "../pages/MostActiveStocks";
const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Markets", path: "/markets" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Trending", path: "/trending" },
  { name: "Strategy", path: "/strategy" },
  { name: "Videos", path: "/videos" },
  
  // { name: "Editors Picks", path: "/editors-picks" },
];

function Navbar() {
  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
     <NavLink to="/" className="flex items-center space-x-2">
  <div className="h-28 w-auto flex items-center"> 
    <img
      src={logo}
      alt="MoneyDash Logo"
      className="h-full w-auto object-contain"
    />
  </div>
</NavLink>


        {/* NAVIGATION LINKS */}
        <ul className="flex space-x-4 text-white font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-emerald-400 transition ${
                    isActive ? "text-emerald-400" : "text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <MostActiveStocks/>
    </nav>
    
  );
}

export default Navbar;

