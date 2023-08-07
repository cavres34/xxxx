import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { FaChevronLeft } from "react-icons/fa";
import Carousel from "../components/Carousel-new2";
import useCarousel from "../../hooks/useCarousel";
export default function Search() {
  const navigate = useNavigate();
  const { query: q, selected } = useParams();
  const [query, setQuery] = useState(q);
  const [finalQuery, setFinalQuery] = useState(q);
  const { shuffleSearchResults, data } = useContext(DataContext);

  let [filteredData, setFilterData] = useState([]);
  // shuffleSearchResults ? data[selected].data : data[selected].data;
  // shuffleSearchResults ? shuffleArray(data) : data
  const { loadedCarousels, setLoadedCarousels, handleCarouselSwipe, setTotal } =
    useCarousel({ total: filteredData.length });

  let sectionData = [];
  // selected == -1 ? data.flatMap((d) => d.data) : data[selected].data;
  switch (selected) {
    case "gifs": {
      sectionData = data[data.length - 1].data;
      break;
    }
    case "-1": {
      sectionData = data.filter((d) => d.type != "gifs").flatMap((d) => d.data);
      break;
    }
    default:
      sectionData = data[selected]?.data;
  }

  useEffect(() => {
    async function wait(time) {
      setFilterData([]);
      await new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });

      let fdata = sectionData.filter((item) =>
        item?.title
          ?.replace("-", " ")
          ?.replace("?", "")
          ?.toLowerCase()
          ?.includes(query.toLowerCase())
      );
      setFilterData(shuffleSearchResults ? shuffleArray(fdata) : fdata);
      setTotal(fdata.length);
    }
    if (query != "") wait(0.1);
  }, [finalQuery]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setLoadedCarousels(4);
    return array;
  }

  return (
    <div>
      <form
        action=""
        className={"search-bar mini-search-bar "}
        onSubmit={(e) => {
          e.preventDefault();
          setFinalQuery(query);
          // navigate(`/search/${selected}/${query}`);
          // if (query != e.target.query.value) setQuery(e.target.query.value);
          setLoadedCarousels(4);
        }}
      >
        {
          <button
            className="back-btn"
            type="button"
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft class="btn" />
          </button>
        }
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </form>
      <div className="section-carousels">
        {filteredData.slice(0, loadedCarousels).map((item, index) => {
          return (
            <Carousel
              key={index}
              images={item?.images}
              name={item?.title}
              onSwipe={() => handleCarouselSwipe(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
