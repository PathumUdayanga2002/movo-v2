import { useState } from 'react';
import { 
  FaQuestionCircle, 
  FaSearch, 
  FaPhone, 
  FaEnvelope, 
  FaBook,
  FaVideo,
  FaDownload,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaComments
} from 'react-icons/fa';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: FaBook },
    { id: 'presentations', label: 'Presentations', icon: FaVideo },
    { id: 'account', label: 'Account Management', icon: FaQuestionCircle },
    { id: 'technical', label: 'Technical Issues', icon: FaPhone },
    { id: 'features', label: 'Features', icon: FaComments }
  ];

  const faqs = {
    'getting-started': [
      {
        id: 1,
        question: 'How do I create my first presentation?',
        answer: 'To create your first presentation, navigate to the presenter dashboard and click on "Upload Presentation". You can upload PowerPoint files, PDFs, or other supported formats. The system will process your file and make it available for scheduling.'
      },
      {
        id: 2,
        question: 'How do I schedule a presentation?',
        answer: 'Go to the Calendar section and click on "Schedule Event". Fill in the presentation details including title, description, date, time, and duration. You can also invite participants and set reminders.'
      },
      {
        id: 3,
        question: 'What file formats are supported?',
        answer: 'MOVO supports PowerPoint (.pptx, .ppt), PDF (.pdf), and various video formats. Files should be under 50MB for optimal performance.'
      }
    ],
    'presentations': [
      {
        id: 4,
        question: 'How does the timer system work?',
        answer: 'The timer system helps you manage presentation time. Admin can start/stop/reset timers, and presenters can view the countdown. Warnings appear when time is running low based on your settings.'
      },
      {
        id: 5,
        question: 'Can I practice my presentation beforehand?',
        answer: 'Yes! Use the AI Bot feature to practice your presentation. It can provide feedback on your speech, timing, and delivery. Access it from the presenter dashboard.'
      },
      {
        id: 6,
        question: 'How do I join a presentation room?',
        answer: 'Use the presentation ID provided by your admin. Go to "Join Presentation" and enter the ID to access the presentation room with timer and other features.'
      }
    ],
    'account': [
      {
        id: 7,
        question: 'How do I update my profile information?',
        answer: 'Navigate to Profile in the sidebar, click "Edit Profile", make your changes, and save. You can update your name, email, phone, bio, and profile picture.'
      },
      {
        id: 8,
        question: 'How do I change my password?',
        answer: 'Go to Settings > Security tab and click "Change Password". You\'ll need to enter your current password and a new password.'
      },
      {
        id: 9,
        question: 'Can I delete my account?',
        answer: 'Account deletion must be requested through admin. Contact support with your request and reason for deletion.'
      }
    ],
    'technical': [
      {
        id: 10,
        question: 'The timer is not syncing properly',
        answer: 'Check your internet connection and refresh the page. If the issue persists, ensure you\'re using a supported browser (Chrome, Firefox, Safari, Edge) and clear your browser cache.'
      },
      {
        id: 11,
        question: 'File upload is failing',
        answer: 'Ensure your file is under 50MB and in a supported format. Check your internet connection. If issues persist, try uploading from a different browser or device.'
      },
      {
        id: 12,
        question: 'Notifications are not working',
        answer: 'Check your notification settings in Settings > Notifications. Ensure your browser allows notifications from MOVO. For email notifications, check your spam folder.'
      }
    ],
    'features': [
      {
        id: 13,
        question: 'What is the AI Bot feature?',
        answer: 'The AI Bot helps you practice presentations by analyzing your speech, providing feedback on pace, clarity, and content. It uses speech-to-text technology to transcribe and evaluate your practice sessions.'
      },
      {
        id: 14,
        question: 'How does email integration work?',
        answer: 'Admins can send emails directly through MOVO to presenters. You\'ll receive notifications about scheduled presentations, reminders, and updates via email.'
      },
      {
        id: 15,
        question: 'Can I export my data?',
        answer: 'Yes, go to Settings and click "Export Data" to download your profile information, presentation history, and settings in JSON format.'
      }
    ]
  };

  const guides = [
    {
      title: 'Quick Start Guide',
      description: 'Get up and running with MOVO in 5 minutes',
      type: 'PDF',
      size: '2.1 MB',
      downloadUrl: '#'
    },
    {
      title: 'Presenter Handbook',
      description: 'Complete guide for presenters',
      type: 'PDF',
      size: '5.8 MB',
      downloadUrl: '#'
    },
    {
      title: 'Admin Manual',
      description: 'Administrative features and management',
      type: 'PDF',
      size: '4.2 MB',
      downloadUrl: '#'
    }
  ];

  const videos = [
    {
      title: 'Getting Started with MOVO',
      duration: '3:45',
      thumbnail: '/api/placeholder/200/120',
      url: '#'
    },
    {
      title: 'Uploading and Managing Presentations',
      duration: '5:12',
      thumbnail: '/api/placeholder/200/120',
      url: '#'
    },
    {
      title: 'Using the Timer System',
      duration: '2:30',
      thumbnail: '/api/placeholder/200/120',
      url: '#'
    }
  ];

  const filteredFAQs = faqs[activeCategory]?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FaQuestionCircle className="text-orange-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to your questions, browse documentation, and get support for MOVO
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for help articles, guides, or FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
        />
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <FaPhone className="mb-3" size={24} />
          <h3 className="font-semibold mb-2">Phone Support</h3>
          <p className="text-sm opacity-90">+1 (555) 123-MOVO</p>
          <p className="text-xs opacity-75">Mon-Fri 9AM-6PM EST</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <FaEnvelope className="mb-3" size={24} />
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-sm opacity-90">support@movo.app</p>
          <p className="text-xs opacity-75">Response within 24 hours</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <FaComments className="mb-3" size={24} />
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-sm opacity-90">Chat with our team</p>
          <p className="text-xs opacity-75">Available 24/7</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <nav className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{category.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* FAQs */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFAQ === faq.id ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Documentation */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((guide, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{guide.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{guide.type}</span>
                        <span className="mx-2">•</span>
                        <span>{guide.size}</span>
                      </div>
                    </div>
                    <button className="ml-4 p-2 text-orange-500 hover:text-orange-600 transition-colors duration-200">
                      <FaDownload size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Tutorials */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Tutorials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <FaVideo className="text-white" size={24} />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{video.title}</h4>
                    <button className="flex items-center text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200">
                      <span>Watch Video</span>
                      <FaExternalLinkAlt className="ml-1" size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600 mb-4">
          Still need help? Our support team is here to assist you.
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpCenter;
