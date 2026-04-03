import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home({ setGameConfig }) {
  const navigate = useNavigate();

  const [region, setRegion] = useState("europe");
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("name");

  // Start game function
  const startGame = () => {
    setGameConfig({region, difficulty, mode});
    navigate("/play");
};


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Select game</h1>

    <h2>Region</h2>
    <select onChange={(e) => setDifficulty(e.target.value)}>
        <option value="europe">Europe</option>
        <option value ="africa">Africa</option>
    </select>

    <h2>Difficulty</h2>
    <select onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="hard">Hard</option>
    </select>

    <h2>Mode</h2>
    <select onChange={(e) => setDifficulty(e.target.value)}>
        <option value="name">Name only</option>
        <option value="flag">Flag only</option>
        <option value="both">Name + Flag</option>
    </select>

    <button onClick={startGame}>
        Start
    </button>
    </div>
  );
}

export default Home;