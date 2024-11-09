import React, { useState } from "react";
import Entry from "../components/Entry";
import "./css/SignUp.css";
import { SignIn_Email, SignIn_Github, SignIn_Google } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

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

  const navigate = useNavigate();

  // Handle login with email and password
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password");
      return;
    }

    try {
      await SignIn_Email(formData.email, formData.password);
      toast.success("Login Successful!");
      navigate('/convo');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email address. Please check your email.");
      } else if (error.code === 'auth/user-not-found') {
        toast.error("No user found with this email.");
      } else if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("Login failed. Please try again later.");
      }
      console.error("Failed to login:", error);
    }
  };

  // Handle Google login and add user to the database if new
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await SignIn_Google();
      const user = userCredential.user;

      if (user) {
        // Check if the user exists in the database
        const userDoc = await getDoc(doc(db, "User", user.uid));
        
        if (!userDoc.exists()) {
          // User does not exist, add user data to the database
          await setDoc(doc(db, "User", user.uid), {
            email: user.email,
            username: user.uid, // Using user ID as the username for Google
            displayName: user.displayName || "Anonymous", // Default display name if not provided
          });
          toast.success("New user added to database.");
        }

        toast.success("Login successful with Google");
        navigate('/convo');
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Login attempt was canceled.");
      } else {
        toast.error("Google login failed. Please try again.");
      }
      console.error("Google login failed:", error);
    }
  };

  // Handle GitHub login and add user to the database if new
  const handleGithubLogin = async () => {
    try {
      const userCredential = await SignIn_Github();
      const user = userCredential.user;

      if (user) {
        // Check if the user exists in the database
        const userDoc = await getDoc(doc(db, "User", user.uid));
        
        if (!userDoc.exists()) {
          // User does not exist, add user data to the database
          await setDoc(doc(db, "User", user.uid), {
            email: user.email,
            username: user.uid, // Using user ID as the username for GitHub
            displayName: user.displayName || "Anonymous", // Default display name if not provided
          });
          toast.success("New user added to database.");
        }

        toast.success("Login successful with GitHub");
        navigate('/convo');
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Login attempt was canceled.");
      } else {
        toast.error("GitHub login failed. Please try again.");
      }
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
