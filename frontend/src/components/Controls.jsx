// --------------------------------------------------------------------------------------------------------------------
//        ZOOM CONTROLS
// --------------------------------------------------------------------------------------------------------------------

// Use prop destructuring. Expect two functions as props.
function Controls({ onZoomIn, onZoomOut }) {
    return (
    <div className="controls">
        {/* Pass the function. Don't call it yet. NO {onZoomIn()}.*/}
        <button onClick={onZoomIn}>Zoom In</button>
        <button onClick={onZoomOut}>Zoom Out</button>
    </div>
    );
}

export default Controls;