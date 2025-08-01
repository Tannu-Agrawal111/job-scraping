import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    headline: '',
    summary: '',
    skills: '',
    linkedin: '',
    github: '',
    portfolio: '',
    jobPreference: '',
  });

  // Load saved profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profile saved to localStorage!');
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="profile-heading">Your Profile</h2>
        <div className="profile-scroll">

          {/* Personal Details */}
          <div className="profile-section">
            <h3 className="section-title">Personal Details</h3>

            <label>Full Name</label>
            <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} />

            <label>Phone Number</label>
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} />

            <label>Location</label>
            <input type="text" name="location" value={profile.location} onChange={handleChange} />
          </div>

          {/* Professional Summary */}
          <div className="profile-section">
            <h3 className="section-title">Professional Summary</h3>

            <label>Headline</label>
            <input type="text" name="headline" value={profile.headline} onChange={handleChange} />

            <label>Summary</label>
            <textarea name="summary" value={profile.summary} onChange={handleChange} />
          </div>

          {/* Skills */}
          <div className="profile-section">
            <h3 className="section-title">Skills</h3>

            <label>Skills (comma separated)</label>
            <input type="text" name="skills" value={profile.skills} onChange={handleChange} />
          </div>

          {/* Links */}
          <div className="profile-section">
            <h3 className="section-title">Links</h3>

            <label>LinkedIn</label>
            <input type="text" name="linkedin" value={profile.linkedin} onChange={handleChange} />

            <label>GitHub</label>
            <input type="text" name="github" value={profile.github} onChange={handleChange} />

            <label>Portfolio / Website</label>
            <input type="text" name="portfolio" value={profile.portfolio} onChange={handleChange} />
          </div>

          {/* Job Preferences */}
          <div className="profile-section">
            <h3 className="section-title">Job Preferences</h3>

            <label>Preferred Job Role / Type</label>
            <input type="text" name="jobPreference" value={profile.jobPreference} onChange={handleChange} />
          </div>

          <button className="save-button" onClick={handleSave}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
