import { point } from "leaflet";
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";


// Declare function ClickableMap. Use useState to update the state.
function ClickableMap({ gameConfig }) { 
  const [geoData, setGeoData] = useState(null);
  const [clickedCountry, setClickedCountry] = useState(null);
  // Declare starting position and zoom level
  const [position, setPosition] = useState({ coordinates: [0, 30], zoom: 2 });
  const [targetCountries, setTargetCountries] = useState([]); // random countries
  const [currentIndex, setCurrentIndex] = useState(0); // current country to guess
  const [result, setResult] = useState(null); // show guess result
  const [score, setScore] = useState(0); // track score
  const [gameOver, setGameOver] = useState(false);
  const [attempt, setAttempt] = useState(3);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);


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

      // Easy difficulty
      if (gameConfig.difficulty === "easy") {
            const shuffled = countries
          .map(c => c.name) // extract name
          .sort(() => Math.random() - 0.5) // shuffle
          .slice(0, 10); // pick first 10. index 0-9
            setTargetCountries(shuffled);
      } else {
        // Hard difficulty
            const shuffled = countries
          .map(c => c.name) // extract name
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

    const currentTarget = targetCountries[currentIndex];


// Start next round if there are more rounds
function nextRound() {
    if (currentIndex + 1 < targetCountries.length) {
        setCurrentIndex(prev => prev +1);
        setClickedCountry(null);
        setAttempt(3)
    } else {
        setGameOver(true);
        setPoints(prev => (prev * 5 / (time / 25)).toFixed(1))
        setResult("Game over!")
    }
}

// Reduce attempts by 1 on click
setAttempt(attempt - 1)
setClickedCountry(name);

if (name === currentTarget) {
    // Correct resul
    setResult("Correct!")
    setScore(score +1);
    setPoints(prev => prev + (attempt * 60))
    nextRound();
} else {
    setResult("Wrong, try again")
    if (attempt == 1) {
        setAttempt(3)
        nextRound();
        }
    }
}

const currentTarget = targetCountries[currentIndex];


useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
        setTime(prev => prev +1);
    }, 1000);
    return () => clearInterval(interval);
}, [gameOver]);







  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "8px" }}>
        {/* Add zoom buttons */}
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut} style={{ marginLeft: "8px" }}>
          Zoom Out
        </button>
      </div>
      {<p>Total points: <b> {points} </b></p>}
      {<p>Time: <b> {time} </b></p>}
      {<p>Score: <b> {score} / {targetCountries.length}</b></p>}
      {<p>Round: <b> {currentIndex + 1} / {targetCountries.length}</b></p>}
      {<p>Attemps: <b>{attempt}</b></p>}
      {<p>Click on: <b>{currentTarget}</b></p>}
      {<p>You clicked: <b>{clickedCountry}</b></p>}
      {result && <p><b>{result}</b></p>}

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
                    // Map is white by default
                    default: {
                      fill: clickedCountry === geo.properties.name ? "#FF0000" : "#FFFFFF",
                      outline: "none",
                    },
                    // Country you hover over is yellow
                    hover: {
                      fill: clickedCountry === geo.properties.name ? "#FF0000" : "#FFD700",
                      outline: "none",
                    },
                    // Country you pressed is red
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
  );
}

export default ClickableMap;