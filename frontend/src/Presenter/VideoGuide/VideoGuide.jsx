import React, { useState, useEffect } from "react";
import { FiPlay, FiFileText, FiDownload, FiEye } from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlinePlayCircle } from 'react-icons/hi2';
import Sidebar from "../../components/SIdebar/Sidebar";
import "./VideoGuide.css";

const VideoGuide = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch uploaded files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/files");
        
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        
        const data = await response.json();
        setFiles(data || []);
      } catch (error) {
        console.error("Error fetching files:", error);
        setError('Failed to load guide content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFiles();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const filteredFiles = files.filter((file) => file.type === activeTab);

  return (
    <div className="video-guide-container">
      <Sidebar />
      
      <div className="video-guide-content">
        {/* Header Section */}
        <div className="guide-header">
          <div className="header-content">
            <div className="welcome-section">
              <div className="welcome-icon">
                <HiOutlineSparkles />
              </div>
              <div>
                <h1 className="welcome-title">Hi, Pathum Udayanga</h1>
                <p className="welcome-subtitle">
                  Ready to master the art of{" "}
                  <span className="highlight">Perfect Presentations</span>?
                </p>
              </div>
            </div>
            <div className="guide-stats">
              <div className="stat-item">
                <div className="stat-number">{files.filter(f => f.type === 'videos').length}</div>
                <div className="stat-label">Video Guides</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{files.filter(f => f.type === 'documents').length}</div>
                <div className="stat-label">Documents</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <div className="tab-buttons">
            <button
              onClick={() => handleTabChange("videos")}
              className={`tab-button ${activeTab === "videos" ? "active" : ""}`}
            >
              <HiOutlinePlayCircle />
              Video Guides
              <span className="tab-badge">{files.filter(f => f.type === 'videos').length}</span>
            </button>
            <button
              onClick={() => handleTabChange("documents")}
              className={`tab-button ${activeTab === "documents" ? "active" : ""}`}
            >
              <FiFileText />
              Documentation
              <span className="tab-badge">{files.filter(f => f.type === 'documents').length}</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="guide-content">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading guide content...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="error-icon">⚠️</div>
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                Try Again
              </button>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {activeTab === "videos" ? <HiOutlinePlayCircle /> : <FiFileText />}
              </div>
              <h3>No {activeTab === "videos" ? "videos" : "documents"} available</h3>
              <p>Check back later for new guide content!</p>
            </div>
          ) : (
            <div className="files-grid">
              {filteredFiles.map((file) => (
                <div key={file._id} className="file-card">
                  <div className="file-card-header">
                    <div className="file-type-icon">
                      {file.type === "videos" ? <FiPlay /> : <FiFileText />}
                    </div>
                    <div className="file-actions">
                      <button className="action-button" title="Download">
                        <FiDownload />
                      </button>
                    </div>
                  </div>
                  
                  <div className="file-content">
                    <h3 className="file-title">{file.name}</h3>
                    
                    {file.type === "videos" ? (
                      <div className="video-container">
                        <video 
                          className="video-player"
                          controls
                          poster="/api/placeholder/300/180"
                        >
                          <source src={`http://localhost:5000${file.url}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="document-preview">
                        <div className="document-icon">
                          <FiFileText />
                        </div>
                        <a
                          href={`http://localhost:5000${file.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-document-button"
                        >
                          <FiEye />
                          View Document
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="file-footer">
                    <span className="file-size">
                      {file.size ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : 'Unknown size'}
                    </span>
                    <span className="file-date">
                      {file.uploadDate ? new Date(file.uploadDate).toLocaleDateString() : 'Recently added'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGuide;
