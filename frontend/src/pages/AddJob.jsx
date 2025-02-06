import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AddJob.css";

const statesAndCities = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli"],
};

const colleges = ["SRM Chennai", "SIT Pune", "VIT Vellore"];

const AddJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    company: "",
    state: "",
    city: "",
    jobType: "",
    salary: "",
    description: "",
    college: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });

    if (e.target.name === "state") {
      setJobData({ ...jobData, state: e.target.value, city: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", jobData);
    alert("Job Posted Successfully!");
    navigate("/");
  };

  return (
    <div className="container mt-4 add-job-form">
      <h2 className="text-center text-white">Post a Job</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g., AI Engineer"
              value={jobData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="e.g., Artificial Intelligence"
              value={jobData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="company"
              className="form-control"
              placeholder="e.g., Google"
              value={jobData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">State</label>
            <select
              name="state"
              className="form-select"
              value={jobData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">City</label>
            <select
              name="city"
              className="form-select"
              value={jobData.city}
              onChange={handleChange}
              required
              disabled={!jobData.state}
            >
              <option value="">Select City</option>
              {jobData.state &&
                statesAndCities[jobData.state].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">College Name</label>
            <select
              name="college"
              className="form-select"
              value={jobData.college}
              onChange={handleChange}
              required
            >
              <option value="">Select College</option>
              {colleges.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Job Type</label>
            <select
              name="jobType"
              className="form-select"
              value={jobData.jobType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Salary (per year)</label>
            <input
              type="text"
              name="salary"
              className="form-control"
              placeholder="e.g., $100,000"
              value={jobData.salary}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Describe the job responsibilities..."
            value={jobData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
