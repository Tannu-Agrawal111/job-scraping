import './JobCard.css'; 

const JobCard = ({ job }) => {

  function handleJob(){
    if (job.job_google_link) {
      window.open(job.job_google_link, '_blank');
    } else {
      alert("Apply link not available.");
    }
  }

  return (
    <div className="job-card">
      <h3>{job.job_title}</h3>
      <p><strong>City:</strong> {job.job_city || "Not specified"}</p>
      <p><strong>Remote:</strong> {job.job_is_remote ? "Remote" : "Onsite"}</p>
      <p><strong>Description:</strong> {job.job_description?.slice(0, 150)}...</p>

      <button className="apply-btn" onClick={handleJob}>
        View Job
      </button>
    </div>
  );
};

export default JobCard;
