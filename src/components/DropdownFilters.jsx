import React, { useState } from 'react';
import './DropdownFilters.css';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const DropdownFilters = (props) => {
  const [filters, setFilters] = useState({
    job_title: "",
    job_city: "",
    job_is_remote: "",
    job_type: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters((prevVal) => {
      return {
        ...prevVal, [name]: value
      }
    })
  }

  function handleClick() {
    props.addFilters(filters);
  }

  return (
    <div className="dropdown-container">
      <div className="filter-grid">
        <div className="filter-group">
          <label className="filter-label">Job Title / Role</label>
          <div className="input-with-icon">
            <FaSearch className="field-icon" />
            <input 
              type="text" 
              name="job_title" 
              placeholder="e.g. Frontend, Backend..." 
              value={filters.job_title}
              onChange={handleChange}
              className="text-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Location</label>
          <div className="input-with-icon">
            <FaMapMarkerAlt className="field-icon" />
            <input 
              type="text" 
              name="job_city" 
              placeholder="e.g. Mumbai, Delhi, Remote..." 
              value={filters.job_city}
              onChange={handleChange}
              className="text-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Work Mode</label>
          <select name="job_is_remote" onChange={handleChange} className="select-input">
            <option value="">Any Mode</option>
            <option value="true">Remote</option>
            <option value="false">Onsite</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Job Type</label>
          <select name="job_type" onChange={handleChange} className="select-input">
            <option value="">Any Type</option>
            <option value="fulltime">Full-Time</option>
            <option value="parttime">Part-Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      <button onClick={(e) => { e.preventDefault(); handleClick() }} className="search-button">
        Search Opportunities
      </button>
    </div>
  );
};

export default DropdownFilters;
