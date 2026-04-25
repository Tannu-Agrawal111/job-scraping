import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import JobCard from './JobCard';
import './SavedJobs.css';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(jobs);
  }, []);

  return (
    <div className="saved-jobs-page">
      <nav className="navbar glass-effect">
        <button onClick={() => navigate('/landing')} className="back-btn">
          <FaArrowLeft /> Back to Dashboard
        </button>
        <div className="nav-logo">
          Job<span>Scout</span>
        </div>
      </nav>

      <main className="main-content">
        <header className="hero-section">
          <h1 className="hero-title">
            Your <span>Saved Jobs</span> <FaHeart className="heart-icon" />
          </h1>
          <p className="hero-subtitle">You have {savedJobs.length} jobs saved for later.</p>
        </header>

        <section className="results-section">
          {savedJobs.length === 0 ? (
            <div className="no-results">
              <h3>No saved jobs yet</h3>
              <p>Start exploring and heart the jobs you love!</p>
              <button onClick={() => navigate('/landing')} className="explore-btn">Explore Jobs</button>
            </div>
          ) : (
            <div className="job-listings-grid">
              {savedJobs.map((job) => (
                <JobCard key={job.job_id} job={job} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SavedJobs;
