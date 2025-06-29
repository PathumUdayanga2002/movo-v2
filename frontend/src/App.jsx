import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import AdminCountdown from "./Admin/AdminCountdown/AdminCountdown";
import AdminDashboard from "./Admin/AdminDashboardSample/AdminDashboard";
import AdminFileUpload from "./Admin/AdminUpload/AdminFileUpload";
import SignInAdmin from "./Admin/SignInAdmin/SignInAdmin";
import Timer from "./Admin/Timer/Timer";
import ViwePresentation from "./Admin/ViwePresentation/ViwePresentation";
import SigninPresenter from "./Presenter/Signin/SigninPresenter";
import UploadPresentation from "./Presenter/UploadPresentation/UploadPresentation";
import UserCountdown from "./Presenter/UserCountdown/UserCountdown";
import UserFileViwe from "./Presenter/UserFileViwe/UserFileViwe";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import PresenterDashBoard from "./components/PresenterDashboard/PresenterDashBoard";
import EmailSender from "./Admin/Email/EmailSender";
import AiBot from "./components/AiBot/AiBot";
import VideoGuide from "./Presenter/VideoGuide/VideoGuide";

// Vertex AI Chat Agent Component that will be used inside Router context
const VertexAIChatAgent = () => {
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);
  
  useEffect(() => {
    // Check if current route is a presenter page (not login, register, or admin page)
    const isPresenterPage = 
      !location.pathname.includes('/login') && 
      !location.pathname.includes('/register') && 
      !location.pathname.includes('/admin') &&
      location.pathname !== '/';
    
    setShowChat(isPresenterPage);
  }, [location]);
  
  if (!showChat) return null;
  
  return (
    <>
      <df-messenger 
        project-id="movobot" 
        agent-id="16e7446d-4c43-4e6a-a866-adf6b650e0b4" 
        language-code="en" 
        max-query-length="-1">
        <df-messenger-chat-bubble 
          chat-title="MOVO Assistance">
        </df-messenger-chat-bubble>
      </df-messenger>
      <style>
        {`
          df-messenger { 
            z-index: 999; 
            position: fixed; 
            --df-messenger-font-color: #000; 
            --df-messenger-font-family: Google Sans; 
            --df-messenger-chat-background: #EE8100; 
            --df-messenger-message-user-background: #d3e3fd; 
            --df-messenger-message-bot-background: #fff; 
            bottom: 16px; 
            right: 16px; 
          }
        `}
      </style>
    </>
  );
};

// AppContent component that will be rendered inside Router context
const AppContent = () => {
  const isAuthenticated = () => !!localStorage.getItem("token");
  
  return (
    <>
      <VertexAIChatAgent />
      <Routes>
        <Route path="/calendar" element={<MyCalendar />} />
        <Route
          path="/email/send-message"
          element={isAuthenticated() ? <EmailSender/> : <Navigate to="/login" />}
        />
        <Route
          path="/presenter/train-with-ai"
          element={isAuthenticated() ? <AiBot /> : <Navigate to="/login" />}
        /> 
        
        {/*  Admin Routes */}
        <Route
          path="/admin-upload-file"
          element={
            isAuthenticated() ? (
            <AdminFileUpload/>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
               <Route
          path="/admin-dashboard"
          element={
            isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/start-presentation"
          element={
            isAuthenticated() ? 
            <AdminCountdown /> : <Navigate to="/login" />
          }
        />
        
        <Route
          path="/viwe-presentation"
          element={
            isAuthenticated() ? (
            <ViwePresentation/>
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* presenter routes */}
        <Route
          path="/presenter-view-guidances"
          element={
            isAuthenticated() ? (
              <UserFileViwe/>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/presenter/uploda-presentation"
          element={
            isAuthenticated() ? (
              <UploadPresentation/>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/presenter-dashboard"
          element={
            isAuthenticated() ? (
              <PresenterDashBoard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
 
        <Route
          path="/presenter/join-presentation"
          element={
            isAuthenticated() ? 
            <UserCountdown/> : <Navigate to="/login" />
          }
        />
        <Route
          path="/presenter/VideoGuide"
          element={
            isAuthenticated() ? 
            <VideoGuide/> : <Navigate to="/login" />
          }
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register-admin" element={<SignInAdmin />} />
        <Route path="/register-presenter" element={<SigninPresenter />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <AppContent />
      </Router>
    </div>
  );
};

export default App;
