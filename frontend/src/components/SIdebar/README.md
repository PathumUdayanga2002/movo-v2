# MOVO Sidebar Components

This directory contains all the sidebar-related components for the MOVO presentation management system. These components provide a comprehensive set of features for user interaction, notifications, profile management, settings, and help.

## 🚀 Components Overview

### 1. Notification System (`/Notifications`)
A complete notification management system with real-time updates and user interaction.

**Components:**
- `NotificationContext.jsx` - React Context for global notification state
- `NotificationDropdown.jsx` - Sidebar dropdown for quick notification access
- `NotificationPanel.jsx` - Full-page notification management
- `NotificationItem.jsx` - Individual notification component
- `useMovoNotifications.js` - Custom hooks for MOVO-specific notifications

**Features:**
- Real-time notification badges
- Filter by read/unread status
- Priority-based sorting
- Multiple notification types (info, success, warning, error, presentation, schedule)
- Mark as read/unread functionality
- Bulk actions (mark all read, clear all)

### 2. Profile Management (`/Profile`)
Comprehensive user profile management with editable information and activity statistics.

**Features:**
- Editable profile information (name, email, phone, bio)
- Profile image upload
- Activity statistics dashboard
- Role-based information display
- Form validation and error handling

### 3. Settings & Preferences (`/Settings`)
Detailed settings panel with categorized preferences for all aspects of MOVO.

**Categories:**
- **General:** Language, timezone, date format, theme
- **Notifications:** Email, push, presentation reminders
- **Privacy:** Profile visibility, data sharing preferences
- **Presentations:** Auto-save, default duration, timer warnings
- **Security:** Two-factor auth, session timeout, login notifications

**Features:**
- Tabbed interface for easy navigation
- Toggle switches for boolean settings
- Data export functionality
- Settings reset to defaults
- Real-time setting updates

### 4. Help Center (`/HelpCenter`)
Comprehensive help and support system with searchable content.

**Features:**
- Searchable FAQ system
- Categorized help articles
- Downloadable documentation (PDF guides)
- Video tutorials with thumbnails
- Contact information for support
- Expandable/collapsible FAQ items

### 5. Sidebar Integration (`/Sidebar.jsx`)
Updated main sidebar component with integrated notification dropdown and navigation links.

**Alignment Features:**
- **Responsive Design:** Automatically adapts to mobile, tablet, and desktop layouts
- **Fixed Positioning:** Consistent sidebar positioning across all screen sizes
- **Smart Layout:** AppLayout component handles sidebar visibility based on route
- **Mobile Optimization:** Collapsible sidebar with overlay for mobile devices
- **Smooth Transitions:** CSS animations for sidebar show/hide and hover effects
- **Focus Management:** Proper keyboard navigation and accessibility
- **Custom Scrollbar:** Styled scrollbar for better visual consistency

### 6. Layout Management (`/AppLayout.jsx`)
Comprehensive layout component that manages sidebar and content alignment.

**Features:**
- **Conditional Rendering:** Shows sidebar only for authenticated users and appropriate routes
- **Mobile-First Design:** Mobile menu button and overlay system
- **Responsive Breakpoints:** Automatic layout adjustments for different screen sizes
- **Content Spacing:** Proper padding and margins for optimal content readability
- **Z-Index Management:** Proper layering for overlays and dropdowns

## 🛠️ Installation & Setup

1. **Import the components in your App.jsx:**
```javascript
import { NotificationProvider, NotificationPanel } from "./components/SIdebar/Notifications";
import { Profile } from "./components/SIdebar/Profile";
import { Settings } from "./components/SIdebar/Settings";
import { HelpCenter } from "./components/SIdebar/HelpCenter";
```

2. **Wrap your app with NotificationProvider:**
```javascript
<NotificationProvider>
  <AppContent />
</NotificationProvider>
```

