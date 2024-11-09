import React from 'react'
import Spline from '@splinetool/react-spline';
import './css/spline.css'
import { useNavigate } from 'react-router-dom';
const HomeSpline = () => {
  const navigate = useNavigate();
  return (
    <div className="spline-container">
      <Spline scene="https://prod.spline.design/ZLVq4hZEXvP-KpnU/scene.splinecode" />
      <nav class="navbar navbar-expand-lg p-3 pt-4">
        <div class="container-fluid">
          <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <p class="text-white display-6 ms-auto m-0 d-md-none">CareerAlly</p>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav gap-md-5">
              <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
              <a class="nav-link text-white" href="#">About</a>
              <a class="nav-link text-white" href="#">Download</a>
              <a class="nav-link text-white" href="#">Contact Us</a>
            </div>
            <p class="text-white display-6 ms-auto m-0 d-none d-md-block">CareerAlly</p>
          </div>
        </div>
      </nav>

      <div className="centered-text ps-4 ps-md-5">
        <p className='display-1 text-white'>
          Your Pathway <br></br> To Success
        </p>
        <div className='text-white d-flex gap-4'>
          <div className='spline-button text-center' onClick={() => navigate('/signup')}>
            Get Started 👉
          </div>
          <div className='spline-button text-center' onClick={() => navigate('/login')}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};


export default HomeSpline