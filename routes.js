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


module.exports = {
  findAll,
//  findById,
//  deleteById,
//  post
};