3. **Add routes to your router:**
```javascript
<Route path="/notifications" element={<NotificationPanel />} />
<Route path="/profile" element={<Profile />} />
<Route path="/settings" element={<Settings />} />
<Route path="/help" element={<HelpCenter />} />
```

## 📋 Usage Examples

### Using Notifications
```javascript
import { useNotifications, NOTIFICATION_TYPES } from './components/SIdebar/Notifications';

function MyComponent() {
  const { addNotification } = useNotifications();
  
  const handlePresentationScheduled = () => {
    addNotification({
      title: 'Presentation Scheduled',
      message: 'Your presentation is scheduled for tomorrow at 2:00 PM',
      type: NOTIFICATION_TYPES.PRESENTATION,
      priority: 'high'
    });
  };
}
```

### MOVO-Specific Notifications
```javascript
import { useMovoNotifications } from './components/SIdebar/Notifications/useMovoNotifications';

function PresentationComponent() {
  const { notifyPresentationScheduled, notifyTimerWarning } = useMovoNotifications();
  
  // Automatically create notifications for MOVO events
  notifyPresentationScheduled(presentationData);
  notifyTimerWarning(timeRemaining);
}
```

## 🎨 Styling & Theming

All components use Tailwind CSS with the MOVO color scheme:
- **Primary:** Orange (#EE8100, #F97316)
- **Secondary:** Gray scale
- **Success:** Green
- **Warning:** Yellow
- **Error:** Red

## 🔧 Configuration

### Notification Types
```javascript
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  PRESENTATION: 'presentation',
  SCHEDULE: 'schedule'
};
```

### Default Settings
Settings are stored in localStorage and include defaults for:
- Language and timezone preferences
- Notification preferences
- Privacy settings
- Presentation defaults
- Security options

## 🚀 Features Integration

### With MOVO System
- **Timer Integration:** Automatic notifications for timer warnings
- **Presentation System:** Notifications for schedules and reminders
- **Email System:** Integration with admin email features
- **User Management:** Profile sync with authentication system

### Real-time Updates
- Socket.io integration for live notifications
- Real-time timer updates
- Presentation status changes
- System announcements

## 📱 Responsive Design & Alignment

All components are fully responsive and properly aligned across devices:

### Desktop (1024px+)
- Fixed sidebar with 288px width (18rem)
- Content area automatically adjusts with proper left margin
- Smooth hover effects and transitions
- Focus management for keyboard navigation

### Tablet (768px - 1023px)
- Collapsible sidebar with mobile-style behavior
- Touch-friendly interface elements
- Optimized spacing and typography

### Mobile (320px - 767px)
- Hidden sidebar by default with hamburger menu
- Full-screen overlay when sidebar is open
- Touch gestures for opening/closing sidebar
- Optimized notification dropdown positioning

### Alignment Features
- **CSS Grid & Flexbox:** Modern layout techniques for perfect alignment
- **Custom CSS Classes:** Specialized styling for consistent positioning
- **Transition Animations:** Smooth sidebar show/hide with easing functions
- **Z-Index Management:** Proper layering for overlays and dropdowns
- **Responsive Typography:** Font sizes adjust based on screen size
- **Focus States:** Clear visual indicators for keyboard navigation

## 🔒 Security & Privacy

- Settings are stored locally and encrypted
- Profile data respects privacy settings
- Notification preferences are user-controlled
- Secure data export functionality

## 📈 Analytics & Tracking

Profile component includes activity statistics:
- Total presentations
- Completed presentations
- Upcoming presentations
- Total presentation time

## 🤝 Contributing

When adding new features:
1. Follow the existing component structure
2. Use TypeScript-style prop validation
3. Implement proper error handling
4. Add responsive design considerations
5. Update this README with new features

## 📞 Support

For issues or questions about these components:
- Check the Help Center component for FAQs
- Contact: support@movo.app
- Phone: +1 (555) 123-MOVO

---

**Version:** 1.0.0  
**Last Updated:** June 29, 2025  
**Compatibility:** React 18+, Tailwind CSS 3+
