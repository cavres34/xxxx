import React, { useState } from "react";
import "./switch.css"; // You can create a separate CSS file for styling

const Switch = ({ state, stateFun, onSave }) => {
  //   const [state, stateFun] = useState(checked || false);
  // console.log("toggle set");
  const handleToggle = () => {
    onSave(!state);
    stateFun(!state);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={state} onChange={handleToggle} />
      <span className="track">
        <span className="thumb"></span>
      </span>
    </label>
  );
};

export default Switch;
