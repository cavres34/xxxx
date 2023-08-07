import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
let DataContext = createContext();

import data1 from "../../data.json";
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
import data14 from "../../new14.json";
import data15 from "../../new15.json";
import data16 from "../../new16.json";
import data17 from "../../new17.json";
import data18 from "../../new18.json";
import data19 from "../../new19.json";
import data20 from "../../new20.json";
import data21 from "../../new21.json";
import data22 from "../../new22.json";
import data23 from "../../new23.json";
import data24 from "../../new24.json";
import gifs from "../../gifs.json";

const dataX = [
  { data: data1 },
  { data: data2 },
  { data: data4 },
  { data: data3 },
  { data: data5 },
  { data: data6 },
  { data: data7 },
  { data: data8 },
  { data: data9 },
  { data: data10 },
  { data: data11 },
  { data: data12 },
  { data: data13 },
  { data: data14 },
  { data: data15 },
  { data: data16 },
  { data: data17 },
  { data: data18 },
  { data: data19 },
  { data: data20 },
  { data: data21 },
  { data: data22 },
  { data: data23 },
  { data: data24 },
  { data: gifs, type: "gifs", name: "gifs" },
  // { data: gifs, name: "gifs" },
];

export default function DataProvider({ children }) {
  const [login, setLogin] = useState(true);
  const [timeOut, setTimeOut] = useState(false);
  const [tempLogin, setTempLogin] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [data, setData] = useState(dataX);
  const [saved, setSaved] = useState(dataX);
  // let [selectedData, setSelectedData] = useState()
  // localStorage.clear();
  // Toggle States
  let toggles = JSON.parse(localStorage.getItem("toggles")) || {};

  const [lastImg, setLastImg] = useState(
    toggles?.lastImg !== undefined ? toggles.lastImg : false
  );
  let [slide, setSlide] = useState(
    toggles?.slide !== undefined ? toggles.slide : false
  );
  let [reverseOrder, setReverseOrder] = useState(
    toggles?.reverse !== undefined ? toggles.reverse : false
  );
  let [shuffleSection, setShuffleSection] = useState(
    toggles?.shuffleSection !== undefined ? toggles.shuffleSection : false
  );
  let [shuffleSearchResults, setShuffleSearchResults] = useState(
    toggles?.shuffleResults !== undefined ? toggles.shuffleResults : false
  );

  function addSave(item) {
    setSaved((prv) => [...saved, item]);
  }
  function removeSave(item) {
    saved.slice();
  }

  const navigate = useNavigate();
  // useEffect(() => {
  //   let slideToggle = JSON.parse(localStorage.getItem("slide"));
  //   let reverseToggle = JSON.parse(localStorage.getItem("reverse"));
  //   let lastImgToggle = JSON.parse(localStorage.getItem("last-img"));
  //   let shuffleSectionsToggle = JSON.parse(
  //     localStorage.getItem("shuffle-section")
  //   );
  //   let shuffleResultsToggle = JSON.parse(
  //     localStorage.getItem("shuffle-results")
  //   );
  //   if (slideToggle) setSlide(slideToggle);
  //   if (reverseToggle) setReverseOrder(reverseToggle);
  //   if (lastImgToggle) setLastImg(lastImgToggle);
  //   if (shuffleResultsToggle) setShuffleSearchResults(shuffleResultsToggle);
  //   if (shuffleSectionsToggle) setShuffleSection(shuffleSectionsToggle);
  // }, []);
  // async function wait(time) {
  // await new Promise((resolve, reject) => {
  // setTimeout(resolve, time);
  // });

  // console.log(`slide: ${slideToggle} ${slide}`);
  // }
  // wait(1);
  // console.log(" toggles loaded");
  // let toggles = JSON.parse(localStorage.getItem("toggles"));
  // if (toggles?.slide) setSlide(toggles.slide);
  // if (toggles?.reverse) setReverseOrder(toggles.reverse);
  // if (toggles?.lastImg) setReverseOrder(toggles.lastImg);

  // axios
  //   .get(`${import.meta.env.VITE_SERVER}/status`, { withCredentials: true })
  //   .then((res) => {
  //     console.log(res.data);
  //     if (res.data.status) {
  //       setLogin(true);
  //       setTimeOut(res.data.timeOut);
  //     }
  //   });

  const handlePass = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/login`,
        {
          pass: e.target.pass.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setLogin(true);
          setTimeOut(res.data.timeOut);

          navigate("/home");
        }
      });
  };
  const handleTempPass = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/temp-login`,
        {
          pass: e.target.pass.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          if (wrongPass) setWrongPass(false);
          console.log();
          setTempLogin(true);
          setTimeOut(res.data.timeOut);
          navigate("/");
        } else setWrongPass(true);
      });
  };

  return (
    <DataContext.Provider
      value={{
        login,
        tempLogin,
        timeOut,
        wrongPass,
        setWrongPass,
        setTimeOut,
        setLogin,
        setTempLogin,
        handlePass,
        handleTempPass,
        slide,
        lastImg,
        setLastImg,
        setSlide,
        reverseOrder,
        setReverseOrder,
        shuffleSearchResults,
        shuffleSection,
        setShuffleSearchResults,
        setShuffleSection,
        data,
        setData,
        toggles,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext };
