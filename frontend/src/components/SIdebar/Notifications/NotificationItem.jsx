import { 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaInfoCircle, 
  FaTimesCircle,
  FaClock,
  FaDesktop
} from 'react-icons/fa';
import { NOTIFICATION_TYPES } from './NotificationContext';

const NotificationItem = ({ 
  notification, 
  onMarkAsRead, 
  onRemove,
  compact = false 
}) => {
  const { id, title, message, type, timestamp, read, priority } = notification;

  // Get icon based on notification type
  const getNotificationIcon = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return <FaCheckCircle className="text-green-500" size={16} />;
      case NOTIFICATION_TYPES.WARNING:
        return <FaExclamationTriangle className="text-yellow-500" size={16} />;
      case NOTIFICATION_TYPES.ERROR:
        return <FaTimesCircle className="text-red-500" size={16} />;
      case NOTIFICATION_TYPES.PRESENTATION:
        return <FaDesktop className="text-orange-500" size={16} />;
      case NOTIFICATION_TYPES.SCHEDULE:
        return <FaClock className="text-blue-500" size={16} />;
      default:
        return <FaInfoCircle className="text-blue-500" size={16} />;
    }
  };

  // Get priority styling
  const getPriorityStyles = () => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      case 'low':
        return 'border-l-4 border-green-500';
      default:
        return 'border-l-4 border-gray-300';
    }
  };

  // Format timestamp
  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleClick = () => {
    if (!read) {
      onMarkAsRead(id);
    }
  };

  if (compact) {
    return (
      <div 
        className={`flex items-center p-2 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${!read ? 'bg-orange-50' : ''}`}
        onClick={handleClick}
      >
        <div className="flex-shrink-0 mr-2">
          {getNotificationIcon()}
        </div>
        <div className="flex-grow min-w-0">
          <p className={`truncate ${!read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
            {title}
          </p>
          <p className="text-xs text-gray-500 truncate">{message}</p>
        </div>
        {!read && (
          <div className="flex-shrink-0 ml-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${getPriorityStyles()} ${!read ? 'bg-orange-50' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-grow">
          <div className="flex-shrink-0 mt-1">
            {getNotificationIcon()}
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${!read ? 'text-gray-900' : 'text-gray-700'} truncate`}>
                {title}
              </h4>
              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                {formatTimestamp(timestamp)}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {message}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                priority === 'high' ? 'bg-red-100 text-red-800' :
                priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {priority} priority
              </span>
              {!read && (
                <span className="text-xs text-orange-600 font-medium">New</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            title="Remove notification"
          >
            <FaTimesCircle size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
