import './Home.css'
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function handleLogin(){
    navigate("/login");
  }

  function handleSignup(){
    navigate("/signup");
  }

  return (
    <div className="container">
    <div className="left">
      <div className="logo-section">
        <div className="logo-circle">
          <span className="logo-text">A</span>
        </div>
        <h2 className="brand-name">CareerLaunch</h2>
      </div>

      <h1 className="main-text">
        <span class="highlight">Your Next Career</span><br />
        <span class="highlight">Move Starts Here</span>
      </h1>

      <p className="description">
        Join <span className="light">thousands</span> of professionals who have found their dream jobs through our platform.
      </p>

      <div className="category-buttons">
        <button className="btn purple">Corporate</button>
        <button className="btn pink">Tech</button>
        <button className="btn orange">Creative</button>
      </div>
    </div>

    <div className="right">
      <div className="form-card">
        <h2>Create your account</h2>
        <div className="form-buttons">
          <button onClick={handleLogin} className="form-btn">login</button>
          <button onClick={handleSignup} className="form-btn">SignUp</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home
