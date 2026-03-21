// Query all rows
function findAll(app, db) {
app.get('/api/locations', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM locations");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
}

function findById(app, db) {
app.get("/api/locations/:myId", async (req, res) => {
  const id = Number(req.params.myId);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const rows = await db.all("SELECT * FROM locations WHERE id = ?", [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: "Location not found" });
      } else {
        res.json(rows);
      }
  } catch (err) {
    if (err.message === "Not Found") {
      res.status(404).json({ error: "Location not found" });
    } else {
      res.status(500).json({ error: "Database error"});
    }
  }
});
}




module.exports = {
  findAll,
  findById,
//  deleteById,
//  post
};