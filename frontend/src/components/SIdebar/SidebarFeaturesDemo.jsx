import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBell, 
  FaUser, 
  FaCog, 
  FaQuestionCircle,
  FaArrowRight,
  FaCheckCircle 
} from 'react-icons/fa';
import { useNotifications, NOTIFICATION_TYPES } from './Notifications';

const SidebarFeaturesDemo = () => {
  const { addNotification } = useNotifications();
  const [demoStep, setDemoStep] = useState(0);

  const features = [
    {
      title: 'Smart Notifications',
      description: 'Stay updated with real-time notifications for presentations, schedules, and system updates.',
      icon: FaBell,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      link: '/notifications',
      demo: () => {
        addNotification({
          title: 'Demo Notification',
          message: 'This is how notifications appear in MOVO! Click the bell icon in the sidebar to see more.',
          type: NOTIFICATION_TYPES.INFO,
          priority: 'medium'
        });
      }
    },
    {
      title: 'Profile Management',
      description: 'Manage your personal information, view activity statistics, and customize your profile.',
      icon: FaUser,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      link: '/profile',
      demo: () => {
        addNotification({
          title: 'Profile Updated',
          message: 'Your profile has been successfully updated with new information.',
          type: NOTIFICATION_TYPES.SUCCESS,
          priority: 'low'
        });
      }
    },
    {
      title: 'Settings & Preferences',
      description: 'Customize notifications, privacy settings, presentation preferences, and security options.',
      icon: FaCog,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      link: '/settings',
      demo: () => {
        addNotification({
          title: 'Settings Saved',
          message: 'Your preferences have been saved and will take effect immediately.',
          type: NOTIFICATION_TYPES.SUCCESS,
          priority: 'medium'
        });
      }
    },
    {
      title: 'Help & Support',
      description: 'Access FAQs, documentation, video tutorials, and get support when you need it.',
      icon: FaQuestionCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      link: '/help',
      demo: () => {
        addNotification({
          title: 'Help Article Found',
          message: 'Found 5 articles related to your question. Check the Help Center for detailed guidance.',
          type: NOTIFICATION_TYPES.INFO,
          priority: 'low'
        });
      }
    }
  ];

  const handleRunDemo = () => {
    setDemoStep(0);
    
    // Run all demos in sequence
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.demo();
        setDemoStep(index + 1);
      }, index * 1500);
    });

    // Reset demo step after all demos
    setTimeout(() => {
      setDemoStep(0);
    }, features.length * 1500 + 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sidebar Features Overview
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Explore the powerful sidebar features that enhance your MOVO experience. 
          Each feature is designed to help you manage presentations more effectively.
        </p>
        <button
          onClick={handleRunDemo}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
        >
          Run Interactive Demo
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isActive = demoStep === index + 1;
          
          return (
            <div 
              key={index}
              className={`relative p-6 border-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'border-orange-500 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Demo indicator */}
              {isActive && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-2">
                  <FaCheckCircle size={16} />
                </div>
              )}

              <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                <Icon className={`${feature.color}`} size={24} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Link 
                  to={feature.link}
                  className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  Explore Feature
                  <FaArrowRight className="ml-2" size={14} />
                </Link>
                
                <button
                  onClick={feature.demo}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  Try Demo
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          How to Access These Features
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">In the Sidebar</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Notifications:</strong> Click the bell icon to view and manage notifications</li>
              <li>• <strong>Profile:</strong> Access from "Other Menu" section</li>
              <li>• <strong>Settings:</strong> Find in "Other Menu" for all preferences</li>
              <li>• <strong>Help Center:</strong> Get support from "Help and Center" link</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time notification system with badges</li>
              <li>• Comprehensive profile management</li>
              <li>• Granular settings for all aspects of MOVO</li>
              <li>• Searchable help center with FAQs and guides</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
          <p className="text-sm text-orange-800">
            <strong>Tip:</strong> All features are context-aware and adapt based on your role (Admin/Presenter) 
            and current activities in MOVO.
          </p>
        </div>
      </div>

      {/* Integration Notes */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Integration with MOVO Features
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-blue-500 text-white p-3 rounded-full inline-block mb-3">
              <FaBell size={20} />
            </div>
            <h4 className="font-medium text-blue-900 mb-2">Smart Notifications</h4>
            <p className="text-sm text-blue-700">
              Automatically receive notifications for presentation schedules, timer warnings, and system updates.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-500 text-white p-3 rounded-full inline-block mb-3">
              <FaCog size={20} />
            </div>
            <h4 className="font-medium text-blue-900 mb-2">Personalized Settings</h4>
            <p className="text-sm text-blue-700">
              Customize notification preferences, timer settings, and privacy options to match your workflow.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-500 text-white p-3 rounded-full inline-block mb-3">
              <FaUser size={20} />
            </div>
            <h4 className="font-medium text-blue-900 mb-2">Profile Analytics</h4>
            <p className="text-sm text-blue-700">
              Track your presentation history, activity statistics, and performance metrics over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFeaturesDemo;
