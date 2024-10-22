import React from "react";
import "./css/CBox.css";

const CBox = (props) => {
  return (
<div className="CBox bg-black d-flex align-items-center justify-content-center">
  <div className="inner-cbox-container text-center">
    <div className="prof-pic d-flex justify-content-center align-items-center">
      <img src={props.imgPath} alt="Profile" />
    </div>
    <p className="text-white mt-2">{props.name}</p>
    <div className="d-flex justify-content-center gap-3 mt-3">
      <button className="btn-cbox">✔️</button>
      <button className="btn-cbox">❌</button>
    </div>
  </div>
</div>

  );
};

export default CBox;
