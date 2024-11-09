import React, { useState } from "react";
import Entry from "../components/Entry";
import "./css/SignUp.css";
import { CreateUser_Email, SignIn_Github, SignIn_Google } from "../firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!formData.username || !formData.displayName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Create user with email and password
      await CreateUser_Email(formData.email, formData.password);
      const user = auth.currentUser;

      if (user) {
        // Save user data to Firestore with 'userId' instead of 'username'
        await setDoc(doc(db, "User", user.uid), {
          email: user.email,
          userId: user.uid, // Use the 'userId' field
          displayName: formData.displayName,
        });

        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email is already in use.");
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password is too weak. Please choose a stronger password.");
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email format.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await SignIn_Google();
      const user = userCredential.user;

      if (user) {
        // Extracting user data from Google
        const userData = {
          email: user.email,
          userId: user.uid, // Use 'userId' instead of 'username'
          displayName: user.displayName || 'User', // Default to 'User' if displayName is missing
        };

        // Save user data to Firestore with 'userId'
        await setDoc(doc(db, "User", user.uid), userData);

        toast.success("Account created with Google!");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      const userCredential = await SignIn_Github();
      const user = userCredential.user;

      if (user) {
        // Extracting user data from GitHub
        const userData = {
          email: user.email,
          userId: user.uid, // Use 'userId' instead of 'username'
          displayName: user.displayName || 'User', // Default to 'User' if displayName is missing
        };

        // Save user data to Firestore with 'userId'
        await setDoc(doc(db, "User", user.uid), userData);

        toast.success("Account created with GitHub!");
      }
    } catch (error) {
      console.error("GitHub login failed:", error);
      toast.error("GitHub login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex mx-3 ss">
      <div className="align-items-left d-flex flex-column col-md-4 col-12 justify-content-md-center ms-md-3">
        <p className="mt-lg-2 mt-5 p-0 dis text-white text-left">
          Create Your <br />
          Account
        </p>

        <div className="d-flex gap-5 gap-md-4 flex-column mt-3">
          <Entry place="Username" value={formData.username} onChange={(value) => handleChange('username', value)} />
          <Entry place="Display Name" value={formData.displayName} onChange={(value) => handleChange('displayName', value)} />
          <Entry place="Email" value={formData.email} onChange={(value) => handleChange('email', value)} />
          <Entry place="Password" value={formData.password} onChange={(value) => handleChange('password', value)} />
          <button className="mt-2" onClick={handleSubmit}>
            <span className="button_top">Sign Up</span>
          </button>
          <h5 className="text-white text-center m-0 p-0">
            Have an account?{" "}
            <a href="login" className="log-in">
              Log in
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
        <img src="https://i.pinimg.com/originals/cf/94/7b/cf947b46283c10c47e3d5d945afb7053.gif" alt="" className="left-img" />
      </div>
    </div>
  );
};

export default SignUp;
