// Import Express framework - minimal Node.js web server library
const express = require('express')

// Import database connection from connection.js
const createConnection = require('./connection')

// Import routes from routes.js
const { findAll, findById } = require('./routes')

// Define default port and its backup
const port = process.env.PORT || 3000;

// Create an Express app
const app = express()

// Define database outside of function. Can be accessed globally.
let db;

// Create in-memory SQLite database and connect to it
async function startServer() {
db = await createConnection();

try {
// Create a table
await db.exec(`CREATE TABLE IF NOT EXISTS locations
  (id INTEGER PRIMARY KEY, name TEXT, lat REAL, lng REAL)`);

// Insert data — the ? placeholders prevent SQL injection
await db.run("INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)", [
  "Helsinki",
  60.1699,
  24.9384,
]);

await db.run("INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)", [
  "Tampere",
  40.169,
  21.938,
]);

await db.run("INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)", [
  "Turku",
  50.16,
  5.93,
]);


// Register route handlers
findAll(app, db); // Call findAll function and pass app and db as arguments
findById(app, db); // Call findById function and pass app and db as arguments

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