import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data.json";
import data2 from "../../new.json";
import { FaChevronCircleLeft, FaChevronLeft } from "react-icons/fa";
import Carousel from "../components/Carousel-new2";
export default function AiRemover() {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <form
        action=""
        className={"search-bar " + (searchMode ? "mini-search-bar" : "")}
        onSubmit={(e) => {
          e.preventDefault();
          if (query != e.target.query.value) setQuery(e.target.query.value);
          if (!searchMode) setSearchMode(true);
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
          <button onClick={() => navigate("/section", { state: { data } })}>
            Section 1
          </button>
          <button
            onClick={() => navigate("/section", { state: { data: data2 } })}
          >
            Section 1
          </button>
        </div>
      )}
      {searchMode && (
        <div>
          {[data, data2].map((d) =>
            d.map((item, index) => {
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
                      images={item.images}
                      name={item.title?.replace("-", " ").replace("?", "")}
                    />
                  </div>
                );
            })
          )}
        </div>
      )}
    </div>
  );
}
