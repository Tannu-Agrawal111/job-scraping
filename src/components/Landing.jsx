import './Landing.css';
import DropdownFilters from './DropdownFilters';
import JobListings from './JobListings';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaHeart } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import axios from 'axios';
import { useState , useEffect} from 'react';
import { mockJobs } from '../data/mockJobs';
import ThemeToggle from './ThemeToggle';



const Landing = () => {

const [mockMode, setMockMode] = useState(localStorage.getItem('mockMode') === 'true');
const [filters , setFilters] = useState({
  job_title: "Web Developer",
  job_city: "India",
  job_is_remote: "",
  job_type: ""
});

function addFilters(filter){
  setFilters(filter);
}

useEffect(() => {
  localStorage.setItem('mockMode', mockMode);
}, [mockMode]);

const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      
      if (mockMode) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filteredMock = [...mockJobs];
        if (filters.job_title) {
          filteredMock = filteredMock.filter(j => 
            j.job_title.toLowerCase().includes(filters.job_title.toLowerCase()) ||
            j.employer_name.toLowerCase().includes(filters.job_title.toLowerCase())
          );
        }
        if (filters.job_city) {
          filteredMock = filteredMock.filter(j => 
            j.job_city?.toLowerCase().includes(filters.job_city.toLowerCase())
          );
        }
        
        setJobs(filteredMock);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://job-scraping-backend.onrender.com/api/jobs", {
          params: {
            query: filters.job_title,
            remote: filters.job_is_remote,
            type: filters.job_type,
            city: filters.job_city
          }
        });
        setJobs(response.data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch from API. Showing mock data.");
        setJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters, mockMode]); 



  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <nav className="navbar glass-effect">
        <div className="nav-logo">
          Job<span>Scout</span>
        </div>
        <div className="mode-toggle-container">
          <button 
            className={`mode-btn ${!mockMode ? 'active' : ''}`} 
            onClick={() => setMockMode(false)}
          >
            Real API
          </button>
          <button 
            className={`mode-btn ${mockMode ? 'active' : ''}`} 
            onClick={() => setMockMode(true)}
          >
            Mock Mode
          </button>
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <Link to="/saved-jobs" className="nav-link">
            <FaHeart size={20} />
            <span>Saved</span>
          </Link>
          <div className="profile-trigger" onClick={() => navigate('/profile')}>
            <FaUserCircle size={24} />
            <span>{auth.currentUser?.displayName || 'Profile'}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="main-content">
        <header className="hero-section">
          <h1 className="hero-title">
            Find Your <span>Dream Career</span> Today
          </h1>
          <p className="hero-subtitle">Explore thousands of job opportunities from top companies worldwide.</p>
        </header>

        <section className="filter-section glass-effect">
          <DropdownFilters addFilters={addFilters} />
        </section>

        <section className="results-section">
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Searching for the best opportunities...</p>
            </div>
          ) : (
            <JobListings jobs={jobs} />
          )}
        </section>
      </main>
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