// --------------------------------------------------------------------------------------------------------------------
//        IN MEMORY SQL DATABASE CONNECTION
// --------------------------------------------------------------------------------------------------------------------
// This database is non persistant. It resets on restart. Good only for testing.

const sqlite3 = require('sqlite3');
// open is required to open in memory database
const { open } = require('sqlite');

async function createConnection() {
try {
  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  console.log('Connected to SQLite in-memory database!');
  return db;
} catch (err) {
    console.error('Connection failed:', err.message);
    // Throw err crashes createConnection immediately. Without throw err, createConnection will return undefined.
    throw err;
}
};

module.exports = createConnection;