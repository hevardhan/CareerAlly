import React from "react";
import CBox from "./CBox";
import "./css/ConnectBody.css"
import DBox from "./DBox";
const ConnectBody = () => {
  return (
    <div>
      <div>
        <p className="text-white m-0 p-0 fs-4">Suggestions</p>
        <div className="p-4 d-flex CBox-container gap-4">
          <CBox name='Name Goes Here' imgPath='./man.png' />
          <CBox name='Name Goes Here' imgPath='./man.png' />
          <CBox name='Name Goes Here' imgPath='./man.png' />
          <CBox name='Name Goes Here' imgPath='./man.png' />
        </div>
      </div>
      <div>
      <p className="text-white m-0 pt-3 fs-4">Friends</p>
        <div className="py-2">
          <DBox chatName="Friends Name goes here" />
          <DBox chatName="Friends Name goes here" />
          <DBox chatName="Friends Name goes here" />
          <DBox chatName="Friends Name goes here" />
          <DBox chatName="Friends Name goes here" />
          <DBox chatName="Friends Name goes here" />
          <DBox chatName="Friends Name goes here" />
          <DBox chatName="Friends Name goes here" />
          <DBox chatName="Friends Name goes here" />
        </div>
      </div>
    </div>
  );
};

export default ConnectBody;
