import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import Switch from "../components/Switch";

export default function Settings() {
  const {
    slide,
    setSlide,
    lastImg,
    setLastImg,
    reverseOrder,
    setReverseOrder,
  } = useContext(DataContext);
  return (
    <div className="settings">
      <div className="toggle">
        <p>Slide Animation</p>
        <Switch state={slide} stateFun={setSlide} />
      </div>
      <div className="toggle">
        <p>Set to Last Image</p>
        <Switch state={lastImg} stateFun={setLastImg} />
      </div>
      <div className="toggle">
        <p>Set to Last Image</p>
        <Switch state={reverseOrder} stateFun={setReverseOrder} />
      </div>
    </div>
  );
}
