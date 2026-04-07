// Query gamedata
function findAll(app, db) {
app.get('/api/gamedata', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM gamedata");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
}

// Query data from europe table
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

// Query data from africa table
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

// Query data from asia table
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

function findAmerica(app, db) {
app.get('/api/america', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM america");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
}

module.exports = {
  findAll,
  findEurope,
  findAfrica,
  findAsia,
  findAmerica
};