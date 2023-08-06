import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data.json";
import data2 from "../../new.json";
import data3 from "../../new3.json";
import data4 from "../../new4.json";
import data5 from "../../new5.json";
import data6 from "../../new6.json";
import data7 from "../../new7.json";
import data8 from "../../new8.json";
import data9 from "../../new9.json";
import data10 from "../../new10.json";
import data11 from "../../new11.json";
import data12 from "../../new12.json";
import data13 from "../../new13.json";
import gifs from "../../gifs.json";
import { FaChevronLeft } from "react-icons/fa";
import Carousel from "../components/Carousel-new2";

let dataX = [
  { data: data },
  { data: data3 },
  { data: data2 },
  { data: data4 },
  { data: data5 },
  { data: data6 },
  { data: data7 },
  { data: data8 },
  { data: data9 },
  { data: data11 },
  { data: data12 },
  { data: data13 },
];
export default function AiRemover() {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const navigate = useNavigate();
  const [loadedCarousels, setLoadedCarousels] = useState(4); // Number of carousels to initially load
  const [totalCarousels, setTotalCarousels] = useState(100);
  let [filteredData, setFilterData] = useState(dataX);

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

  useEffect(() => {
    async function wait(time) {
      setFilterData([]);
      await new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });

      const fdata = dataX.flatMap((d) =>
        d.data.filter((item, index) =>
          item?.title
            ?.replace("-", " ")
            ?.replace("?", "")
            ?.toLowerCase()
            ?.includes(query.toLowerCase())
        )
      );
      setFilterData(fdata);
      console.log(fdata);
    }
    wait(0.1);
  }, [query]);

  return (
    <div>
      <form
        action=""
        className={"search-bar " + (searchMode ? "mini-search-bar" : "")}
        onSubmit={(e) => {
          e.preventDefault();
          if (query != e.target.query.value) setQuery(e.target.query.value);
          if (!searchMode) setSearchMode(true);
          setLoadedCarousels(4);
        }}
      >
        {searchMode && (
          <button
            className="back-btn"
            type="button"
            onClick={() => setSearchMode(false)}
          >
            <FaChevronLeft class="btn" />
          </button>
        )}
        <input type="text" name="query" />
      </form>

      {!searchMode && (
        <div className="sections">
          {dataX.map((d, index) => {
            return (
              <button
                key={index}
                onClick={() =>
                  navigate("/section", { state: { data: d.data } })
                }
              >
                {`Section ${index} :(${d.data.length})`}
              </button>
            );
          })}
          <button
            onClick={() => navigate("/section", { state: { data: gifs } })}
          >
            Gifs
          </button>
        </div>
      )}
      {searchMode && (
        <div>
          {filteredData.slice(0, loadedCarousels).map((item, index) => {
            return (
              <Carousel
                key={index}
                onSwipe={() => handleCarouselSwipe(index)}
                images={item.images}
                name={item.title?.replace("-", " ").replace("?", "")}
              />
            );
          })}
          {/* {dataX.map((d) =>
            d.data.map((item, index) => {
              if (
                query != "" &&
                item?.title
                  ?.replace("-", " ")
                  ?.replace("?", "")
                  ?.toLowerCase()
                  ?.includes(query.toLowerCase())
              )
                return (
                  <div key={index}>
                    <Carousel
                      onSwipe={handleCarouselSwipe}
                      images={item.images}
                      name={item.title?.replace("-", " ").replace("?", "")}
                    />
                  </div>
                );
            })
          )} */}
        </div>
      )}
    </div>
  );
}
