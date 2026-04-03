// Imports
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

// GeoJSON containing all world countries polygons
const geoUrl =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";


// Example JSON

// {"type":"Feature",
// "properties":{"name":"Jamaica"},
// "geometry":{"type":"Polygon",
// "coordinates":[[[-77.569601,18.490525],
// [-76.896619,18.400867],
// [-76.365359,18.160701],
// [-76.199659,17.886867],
// [-76.902561,17.868238],
// [-77.206341,17.701116],
// [-77.766023,17.861597],
// [-78.337719,18.225968],
// [-78.217727,18.454533],
// [-77.797365,18.524218],
// [-77.569601,18.490525]]]},
// "id":"JAM"}

// Declare function ClickableMap. Use useState to update the state.
function ClickableMap({ gameConfig }) {
  const [clickedCountry, setClickedCountry] = useState(null);
  // Declare starting position and zoom level
  const [position, setPosition] = useState({ coordinates: [0, 30], zoom: 2 });
  const [targetCountries, setTargetCountries] = useState([]); // 30 random countries
  const [currentIndex, setCurrentIndex] = useState(0); // current country to guess
  const [result, setResult] = useState(null); // show guess result

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
    setClickedCountry(name);
    const currentTarget = targetCountries[currentIndex];
    if (name === currentTarget) {
      // Correct result
      setResult("Correct!")
      if (currentIndex +1 < targetCountries.length) {
        setCurrentIndex(currentIndex +1);
        setClickedCountry(null);
      }
    } else {
      setResult("Wrong, try again")
    }
  };

  const currentTarget = targetCountries[currentIndex];

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "8px" }}>
        {/* Add zoom buttons */}
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut} style={{ marginLeft: "8px" }}>
          Zoom Out
        </button>
      </div>

      {currentTarget && <p>Click on: <b>{currentTarget}</b></p>}
      {clickedCountry && <p>You clicked: {clickedCountry}</p>}
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
          <Geographies geography={geoUrl}>
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