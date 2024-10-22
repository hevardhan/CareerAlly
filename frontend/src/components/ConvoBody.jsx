import React from "react";
import DBox from "./DBox";

const ConvoBody = () => {
  return (
    <div>
      <div>
        <p className="text-white m-0 p-0 fs-4">Pinned</p>
        <div className="py-2">
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
        </div>
      </div>
      <div className="pt-3">
        <p className="text-white m-0 p-0 fs-4">Recent</p>
        <div className="py-2">
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
        </div>
      </div>
      <div className="pt-3">
        <p className="text-white m-0 p-0 fs-4">All</p>
        <div className="py-2">
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
          <DBox chatName="This is a Sample Text"/>
        </div>
      </div>
    </div>
  );
};

export default ConvoBody;
