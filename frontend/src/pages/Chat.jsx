import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "./css/Chat.css";

const Chat = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [chatName, setChatName] = useState("New Chat");
  const [tempChatName, setTempChatName] = useState(chatName);
  const [messages, setMessages] = useState([]); // To store chat messages
  const [userInput, setUserInput] = useState(""); // To store current user input
  const [file, setFile] = useState(null);

  
  // axios.defaults.withCredentials = true;
  useEffect(() => {
    // Set an initial message from the bot when the component mounts
    const initialBotMessage = { text: "Hi, how are you?", sender: "bot" };
    setMessages([initialBotMessage]);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the file selected by the user
      handleFileUpload(selectedFile); // Upload the file immediately after selection
    }
  };

  const handleFileUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const newMessages = [
        ...messages,
        { text: `🔗 Uploading ${file.name}...`, sender: "user" },
      ];
      setMessages(newMessages); // Update the chat with the upload status

      try {
        const response = await axios.post(
          "http://10.11.18.243:8000/api/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully:", response.data);

const botMessage = {
  text: `✅ File uploaded successfully: [${file.name}](http://10.11.18.243:8000/media/${file.name})`,
  sender: "bot",
};
        
        const skillsMessage = {
          text: `Extracted skills: ${response.data.extracted_skills.join(
            ", "
          )}`,
          sender: "bot",
        };

        const message2 = {
          text: `Do you want to add more skills?`,
          sender: "bot",
        };

        setMessages([...newMessages, botMessage, skillsMessage, message2]);
      } catch (error) {
        console.error("Error uploading file:", error);

        const errorMessage = {
          text: `❌ Failed to upload ${file.name}. Please try again.`,
          sender: "bot",
        };
        setMessages([...newMessages, errorMessage]);
      }
    } else {
      alert("Please select a file first!");
    }
  };

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

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { text: userInput, sender: "user" }];
      setMessages(newMessages); // Add user message to state
      setUserInput(""); // Clear input
      try {
        const response = await axios.post(
          "http://10.11.18.243:8000/api/chatbot/",
          {
            message: userInput,
          }
        );
        if (response.data.options) {
          const botMessage = { text: response.data.result, sender: "bot" };

          // Format the options (assuming options is an array)
          const optionsText = response.data.options
          .map(option => `- ${option}`)
          .join("\n");
        

          const options = { text: `Options:\n${optionsText}`, sender: "bot" };

          setMessages([...newMessages, botMessage, options]); // Add bot reply and options after user message
        } else {
          const botMessage = { text: response.data.result, sender: "bot" };
          setMessages([...newMessages, botMessage]); // Add bot reply after user message
        }

        if (response.data.pdf_url){
          const botMessage = { text: response.data.result, sender: "bot" };

          console.log("url")
          // Format the options (assuming options is an array)
          const optionsText = response.data.pdf_url
        

          const options = { text: `✅ Click here to view your report: [${optionsText}](http://10.11.18.243:8000/media/${optionsText})`, sender: "bot" };

          setMessages([...newMessages, botMessage, options]); // Add bot reply and options after user message
        }

      } catch (error) {
        console.error("Error fetching data from API:", error);
        const errorMessage = {
          text: "Oops! Something went wrong. Please try again later.",
          sender: "bot",
        };
        setMessages([...newMessages, errorMessage]); // Add error message if API fails
      }
    }
  };

  return (
    <section className="justify-content-between align-items-center text-center vh-100">
      <div className="topBar-chat d-flex justify-content-between align-items-center w-100 p-3">
        <a href="convo">
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

      <div className="midBar-container" >
        <div className="midBar d-flex justify-content-center align-items-center">
          <div className="message-container w-100 d-flex flex-column align-items-start p-3 text-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
          {/* <div ref={messagesEndRef} />  */}
          </div>
        </div>
      </div>

      <div className="downBar-chat d-flex justify-content-between align-items-center w-100 p-3">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div
          className="attach"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <path
              d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Chat;
``;
