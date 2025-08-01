import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Landing from "./Landing"
import Profile from "./Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/landing" element = {<Landing/>}/>
        <Route path="/profile" element = {<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
