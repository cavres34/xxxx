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
        <Switch
          state={slide}
          stateFun={setSlide}
          onSave={(state) => localStorage.setItem("slide", state)}
        />
      </div>
      <div className="toggle">
        <p>Set to Last Image</p>
        <Switch
          state={lastImg}
          stateFun={setLastImg}
          onSave={(state) => localStorage.setItem("last-img", state)}
        />
      </div>
      <div className="toggle">
        <p>Reverse Images</p>
        <Switch
          state={reverseOrder}
          stateFun={setReverseOrder}
          onSave={(state) => localStorage.setItem("reverse", state)}
        />
      </div>
    </div>
  );
}
