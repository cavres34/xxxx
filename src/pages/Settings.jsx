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
    shuffleSearchResults,
    shuffleSection,
    setShuffleSearchResults,
    setShuffleSection,
    toggles,
  } = useContext(DataContext);
  return (
    <div className="settings">
      <div className="toggle">
        <p>Slide Animation</p>
        <Switch state={slide} stateFun={setSlide} saveAs="slide" />
      </div>
      <div className="toggle">
        <p>Set to Last Image</p>
        <Switch state={lastImg} stateFun={setLastImg} saveAs="lastImg" />
      </div>
      <div className="toggle">
        <p>Reverse Images</p>
        <Switch
          state={reverseOrder}
          stateFun={setReverseOrder}
          saveAs="reverse"
        />
      </div>
      <div className="toggle">
        <p>Shuffle Section</p>
        <Switch
          state={shuffleSection}
          stateFun={setShuffleSection}
          saveAs="shuffleSection"
        />
      </div>
      <div className="toggle">
        <p>Shuffle Search Results</p>
        <Switch
          state={shuffleSearchResults}
          stateFun={setShuffleSearchResults}
          saveAs="shuffleResults"
        />
      </div>
    </div>
  );
}
