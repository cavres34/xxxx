import { useEffect, useContext, useState, useRef } from "react";
import Carousel from "./Carousel-new2";
import { useLocation } from "react-router-dom";

export default function AiRemover() {
  let data = useLocation().state?.data;
  const [query, setQuery] = useState("");
  const [loadedCarousels, setLoadedCarousels] = useState(4); // Number of carousels to initially load
  const [totalCarousels, setTotalCarousels] = useState(data.length);
  let [filteredData, setFilterData] = useState(data);
  const scrollPos = useRef(null);
  const handleCarouselSwipe = (currentIndex) => {
    if (
      (currentIndex === loadedCarousels - 2 ||
        currentIndex === loadedCarousels - 1) &&
      loadedCarousels < totalCarousels
    ) {
      // Load more carousels on reaching the last or second last carousel in the loaded set
      const newLoadedCarousels = Math.min(loadedCarousels + 4, totalCarousels);
      setLoadedCarousels(newLoadedCarousels);
    }
  };

  // const [previousScrollPosition, setPreviousScrollPosition] = useState(
  //   window.scrollY || document.documentElement.scrollTop
  // );
  // scrollPos.current = window.scrollY || document.documentElement.scrollTop;
  // const handleScroll = () => {
  //   const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  //   console.log(scrollPosition, scrollPos.current);
  //   console.log(`diff: ${scrollPosition - scrollPos.current}`);
  //   const bar = document.querySelector(".sbar");
  //   if (scrollPosition - scrollPos.current < 0) {
  //     console.log("======================================");

  //     bar.style.position = "fixed";
  //     setTimeout(() => {
  //       bar.style.position = "static";
  //     }, 15000);
  //   } else {
  //     bar.style.position = "static";
  //   }

  //   setPreviousScrollPosition(() => scrollPosition);
  //   scrollPos.current = scrollPos;
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // Filter data based on search query
  useEffect(() => {
    async function wait(time) {
      setFilterData([]);
      await new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
      let fdata = data.filter((item) =>
        item?.title
          ?.replace("-", " ")
          ?.replace("?", "")
          ?.toLowerCase()
          ?.includes(query.toLowerCase())
      );

      setFilterData(fdata);
    }
    wait(0.1);
  }, [query]);

  return (
    <div className="section">
      <form
        action=""
        className="search-bar sbar"
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(e.target.query.value);
          setLoadedCarousels(4);
        }}
      >
        <input type="text" placeholder="search" name="query" />
      </form>

      {filteredData
        .slice(0, loadedCarousels) // Get Only 4
        .map((item, index) => (
          <div key={index}>
            <Carousel
              key={index} // Add a unique key for each Carousel
              images={item?.images}
              name={item?.title?.replace("-", " ").replace("?", "")}
              onSwipe={() => handleCarouselSwipe(index)}
            />
          </div>
        ))}
    </div>
  );
}
