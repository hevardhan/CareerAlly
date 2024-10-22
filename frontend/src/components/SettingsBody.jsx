import React from "react";
import DBox from "./DBox";

const SettingsBody = () => {
  return (
    <div>
      <div>
        <p className="text-white m-0 p-0 fs-4">Settings</p>
        <div className="py-2">
          <DBox chatName="Profile" />
          <DBox chatName="Notification" />
          <DBox chatName="Language" />
          <DBox chatName="Passwords and Security Management" />
        </div>
      </div>
      <div>
        <p className="text-white m-0 pt-3 fs-4">Support</p>
        <div className="py-2">
          <DBox chatName="Send Feedback" />
          <DBox chatName="About Us" />
          <DBox chatName="Terms and Condition" />
          <DBox chatName="Rate Us" />
          <DBox chatName="Connect" />
        </div>
      </div>
    </div>
  );
};

export default SettingsBody;
