import { useState } from 'react';
import { 
  FaCog, 
  FaBell, 
  FaLock, 
  FaPalette, 
  FaLanguage, 
  FaDownload,
  FaTrash,
  FaSave
} from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    presentationReminders: true,
    systemUpdates: false,
    marketingEmails: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    dataSharing: false,
    
    // Presentation Settings
    autoSave: true,
    defaultDuration: 30,
    timerWarnings: true,
    warningTime: 5,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginNotifications: true
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage or API
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setSettings({
        language: 'en',
        timezone: 'UTC-5',
        dateFormat: 'MM/DD/YYYY',
        theme: 'light',
        emailNotifications: true,
        pushNotifications: true,
        presentationReminders: true,
        systemUpdates: false,
        marketingEmails: false,
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        dataSharing: false,
        autoSave: true,
        defaultDuration: 30,
        timerWarnings: true,
        warningTime: 5,
        twoFactorAuth: false,
        sessionTimeout: 30,
        loginNotifications: true
      });
      alert('Settings reset to default values!');
    }
  };

  const handleExportData = () => {
    const userData = {
      profile: {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role')
      },
      settings: settings,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'movo-user-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const ToggleSwitch = ({ isOn, onToggle, id }) => (
    <button
      id={id}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        isOn ? 'bg-orange-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const tabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'privacy', label: 'Privacy', icon: FaLock },
    { id: 'presentations', label: 'Presentations', icon: FaPalette },
    { id: 'security', label: 'Security', icon: FaLock }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FaCog className="text-orange-500" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleExportData}
            className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <FaDownload size={16} />
            <span>Export Data</span>
          </button>
          <button
            onClick={handleResetSettings}
            className="flex items-center space-x-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            <FaTrash size={16} />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSaveSettings}
            className="flex items-center space-x-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <FaSave size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:w-3/4">
          <div className="bg-gray-50 rounded-lg p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Preferences</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaLanguage className="inline mr-2" />
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaPalette className="inline mr-2" />
                        Theme
                      </label>
                      <select
                        value={settings.theme}
                        onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                    { key: 'presentationReminders', label: 'Presentation Reminders', desc: 'Reminders before presentations' },
                    { key: 'systemUpdates', label: 'System Updates', desc: 'Updates about system maintenance' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional emails and newsletters' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.label}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <ToggleSwitch
                        isOn={settings[item.key]}
                        onToggle={() => handleSettingChange('notifications', item.key, !settings[item.key])}
                        id={item.key}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'showEmail', label: 'Show Email in Profile', desc: 'Display email address on your profile' },
                      { key: 'showPhone', label: 'Show Phone in Profile', desc: 'Display phone number on your profile' },
                      { key: 'dataSharing', label: 'Allow Data Sharing', desc: 'Share anonymized data for analytics' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <ToggleSwitch
                          isOn={settings[item.key]}
                          onToggle={() => handleSettingChange('privacy', item.key, !settings[item.key])}
                          id={item.key}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Presentation Settings */}
            {activeTab === 'presentations' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Presentation Settings</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.defaultDuration}
                        onChange={(e) => handleSettingChange('presentations', 'defaultDuration', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        min="5"
                        max="180"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Warning Time (minutes before end)
                      </label>
                      <input
                        type="number"
                        value={settings.warningTime}
                        onChange={(e) => handleSettingChange('presentations', 'warningTime', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        min="1"
                        max="15"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'autoSave', label: 'Auto Save', desc: 'Automatically save presentation progress' },
                      { key: 'timerWarnings', label: 'Timer Warnings', desc: 'Show warnings when time is running out' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <ToggleSwitch
                          isOn={settings[item.key]}
                          onToggle={() => handleSettingChange('presentations', item.key, !settings[item.key])}
                          id={item.key}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={0}>Never</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account' },
                      { key: 'loginNotifications', label: 'Login Notifications', desc: 'Get notified when someone logs into your account' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <ToggleSwitch
                          isOn={settings[item.key]}
                          onToggle={() => handleSettingChange('security', item.key, !settings[item.key])}
                          id={item.key}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-6">
                    <button className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
