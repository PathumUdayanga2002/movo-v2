import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiArrowLeft, FiShield } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import axiosInstance from "../../utils/axios";
import "./SininAdmin.css";

const SignInAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const registerAdmin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const { data } = await axiosInstance.post("/auth/register-admin", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      console.log("Admin registered successfully:", data);
      alert("Admin registered successfully! Please sign in to continue.");
      navigate("/login");
      
    } catch (error) {
      console.error("Error registering admin:", error.response?.data || error);
      
      if (error.response?.status === 409) {
        setErrors({ general: 'Email already exists' });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-admin-container">
      <div className="signin-admin-wrapper">
        {/* Back Button */}
        <Link to="/" className="back-button">
          <FiArrowLeft />
          <span>Back to Home</span>
        </Link>

        <div className="signin-admin-content">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="brand-header">
              <div className="brand-icon">
                <HiOutlineSparkles />
              </div>
              <h1 className="brand-title">MOVO</h1>
              <div className="admin-badge">
                <FiShield />
                <span>Admin Portal</span>
              </div>
            </div>
            <p className="brand-subtitle">
              Join as an administrator and manage the platform with powerful tools and insights
            </p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-dot"></span>
                Manage user accounts and permissions
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                Monitor platform analytics
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                Configure system settings
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                Oversee presentation workflows
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <div className="form-container">
              <div className="form-header">
                <h2 className="form-title">Create Admin Account</h2>
                <p className="form-subtitle">Join the admin team and help manage MOVO</p>
              </div>

              {errors.general && (
                <div className="error-alert">
                  <span>{errors.general}</span>
                </div>
              )}

              <form onSubmit={registerAdmin} className="signin-admin-form">
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
                      Create Admin Account
                    </>
                  )}
                </button>
              </form>

              <div className="form-footer">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="footer-link">
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

export default SignInAdmin;
