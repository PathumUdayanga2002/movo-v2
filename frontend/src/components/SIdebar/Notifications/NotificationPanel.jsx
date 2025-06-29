import { useState } from 'react';
import { FaBell, FaPlus, FaList, FaCog } from 'react-icons/fa';
import { useNotifications, NOTIFICATION_TYPES } from './NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationPanel = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp'); // 'timestamp', 'priority', 'type'
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    addNotification
  } = useNotifications();

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'read':
        return notification.read;
      case 'high-priority':
        return notification.priority === 'high';
      case 'presentations':
        return notification.type === NOTIFICATION_TYPES.PRESENTATION || 
               notification.type === NOTIFICATION_TYPES.SCHEDULE;
      default:
        return true;
    }
  });

  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    switch (sortBy) {
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      case 'type':
        return a.type.localeCompare(b.type);
      default: // timestamp
        return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  const handleCreateNotification = (formData) => {
    addNotification({
      title: formData.title,
      message: formData.message,
      type: formData.type,
      priority: formData.priority
    });
    setShowCreateForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FaBell className="text-orange-500" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {unreadCount} unread
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <FaPlus size={14} />
            <span>Add</span>
          </button>
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
              unreadCount > 0
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Mark all read
          </button>
          <button
            onClick={() => {
              if (window.confirm('Clear all notifications?')) {
                clearAllNotifications();
              }
            }}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <FaList className="text-gray-500" size={16} />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All ({notifications.length})</option>
            <option value="unread">Unread ({unreadCount})</option>
            <option value="read">Read ({notifications.length - unreadCount})</option>
            <option value="high-priority">High Priority</option>
            <option value="presentations">Presentations</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <FaCog className="text-gray-500" size={16} />
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="timestamp">Date</option>
            <option value="priority">Priority</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>

      {/* Create Notification Form */}
      {showCreateForm && (
        <CreateNotificationForm
          onSubmit={handleCreateNotification}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* Notifications List */}
      <div className="space-y-2">
        {sortedNotifications.length === 0 ? (
          <div className="text-center py-12">
            <FaBell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You don't have any notifications yet."
                : `No ${filter} notifications found.`}
            </p>
          </div>
        ) : (
          sortedNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onRemove={removeNotification}
              compact={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Create Notification Form Component
const CreateNotificationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: NOTIFICATION_TYPES.INFO,
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.message.trim()) {
      onSubmit(formData);
      setFormData({ title: '', message: '', type: NOTIFICATION_TYPES.INFO, priority: 'medium' });
    }
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Notification</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter notification title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {Object.values(NOTIFICATION_TYPES).map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter notification message"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Create Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationPanel;
