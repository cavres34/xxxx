import { useState } from "react";
import Carousel from "../oldfiles/components/Carousel-old";

// Images

import Unlock from "./pages/Unlock";

import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import AiRemover from "./pages/AiRemover";
import Section from "./components/Section3";
import Sudo from "./pages/Sudo";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Share from "./components/Share";
import Shared from "./pages/Shared";
function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<AiRemover />} />
        <Route path="/section/:selected" element={<Section />} />
        <Route path="/login" element={<Unlock />} />
        <Route path="/sudo" element={<Sudo />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search/:selected/:query" element={<Search />} />
        <Route path="/shared/:id" element={<Shared />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </>
  );
}

export default App;
