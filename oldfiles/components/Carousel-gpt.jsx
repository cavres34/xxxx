import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

export default function Carousel({ images, name }) {
  const [selected, setSelected] = useState(0);
  const [pos, setPos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState([]);

  const limit = 50;

  const start = useRef(null);
  const carouselRef = useRef(null);

  const handleTS = (e) => {
    start.current = e.targetTouches[0].clientX;
  };

  const handleTM = (e) => {
    const deltaX = e.targetTouches[0].clientX - start.current;
    setPos(deltaX);
  };

  const handleTE = () => {
    if (Math.abs(pos) >= limit) {
      setSelected((prev) => {
        if (pos < limit && prev + 1 !== images.length) return prev + 1;
        else if (pos > -1 * limit && prev - 1 !== -1) return prev - 1;
        else return prev;
      });
    }
    setPos(0);
    start.current = 0;
  };

  useEffect(() => {
    setIsLoading(true);
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
    };
    img.src = images[selected] || images[0];
  }, [selected, images]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          preloadImages(selected + 1, 2);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Adjust threshold as needed
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, [selected, images]);

  const preloadImages = (startIndex, count) => {
    const preloadList = [];
    for (let i = startIndex; i < startIndex + count; i++) {
      if (images[i]) {
        const img = new Image();
        img.src = images[i];
        preloadList.push(img);
      }
    }
    setPreloadedImages(preloadList);
  };

  const onDotClick = (index) => {
    setSelected(index);
  };

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="name">{name}</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {preloadedImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt="preloaded"
              style={{ display: "none" }}
            />
          ))}
          <img
            style={{ transform: `translateX(${pos}px)` }}
            src={images[selected] || images[0]}
            alt="man"
            onTouchStart={handleTS}
            onTouchMove={handleTM}
            onTouchEnd={handleTE}
            loading="lazy"
          />
        </>
      )}
      {images.length > 1 && (
        <div className="dots">
          {images.map((_, index) => (
            <Dot
              key={index}
              selected={selected === index}
              onClick={onDotClick}
              index={index}
            />
          ))}
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
