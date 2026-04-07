// Receieve props from Map.jsx
export function StatsGrid1({
    points,
    time,
    score,
    targetCountries,
    currentIndex,

    
}) {
    return (
    //  stats-grid is defined in App.css
    <div className="stats-grid1">
      {/* <div> is one grid cell. <p> will not work with grid. */}
        <div>Total points: <b>{points}</b></div>
        <div>Time: <b>{time}</b></div>
        <div>Score: <b>{score} / {targetCountries.length}</b></div>
        <div>Round: <b>{currentIndex + 1} / {targetCountries.length}</b></div>
    </div>
    );
}

export function StatsGrid2({
    currentTarget,
    clickedCountry,
}) {
    return (
    <div className="stats-grid2">
        <div>Click on: <b>{currentTarget}</b></div>
        <div>You clicked: <b>{clickedCountry}</b></div>

    </div>
    );
}


