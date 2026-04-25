import './Home.css';
import { useNavigate } from "react-router-dom";
import { FaRocket, FaCheckCircle, FaSearch } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-overlay"></div>
      
      <nav className="home-nav">
        <div className="nav-logo">
          Job<span>Scout</span>
        </div>
        <div className="nav-btns">
          <button onClick={() => navigate("/login")} className="nav-login">Login</button>
          <button onClick={() => navigate("/signup")} className="nav-signup">Get Started</button>
        </div>
      </nav>

      <main className="home-hero">
        <div className="hero-content">
          <div className="badge glass-effect">
            <FaRocket /> <span>#1 Job Search Platform</span>
          </div>
          <h1 className="hero-title">
            Land Your <span>Dream Job</span> <br />With One Click.
          </h1>
          <p className="hero-text">
            Connect with top-tier companies and explore thousands of opportunities tailored just for you. Your career evolution begins here.
          </p>
          
          <div className="hero-actions">
            <button onClick={() => navigate("/signup")} className="primary-btn">
              Explore Opportunities <FaSearch size={14} />
            </button>
            <div className="hero-stats">
              <div className="stat">
                <strong>10k+</strong> <span>Jobs Added</span>
              </div>
              <div className="stat">
                <strong>500+</strong> <span>Companies</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card glass-effect animate-up">
            <FaCheckCircle className="visual-icon" />
            <div>
              <h4>Real-time Tracking</h4>
              <p>Get notified as soon as you get a match.</p>
            </div>
          </div>
          <div className="visual-card glass-effect animate-down">
            <FaSearch className="visual-icon pink" />
            <div>
              <h4>Smart Filters</h4>
              <p>Find jobs that actually match your skills.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
