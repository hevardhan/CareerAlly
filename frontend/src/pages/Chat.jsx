import React, { useState } from "react";
import "./css/Chat.css";

const Chat = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [chatName, setChatName] = useState("New Chat");
  const [tempChatName, setTempChatName] = useState(chatName);
  const [messages, setMessages] = useState([]); // To store chat messages
  const [userInput, setUserInput] = useState(""); // To store current user input

  const handleEdit = () => {
    setTempChatName(chatName);
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setTempChatName(e.target.value);
  };

  const handleSave = () => {
    if (tempChatName.trim()) {
      setChatName(tempChatName);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { text: userInput, sender: "user" }];
      setMessages(newMessages); // Add user message to state
      setUserInput(""); // Clear input

      // Simulate bot reply
      setTimeout(() => {
        const botMessage = { text: "Sorry, I am still under development", sender: "bot" };
        setMessages([...newMessages, botMessage]); // Add bot reply after user message
      }, 1000); // Simulate delay for bot response
    }
  };

  return (
    <section className="d-flex flex-column justify-content-between align-items-center text-center vh-100">
      <div className="topBar d-flex justify-content-between align-items-center w-100 p-3">
        <a href="home">
          <img src="left-arrow.svg" alt="Back" className="left-arrow" />
        </a>
        <div className="chatName-container d-flex justify-content-center align-items-center">
          <button
            className="edit-btn"
            onClick={handleEdit}
            disabled={isEditing}
          >
            ✏️
          </button>
          {isEditing ? (
            <div className="edit-container d-flex align-items-center">
              <input
                type="text"
                value={tempChatName}
                onChange={handleNameChange}
                onKeyDown={handleKeyPress}
                className="edit-chat-name"
                autoFocus
              />
              <button className="save-btn" onClick={handleSave}>
                ✔️
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                ❌
              </button>
            </div>
          ) : (
            <div className="chatName d-flex justify-content-center align-items-center bg-white">
              <p className="m-0 p-0 chatText">{chatName}</p>
            </div>
          )}
        </div>
      </div>

      <div className="midBar flex-grow-1 d-flex justify-content-center align-items-center w-100">
        <div className="message-container w-100 d-flex flex-column align-items-start p-3 text-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="downBar d-flex justify-content-between align-items-center w-100 p-3">
        <div className="attach">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <path
              d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="user-input"
          placeholder="Type Something . . . "
          value={userInput}
          onChange={handleUserInputChange}
          onKeyDown={handleKeyPress}
        />
        <div className="attach" onClick={handleSendMessage}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 12L4 4L6 12M20 12L4 20L6 12M20 12H6"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Chat;
