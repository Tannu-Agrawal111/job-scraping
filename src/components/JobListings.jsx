// import React from 'react';
// import './JobListings.css';

// const JobListings = (props) => {

//   function printListings(job , index){
//     return <li key={index}>
//      {index } : {job.job_title} <br /> <br />
//      {job.job_city} <br /><br />
//      {job.job_is_remote ? "remote" : "no-remote"} <br /><br />
//      {job.job_description} <br /><br /><br /><br />
//     </li>
//   }



//   return (
//     <div className="job-listings-container">
//       <ol>
//         {props.jobs.map(printListings)}
//       </ol>
//     </div>
//   );
// };

// export default JobListings;

import React from 'react';
import './JobListings.css';
import JobCard from './JobCard'; // Import the JobCard

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
