import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaUser, FaLink, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import './Profile.css';
import { toast } from 'react-toastify';
import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'profiles', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            const localData = localStorage.getItem(`profile_${user.uid}`);
            if (localData) {
              setProfile(JSON.parse(localData));
            } else {
              setProfile(prev => ({ ...prev, fullName: user.displayName || '', email: user.email || '' }));
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          const localData = localStorage.getItem(`profile_${user.uid}`);
          if (localData) setProfile(JSON.parse(localData));
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      const cleanProfile = Object.fromEntries(
        Object.entries(profile).map(([key, value]) => [key, value === undefined ? '' : value])
      );
      
      await setDoc(doc(db, 'profiles', user.uid), cleanProfile);
      localStorage.setItem(`profile_${user.uid}`, JSON.stringify(cleanProfile));
      toast.success('Profile updated successfully on Cloud!');
    } catch (error) {
      console.error("Firestore Error:", error);
      
      // Fallback to LocalStorage if Firestore fails
      localStorage.setItem(`profile_${user.uid}`, JSON.stringify(profile));
      
      if (error.code === 'permission-denied') {
        toast.warning('Local save success! But Cloud save failed (Firebase Rules issue). Check instructions below.');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-container" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <nav className="profile-nav glass-effect">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft /> Back
        </button>
        <h2>Your Profile</h2>
        <button className="save-btn-top" onClick={handleSave}>
          <FaSave /> Save Changes
        </button>
      </nav>

      <main className="profile-content">
        <div className="profile-grid">
          {/* Sidebar / Info */}
          <aside className="profile-sidebar glass-effect">
            <div className="avatar-section">
              <div className="profile-avatar">
                {profile.fullName?.charAt(0) || <FaUser />}
              </div>
              <h3>{profile.fullName || 'User Name'}</h3>
              <p>{profile.headline || 'No headline set'}</p>
            </div>
            <div className="sidebar-links">
              <div className={`sidebar-item active`}><FaUser /> Personal</div>
              <div className={`sidebar-item`}><FaBriefcase /> Experience</div>
              <div className={`sidebar-item`}><FaGraduationCap /> Education</div>
              <div className={`sidebar-item`}><FaLink /> Social Links</div>
            </div>
          </aside>

          {/* Form Content */}
          <div className="profile-form-container glass-effect">
            <div className="form-section">
              <h3 className="section-title"><FaUser /> Personal Information</h3>
              <div className="input-grid">
                <div className="input-field">
                  <label>Full Name</label>
                  <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} placeholder="e.g. John Doe" />
                </div>
                <div className="input-field">
                  <label>Email Address</label>
                  <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="john@example.com" disabled />
                </div>
                <div className="input-field">
                  <label>Phone Number</label>
                  <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="+91 9876543210" />
                </div>
                <div className="input-field">
                  <label>Location</label>
                  <input type="text" name="location" value={profile.location} onChange={handleChange} placeholder="e.g. Mumbai, India" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title"><FaBriefcase /> Professional Summary</h3>
              <div className="input-field">
                <label>Headline</label>
                <input type="text" name="headline" value={profile.headline} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" />
              </div>
              <div className="input-field">
                <label>Bio / Summary</label>
                <textarea name="summary" value={profile.summary} onChange={handleChange} placeholder="Tell us about yourself..." rows="4" />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title"><FaLink /> Online Presence</h3>
              <div className="input-grid">
                <div className="input-field">
                  <label>LinkedIn</label>
                  <input type="text" name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="input-field">
                  <label>GitHub</label>
                  <input type="text" name="github" value={profile.github} onChange={handleChange} placeholder="https://github.com/..." />
                </div>
                <div className="input-field">
                  <label>Portfolio</label>
                  <input type="text" name="portfolio" value={profile.portfolio} onChange={handleChange} placeholder="https://yourwebsite.com" />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="save-button" onClick={handleSave}>
                <FaSave /> Save All Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
