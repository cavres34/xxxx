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
  const handleTM = (e) => {
    const deltaX = e.targetTouches[0].clientX - start.current;
    console.log("move");
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

  useEffect(() => {
    // Load all images of the carousel
    const imagesRefs = images.map((_, index) => {
      return (
        <img
          key={index}
          src={images[index]}
          alt="man"
          style={{ visibility: "hidden" }}
        />
      );
    });
    Promise.all(imagesRefs).then(() => {
      // Set visibility of all images to visible
      imagesRefs.forEach((img) => {
        img.style.visibility = "visible";
      });
    });
  }, []);

  const onDotClick = (index) => {
    setSelected(index);
  };

  return (
    <div className="carousel">
      <div className="name">{name}</div>
      <img
        style={{ transform: `translateX(${pos}px)` }}
        src={images[selected]}
        alt="man"
        onTouchStart={handleTS}
        onTouchMove={handleTM}
        onTouchEnd={handleTE}
      />
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
