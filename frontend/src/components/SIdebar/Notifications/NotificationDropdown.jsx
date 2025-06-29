import { useState, useRef, useEffect } from 'react';
import { FaBell, FaTimes, FaCheckDouble, FaTrash } from 'react-icons/fa';
import { useNotifications } from './NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const dropdownRef = useRef(null);
  
  const {
    notifications,
    unreadCount,
    hasUnread,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  } = useNotifications();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'read':
        return notification.read;
      default:
        return true;
    }
  });

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      clearAllNotifications();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={handleToggleDropdown}
        className="relative flex items-center w-full text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 px-0 py-1 rounded-lg group"
        title={`${unreadCount} unread notifications`}
      >
        <FaBell className="mr-3 text-lg group-hover:text-orange-600" size={18} />
        <span className="font-medium">Notifications</span>
        
        {/* Unread Badge */}
        {hasUnread && (
          <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full notification-badge-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="notification-dropdown-panel bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden notification-dropdown">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={handleToggleDropdown}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 sidebar-focus"
              >
                <FaTimes size={16} />
              </button>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1 mt-2">
              {['all', 'unread', 'read'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 sidebar-focus ${
                    filter === filterType
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {filterType === 'all' ? `All (${notifications.length})` :
                   filterType === 'unread' ? `Unread (${unreadCount})` :
                   `Read (${notifications.length - unreadCount})`}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between">
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={!hasUnread}
                  className={`flex items-center space-x-1 text-xs font-medium transition-colors duration-200 ${
                    hasUnread
                      ? 'text-orange-600 hover:text-orange-700'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaCheckDouble size={12} />
                  <span>Mark all read</span>
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex items-center space-x-1 text-xs font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  <FaTrash size={12} />
                  <span>Clear all</span>
                </button>
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FaBell size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm">
                  {filter === 'unread' ? 'No unread notifications' :
                   filter === 'read' ? 'No read notifications' :
                   'No notifications yet'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Notifications will appear here when you receive them
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.slice(0, 10).map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onRemove={removeNotification}
                    compact={true}
                  />
                ))}
                
                {/* Show More Button */}
                {filteredNotifications.length > 10 && (
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                      View {filteredNotifications.length - 10} more notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
