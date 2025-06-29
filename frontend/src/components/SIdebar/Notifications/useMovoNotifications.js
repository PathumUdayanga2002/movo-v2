import { useEffect } from 'react';
import { useNotifications, NOTIFICATION_TYPES } from './NotificationContext';

// Hook to integrate notifications with the MOVO system
export const useMovoNotifications = () => {
  const { addNotification } = useNotifications();

  // Create notification for presentation events
  const notifyPresentationScheduled = (presentation) => {
    addNotification({
      title: 'Presentation Scheduled',
      message: `Your presentation "${presentation.title}" is scheduled for ${new Date(presentation.dateTime).toLocaleString()}`,
      type: NOTIFICATION_TYPES.PRESENTATION,
      priority: 'high'
    });
  };

  const notifyPresentationReminder = (presentation, minutesUntil) => {
    addNotification({
      title: 'Presentation Reminder',
      message: `Your presentation "${presentation.title}" starts in ${minutesUntil} minutes. Please prepare your materials.`,
      type: NOTIFICATION_TYPES.WARNING,
      priority: 'high'
    });
  };

  const notifyPresentationStarted = (presentation) => {
    addNotification({
      title: 'Presentation Started',
      message: `Your presentation "${presentation.title}" has started. Good luck!`,
      type: NOTIFICATION_TYPES.INFO,
      priority: 'medium'
    });
  };

  const notifyFileUploaded = (fileName) => {
    addNotification({
      title: 'Upload Successful',
      message: `Your file "${fileName}" has been successfully uploaded and processed.`,
      type: NOTIFICATION_TYPES.SUCCESS,
      priority: 'medium'
    });
  };

  const notifyEmailReceived = (from, subject) => {
    addNotification({
      title: 'New Email',
      message: `New email from ${from}: ${subject}`,
      type: NOTIFICATION_TYPES.INFO,
      priority: 'medium'
    });
  };

  const notifyTimerWarning = (timeRemaining) => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    addNotification({
      title: 'Time Warning',
      message: `Only ${minutes}:${seconds.toString().padStart(2, '0')} remaining in your presentation!`,
      type: NOTIFICATION_TYPES.WARNING,
      priority: 'high'
    });
  };

  const notifySystemUpdate = (message) => {
    addNotification({
      title: 'System Update',
      message: message,
      type: NOTIFICATION_TYPES.INFO,
      priority: 'low'
    });
  };

  const notifyError = (error) => {
    addNotification({
      title: 'Error',
      message: error,
      type: NOTIFICATION_TYPES.ERROR,
      priority: 'high'
    });
  };

  return {
    notifyPresentationScheduled,
    notifyPresentationReminder,
    notifyPresentationStarted,
    notifyFileUploaded,
    notifyEmailReceived,
    notifyTimerWarning,
    notifySystemUpdate,
    notifyError
  };
};

// Hook to set up automatic notifications based on system events
export const useAutoNotifications = () => {
  const { notifyTimerWarning, notifyPresentationReminder } = useMovoNotifications();

  useEffect(() => {
    // Set up socket listeners for real-time notifications
    const setupSocketListeners = () => {
      // This would integrate with your existing socket.io setup
      // Example for timer warnings
      if (typeof window !== 'undefined' && window.socket) {
        window.socket.on('timer_warning', (data) => {
          if (data.timeRemaining <= 300) { // 5 minutes or less
            notifyTimerWarning(data.timeRemaining);
          }
        });

        // Clean up on unmount
        return () => {
          window.socket.off('timer_warning');
        };
      }
    };

    return setupSocketListeners();
  }, [notifyTimerWarning]);

  // Set up presentation reminders
  useEffect(() => {
    const checkUpcomingPresentations = () => {
      // This would check your schedule and create reminders
      // Implementation would depend on your schedule data structure
      const schedules = JSON.parse(localStorage.getItem('upcomingPresentations') || '[]');
      
      schedules.forEach(schedule => {
        const presentationTime = new Date(schedule.dateTime);
        const now = new Date();
        const timeDiff = presentationTime.getTime() - now.getTime();
        const minutesUntil = Math.floor(timeDiff / (1000 * 60));

        // Notify 30 minutes before and 5 minutes before
        if (minutesUntil === 30 || minutesUntil === 5) {
          notifyPresentationReminder(schedule, minutesUntil);
        }
      });
    };

    const interval = setInterval(checkUpcomingPresentations, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [notifyPresentationReminder]);
};

export default useMovoNotifications;
