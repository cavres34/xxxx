import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
let DataContext = createContext();
export default function DataProvider({ children }) {
  const [login, setLogin] = useState(true);
  const [timeOut, setTimeOut] = useState(false);
  const [tempLogin, setTempLogin] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [lastImg, setLastImg] = useState(false);
  let [slide, setSlide] = useState(true);
  let [reverseOrder, setReverseOrder] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/status`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setLogin(true);
          setTimeOut(res.data.timeOut);
        }
      });
  }, []);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext };
