import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../context/DataContext";

export default function AiRemover() {
  const { data, saved } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div>
      <form
        action=""
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/search/-1/" + e.target.query.value);
        }}
      >
        <input type="text" name="query" placeholder="Search" />
      </form>

      {/* Section */}

      <div className="sections">
        <button onClick={() => navigate(`/section/-1`)}>Random</button>
        <button onClick={() => navigate(`/section/saved`)}>Saved</button>

        {data.map((d, index) => {
          if (d.data?.type != "gifs")
            return (
              <button key={index} onClick={() => navigate(`/section/${index}`)}>
                {`Section ${index} :(${d.data.length})`}
              </button>
            );
        })}

        <button onClick={() => navigate(`/section/gifs`)}>Gifs</button>
      </div>
    </div>
  );
}
