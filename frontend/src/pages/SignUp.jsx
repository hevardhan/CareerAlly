import React, { useState } from "react";
import Entry from "../components/Entry";
import "./css/SignUp.css";
import { CreateUser_Email, SignIn_Github, SignIn_Google } from "../firebase/auth";
const SignUp = () => {

  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    CreateUser_Email(formData.email,formData.password)
    // console.log(formData.email,formData.password)
  };

  return (
    <div className="d-flex mx-3 ss">
      <div className=" align-items-left d-flex flex-column col-md-4 col-12 justify-content-md-center ms-md-3">
        <p className="mt-lg-2 mt-5 p-0 dis text-white text-left">
          Create Your <br />
          Account
        </p>

        <div className="d-flex gap-5 gap-md-4 flex-column  mt-3">
          <Entry place="Username" value={formData.username} onChange={(value) => handleChange('username', value)} />
          <Entry place="Display Name" value={formData.displayName} onChange={(value) => handleChange('displayName', value)} />
          <Entry place="Email" value={formData.email} onChange={(value) => handleChange('email', value)} />
          <Entry place="Password" value={formData.password} onChange={(value) => handleChange('password', value)} />
          <button className="mt-2" onClick={handleSubmit}>
            <span className="button_top">Sign Up</span>
          </button>
          <h5 className="text-white text-center m-0 p-0">
            Have an account ?{" "}
            <a href="convo" className="log-in">
              Log in
            </a>
          </h5>
        </div>
        <div class="divider text-white">OR</div>
        <div className="d-flex justify-content-between mt-1 px-5 pb-md-3 pb-5">
          <button className="socials" onClick={() => { SignIn_Google() }}>
            <i class="fa-brands fa-google"></i>
          </button>
          <button className="socials">
            <i class="fa-brands fa-facebook"></i>
          </button>
          <button className="socials" onClick={() => { SignIn_Github() }}>
            <i class="fa-brands fa-github"></i>
          </button>
        </div>
      </div>
      <div class="col-12 col-lg-8  d-none d-md-flex align-items-center justify-content-center img-cont ">
        <img src="https://i.pinimg.com/originals/cf/94/7b/cf947b46283c10c47e3d5d945afb7053.gif" alt="" className="left-img" />
      </div>
    </div>
  );
};

export default SignUp;
