import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { StatsGrid1, StatsGrid2 } from "./Stats";
import Controls from "./Controls";
import playSound from "./PlayAudio";
import "./../App.css";

// Declare function ClickableMap. Use useState to update the state.
function ClickableMap({ gameConfig }) { 
  const [geoData, setGeoData] = useState(null);
  const [clickedCountry, setClickedCountry] = useState(null);
  // Declare starting position and zoom level
  const [position, setPosition] = useState({ coordinates: [0, 30], zoom: 2 });
  const [targetCountries, setTargetCountries] = useState([]); // random countries
  const [currentIndex, setCurrentIndex] = useState(0); // current country to guess
  const [result, setResult] = useState("Click on country"); // show guess result
  const [score, setScore] = useState(0); // track score
  const [gameOver, setGameOver] = useState(false);
  const [attempt, setAttempt] = useState(3);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [lastGuess, setLastGuess] = useState(null);
  const [allCountries, setAllCountries] = useState([]); // store all countries with flags. countries variable has scope issues.
  const [revealAnswer, setRevealAnswer] = useState(null); // reveal correct location for 1.5s

  // Load GeoJSON from public folder
  useEffect(() => {
    fetch("/GeoJSON.json")
      .then(res => res.json())
      .then(setGeoData)
      .catch(err => console.error("Failed to load GeoJSON:", err));
  }, []);


useEffect(() => {
async function fetchCountries() {
    try {
    const response = await fetch(`/api/${gameConfig.region}`);
    if (!response.ok) throw new Error("Fetch failed")

    let countries = await response.json();

    // Create new data-object that contains flag img's
    // Loop over each country
    countries = countries.map(country => ({
    ...country,
    flag: `/flags/${country.code}.png`
    }));

    setAllCountries(countries); // store all countries w/ flags

      // Easy difficulty
    if (gameConfig.difficulty === "easy") {
          const shuffled = countries
          .sort(() => Math.random() - 0.5) // shuffle
          .slice(0, 10); // pick first 10. index 0-9
            setTargetCountries(shuffled);
    } else {
        // Hard difficulty
            const shuffled = countries
          .sort(() => Math.random() - 0.5) // shuffle
          .slice(0, 30); // pick first 30. index 0-29
            setTargetCountries(shuffled);
        }
    } catch (err) {
        console.error(err);
    }
}

    fetchCountries();
    // ,[]) makes it so that it only runs once when the compounent mounts
}, [gameConfig]);

  // Define a zoom in function. 
const handleZoomIn = () => {
    if (position.zoom >= 4) return; // Maximum zoom.
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
};

  // Define a zoom out function. 
const handleZoomOut = () => {
    if (position.zoom <= 1) return; // Minimum zoom
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
};

  // Move map position
const handleMove = (newPosition) => {
    setPosition(newPosition);
};


const handleClickCountry = (name) => {
    if (gameOver) 
        return;

  // match "Germany" with "name:Germany"
  const clickedObject = allCountries.find(c => c.name === name);
  setClickedCountry(clickedObject)

    const currentTarget = targetCountries[currentIndex];
    const isCorrect = name === currentTarget.name; // Boolean

// Start next round if there are more rounds
function nextRound() {
    if (currentIndex + 1 < targetCountries.length) {
        setCurrentIndex(prev => prev +1);
        setAttempt(3)
    } else {
        setGameOver(true);
        setPoints(prev => (prev * 5 / (time / 50 + 1)).toFixed(1))
        setResult("Game over!")
    }
}

// Reduce attempts by 1 on click
setAttempt(attempt - 1)

setLastGuess({name, isCorrect})
playSound(isCorrect);

if (name === currentTarget.name) {
    // Correct result
    setResult("Correct!")
    setScore(score +1);
    setPoints(prev => prev + (attempt * 60))
    nextRound();
} else {
    setResult("Wrong, try again")
    if (attempt == 1) {
      setRevealAnswer(currentTarget.name);
        setTimeout(() => {
            setRevealAnswer(null); // reset highlight
            setAttempt(3);
            nextRound();
          }, 1500); // flash correct answer blue for 1.5 second
      }
  }
}

const currentTarget = targetCountries[currentIndex];


useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
        setTime(prev => prev +1); // Update every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup function
}, [gameOver]); // Runs when gameOver state changes


return (
    <div>
      <Controls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      <StatsGrid1
        points={points}
        time={time}
        score={score}
        targetCountries={targetCountries}
        currentIndex={currentIndex}
      />

      <StatsGrid2
        result = {result}
        attempt={attempt}
        currentTarget={currentTarget}
        clickedCountry = {clickedCountry}
      />

      <div className="stats-grid3">
        {!gameOver ? (
          <p><b>Guesses remaining: {attempt}</b></p>
        ) : (
          <p><b>GAME OVER!</b></p>
        )}
      </div>


      {/* Starts the map container. */}
      <ComposableMap
        // Initial map zoom
        projectionConfig={{ scale: 150 }}
        // Define map size
        style={{ width: "100%", height: "800px" }}
      >


      <ZoomableGroup
        // center and zoom come from the state, so moving the map updates the component 
        center={position.coordinates}
        zoom={position.zoom}
        // triggers when user finishes dragging/zooming the map
        onMoveEnd={handleMove}
      >


      {/* Load all countries from the GeoJSOn URL */}
      <Geographies geography={geoData}>
        {({ geographies }) =>
          geographies.map((geo) => (
            // Loop over each geo to render it individually with map()
              <Geography
                key={geo.rsmKey}
                geography={geo}


                // Trigger handleClickCountry on country click
                onClick={() => handleClickCountry(geo.properties.name)}
                style={{
                    default: {
                    fill:
                    revealAnswer === geo.properties.name
                    ? "#0000FF" // flash blue for correct answer
                : lastGuess?.name === geo.properties.name // Use optional chaining to avoid errors w/ null or undefined
                ? lastGuess.isCorrect
                    ? "#00FF00" // green
                    : "#FF0000" // red
                    : "#FFFFFF", // white
                    outline: "none",
                },
                    hover: {
                    fill:
                lastGuess?.name === geo.properties.name 
                ? lastGuess.isCorrect
                    ? "#00FF00"
                    : "#FF0000"
                    : "#FFD700", // yellow. Hovering over a country that is not lastGuess appears yellow.
                    outline: "none",
                },
            pressed: {
            fill: "#FF0000",
            outline: "none",
                    },
                }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      </div>
)};

export default ClickableMap;