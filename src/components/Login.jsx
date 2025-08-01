import React, { useState } from 'react';
import './Login.css';
import { Link , useNavigate } from 'react-router-dom';
import {auth} from "./firebase";
import {ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth , email,password);
      toast.success("Login Successful!" , {
        position:"top-center"
      })
      setTimeout(() => {
        navigate("/landing")
      }, 2000);
    } catch (error) {
      toast.error(error.message , {position:"top-center"})
    }
  }

  return (
    <div className="login-container">
      <ToastContainer/>
      <div className="login-box">
        <button className="close-btn">×</button>
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin} className="login-form" autoComplete="off">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="signup-text">
          Not registered? <Link to="/signup" className="signup-link">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
