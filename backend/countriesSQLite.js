// Add europe to SQLite database
const europeCountries = [
  "Albania", "Andorra", "Austria", "Belarus", "Belgium",
  "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Czechia",
  "Denmark", "Estonia", "Finland", "France", "Germany",
  "Greece", "Hungary", "Iceland", "Ireland", "Italy",
  "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg",
  "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands",
  "North Macedonia", "Norway", "Poland", "Portugal", "Romania",
  "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain",
  "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"
];

const asiaCountries = [
  "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh",
  "Bhutan", "Brunei", "Cambodia", "China", "Cyprus",
  "Georgia", "India", "Indonesia", "Iran", "Iraq",
  "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait",
  "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives",
  "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman",
  "Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia",
  "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan",
  "Tajikistan", "Thailand", "Timor-Leste", "Turkey",
  "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
];

const africaCountries = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso",
  "Burundi", "Cabo Verde", "Cameroon", "Central African Republic", "Chad",
  "Comoros", "Democratic Republic of the Congo", "Republic of the Congo",
  "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini",
  "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
  "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia",
  "Libya", "Madagascar", "Malawi", "Mali", "Mauritania",
  "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger",
  "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles",
  "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan",
  "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
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

async function addAfrica(db) {
  // Create table for africa if not exists
  await db.exec(`CREATE TABLE IF NOT EXISTS africa (
  countryId INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
)`);

  // Insert countries incrementally
  for (let country of africaCountries) {
    await db.run(`INSERT INTO africa (name) VALUES (?)`, [country]);
}
}


async function addAsia(db) {
  // Create table for africa if not exists
  await db.exec(`CREATE TABLE IF NOT EXISTS asia (
  countryId INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
)`);

  // Insert countries incrementally
  for (let country of asiaCountries) {
    await db.run(`INSERT INTO asia (name) VALUES (?)`, [country]);
}
}





module.exports = {
  addEurope,
  addAfrica,
  addAsia
}