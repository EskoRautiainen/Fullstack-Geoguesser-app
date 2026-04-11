// --------------------------------------------------------------------------------------------------------------------
//        ADD COUNTRIES TO SQL DATABASE
// --------------------------------------------------------------------------------------------------------------------
const europeCountries = {
  Finland: "fi",
  France: "fr",
  Germany: "de",
  Italy: "it",
  Spain: "es",
  Sweden: "se",
  Norway: "no",
  Denmark: "dk",
  Poland: "pl",
  Portugal: "pt",
  Netherlands: "nl",
  Belgium: "be",
  Switzerland: "ch",
  Austria: "at",
  Ireland: "ie",
  Iceland: "is",
  Greece: "gr",
  Hungary: "hu",
  Czechia: "cz",
  Slovakia: "sk",
  Slovenia: "si",
  Croatia: "hr",
  Serbia: "rs",
  Romania: "ro",
  Bulgaria: "bg",
  Ukraine: "ua",
  Belarus: "by",
  Estonia: "ee",
  Latvia: "lv",
  Lithuania: "lt",
  Luxembourg: "lu",
  Malta: "mt",
  Albania: "al",
  Montenegro: "me",
  "North Macedonia": "mk",
  "Bosnia and Herzegovina": "ba",
  Moldova: "md",
  Kosovo: "xk",
  "United Kingdom" : "gb"
};

const asiaCountries = {
  Afghanistan: "af",
  Armenia: "am",
  Azerbaijan: "az",
  Bahrain: "bh",
  Bangladesh: "bd",
  Bhutan: "bt",
  Brunei: "bn",
  Cambodia: "kh",
  China: "cn",
  Cyprus: "cy",
  Georgia: "ge",
  India: "in",
  Indonesia: "id",
  Iran: "ir",
  Iraq: "iq",
  Israel: "il",
  Japan: "jp",
  Jordan: "jo",
  Kazakhstan: "kz",
  Kuwait: "kw",
  Kyrgyzstan: "kg",
  Laos: "la",
  Lebanon: "lb",
  Malaysia: "my",
  Maldives: "mv",
  Mongolia: "mn",
  Myanmar: "mm",
  Nepal: "np",
  "North Korea": "kp",
  Oman: "om",
  Pakistan: "pk",
  Palestine: "ps",
  Philippines: "ph",
  Qatar: "qa",
  "Saudi Arabia": "sa",
  Singapore: "sg",
  "South Korea": "kr",
  "Sri Lanka": "lk",
  Syria: "sy",
  Taiwan: "tw",
  Tajikistan: "tj",
  Thailand: "th",
  "Timor-Leste": "tl",
  Turkey: "tr",
  Turkmenistan: "tm",
  "United Arab Emirates": "ae",
  Uzbekistan: "uz",
  Vietnam: "vn",
  Yemen: "ye"
};

const africaCountries = {
  Algeria: "dz",
  Angola: "ao",
  Benin: "bj",
  Botswana: "bw",
  "Burkina Faso": "bf",
  Burundi: "bi",
  "Cabo Verde": "cv",
  Cameroon: "cm",
  "Central African Republic": "cf",
  Chad: "td",
  Comoros: "km",
  "Democratic Republic of the Congo": "cd",
  "Republic of the Congo": "cg",
  Djibouti: "dj",
  Egypt: "eg",
  "Equatorial Guinea": "gq",
  Eritrea: "er",
  Eswatini: "sz",
  Ethiopia: "et",
  Gabon: "ga",
  Gambia: "gm",
  Ghana: "gh",
  Guinea: "gn",
  "Guinea-Bissau": "gw",
  "Ivory Coast": "ci",
  Kenya: "ke",
  Lesotho: "ls",
  Liberia: "lr",
  Libya: "ly",
  Madagascar: "mg",
  Malawi: "mw",
  Mali: "ml",
  Mauritania: "mr",
  Mauritius: "mu",
  Morocco: "ma",
  Mozambique: "mz",
  Namibia: "na",
  Niger: "ne",
  Nigeria: "ng",
  Rwanda: "rw",
  "Sao Tome and Principe": "st",
  Senegal: "sn",
  Seychelles: "sc",
  "Sierra Leone": "sl",
  Somalia: "so",
  "South Africa": "za",
  "South Sudan": "ss",
  Sudan: "sd",
  Tanzania: "tz",
  Togo: "tg",
  Tunisia: "tn",
  Uganda: "ug",
  Zambia: "zm",
  Zimbabwe: "zw"
};

const americaCountries = {
  "United States": "us",
  Canada: "ca",
  Mexico: "mx",
  Guatemala: "gt",
  Belize: "bz",
  Honduras: "hn",
  El_Salvador: "sv",
  Nicaragua: "ni",
  Costa_Rica: "cr",
  Panama: "pa",
  "Bahamas": "bs",
  Cuba: "cu",
  Jamaica: "jm",
  Haiti: "ht",
  "Dominican Republic": "do",
  Colombia: "co",
  Venezuela: "ve",
  Ecuador: "ec",
  Peru: "pe",
  Brazil: "br",
  Bolivia: "bo",
  Paraguay: "py",
  Chile: "cl",
  Argentina: "ar",
  Uruguay: "uy",
  Guyana: "gy",
  Suriname: "sr",
  "French Guiana": "gf",
  "Saint Kitts and Nevis": "kn",
  "Antigua and Barbuda": "ag",
  Dominica: "dm",
  "Saint Lucia": "lc",
  "Saint Vincent and the Grenadines": "vc",
  Grenada: "gd",
  "Barbados": "bb",
  "Trinidad and Tobago": "tt"
};

const countriesByContinent = {
  europe: europeCountries,
  africa: africaCountries,
  asia: asiaCountries,
  america: americaCountries
};


// --------------------------------------------------------------------------------------------------------------------
//        REUSABLE SQL LOGIC
// --------------------------------------------------------------------------------------------------------------------
async function addContinent(db, continent) {
  const countries = countriesByContinent[continent];
  
  // Create table for continent if not exists
  await db.exec(`CREATE TABLE IF NOT EXISTS ${continent} (
  countryId INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL
)`);

  // Insert countries incrementally
  for (let name of Object.keys(countries)) {
    const code = countries[name]
    await db.run(`INSERT INTO ${continent} (name, code) VALUES (?, ?)`, [name, code]);
}
}

module.exports = {
  addContinent
}