import { useState, useEffect } from "react";

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <h1>Locations</h1>
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            {loc.name} ({loc.lat}, {loc.lng})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;