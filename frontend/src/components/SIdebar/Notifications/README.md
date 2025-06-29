# MOVO Notification System

A comprehensive notification system for the MOVO presentation management platform, featuring real-time notifications, priority management, and seamless integration with existing components.

## Features

- **Real-time notifications** with socket.io integration
- **Priority-based notifications** (high, medium, low)
- **Multiple notification types** (info, success, warning, error, presentation, schedule)
- **Dropdown notification panel** in sidebar
- **Full notification management page**
- **Auto-notifications** for system events
- **Mark as read/unread functionality**
- **Notification filtering and sorting**
- **Responsive design** with Tailwind CSS

## Components

### 1. NotificationProvider
Wrap your app with this provider to enable notifications throughout the application.

```jsx
import { NotificationProvider } from './components/SIdebar/Notifications';

function App() {
  return (
    <NotificationProvider>
      <YourAppContent />
    </NotificationProvider>
  );
}
```

### 2. NotificationDropdown
A compact notification dropdown for the sidebar.

```jsx
import { NotificationDropdown } from './components/SIdebar/Notifications';

// Already integrated in Sidebar component
<NotificationDropdown />
```

### 3. NotificationPanel
A full-page notification management interface.

```jsx
import { NotificationPanel } from './components/SIdebar/Notifications';

// Available at /notifications route
<Route path="/notifications" element={<NotificationPanel />} />
```

### 4. NotificationItem
Individual notification display component (used internally).

## Hooks

### useNotifications
Access and manage notifications from any component.

```jsx
import { useNotifications } from './components/SIdebar/Notifications';

function MyComponent() {
  const {
    notifications,
    unreadCount,
    hasUnread,
    addNotification,
    markAsRead,
    removeNotification,
    clearAllNotifications
  } = useNotifications();

  const handleAddNotification = () => {
    addNotification({
      title: 'New Notification',
      message: 'This is a test notification',
      type: 'info',
      priority: 'medium'
    });
  };

  return (
    <div>
      <p>Unread notifications: {unreadCount}</p>
      <button onClick={handleAddNotification}>Add Notification</button>
    </div>
  );
}
```

### useMovoNotifications
Pre-built notification functions for common MOVO events.

```jsx
import { useMovoNotifications } from './components/SIdebar/Notifications';

function UploadComponent() {
  const { notifyFileUploaded, notifyError } = useMovoNotifications();

  const handleFileUpload = async (file) => {
    try {
      await uploadFile(file);
      notifyFileUploaded(file.name);
    } catch (error) {
      notifyError('Failed to upload file');
    }
  };

  return <FileUploadForm onUpload={handleFileUpload} />;
}
```

### useAutoNotifications
Automatically set up notifications for system events.

```jsx
import { useAutoNotifications } from './components/SIdebar/Notifications';

function Dashboard() {
  useAutoNotifications(); // Sets up automatic notifications
  
  return <DashboardContent />;
}
```

## Notification Types

- `info` - General information (blue icon)
- `success` - Success messages (green icon)
- `warning` - Warning messages (yellow icon)
- `error` - Error messages (red icon)
- `presentation` - Presentation-related (orange icon)
- `schedule` - Schedule-related (blue clock icon)

## Priority Levels

- `high` - Red border, urgent notifications
- `medium` - Yellow border, normal notifications
- `low` - Green border, low priority notifications

## Integration Examples

### 1. File Upload Integration

```jsx
import { useMovoNotifications } from './components/SIdebar/Notifications';

function FileUploadComponent() {
  const { notifyFileUploaded, notifyError } = useMovoNotifications();

  const handleUpload = async (file) => {
    try {
      const result = await uploadFile(file);
      notifyFileUploaded(file.name);
    } catch (error) {
      notifyError(`Upload failed: ${error.message}`);
    }
  };
}
```

### 2. Presentation Scheduling

```jsx
import { useMovoNotifications } from './components/SIdebar/Notifications';

function SchedulePresentation() {
  const { notifyPresentationScheduled } = useMovoNotifications();

  const handleSchedule = (presentationData) => {
    // Schedule presentation logic...
    notifyPresentationScheduled(presentationData);
  };
}
```

### 3. Timer Warnings

```jsx
import { useMovoNotifications } from './components/SIdebar/Notifications';

function CountdownTimer() {
  const { notifyTimerWarning } = useMovoNotifications();

  useEffect(() => {
    if (timeRemaining <= 300) { // 5 minutes remaining
      notifyTimerWarning(timeRemaining);
    }
  }, [timeRemaining]);
}
```

### 4. Email Notifications

```jsx
import { useMovoNotifications } from './components/SIdebar/Notifications';

function EmailSystem() {
  const { notifyEmailReceived } = useMovoNotifications();

  useEffect(() => {
    socket.on('email_received', (emailData) => {
      notifyEmailReceived(emailData.from, emailData.subject);
    });
  }, []);
}
```

## Styling

The notification system uses Tailwind CSS classes and follows the MOVO design system:

- **Primary Color**: Orange (#EE8100)
- **Font**: Poppins
- **Consistent spacing and shadows**
- **Responsive design**

## Socket.io Integration

The system is designed to work with your existing socket.io setup. Add these event listeners to receive real-time notifications:

```jsx
// In your socket setup
socket.on('presentation_reminder', (data) => {
  notifyPresentationReminder(data.presentation, data.minutesUntil);
});

socket.on('timer_warning', (data) => {
  notifyTimerWarning(data.timeRemaining);
});

socket.on('file_uploaded', (data) => {
  notifyFileUploaded(data.fileName);
});
```

## Demo

A demo component is available to test all notification types:

```jsx
import { NotificationDemo } from './components/SIdebar/Notifications';

// Use in development to test notifications
<NotificationDemo />
```

## Best Practices

1. **Use appropriate priority levels** - Reserve 'high' for urgent notifications
2. **Keep messages concise** - Users should understand at a glance
3. **Use appropriate notification types** - Match the icon to the content
4. **Don't spam notifications** - Batch similar notifications when possible
5. **Clean up old notifications** - Consider auto-removing old notifications

## Troubleshooting

### Notifications not appearing
- Ensure your component is wrapped with `NotificationProvider`
- Check that you're importing from the correct path
- Verify the notification context is available

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check that react-icons is installed
- Verify Poppins font is loaded

### Integration issues
- Check socket.io connection for real-time features
- Verify localStorage access for persistence
- Ensure proper error handling in notification triggers
