import './JobCard.css'; 
import { FaMapMarkerAlt, FaBriefcase, FaExternalLinkAlt, FaClock, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsSaved(savedJobs.some(s => s.job_id === job.job_id));
  }, [job.job_id]);

  const toggleSave = (e) => {
    e.stopPropagation();
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (isSaved) {
      const updated = savedJobs.filter(s => s.job_id !== job.job_id);
      localStorage.setItem('savedJobs', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedJobs.push(job);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      setIsSaved(true);
    }
  };

  const handleJob = () => {
    navigate(`/job/${job.job_id}`, { state: { job } });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="job-card glass-effect">
      <button 
        className={`save-job-btn ${isSaved ? 'saved' : ''}`} 
        onClick={toggleSave}
        title={isSaved ? "Remove from saved" : "Save job"}
      >
        {isSaved ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="card-header">
        {job.employer_logo ? (
          <img src={job.employer_logo} alt={job.employer_name} className="company-logo" />
        ) : (
          <div className="company-logo-placeholder">{job.employer_name?.charAt(0)}</div>
        )}
        <div className="header-info">
          <h4 className="company-name">{job.employer_name}</h4>
          <span className="post-date">
            <FaClock size={12} /> {formatDate(job.job_posted_at_datetime_utc)}
          </span>
        </div>
      </div>

      <h3 className="job-title">{job.job_title}</h3>

      <div className="job-meta">
        <div className="meta-item">
          <FaMapMarkerAlt size={14} />
          <span>{job.job_city ? `${job.job_city}, ${job.job_country}` : (job.job_is_remote ? "Remote" : "Global")}</span>
        </div>
        <div className="meta-item">
          <FaBriefcase size={14} />
          <span>{job.job_employment_type || "Full-time"}</span>
        </div>
      </div>

      <p className="job-desc">
        {job.job_description?.slice(0, 120)}...
      </p>

      <div className="card-footer">
        {job.job_min_salary && (
          <div className="salary-info">
            {job.job_salary_currency} {job.job_min_salary.toLocaleString()} - {job.job_max_salary.toLocaleString()}
          </div>
        )}
        <button className="apply-button" onClick={handleJob}>
          View Details <FaExternalLinkAlt size={12} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
