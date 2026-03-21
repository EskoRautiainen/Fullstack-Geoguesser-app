import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function ClickableMap() {
  const [clicked, setClicked] = useState(null);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        setClicked(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
      },
    });
    return null;
  }

  return (
    <div>
      {clicked && <p>You clicked: {clicked}</p>}
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler />
      </MapContainer>
    </div>
  );
}

export default ClickableMap;