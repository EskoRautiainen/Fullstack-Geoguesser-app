import { useEffect, useState } from "react";

function Home() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        async function fetchScores() {
            try {
                const res = await fetch("/api/gamedata");
                const data = await res.json();
                setScores(data);
            } catch (err) {
                console.error("Failed to load scores:", err);
            }
        }
        fetchScores();
    }, []);

    return (
        <div className="mainMenu">
            <h1>Scores</h1>
            <ul>
                {scores.map((game) => (
                    <li key={game.gameId}>
                {game.points} pts | {game.region} | {game.difficulty} | {game.mode}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;