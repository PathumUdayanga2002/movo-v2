import React, { useState } from "react";
import {
  FaBell,
  FaCalendar,
  FaCog,
  FaHome,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationCount] = useState(3); // Example notification count
  
  // Get user role to determine dashboard path
  const userRole = localStorage.getItem("role");
  const dashboardPath = userRole === "admin" ? "/admin-dashboard" : "/presenter-dashboard";

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    alert("Logout successful!");
    // Redirect to login page
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const mainMenuItems = [
    {
      icon: RiDashboardFill,
      label: "Dashboard",
      path: dashboardPath,
      isActive: location.pathname.includes("dashboard") || location.pathname === "/admin-dashboard" || location.pathname === "/presenter-dashboard"
    },
    {
      icon: FaCalendar,
      label: "Calendar",
      path: "/calendar",
      isActive: isActive("/calendar")
    },
    {
      icon: FaBell,
      label: "Notifications",
      path: "/notifications",
      badge: notificationCount,
      isActive: isActive("/notifications")
    },
    {
      icon: FaHome,
      label: "Home",
      path: "/",
      isActive: isActive("/")
    }
  ];

  const otherMenuItems = [
    {
      icon: FaUser,
      label: "Profile",
      path: "/profile",
      isActive: isActive("/profile")
    },
    {
      icon: FaCog,
      label: "Settings",
      path: "/settings",
      isActive: isActive("/settings")
    },
    {
      icon: FaQuestionCircle,
      label: "Help Center",
      path: "/help",
      isActive: isActive("/help")
    }
  ];

  return (
    <div className="modern-sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <h2>MOVO</h2>
      </div>

      {/* Main Menu */}
      <nav className="nav-section">
        <h3 className="nav-title">Main Menu</h3>
        <ul className="nav-list">
          {mainMenuItems.map((item, index) => (
            <li key={index} className="nav-item">
              {item.path ? (
                <Link 
                  to={item.path} 
                  className={`nav-link ${item.isActive ? 'active' : ''}`}
                >
                  <item.icon className="nav-icon" />
                  {item.label}
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </Link>
              ) : (
                <div className="nav-link">
                  <item.icon className="nav-icon" />
                  {item.label}
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      <div className="nav-divider"></div>

      {/* Other Menu */}
      <nav className="nav-section">
        <h3 className="nav-title">Other Menu</h3>
        <ul className="nav-list">
          {otherMenuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${item.isActive ? 'active' : ''}`}
              >
                <item.icon className="nav-icon" />
                {item.label}
              </Link>
            </li>
          ))}
          
          {/* Logout Item */}
          <li className="nav-item">
            <button
              onClick={handleLogout}
              className="nav-link logout"
              style={{ 
                width: '100%', 
                textAlign: 'left', 
                border: 'none', 
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}
            >
              <FaSignOutAlt className="nav-icon" />
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

// import React from 'react'
// import { FaHome, FaCalendar, FaBell, FaUser, FaCog, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';

// const Sidebar = () => {
//   return (
//     <div className=' w-64 bg-slate-300 p-4'>
//         <h1>MOVO</h1>
//         <nav>
//             <h1>Main Menu</h1>
//             <ul></ul>
//         </nav>
//     </div>
//   )
// }

// export default Sidebar
