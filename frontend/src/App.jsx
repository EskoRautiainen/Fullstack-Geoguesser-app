// Imports
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

// GeoJSON containing all world countries polygons
const geoUrl =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";


// Example JSON
// {"type":"Feature","properties":{"name":"Jamaica"},"geometry":{"type":"Polygon","coordinates":[[[-77.569601,18.490525],
// [-76.896619,18.400867],[-76.365359,18.160701],[-76.199659,17.886867],[-76.902561,17.868238],[-77.206341,17.701116],
// [-77.766023,17.861597],[-78.337719,18.225968],[-78.217727,18.454533],[-77.797365,18.524218],[-77.569601,18.490525]]]},"id":"JAM"}
// Each country has "id" column. We can use this for comparing guesses to correct answers.


// Declare function ClickableMap. Use useState to update the state.
function ClickableMap() {
  const [clickedCountry, setClickedCountry] = useState(null);
  // Declare starting position and zoom level
  const [position, setPosition] = useState({ coordinates: [0, 30], zoom: 2 });

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

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "8px" }}>
        {/* Add zoom buttons */}
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut} style={{ marginLeft: "8px" }}>
          Zoom Out
        </button>
      </div>
      {/* Show the name of the country you clicked on. Uses conditional rendering */}
      {clickedCountry && <p>You clicked: {clickedCountry}</p>}

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
                  // Trigger setClickedCountry on country click
                  onClick={() => setClickedCountry(geo.properties.name)}
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