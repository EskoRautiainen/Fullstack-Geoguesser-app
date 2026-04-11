import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { StatsGrid1, StatsGrid2 } from "./Stats";
import Controls from "./Controls";
import playSound from "./PlayAudio";
import "./../App.css";


// --------------------------------------------------------------------------------------------------------------------
//        GAME STATE
// --------------------------------------------------------------------------------------------------------------------
function ClickableMap({ gameConfig }) { 
  const [geoData, setGeoData] = useState(null);                                 // load geodata from /public 
  const [clickedCountry, setClickedCountry] = useState(null);                   // match clicked country name w/ it's data object
  const [position, setPosition] = useState({ coordinates: [0, 30], zoom: 2 });  // set starting position and zoom level
  const [targetCountries, setTargetCountries] = useState([]);                   // random countries
  const [currentIndex, setCurrentIndex] = useState(0);                          // current country to guess
  const [score, setScore] = useState(0);                                        // track score x/10
  const [gameOver, setGameOver] = useState(false);                              // flag game as over
  const [attempt, setAttempt] = useState(3);                                    // keep track of attemps
  const [points, setPoints] = useState(0);                                      // keep track of total points
  const [time, setTime] = useState(0);                                          // keep track of time spent playing
  const [lastGuess, setLastGuess] = useState(null);                             // keep track of last guess
  const [allCountries, setAllCountries] = useState([]);                         // store all countries with flags
  const [revealAnswer, setRevealAnswer] = useState(null);                       // reveal correct location for 1.5s


// --------------------------------------------------------------------------------------------------------------------
//        LOAD DATA AND SELECT TARGET COUNTRIES FOR THE GAME
// --------------------------------------------------------------------------------------------------------------------
useEffect(() => {
  fetch("/GeoJSON.json")
    .then(res => res.json())
    .then(setGeoData)
    .catch(err => console.error("Failed to load GeoJSON:", err));
}, []); // <-- [] Runs this effect only once.


useEffect(() => {
async function fetchCountries() {
  try {
    const response = await fetch(`/api/${gameConfig.region}`);
  if (!response.ok) throw new Error("Fetch failed")
    let countries = await response.json();


  // --------------------------------------------------------------------------------------------------------------------
  //        GENERATE COUNTRIES DATA-OBJECTS W/ FLAG IMAGES
  // --------------------------------------------------------------------------------------------------------------------
  countries = countries.map(country => ({
    ...country,
    flag: `/flags/${country.code}.png`
  }));

  setAllCountries(countries); // store all countries as data-objects, containing flag images.

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
    }} catch (err) {
      console.error(err);
    }
}


// --------------------------------------------------------------------------------------------------------------------
//        START GAME
// --------------------------------------------------------------------------------------------------------------------

fetchCountries();
}, [gameConfig]);                                    // gameConfig contains region, difficulty and mode settings.
const currentTarget = targetCountries[currentIndex]; // Define current target outside of nextRound, so it runs on mount.


// --------------------------------------------------------------------------------------------------------------------
//        DEFINE MAP ZOOM & MOVEMENT FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------
const handleZoomIn = () => {
  if (position.zoom >= 4) return; // Maximum zoom.
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
};

const handleZoomOut = () => {
  if (position.zoom <= 1) return; // Minimum zoom
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
};

// Handle position
const handleMove = (newPosition) => {
  setPosition(newPosition);
};

// --------------------------------------------------------------------------------------------------------------------
//        NEXT ROUND FUNCTION
// --------------------------------------------------------------------------------------------------------------------
function nextRound() {
    if (currentIndex + 1 < targetCountries.length) {
        setCurrentIndex(prev => prev +1);
        setAttempt(3)
    } else {
        setGameOver(true);
        setPoints(prev => (prev * 5 / (time / 50 + 1)).toFixed(1))
    }
}

// --------------------------------------------------------------------------------------------------------------------
//        HANDLE CLICK ON MAP COMPONENT
// --------------------------------------------------------------------------------------------------------------------
const handleClickCountry = (name) => {
  if (attempt == 0)                     // Nothing happens if attempts are 0. (Prevents counter going negative)
    return;

  setAttempt(attempt - 1)               // Reduce guess attemps by 1
  if (gameOver)                         // Nothing happens if gameOver state = true.
    return;

  // handleClickCountry gets a country name as string.
  // Match string "Germany" with data-object, where "name:Germany".
  // Set data-object as clickedCountry, so we can use it's flag.
  const clickedObject = allCountries.find(c => c.name === name);
  setClickedCountry(clickedObject)

  const currentTarget = targetCountries[currentIndex];  // Set current target
  const isCorrect = name === currentTarget.name;        // Check, if the guess was correct
  setLastGuess({name, isCorrect})                       // Remember previous guess
  playSound(isCorrect);                                 // Play audio feedback

// --------------------------------------------------------------------------------------------------------------------
//        GUESS RESULTS
// --------------------------------------------------------------------------------------------------------------------
  if (name === currentTarget.name) {
    // Correct result
    setScore(score +1);
    setPoints(prev => prev + (attempt * 60))
    nextRound();
  } else {
    // Wrong answer
    if (attempt == 1 && attempt !== 0 ) {
      setRevealAnswer(currentTarget.name);
        setTimeout(() => {
          setRevealAnswer(null); // reset highlight
          setAttempt(3);
          nextRound();
      }, 1500); // flash country location with blue for 1.5 seconds
    }
  }
}


// --------------------------------------------------------------------------------------------------------------------
//        TIMER
// --------------------------------------------------------------------------------------------------------------------
useEffect(() => {
  if (gameOver) return;                       // Timer does not run, while game is over.

    const interval = setInterval(() => {
      setTime(prev => prev +1);               // Update every second
    }, 1000);
      return () => clearInterval(interval);   // Cleanup function to prevent react running several intervals at the same time
}, [gameOver]);                               // Runs when component mounts or gameOver state changes


// --------------------------------------------------------------------------------------------------------------------
//        REACT RENDER
// --------------------------------------------------------------------------------------------------------------------
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


{/* --------------------------------------------------------------------------------------------------------------------}
/*        MAP COMPONENT
/*  ------------------------------------------------------------------------------------------------------------------*/}
<ComposableMap
  projectionConfig={{ scale: 150 }}             // Define map zoom
  style={{ width: "100%", height: "900px" }}    // Define map container size
>

<ZoomableGroup
  center={position.coordinates}
  zoom={position.zoom}
  onMoveEnd={handleMove}                        // triggers when user finishes dragging/zooming the map
>

{/* Load all countries from the GeoJSOn data served from /public */}
<Geographies geography={geoData}>
  {({ geographies }) =>
    geographies.map((geo) => (
      // Loop over each geo to render it individually with map()
      <Geography
        key={geo.rsmKey}
        geography={geo}

// --------------------------------------------------------------------------------------------------------------------}
//        STYLES
//  -------------------------------------------------------------------------------------------------------------------}

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