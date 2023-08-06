import { useState } from "react";
import AiRemover from "./AiRemover";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="sections">
        <button onClick={() => navigate("/home")}>Home</button>

        {/* <button onClick={() => navigate("/admin")}>Admin</button> */}
        <button onClick={() => navigate("/settings")}>Settings</button>
      </div>
    </div>
  );
}
