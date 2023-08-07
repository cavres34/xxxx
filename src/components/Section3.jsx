import { useEffect, useContext, useState, useRef } from "react";
import Carousel from "./Carousel-new2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import useCarousel from "../../hooks/useCarousel";
export default function AiRemover() {
  // let { data } = useLocation().state;
  const { shuffleSection, data } = useContext(DataContext);
  const [finalData, setFinalData] = useState([]);
  const navigate = useNavigate();
  const { selected } = useParams();
  let sectionData = [];
  let howToLoadData = {};
  // selected == -1 ? data.flatMap((d) => d.data) : data[selected].data;
  switch (selected) {
    case "gifs": {
      sectionData = data[data.length - 1].data;
      howToLoadData = {
        initial: 3,
        load: 1,
        swipeOnLast: 1,
        total: sectionData.length,
      };

      break;
    }
    case "-1": {
      sectionData = data.filter((d) => d.type != "gifs").flatMap((d) => d.data);
      howToLoadData = {
        initial: 5,
        load: 4,
        swipeOnLast: 3,
        total: sectionData.length,
      };

      break;
    }
    default:
      sectionData = data[selected]?.data;
      howToLoadData = {
        initial: 5,
        load: 4,
        swipeOnLast: 3,
        total: sectionData.length,
      };
  }
  useEffect(() => {
    async function wait(time) {
      setFinalData([]);
      await new Promise((res, rej) => setTimeout(res, time));
      setFinalData(shuffleSection ? shuffleArray(sectionData) : sectionData);
    }
    wait(0.1);
  }, []);

  const { loadedCarousels, setLoadedCarousels, handleCarouselSwipe } =
    useCarousel(howToLoadData);

  return (
    <div className="section">
      <form
        action=""
        className="search-bar sbar"
        onSubmit={(e) => {
          e.preventDefault();
          setLoadedCarousels(4);
          navigate(`/search/${selected}/${e.target.query.value}`);
        }}
      >
        <input type="text" placeholder="search" name="query" />
      </form>

      <div className="section-carousels">
        {finalData.slice(0, loadedCarousels).map((item, index) => (
          <div key={index}>
            <Carousel
              key={index}
              images={item?.images}
              name={item?.title?.replace("-", " ").replace("?", "")}
              onSwipe={() => handleCarouselSwipe(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  // setLoadedCarousels(4);
  return array;
}
