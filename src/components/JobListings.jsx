import './JobListings.css';
import JobCard from './JobCard'; 

const JobListings = ({ jobs }) => {
  return (
    <div className="job-listings-container">
      <ol>
        {jobs.map((job, index) => (
          <li key={index}>
            <JobCard job={job} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default JobListings;
