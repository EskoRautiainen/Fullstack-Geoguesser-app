// --------------------------------------------------------------------------------------------------------------------
//        ROUTERS
// --------------------------------------------------------------------------------------------------------------------

// Game results
function findGameData(app, db) {
app.get('/api/gamedata', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM gamedata");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
}

// Europe
function findEurope(app, db) {
app.get('/api/europe', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM europe");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
}

// Africa
function findAfrica(app, db) {
app.get('/api/africa', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM africa");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
}

// Asia
function findAsia(app, db) {
app.get('/api/asia', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM asia");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
}

module.exports = {
  findGameData,
  findEurope,
  findAfrica,
  findAsia,
};