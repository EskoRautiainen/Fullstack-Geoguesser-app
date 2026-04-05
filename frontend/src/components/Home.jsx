import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home({ setGameConfig }) {
  const navigate = useNavigate();

  const [region, setRegion] = useState("europe");
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("both");

  // Start game function
  const startGame = () => {
    setGameConfig({region, difficulty, mode});
    navigate("/play");
};

return (
    <div className="mainMenu">
      <h1>Select Game</h1>

      {/* REGION */}
      <div>
        <h2>Region</h2>
        <label>
          <input
            type="radio"
            name="region"
            value="europe"
            checked={region === "europe"}
            onChange={(e) => setRegion(e.target.value)}
          />
          Europe
        </label>

        <label>
          <input
            type="radio"
            name="region"
            value="africa"
            checked={region === "africa"}
            onChange={(e) => setRegion(e.target.value)}
          />
          Africa
        </label>

                <label>
          <input
            type="radio"
            name="region"
            value="asia"
            checked={region === "asia"}
            onChange={(e) => setRegion(e.target.value)}
          />
          Asia
        </label>
      </div>

      {/* DIFFICULTY */}
      <div>
        <h2>Difficulty</h2>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            checked={difficulty === "easy"}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          Easy
        </label>

        <label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            checked={difficulty === "hard"}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          Hard
        </label>
      </div>

      {/* MODE */}
      <div>
        <h2>Mode</h2>
        <label>
          <input
            type="radio"
            name="mode"
            value="both"
            checked={mode === "both"}
            onChange={(e) => setMode(e.target.value)}
          />
          Both
        </label>

        <label>
          <input
            type="radio"
            name="mode"
            value="flag"
            checked={mode === "flag"}
            onChange={(e) => setMode(e.target.value)}
          />
          Flag only
        </label>

        <label>
          <input
            type="radio"
            name="mode"
            value="name"
            checked={mode === "name"}
            onChange={(e) => setMode(e.target.value)}
          />
          Name only
        </label>
      </div>

      <button onClick={startGame}>Start</button>
    </div>
  );
}

export default Home;