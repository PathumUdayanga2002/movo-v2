import { useState, useEffect, useRef } from "react";
import { IoArrowForwardCircleOutline, IoPlayCircle, IoRocket } from "react-icons/io5";
import { FaCalendarAlt, FaDesktop, FaUsers, FaChartLine, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Home/home.css";

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const features = [
    {
      icon: <FaDesktop className="text-4xl text-orange-500" />,
      title: "Smart Presentation Management",
      description: "Organize, track, and manage your presentations with intelligent automation"
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-blue-500" />,
      title: "Calendar Integration",
      description: "Seamlessly sync with your calendar for perfect scheduling"
    },
    {
      icon: <FaUsers className="text-4xl text-green-500" />,
      title: "Team Collaboration",
      description: "Work together with your team in real-time collaboration"
    },
    {
      icon: <FaChartLine className="text-4xl text-purple-500" />,
      title: "Analytics & Insights",
      description: "Get detailed insights about your presentation performance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-60 -left-20 w-60 h-60 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Modern Header */}
        <header className="w-full flex justify-between items-center p-6 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              MOVO
            </div>
          </div>
          
          <div className="relative flex items-center space-x-4">
            {/* Login Button */}
            <Link to={"/login"}>
              <button className="px-6 py-2.5 border-2 border-gray-200 hover:border-orange-300 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 font-medium">
                Login
              </button>
            </Link>

            {/* Sign Up Button with Dropdown */}
            <div
              className="relative inline-block"
              ref={dropdownRef}
            >
              <button 
                onClick={toggleDropdown}
                className="flex items-center px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 gap-2"
              >
                Sign Up
                <FaChevronDown 
                  className={`text-sm transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
                />
              </button>
              {showDropdown && (
                <div className="absolute top-full mt-3 right-0 bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100 rounded-2xl z-20 overflow-hidden min-w-48 animate-fade-in">
                  <Link to={"/register-admin"} onClick={() => setShowDropdown(false)}>
                    <button className="block px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 w-full text-left transition-all duration-200 font-medium">
                      🔧 As Admin
                    </button>
                  </Link>
                  <Link to={"/register-presenter"} onClick={() => setShowDropdown(false)}>
                    <button className="block px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 w-full text-left transition-all duration-200 font-medium">
                      🎤 As Presenter
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center text-center px-4 pt-20 pb-32">
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
                ✨ Next-Gen Presentation Platform
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Make Your Presentation <br /> 
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Management
              </span>{" "}
              <br />
              <span className="relative">
                Effortless
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full transform scale-x-0 animate-scale-x"></div>
              </span>
            </h1>
            
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Transform your presentation workflow with our AI-powered platform. Streamline scheduling, 
              enhance collaboration, and deliver impactful presentations with confidence and style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 space-x-3">
                <IoPlayCircle size={24} className="group-hover:animate-spin" />
                <span>Watch Demo</span>
              </button>
              
              <button className="flex items-center px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 space-x-3 border border-gray-200">
                <IoRocket size={24} />
                <span>Get Started Free</span>
                <IoArrowForwardCircleOutline size={24} />
              </button>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Powerful Features for Modern Teams
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to create, manage, and deliver outstanding presentations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 hover:border-orange-200"
                >
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Presentations?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using MOVO to streamline their presentation workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-presenter">
                <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Free Trial
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-105">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </div>


    </div>
  );
};

export default Home;
