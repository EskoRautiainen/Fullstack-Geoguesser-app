// Add europe to SQLite database
const europeCountries = [
  "Albania", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina",
  "Bulgaria", "Croatia", "Czech Republic", "Denmark", "Estonia",
  "Finland", "France", "Germany", "Greece", "Hungary", "Iceland",
  "Ireland", "Italy", "Kosovo", "Latvia", "Lithuania", "Luxembourg",
  "Macedonia", "Moldova", "Montenegro", "Netherlands", "Norway",
  "Poland", "Portugal", "Republic of Serbia", "Romania", "Russia",
  "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
  "Ukraine", "Northern Cyprus", "England"
];


async function addEurope(db) {
  // Create table for europe if not exists
  await db.exec(`CREATE TABLE IF NOT EXISTS europe (
  countryId INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
)`);

  // Insert countries incrementally
  for (let country of europeCountries) {
    await db.run(`INSERT INTO europe (name) VALUES (?)`, [country]);
}
}





module.exports = {
  addEurope
}