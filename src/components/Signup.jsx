import React , {useState} from 'react';
import './Signup.css';
import {auth , db} from "./firebase.js"
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link , useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name , setName] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) =>{
      e.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth , email , password);
        const user = userCredential.user;

        await setDoc(doc(db , "users" , user.uid),{
          name : name ,
          email : email ,
          uid : user.uid ,
          createdAt : new Date()
        });

        toast.success("Signup successful!", {
          position: "top-center"
        });

        setTimeout(() => {
          navigate("/login")
        }, 2000);

      } catch (error) {
        toast.error(error.message, {
        position: "top-center"
      });
      }
    }

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-box">
        <button className="close-btn">×</button>
        <h2 className="signup-title">Signup</h2>

        <form onSubmit={handleSignup} className="signup-form">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) =>{setName(e.target.value)}}
            id="name" 
            placeholder="Enter your full name" 
            autoComplete="off" 
            required
            />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />


          <button type="submit" className="signup-btn">Signup</button>
        </form>

        <p className="login-text">
          Have an account? <Link to="/login" className="login-link">Login</Link>
        </p>

        {console.log(name , " " , password)}
      </div>
    </div>
  );
};

export default Signup;
