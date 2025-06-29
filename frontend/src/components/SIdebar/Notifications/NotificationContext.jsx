import React, { createContext, useContext, useReducer, useCallback } from 'react';

const NotificationContext = createContext();

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  PRESENTATION: 'presentation',
  SCHEDULE: 'schedule'
};

// Action types
const ACTIONS = {
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  MARK_AS_READ: 'MARK_AS_READ',
  MARK_ALL_AS_READ: 'MARK_ALL_AS_READ',
  CLEAR_ALL: 'CLEAR_ALL'
};

// Initial state
const initialState = {
  notifications: [
    // Sample notifications for demonstration
    {
      id: 1,
      title: 'Presentation Scheduled',
      message: 'Your presentation "AI in Modern Business" is scheduled for tomorrow at 2:00 PM',
      type: NOTIFICATION_TYPES.PRESENTATION,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Upload Complete',
      message: 'Your presentation file has been successfully uploaded',
      type: NOTIFICATION_TYPES.SUCCESS,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Schedule Reminder',
      message: 'You have a presentation in 30 minutes. Please prepare your materials.',
      type: NOTIFICATION_TYPES.WARNING,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      read: true,
      priority: 'high'
    }
  ]
};

// Reducer function
function notificationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          {
            id: Date.now(),
            timestamp: new Date(),
            read: false,
            priority: 'medium',
            ...action.payload
          },
          ...state.notifications
        ]
      };

    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };

    case ACTIONS.MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };

    case ACTIONS.MARK_ALL_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true
        }))
      };

    case ACTIONS.CLEAR_ALL:
      return {
        ...state,
        notifications: []
      };

    default:
      return state;
  }
}

// Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Action creators
  const addNotification = useCallback((notification) => {
    dispatch({
      type: ACTIONS.ADD_NOTIFICATION,
      payload: notification
    });
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({
      type: ACTIONS.REMOVE_NOTIFICATION,
      payload: id
    });
  }, []);

  const markAsRead = useCallback((id) => {
    dispatch({
      type: ACTIONS.MARK_AS_READ,
      payload: id
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    dispatch({
      type: ACTIONS.MARK_ALL_AS_READ
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    dispatch({
      type: ACTIONS.CLEAR_ALL
    });
  }, []);

  // Computed values
  const unreadCount = state.notifications.filter(n => !n.read).length;
  const hasUnread = unreadCount > 0;

  const value = {
    notifications: state.notifications,
    unreadCount,
    hasUnread,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
