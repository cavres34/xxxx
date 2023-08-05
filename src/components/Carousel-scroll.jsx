import { useState, useEffect, useRef } from "react";
import "./style.scss";
export default function Carousel({ images, name }) {
  let [selected, setSelected] = useState(0);
  let [pos, setPos] = useState(0);
  let limit = 50;

  const start = useRef(null);
  const handleTS = (e) => {
    console.log("start");
    start.current = e.targetTouches[0].clientX;
  };

  const onDotClick = (index) => {
    setSelected(index);
  };
  return (
    <div className="carousel">
      <div className="name">{name}</div>
      {/* <p>{pos}</p> */}
      <div
        className="images-container"
        // onScroll={(e) => {
        //   console.log(e);
        //   setPos(e.target.scrollLeft);
        //   if (e.target.scrollLeft > 150) e.target.scrollLeft += 411.09;
        //   //   else
        // }}
      >
        {images.map((image, index) => {
          return <img key={index} src={image} alt="man" />;
        })}
      </div>
      {images.length > 1 && (
        <div className="dots">
          {images.map((_, index) => {
            return (
              <Dot
                key={index}
                selected={selected == index}
                onClick={onDotClick}
                index={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function Dot({ selected, onClick, index }) {
  return (
    <div
      className={`dot ${selected ? "selected-dot" : ""}`}
      onClick={() => onClick(index)}
    ></div>
  );
}
