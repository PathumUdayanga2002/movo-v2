import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginPresenter.css";

const LoginPresenter = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Add your login API call here
      console.log("Login data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to presenter dashboard on success
      navigate("/presenter-dashboard");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-presenter-container">
      <div className="login-presenter-card">
        {/* Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2 className="form-title">Presenter Login</h2>
            <p className="form-subtitle">Welcome back! Sign in to your presenter account</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FaUser className="label-icon" />
                Email Address
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FaLock className="label-icon" />
                Password
              </label>
              <div className="password-input-container">
                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading && <span className="loading-spinner"></span>}
              {loading ? "Signing In..." : "Sign In as Presenter"}
            </button>
          </form>

          <div className="form-footer">
            <p>Don't have an account? 
              <Link to="/register-presenter" className="signup-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Brand Section */}
        <div className="brand-section">
          <div className="brand-content">
            <h1 className="brand-title">MOVO</h1>
            <p className="brand-subtitle">
              Join thousands of presenters who trust MOVO for their presentation management needs
            </p>
            
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">🎤</span>
                <span className="feature-text">Professional Presentations</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span className="feature-text">Analytics & Insights</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⏰</span>
                <span className="feature-text">Smart Scheduling</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <span className="feature-text">Team Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPresenter;