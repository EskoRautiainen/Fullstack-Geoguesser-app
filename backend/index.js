// --------------------------------------------------------------------------------------------------------------------
//        SET UP EXPRESS SERVER
// --------------------------------------------------------------------------------------------------------------------
// Import Express framework - minimal Node.js web server library
const express = require('express')

// Import database connection
const createConnection = require('./connection')

// Import routes
const { findAll, findEurope, findAfrica, findAsia, findAmerica} = require('./routes')

// Import SQLite logic
const { addContinent} = require('./countriesSQLite')

// Node.js path module for resolving file paths
const path = require("path");

// Define default port and its backup
// While in developement, we use port 3000. Render will generate its own .env file.
const port = process.env.PORT || 3000;

// Create an Express app
const app = express()

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Define database outside of function. Can be accessed globally.
let db;


// --------------------------------------------------------------------------------------------------------------------
//        LAUNCH SERVER
// --------------------------------------------------------------------------------------------------------------------
// Create in-memory SQLite database and connect to it
async function startServer() {
db = await createConnection();


// --------------------------------------------------------------------------------------------------------------------
//        CREATE SQL TABLES & INSERT INTO THEM
// --------------------------------------------------------------------------------------------------------------------
try {
  // Create gamedata table
  await db.exec(`CREATE TABLE IF NOT EXISTS gamedata (
    gameId INTEGER PRIMARY KEY,
    currentRound INTEGER NOT NULL,
    roundAmount INTEGER NOT NULL,
    roundCountries TEXT NOT NULL,
    totalScore INTEGER DEFAULT 0
  )`);

  // Test inserts
  await db.run(`INSERT INTO gamedata (gameId, currentRound, roundAmount, roundCountries, totalScore)
    VALUES (?, ?, ?, ?, ?)`, [1, 2, 3, JSON.stringify(["Finland","Sweden","Norway"]), 15]);

  // Add countries to SQLite. App.jsx will use it later.
  await addContinent(db, "europe");
  await addContinent(db, "africa");
  await addContinent(db, "asia");
  await addContinent(db, "america");


// --------------------------------------------------------------------------------------------------------------------
//        REGISTER ROUTE HANDLERS
// --------------------------------------------------------------------------------------------------------------------
  findAll(app, db);
  findEurope(app, db);
  findAfrica(app, db);
  findAsia(app, db);
  findAmerica(app, db);

// Listen to port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
} catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
    }
}

// Start server
startServer();

// Include graceful shutdown handler, so that database can be closed cleanly when server is stopped with Ctrl+C
process.on("SIGINT", () => {
  db.close();
  console.log("Database connection closed.")
  process.exit(0);
});