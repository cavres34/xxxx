import { useState, useEffect, useRef } from "react";
import "./style.scss";
export default function Carousel({ images, name }) {
  let [selected, setSelected] = useState(0);
  let [slide, setSlide] = useState(true);
  let [pos, setPos] = useState(0);
  let limit = 50;

  const start = useRef(null);
  const handleTS = (e) => {
    console.log("start");
    start.current = e.targetTouches[0].clientX;
  };
  const handleTM = (e) => {
    // if (images.length == 1) return;
    const deltaX = e.targetTouches[0].clientX - start.current;
    console.log("move");
    if (selected == 0 && deltaX > 0) return;
    else if (selected == images.length - 1 && deltaX < 0) return;
    setPos(deltaX);
  };
  const handleTE = () => {
    console.log("end");
    if (Math.abs(pos) >= limit) {
      setSelected((prv) => {
        if (pos < limit && prv + 1 != images.length) return prv + 1;
        else if (pos > -1 * limit && prv - 1 != -1) return prv - 1;
        else return prv;
      });
    }
    setPos(0);
    start.current = 0;
  };
  const onDotClick = (index) => {
    setSelected(index);
  };
  let calc = `calc(${pos}px + -${selected}00%)`;
  return (
    <div className="carousel">
      <div className="name">{name}</div>

      <div className="images-container">
        {images.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              alt="man"
              style={{
                transform: slide
                  ? `translateX(${pos != 0 ? calc : -1 * selected + "00%"})`
                  : `translateX(-${selected}00%)`,
              }}
              onTouchStart={handleTS}
              onTouchMove={handleTM}
              onTouchEnd={handleTE}
            />
          );
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
