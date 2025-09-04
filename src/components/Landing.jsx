import './Landing.css';
import DropdownFilters from './DropdownFilters';
import JobListings from './JobListings';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import axios from 'axios';
import { useState , useEffect} from 'react';

const Landing = () => {

const [filters , setFilters] = useState({
  job_title: "",
  job_city: "",
  job_is_remote: "",
  job_type: ""
});

function addFilters(filter){
  setFilters(filter);
}

const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/jobs", {
        params: {
          query: filters.job_title,
          remote: filters.job_is_remote,
          type: filters.job_type,
          city: filters.job_city
        }
      });
      setJobs(response.data.data);

        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]); 



  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <div className="landing-box">
        <div className="profile-icon">
          <FaUserCircle size={28} onClick={() => navigate('/profile')} />
        </div>
        <DropdownFilters addFilters = {addFilters} />
        <h2 className="headline">Find<span>Your</span>DreamJob</h2>
        <JobListings jobs={jobs}/>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Landing;


//  "employer_name": "Google",
    //   "employer_logo": "https://logo.clearbit.com/google.com",
    //   "job_title": "Frontend Developer",
    //   "job_country": "India",
    //   "job_city": "Bangalore",
    //   "job_state": "Karnataka",
    //   "job_description": "We are looking for a Frontend Developer with experience in React.js...",
    //   "job_type": "Full-Time",
    //   "job_is_remote": true,
    //   "job_posted_at_datetime_utc": "2025-07-25T14:45:00Z",
    //   "job_apply_link": "https://careers.google.com/job/123456789",
    //   "job_id": "12345",
    //   "job_employment_type": "Full-Time",
    //   "job_required_experience": {
    //     "required_experience_in_months": 12,
    //     "experience_mentioned": true,
    //     "experience_preferred": true
    //   },
    //   "job_min_salary": 500000,
    //   "job_max_salary": 900000,
    //   "job_salary_currency": "INR"
    // },