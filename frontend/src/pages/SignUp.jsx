import React from "react";
import Entry from "../components/Entry";
import "./css/SignUp.css";
const SignUp = () => {
  return (
    <div className="d-flex mx-3 ss gap-2">
      <div className=" align-items-left d-flex flex-column col-md-4 col-12">
        <p className="mt-lg-2 mt-5 p-0 dis text-white text-left">
          Create Your <br />
          Account
        </p>

        <div className="d-flex gap-5 gap-md-4 flex-column  mt-3">
          <Entry place="Username" />
          <Entry place="Display Name" />
          <Entry place="Email" />
          <Entry place="Password" />
          <button className="mt-2">
            <span class="button_top"> Sign Up </span>
          </button>
          <h5 className="text-white text-center m-0 p-0">
          Have an account ?{" "}
          <a href="convo" className="log-in">
          Log in
          </a>
        </h5>
        </div>
        <div class="divider text-white">OR</div>
        <div className="d-flex justify-content-between mt-1 px-5">
          <button className="socials">
            <i class="fa-brands fa-google"></i>
          </button>
          <button className="socials">
            <i class="fa-brands fa-facebook"></i>
          </button>
          <button className="socials">
            <i class="fa-brands fa-github"></i>
          </button>
        </div>
      </div>
      <div class="col-12 col-lg-8  d-none d-md-flex align-items-center justify-content-center ">
        <img src="https://i.pinimg.com/originals/cf/94/7b/cf947b46283c10c47e3d5d945afb7053.gif" alt="" className="left-img"/>
      </div>
    </div>
  );
};

export default SignUp;
