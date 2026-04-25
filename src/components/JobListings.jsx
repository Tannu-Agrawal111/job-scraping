import './JobListings.css';
import JobCard from './JobCard'; 

const JobListings = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="no-results">
        <h3>No jobs found</h3>
        <p>Try adjusting your filters to find more opportunities.</p>
      </div>
    );
  }

  return (
    <div className="job-listings-grid">
      {jobs.map((job, index) => (
        <JobCard key={job.job_id || index} job={job} />
      ))}
    </div>
  );
};

export default JobListings;
