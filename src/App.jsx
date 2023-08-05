import { useState } from "react";
import Carousel from "./components/Carousel-old";

// Images

import Unlock from "./pages/Unlock";

import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import AiRemover from "./pages/AiRemover";
import Section from "./components/Section";
import Sudo from "./pages/Sudo";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AiRemover />} />
        <Route path="/section" element={<Section />} />
        <Route path="/login" element={<Unlock />} />
        <Route path="/sudo" element={<Sudo />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
