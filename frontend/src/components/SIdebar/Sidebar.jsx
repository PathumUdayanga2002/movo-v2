import {
  FaCalendar,
  FaCog,
  FaHome,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { NotificationDropdown } from './Notifications';

const Sidebar = ({ onToggle, isMobile }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    alert("logout successfully");
    // Redirect to login page
    navigate("/");
  };
  
  return (
    <div className="w-72 bg-white shadow-lg h-screen font-poppins flex flex-col overflow-y-auto sidebar-font sidebar-scrollbar">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-4xl font-bold text-orange-500 text-center tracking-tight">MOVO</h2>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        {/* Main Menu */}
        <div className="mb-8 sidebar-section-spacing">
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4 px-2">Main Menu</h3>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/dashboard" 
                className="flex items-center px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group sidebar-link-hover sidebar-focus"
              >
                <RiDashboardFill className="mr-3 text-lg group-hover:text-orange-600 flex-shrink-0" />
                <span className="font-medium text-sm">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/calendar" 
                className="flex items-center px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group sidebar-link-hover sidebar-focus"
              >
                <FaCalendar className="mr-3 text-lg group-hover:text-orange-600 flex-shrink-0" />
                <span className="font-medium text-sm">Calendar</span>
              </Link>
            </li>
            <li>
              <div className="px-3 py-1 notification-dropdown-container">
                <NotificationDropdown />
              </div>
            </li>
            <li>
              <Link 
                to="/home" 
                className="flex items-center px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group sidebar-link-hover sidebar-focus"
              >
                <FaHome className="mr-3 text-lg group-hover:text-orange-600 flex-shrink-0" />
                <span className="font-medium text-sm">Home</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Other Menu */}
        <div className="sidebar-section-spacing">
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4 px-2">Settings</h3>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/profile" 
                className="flex items-center px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group sidebar-link-hover sidebar-focus"
              >
                <FaUser className="mr-3 text-lg group-hover:text-orange-600 flex-shrink-0" />
                <span className="font-medium text-sm">Profile</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className="flex items-center px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group sidebar-link-hover sidebar-focus"
              >
                <FaCog className="mr-3 text-lg group-hover:text-orange-600 flex-shrink-0" />
                <span className="font-medium text-sm">Settings</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/help" 
                className="flex items-center px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group sidebar-link-hover sidebar-focus"
              >
                <FaQuestionCircle className="mr-3 text-lg group-hover:text-orange-600 flex-shrink-0" />
                <span className="font-medium text-sm">Help Center</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* User Info & Logout Section */}
      <div className="flex-shrink-0 p-4 border-t border-gray-100">
        {/* User Info */}
        <div className="mb-3 px-3 py-2 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-900">
            {localStorage.getItem('name') || 'User'}
          </div>
          <div className="text-xs text-gray-500 capitalize">
            {localStorage.getItem('role') || 'Member'}
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 group sidebar-focus"
        >
          <FaSignOutAlt className="mr-3 text-lg flex-shrink-0" />
          <span className="font-medium text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  onToggle: PropTypes.func,
  isMobile: PropTypes.bool,
};

Sidebar.defaultProps = {
  onToggle: null,
  isMobile: false,
};

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
