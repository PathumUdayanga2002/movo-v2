import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiPlay, 
  FiUpload, 
  FiEye, 
  FiZap, 
  FiUsers, 
  FiBarChart2, 
  FiCalendar,
  FiFileText
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

import CardAndCalendar from "../CardAndCalenderRight/CardAndCalendar";
import Header from "../Header/Header";
import PresentationList from "../PresentationList/PresentationList";
import Sidebar from "../SIdebar/Sidebar";
import ChatbotFloatingButton from "../ChatbotFloatingButton/ChatbotFloatingButton";

import "./PresenterDashboard.css";

//images
import aichat from "../../assets/images/aichat.jpg";
import guideVideo from "../../assets/images/guideVideo.png";
import myPresentation from "../../assets/images/mypresentation.webp";
import uploadDetails from "../../assets/images/uploadDetails.png";

const pose_tracking_url = import.meta.env.VITE_POSE_TRACKING_URL;

const PresenterDashBoard = () => {
  const [greeting, setGreeting] = useState("");
  const userName = localStorage.getItem("name") || "Presenter";

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
      description: "Join your scheduled presentation session with real-time controls",
      link: "/presenter/join-presentation",
      icon: <FiPlay />,
      image: myPresentation,
      color: "bg-gradient-blue",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      id: 2,
      title: "Upload Details",
      description: "Upload your presentation details, group information and files",
      link: "/presenter/uploda-presentation",
      icon: <FiUpload />,
      image: uploadDetails,
      color: "bg-gradient-green",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      id: 3,
      title: "Presentation Guidance",
      description: "Access video guides and tips to improve your presentation skills",
      link: "/presenter-view-guidances",
      icon: <FiEye />,
      image: guideVideo,
      color: "bg-gradient-purple",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    },
    {
      id: 4,
      title: "AI Vision Training",
      description: "Practice presentations with AI-powered pose and gesture analysis",
      link: pose_tracking_url,
      icon: <FiZap />,
      image: aichat,
      color: "bg-gradient-orange",
      hoverColor: "hover:from-orange-600 hover:to-red-600",
      external: true
    }
  ];

  return (
    <div className="presenter-dashboard">
      <Sidebar />
      
      <div className="presenter-dashboard-content">
        {/* Header Section */}
        <div className="presenter-header">
          <Header />
        </div>

        {/* Welcome Section */}
        <div className="presenter-welcome-section">
          <div className="presenter-welcome-content">
            <h1 className="presenter-welcome-title">
              {greeting}, {userName}! 
              <HiOutlineSparkles className="inline-block ml-2" style={{ color: '#000000' }} />
            </h1>
            <p className="presenter-welcome-subtitle">
              Ready for your presentation? Access all your tools and resources from this dashboard.
            </p>
          </div>
        </div>

        <div className="presenter-dashboard-main">
          <div className="presenter-dashboard-left">
            {/* Action Cards Section */}
            <div className="presenter-action-cards-section">
              <h2 className="presenter-section-title">
                <FiBarChart2 />
                Quick Actions
              </h2>
              
              <div className="presenter-action-cards-grid">
                {dashboardCards.map((card) => (
                  <Link 
                    key={card.id} 
                    to={card.link} 
                    className="presenter-action-card-link"
                    {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <div className={`presenter-action-card ${card.hoverColor}`}>
                      <div className="presenter-card-header">
                        <div className={`presenter-card-icon ${card.color}`}>
                          {card.icon}
                        </div>
                        <div className="presenter-card-image">
                          <img
                            src={card.image}
                            alt={card.title}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      
                      <div className="presenter-card-content">
                        <h3 className="presenter-card-title">{card.title}</h3>
                        <p className="presenter-card-description">{card.description}</p>
                      </div>
                      
                      <div className="presenter-card-footer">
                        <span className="presenter-card-action">Get Started</span>
                        <FiPlay className="presenter-card-arrow" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Presentations List */}
            <div className="presenter-presentations-section">
              <h2 className="presenter-section-title">
                <FiFileText />
                My Presentations
              </h2>
              <div className="presenter-presentations-wrapper">
                <PresentationList />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="presenter-dashboard-right">
            <div className="presenter-calendar-section">
              <h2 className="presenter-section-title">
                <FiCalendar />
                Schedule & Calendar
              </h2>
              <div className="presenter-calendar-wrapper">
                <CardAndCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ChatbotFloatingButton />
    </div>
  );
};

export default PresenterDashBoard;
