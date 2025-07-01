import React, { useState } from "react";
import { 
  FiUpload, 
  FiFile, 
  FiUsers, 
  FiUser, 
  FiPlus, 
  FiTrash2, 
  FiFileText,
  FiCheck,
  FiAlertCircle 
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import "./UploadPresentation.css";

const UploadPresentation = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [groupMembers, setGroupMembers] = useState([{ id: "", name: "" }]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const handleAddMember = () => {
    setGroupMembers([...groupMembers, { id: "", name: "" }]);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = groupMembers.filter((_, i) => i !== index);
    setGroupMembers(updatedMembers);
  };

  const handleMemberChange = (index, field, value) => {
    setGroupMembers(prev => 
      prev.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    );
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFileType(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const validateFileType = (file) => {
    const allowedTypes = ['.pptx', '.pdf', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setErrors({ file: 'Please upload a .pptx, .pdf, or .docx file' });
      return false;
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setErrors({ file: 'File size must be less than 50MB' });
      return false;
    }
    
    setErrors(prev => ({ ...prev, file: '' }));
    return true;
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFileType(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!file) {
      newErrors.file = 'Please select a presentation file';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (isGroup) {
      const validMembers = groupMembers.filter(member => member.id.trim() && member.name.trim());
      if (validMembers.length === 0) {
        newErrors.members = 'Please add at least one group member';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("isGroup", isGroup);
    formData.append("groupMembers", JSON.stringify(groupMembers));
    formData.append("description", description);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload-details/upload-presentation`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(data);
        alert("Presentation uploaded successfully!");
        
        // Reset form
        setFile(null);
        setDescription("");
        setGroupMembers([{ id: "", name: "" }]);
        setIsGroup(false);
        setErrors({});
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error("Error uploading presentation:", err);
      setErrors({ general: 'Failed to upload presentation. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-presentation-container">
      <div className="upload-presentation-wrapper">
        <div className="upload-header">
          <div className="header-icon">
            <HiOutlineSparkles />
          </div>
          <div>
            <h1 className="header-title">Upload Presentation</h1>
            <p className="header-subtitle">Share your knowledge with the world</p>
          </div>
        </div>

        {errors.general && (
          <div className="error-alert">
            <FiAlertCircle />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="upload-form">
          {/* Presentation Type */}
          <div className="form-section">
            <h2 className="section-title">
              <FiUsers />
              Presentation Type
            </h2>
            
            <div className="radio-group">
              <label className={`radio-option ${!isGroup ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="presentationType"
                  value="individual"
                  checked={!isGroup}
                  onChange={() => setIsGroup(false)}
                />
                <div className="radio-indicator">
                  <FiUser />
                </div>
                <div>
                  <div className="radio-title">Individual</div>
                  <div className="radio-description">Present by yourself</div>
                </div>
              </label>
              
              <label className={`radio-option ${isGroup ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="presentationType"
                  value="group"
                  checked={isGroup}
                  onChange={() => setIsGroup(true)}
                />
                <div className="radio-indicator">
                  <FiUsers />
                </div>
                <div>
                  <div className="radio-title">Group</div>
                  <div className="radio-description">Present with team members</div>
                </div>
              </label>
            </div>
          </div>

          {/* Group Members Section */}
          {isGroup && (
            <div className="form-section">
              <h2 className="section-title">
                <FiUsers />
                Group Members
              </h2>
              
              {errors.members && <span className="error-text">{errors.members}</span>}
              
              <div className="group-members">
                {groupMembers.map((member, index) => (
                  <div key={index} className="member-row">
                    <div className="member-inputs">
                      <input
                        type="text"
                        placeholder="Member ID"
                        value={member.id}
                        onChange={(e) => handleMemberChange(index, 'id', e.target.value)}
                        className="member-input"
                      />
                      <input
                        type="text"
                        placeholder="Member Name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        className="member-input"
                      />
                    </div>
                    
                    {groupMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="remove-member-btn"
                        title="Remove member"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="add-member-btn"
                >
                  <FiPlus />
                  Add Member
                </button>
              </div>
            </div>
          )}

          {/* File Upload Section */}
          <div className="form-section">
            <h2 className="section-title">
              <FiFile />
              Presentation File
            </h2>
            
            <div 
              className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pptx,.pdf,.docx"
                onChange={handleFileUpload}
                className="file-input"
                id="file-upload"
              />
              
              <label htmlFor="file-upload" className="file-upload-content">
                {file ? (
                  <div className="file-selected">
                    <FiCheck className="file-success-icon" />
                    <div>
                      <div className="file-name">{file.name}</div>
                      <div className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                ) : (
                  <div className="file-upload-prompt">
                    <FiUpload className="upload-icon" />
                    <div>
                      <div className="upload-text">Drop your presentation here</div>
                      <div className="upload-subtext">or click to browse</div>
                      <div className="upload-formats">Supports .pptx, .pdf, .docx (max 50MB)</div>
                    </div>
                  </div>
                )}
              </label>
            </div>
            
            {errors.file && <span className="error-text">{errors.file}</span>}
          </div>

          {/* Description Section */}
          <div className="form-section">
            <h2 className="section-title">
              <FiFileText />
              Description
            </h2>
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your presentation, what it covers, and any important details..."
              className={`description-textarea ${errors.description ? 'error' : ''}`}
              rows={4}
            />
            
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <FiUpload />
                Upload Presentation
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPresentation;
