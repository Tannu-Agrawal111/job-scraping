import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaBriefcase, FaClock, FaBuilding, FaGlobe, FaExternalLinkAlt, FaCheckCircle, FaHeart, FaRegHeart } from 'react-icons/fa';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(location.state?.job || null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if job is saved
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsSaved(savedJobs.some(s => s.job_id === id));

    // If job wasn't passed via state (e.g. on refresh), we could fetch it here
    // But for this project, passing state is more reliable for mock/real toggle
  }, [id]);

  const toggleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (isSaved) {
      const updated = savedJobs.filter(s => s.job_id !== id);
      localStorage.setItem('savedJobs', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedJobs.push(job);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      setIsSaved(true);
    }
  };

  if (!job) {
    return (
      <div className="error-page">
        <h2>Job details not found</h2>
        <button onClick={() => navigate(-1)} className="back-btn">Back to Jobs</button>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="job-details-page">
      <nav className="nav-simple glass-effect">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft /> Back to Search
        </button>
        <button className={`save-btn ${isSaved ? 'saved' : ''}`} onClick={toggleSave}>
          {isSaved ? <FaHeart /> : <FaRegHeart />} {isSaved ? 'Saved' : 'Save Job'}
        </button>
      </nav>

      <main className="details-container">
        <header className="details-header glass-effect">
          <div className="header-main">
            {job.employer_logo ? (
              <img src={job.employer_logo} alt={job.employer_name} className="detail-logo" />
            ) : (
              <div className="detail-logo-placeholder">{job.employer_name?.charAt(0)}</div>
            )}
            <div className="header-content">
              <h1 className="detail-title">{job.job_title}</h1>
              <div className="header-meta">
                <span className="meta-item"><FaBuilding /> {job.employer_name}</span>
                <span className="meta-item"><FaMapMarkerAlt /> {job.job_city}, {job.job_country}</span>
                <span className="meta-item"><FaBriefcase /> {job.job_employment_type}</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <a href={job.job_apply_link || job.job_google_link} target="_blank" rel="noopener noreferrer" className="apply-btn-large">
              Apply Now <FaExternalLinkAlt />
            </a>
          </div>
        </header>

        <div className="details-grid">
          <section className="details-main-info glass-effect">
            <div className="section-block">
              <h3>Job Description</h3>
              <p className="description-text">{job.job_description}</p>
            </div>

            {job.job_highlights?.Qualifications && (
              <div className="section-block">
                <h3>Qualifications</h3>
                <ul className="highlights-list">
                  {job.job_highlights.Qualifications.map((item, index) => (
                    <li key={index}><FaCheckCircle className="check-icon" /> {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.job_highlights?.Responsibilities && (
              <div className="section-block">
                <h3>Responsibilities</h3>
                <ul className="highlights-list">
                  {job.job_highlights.Responsibilities.map((item, index) => (
                    <li key={index}><FaCheckCircle className="check-icon" /> {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <aside className="details-sidebar">
            <div className="sidebar-card glass-effect">
              <h3>Overview</h3>
              <div className="overview-list">
                <div className="overview-item">
                  <span className="label">Posted On</span>
                  <span className="value">{formatDate(job.job_posted_at_datetime_utc)}</span>
                </div>
                <div className="overview-item">
                  <span className="label">Remote</span>
                  <span className="value">{job.job_is_remote ? 'Yes' : 'No'}</span>
                </div>
                <div className="overview-item">
                  <span className="label">Employer</span>
                  <span className="value">{job.employer_name}</span>
                </div>
                {job.employer_website && (
                  <div className="overview-item">
                    <span className="label">Website</span>
                    <a href={job.employer_website} target="_blank" rel="noreferrer" className="value link">Visit Site <FaGlobe /></a>
                  </div>
                )}
              </div>
            </div>

            <div className="safety-card glass-effect">
              <FaCheckCircle className="safety-icon" />
              <p>Be careful of scams! Never pay for job applications.</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
