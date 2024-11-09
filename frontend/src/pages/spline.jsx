import React from 'react'
import Spline from '@splinetool/react-spline';
import './css/spline.css'

const spline = () => {
  return (
    <div className="spline-container">
      <Spline scene="https://prod.spline.design/ZLVq4hZEXvP-KpnU/scene.splinecode" />
      <nav class="navbar navbar-expand-lg p-5">
  <div class="container-fluid">
    <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
        <a class="nav-link text-white" href="#">About</a>
        <a class="nav-link text-white" href="#">Contact Us</a>
      </div>
    </div>
      <p class="text-white display-6 ms-auto m-0">CareerAlly</p>
  </div>
</nav>

      <div className="centered-text ps-5">
        <p className='display-1 text-white'>
          Your Pathway <br></br> To Success
          </p>
        <div className='text-white d-flex gap-4'>
          <div className='spline-button text-center'>
            Get Started 👉
          </div>
          <div className='spline-button text-center'>
            Login
          </div>
        </div>
      </div>
      </div>
  );
};


export default spline