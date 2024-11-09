import React, { useState } from "react";
import Entry from "../components/Entry";
import "./css/SignUp.css";
import { SignIn_Email, SignIn_Github, SignIn_Google } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await SignIn_Email(formData.email, formData.password);
      onLogin(); // Update authentication state
      console.log("Login successful"); // Log success message for email login
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await SignIn_Google();
      onLogin(); // Update authentication state
      console.log("Login successful with Google"); // Log success message for Google login
      navigate('/chat')
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await SignIn_Github();
      onLogin(); // Update authentication state
      console.log("Login successful with GitHub"); // Log success message for GitHub login
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

  return (
    <div className="d-flex mx-3 ss">
      <div className="align-items-left d-flex flex-column col-md-4 col-12 justify-content-md-center ms-md-3">
        <p className="mt-lg-2 mt-5 p-0 dis text-white text-left">
          Happy To See You <br />
          Again!
        </p>

        <div className="d-flex gap-5 gap-md-4 flex-column mt-3">
          <Entry place="Email" value={formData.email} onChange={(value) => handleChange('email', value)} />
          <Entry place="Password" value={formData.password} onChange={(value) => handleChange('password', value)} />
          <button className="mt-2" onClick={handleSubmit}>
            <span className="button_top">Login</span>
          </button>
          <h5 className="text-white text-center m-0 p-0">
            Haven't Joined Us Yet?{" "}
            <a href="signup" className="log-in">
              Sign Up
            </a>
          </h5>
        </div>
        <div className="divider text-white">OR</div>
        <div className="d-flex justify-content-between mt-1 px-5 pb-md-3 pb-5">
          <button className="socials" onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google"></i>
          </button>
          <button className="socials">
            <i className="fa-brands fa-facebook"></i>
          </button>
          <button className="socials" onClick={handleGithubLogin}>
            <i className="fa-brands fa-github"></i>
          </button>
        </div>
      </div>
      <div className="col-12 col-lg-8 d-none d-md-flex align-items-center justify-content-center img-cont">
        <img
          src="https://i.pinimg.com/originals/cf/94/7b/cf947b46283c10c47e3d5d945afb7053.gif"
          alt=""
          className="left-img"
        />
      </div>
    </div>
  );
};

export default Login;
