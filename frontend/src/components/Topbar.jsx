import React from "react";
import "./css/Topbar.css";

const Topbar = (props) => {
  return (
    <div className="topBar">
      <div className="t1 d-flex justify-content-between align-items-center">
          <p className="text-white display-4 fw-normal m-0 p-0">{props.title}</p>
          <img src={props.imgPath} alt="" srcset="" />
      </div>
      <div className="t2 d-flex justify-content-between align-items-center mt-3">
          <a href="chat">
          <div className="newChat-container d-flex align-items-center p-2">
            <div className="newChat-icon text-white justify-content-center align-items-center d-flex">
              <p className="m-0 p-0 h1">+</p>
            </div>
            <p className="text-white m-0 p-0 h5">New Chat</p>
          </div>
          </a>
          <div className="search-icon d-flex justify-content-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </div>
      </div>
    </div>
  );
};

export default Topbar;
