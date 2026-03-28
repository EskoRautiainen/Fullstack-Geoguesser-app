// Query all rows
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

// Test fetching data from europe table
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



module.exports = {
  findAll,
  findEurope,
//  deleteById,
//  post
};