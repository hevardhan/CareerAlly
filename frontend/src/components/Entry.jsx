import React from "react";
import "./css/Entry.css";

const Entry = (props) => {
  return (
    <div className="d-flex gap-1 align-items-center">
      <input
        type="text"
        className="entry border-0 p-2 w-100"
        placeholder={props.place}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default Entry;
