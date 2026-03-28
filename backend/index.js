// Import Express framework - minimal Node.js web server library
const express = require('express')

// Import database connection from connection.js
const createConnection = require('./connection')

// Import routes from routes.js
const { findAll, findEurope} = require('./routes')

// Import SQLite logic for adding countries to database
const { addEurope} = require('./countriesSQLite')

const path = require("path");

// Define default port and its backup
const port = process.env.PORT || 3000;

// Create an Express app
const app = express()

app.use(express.static(path.join(__dirname, 'public')));

// Define database outside of function. Can be accessed globally.
let db;

// Create in-memory SQLite database and connect to it
async function startServer() {
db = await createConnection();


try {
    // Create gamedata table
    await db.exec(`CREATE TABLE IF NOT EXISTS gamedata (
      gameId INTEGER PRIMARY KEY,
      currentRound INTEGER NOT NULL,
      roundAmount INTEGER NOT NULL,
      roundCountries TEXT NOT NULL,
      totalScore INTEGER DEFAULT 0
    )`);

    // Insert sample data if empty
    await db.run(`INSERT INTO gamedata (gameId, currentRound, roundAmount, roundCountries, totalScore)
      VALUES (?, ?, ?, ?, ?)`, [1, 2, 3, JSON.stringify(["Finland","Sweden","Norway"]), 15]);

    // Add europe to SQLite. App.jsx will use it later.
    await addEurope(db);


// Register route handlers
findAll(app, db); // Call findAll function and pass app and db as arguments
findEurope(app, db); // Test europe table


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
  process.exit(0);
});