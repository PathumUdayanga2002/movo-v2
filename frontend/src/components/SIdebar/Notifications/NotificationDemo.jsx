import { useState } from 'react';
import { useMovoNotifications } from './useMovoNotifications';

const NotificationDemo = () => {
  const [demoForm, setDemoForm] = useState({
    fileName: 'presentation.pptx',
    presentationTitle: 'AI in Modern Business',
    timeRemaining: 300
  });

  const {
    notifyPresentationScheduled,
    notifyPresentationReminder,
    notifyPresentationStarted,
    notifyFileUploaded,
    notifyEmailReceived,
    notifyTimerWarning,
    notifySystemUpdate,
    notifyError
  } = useMovoNotifications();

  const handleDemoNotification = (type) => {
    switch (type) {
      case 'presentation-scheduled':
        notifyPresentationScheduled({
          title: demoForm.presentationTitle,
          dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
        });
        break;
      case 'presentation-reminder':
        notifyPresentationReminder({
          title: demoForm.presentationTitle
        }, 30);
        break;
      case 'presentation-started':
        notifyPresentationStarted({
          title: demoForm.presentationTitle
        });
        break;
      case 'file-uploaded':
        notifyFileUploaded(demoForm.fileName);
        break;
      case 'email-received':
        notifyEmailReceived('admin@movo.com', 'Presentation Feedback');
        break;
      case 'timer-warning':
        notifyTimerWarning(demoForm.timeRemaining);
        break;
      case 'system-update':
        notifySystemUpdate('MOVO system has been updated with new features');
        break;
      case 'error':
        notifyError('Failed to upload presentation file. Please try again.');
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Notification System Demo
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Presentation Title
          </label>
          <input
            type="text"
            value={demoForm.presentationTitle}
            onChange={(e) => setDemoForm({...demoForm, presentationTitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File Name
          </label>
          <input
            type="text"
            value={demoForm.fileName}
            onChange={(e) => setDemoForm({...demoForm, fileName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Remaining (seconds)
          </label>
          <input
            type="number"
            value={demoForm.timeRemaining}
            onChange={(e) => setDemoForm({...demoForm, timeRemaining: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleDemoNotification('presentation-scheduled')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm"
        >
          Presentation Scheduled
        </button>
        
        <button
          onClick={() => handleDemoNotification('presentation-reminder')}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-sm"
        >
          Presentation Reminder
        </button>
        
        <button
          onClick={() => handleDemoNotification('presentation-started')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm"
        >
          Presentation Started
        </button>
        
        <button
          onClick={() => handleDemoNotification('file-uploaded')}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm"
        >
          File Uploaded
        </button>
        
        <button
          onClick={() => handleDemoNotification('email-received')}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 text-sm"
        >
          Email Received
        </button>
        
        <button
          onClick={() => handleDemoNotification('timer-warning')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm"
        >
          Timer Warning
        </button>
        
        <button
          onClick={() => handleDemoNotification('system-update')}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm"
        >
          System Update
        </button>
        
        <button
          onClick={() => handleDemoNotification('error')}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm"
        >
          Error Notification
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Integration Examples
        </h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>File Upload:</strong> Integrate with upload components to notify on completion
          </p>
          <p>
            <strong>Timer Events:</strong> Connect with countdown system for time warnings
          </p>
          <p>
            <strong>Email System:</strong> Notify when emails are received or sent
          </p>
          <p>
            <strong>Presentation Scheduling:</strong> Auto-create reminders when presentations are scheduled
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationDemo;
