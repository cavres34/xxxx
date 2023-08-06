import React, { useState } from "react";
import "./switch.css"; // You can create a separate CSS file for styling

const Switch = ({ checked, state, stateFun }) => {
  //   const [state, stateFun] = useState(checked || false);

  const handleToggle = () => {
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
