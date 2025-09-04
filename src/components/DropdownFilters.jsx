import React, { useState , useEffect } from 'react';
import './DropdownFilters.css';

const DropdownFilters = (props) => {

const [filters , setFilters] = useState({
  job_title : "" ,
  job_city : "",
  job_is_remote : "",
  job_type : ""
});


function handleChange(e){
  const {name , value} = e.target;
  setFilters((prevVal) => {
  return {
    ...prevVal , [name] : value
  }
})
}

function handleClick(){
  props.addFilters(filters);
}

  return (
    <div className="dropdown-container">
      <div className="row">
        <select name="job_title" onChange={(e)=>{
          handleChange(e);
        }} >
          <option value="">Select Job Title</option>
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="fullstack">Full Stack Developer</option>
        </select>

        <select name="job_city" onChange={(e)=>{
          handleChange(e);
        }}>
          <option value="">Select Location</option>
          <option value="remote">Remote</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>

        <select name="job_is_remote" onChange={(e)=>{
          handleChange(e);
        }}>
          <option value="">Work Mode</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div className="row" onChange={(e)=>{
        handleChange(e);
      }}>
        <select name="job_type">
          <option value="">Job Type</option>
          <option value="internship">Internship</option>
          <option value="parttime">Part-Time</option>
          <option value="fulltime">Full-Time</option>
        </select>

        <select name="experienceLevel">
          <option value="">Experience Level</option>
          <option value="fresher">Fresher</option>
          <option value="0-1">0-1 years</option>
          <option value="2plus">2+ years</option>
        </select>
      </div>

      <button onClick={(e)=>{e.preventDefault(); handleClick()}} className="search-btn">Search</button>
    </div>
  );
};

export default DropdownFilters;
