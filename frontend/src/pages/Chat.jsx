import React from "react";
import "./css/Chat.css";

const Chat = () => {
  return (
    <section className="d-flex flex-column justify-content-between align-items-center text-center vh-100">
      <div className="topBar d-flex justify-content-between align-items-center w-100 p-3">
        <img src="left-arrow.svg" alt="" className="left-arrow" />
        <div className="chatName d-flex justify-content-center align-items-center bg-white">
          <p className="m-0 p-0 chatText">New Chat</p>
        </div>
      </div>

      <div className="midBar flex-grow-1 d-flex justify-content-center align-items-center w-100"></div>

      <div className="downBar d-flex justify-content-between align-items-center w-100 p-3">
        <div className="attach">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <input type="text" id='user-input' placeholder="Type Something . . . "/>
        <div className="attach">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12L4 4L6 12M20 12L4 20L6 12M20 12H6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
      </div>
    </section>
  );
};

export default Chat;
