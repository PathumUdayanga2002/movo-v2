import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiArrowLeft } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import axiosInstance from "../../utils/axios";
import "./SigninPresenter.css";

const SigninPresenter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) {
      newErrors.id = 'Presenter ID is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerPresenter = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const { data } = await axiosInstance.post("/auth/register-presenter", {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      console.log("Presenter registered successfully:", data);
      alert("Presenter registered successfully!");
      navigate('/presenter-login');
      
    } catch (error) {
      console.error(
        "Error registering presenter:",
        error.response?.data || error
      );
      
      if (error.response?.status === 409) {
        setErrors({ general: 'Email or Presenter ID already exists' });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-presenter-container">
      <div className="signin-presenter-wrapper">
        {/* Back Button */}
        <Link to="/" className="back-button">
          <FiArrowLeft />
          <span>Back to Home</span>
        </Link>

        <div className="signin-presenter-content">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="brand-header">
              <div className="brand-icon">
                <HiOutlineSparkles />
              </div>
              <h1 className="brand-title">MOVO</h1>
            </div>
            <p className="brand-subtitle">
              Join our platform as a presenter and start sharing your knowledge with the world
            </p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-dot"></span>
                Create and manage presentations
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                Schedule presentation sessions
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                Engage with your audience
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                Track performance analytics
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <div className="form-container">
              <div className="form-header">
                <h2 className="form-title">Create Presenter Account</h2>
                <p className="form-subtitle">Join our community of amazing presenters</p>
              </div>

              {errors.general && (
                <div className="error-alert">
                  <span>{errors.general}</span>
                </div>
              )}

              <form onSubmit={registerPresenter} className="signin-form">
                <div className="form-grid">
                  {/* Presenter ID Field */}
                  <div className="form-group">
                    <label htmlFor="id" className="form-label">
                      <FiUser className="label-icon" />
                      Presenter ID
                    </label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className={`form-input ${errors.id ? 'error' : ''}`}
                      placeholder="Enter your unique presenter ID"
                      required
                    />
                    {errors.id && <span className="error-text">{errors.id}</span>}
                  </div>

                  {/* Name Field */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <FiUser className="label-icon" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <FiMail className="label-icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    <FiLock className="label-icon" />
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-button"
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <FiUserPlus />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="form-footer">
                <p>
                  Already have an account?{' '}
                  <Link to="/presenter-login" className="footer-link">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPresenter;
