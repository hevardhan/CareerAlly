import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/RecruiterBody.css";
import Posts from "./Posts";

const RecruiterBody = () => {
  const navigate = useNavigate();

  return (
    <div className="rec-body mt-3">
      <p className="h4">Job Posts</p>
      <div className="post-container ms-3 d-flex">
        {/* Clickable Post */}
        <div onClick={() => navigate("/job-details/ai-ml-intern")} style={{ cursor: "pointer" }}>
          <Posts category={"AI"} job_titile={"AIML Intern"} by={"Me"} time={2} />
        </div>

        {/* Clickable Card for Adding Job */}
        <div 
          className="card d-flex justify-content-center align-items-center" 
          onClick={() => navigate("/add-job")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-inner text-center">
            <div className="justify-content-center align-items-center d-flex m-4">
              <div className="newChat-icon text-white justify-content-center align-items-center d-flex">
                <p className="m-0 p-0 h1">+</p>
              </div>
            </div>
            <p>Add a Job Opening</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterBody;
