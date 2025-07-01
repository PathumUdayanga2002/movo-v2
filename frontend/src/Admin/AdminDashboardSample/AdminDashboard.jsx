import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiPlay, 
  FiUpload, 
  FiEye, 
  FiMail, 
  FiUsers, 
  FiBarChart2, 
  FiClock, 
  FiTrendingUp,
  FiCalendar,
  FiFileText
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

import CardAndCalendar from "../../components/CardAndCalenderRight/CardAndCalendar";
import Header from "../../components/Header/Header";
import PresentationList from "../../components/PresentationList/PresentationList";
import Sidebar from "../../components/SIdebar/Sidebar";

import "./AdminDashbord.css";

//images
import aichat from "../../assets/images/aichat.jpg";
import guideVideo from "../../assets/images/guideVideo.png";
import myPresentation from "../../assets/images/mypresentation.webp";
import uploadDetails from "../../assets/images/uploadDetails.png";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPresentations: 24,
    activePresenters: 12,
    todayScheduled: 5,
    thisWeekGrowth: 15
  });

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const dashboardCards = [
    {
      id: 1,
      title: "Start Presentation",
      description: "Launch and manage live presentations with full control",
      link: "/admin/start-presentation",
      icon: <FiPlay />,
      image: myPresentation,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      id: 2,
      title: "Upload Guidelines",
      description: "Manage presentation templates and upload guidelines for presenters",
      link: "/admin-upload-file",
      icon: <FiUpload />,
      image: uploadDetails,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      id: 3,
      title: "View Presentations",
      description: "Browse and manage all presenter submissions and content",
      link: "/viwe-presentation",
      icon: <FiEye />,
      image: guideVideo,
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    },
    {
      id: 4,
      title: "Send Messages",
      description: "Send notifications, reminders, and updates to presenters",
      link: "/email/send-message",
      icon: <FiMail />,
      image: aichat,
      color: "from-orange-500 to-red-500",
      hoverColor: "hover:from-orange-600 hover:to-red-600"
    }
  ];

  const quickStats = [
    {
      title: "Total Presentations",
      value: stats.totalPresentations,
      icon: <FiFileText />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Presenters",
      value: stats.activePresenters,
      icon: <FiUsers />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Today's Schedule",
      value: stats.todayScheduled,
      icon: <FiClock />,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Week Growth",
      value: `+${stats.thisWeekGrowth}%`,
      icon: <FiTrendingUp />,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      
      <div className="admin-dashboard-content">
        {/* Header Section */}
        <div className="dashboard-header">
          <Header />
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-text">
              <h1 className="welcome-title">
                {greeting}, Admin! 
                <HiOutlineSparkles className="welcome-icon" />
              </h1>
              <p className="welcome-subtitle">
                Ready to manage your presentation platform? Here's your dashboard overview.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="quick-stats">
              {quickStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className={`stat-icon ${stat.bgColor}`}>
                    <span className={stat.color}>{stat.icon}</span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-title">{stat.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-main">
          <div className="dashboard-left">
            {/* Action Cards Section */}
            <div className="action-cards-section">
              <h2 className="section-title">
                <FiBarChart2 />
                Quick Actions
              </h2>
              
              <div className="action-cards-grid">
                {dashboardCards.map((card) => (
                  <Link key={card.id} to={card.link} className="action-card-link">
                    <div className={`action-card ${card.hoverColor}`}>
                      <div className="card-header">
                        <div className={`card-icon bg-gradient-to-r ${card.color}`}>
                          {card.icon}
                        </div>
                        <div className="card-image">
                          <img
                            src={card.image}
                            alt={card.title}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      
                      <div className="card-content">
                        <h3 className="card-title">{card.title}</h3>
                        <p className="card-description">{card.description}</p>
                      </div>
                      
                      <div className="card-footer">
                        <span className="card-action">Get Started</span>
                        <FiPlay className="card-arrow" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Presentations List */}
            <div className="presentations-section">
              <h2 className="section-title">
                <FiFileText />
                Recent Presentations
              </h2>
              <div className="presentations-wrapper">
                <PresentationList />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="dashboard-right">
            <div className="calendar-section">
              <h2 className="section-title">
                <FiCalendar />
                Schedule & Calendar
              </h2>
              <div className="calendar-wrapper">
                <CardAndCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
