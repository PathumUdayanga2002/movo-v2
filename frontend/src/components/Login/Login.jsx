import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import limage from "../../assets/logimage.png";
import axiosInstance from "../../utils/axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email: email.trim(),
        password,
      });

      // Store user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      // Check role and navigate accordingly
      const role = data.role;
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "presenter") {
        navigate("/presenter-dashboard");
      } else {
        throw new Error("Invalid role received from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (error.response?.status === 401) {
        errorMessage = "Invalid email or password. Please check your credentials.";
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.error || "Invalid request. Please check your input.";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.message === "Network Error") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      setError(errorMessage);
      
      // Clear any potentially corrupted authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Back to Home Button */}
      <Link to="/" className="back-button">
        <FiArrowLeft />
        <span>Back to Home</span>
      </Link>

      <div className="login-card">
        {/* Brand Section */}
        <div className="brand-section">
          <div className="brand-header">
            <div className="brand-icon">
              <HiOutlineSparkles />
            </div>
            <h1 className="brand-title">MOVO</h1>
            <p className="brand-subtitle">
              Transform your presentation workflow with our AI-powered platform.
              Welcome back to the future of presentations.
            </p>
          </div>
          <img
            className="brand-image"
            src={limage}
            alt="Presenter Illustration"
            loading="lazy"
          />
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FiMail className="label-icon" />
                Email Address
              </label>
              <input
                className={`form-input ${error && error.includes('email') ? 'error' : ''}`}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(""); // Clear error on input change
                }}
                required
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FiLock className="label-icon" />
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  className={`form-input ${error && error.includes('password') ? 'error' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(""); // Clear error on input change
                  }}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="login-button"
            >
              {loading && <span className="loading-spinner"></span>}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/presenter-signup" className="footer-link">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;