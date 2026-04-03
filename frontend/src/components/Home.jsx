import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Geography Game</h1>
      <p>Map learning game</p>
      <button onClick={() => navigate("/play")}>
        Start
      </button>
    </div>
  );
}

export default Home;