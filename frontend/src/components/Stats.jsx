// Receieve props from Map.jsx
function StatsGrid({
    points,
    time,
    score,
    targetCountries,
    currentIndex,
    attempt,
    currentTarget,
    clickedCountry,
    result,
}) {
    return (
    //  stats-grid is defined in App.css
    <div className="stats-grid">
      {/* <div> is one grid cell. <p> will not work with grid. */}
        <div>Total points: <b>{points}</b></div>
        <div>Time: <b>{time}</b></div>
        <div>Score: <b>{score} / {targetCountries.length}</b></div>

        <div>Round: <b>{currentIndex + 1} / {targetCountries.length}</b></div>
        <div>Attempts: <b>{attempt}</b></div>
        <div>Click on: <b>{currentTarget}</b></div>

        <div>You clicked: <b>{clickedCountry}</b></div>
        {result && <div><b>{result}</b></div>}
    </div>
    );
}

export default StatsGrid;