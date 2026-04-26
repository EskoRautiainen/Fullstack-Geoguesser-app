# Fullstack CountryGuesser
This project is a fullstack geography game built with **Node.js** and **React**, where users guess countries on an interactive map, earning points for accuracy and speed. <br>
Project uses **monorepo structure**, **REST API** backend powered by **Express** and persistant **SQL-database**.

<img width="938" height="986" alt="image" src="https://github.com/user-attachments/assets/78d28209-9cee-4623-aa80-81bcfd688dbc" />

## How to run?
```bash
npm install npm start
```

## Summary

CountryGuesser is an educational game for learning countries and flags on an interactive map. <br>

### Players
Player chooses Region <br>
Player chooses Difficulty <br>
Player chooses Gamemode <br>
Player enter Username. <br>

### Final Score Formula
Player gets 3 guesses on each round and gets 60 points for each remaining guess, earning 60/120/180 points per round.

When game ends, total points are calculated with the formula: <br>
const finalPoints = Number((newPoints * 5 / (time / 50 + 1)).toFixed(1)


### Results System
Results are automatically sent to the backend when the game ends. <br>
Scores are stored in a SQLite database <br>
/scores page fetches and displays results <br>
Scores are grouped by gamemode  <br>
Scores are sorted in descending order <br>
/scores displays points, username, region and difficulty. <br>

## Homepage

<img width="539" height="555" alt="image" src="https://github.com/user-attachments/assets/0dae6a54-2526-4185-ba3e-2033fb555650" />

### Features
Select Region (Europe/Africa/Asia) <br>
Select Difficulty (Easy/Hard) <br>
Select Gamemode (Name + Flag / Flag only) <br>
Enter Username <br>
Start button is disabled, until username is provided. <br>
startGame() updates gameConfig, which is passed into Map.jsx (Game screen) as a parameter. <br>

### UI
Custom styled RadioButtons <br>
**Material UI** components <br>
Clean dark themed layout <br>
Use react-router to navigate between (/ , /play and /scores) <br>

## Game screen
### Features:
Interactive world map <br>
Zoom and pan controls <br>
Uses 12 React hooks to alter the game state and pass information to the player <br>
Country clicking system <br>
Real-time feedback: <br>
Correct -> Green <br>
Wrong -> Red <br>
Reveal answer after failed attempts -> Blue <br>
Play audio effect on correct/wrong guesses <br>

### Displays:
Target country <br>
Clicked country <br>
Score <br>
Time <br>
Remaining attempts <br>
Country flag is served from /public if user plays "Name + Flag" mode. <br>
Suggest "Play again?" when game ends. <br>


## Scoreboard

<img width="1061" height="993" alt="image" src="https://github.com/user-attachments/assets/aebee42a-b61e-4542-a2c2-b58a0fb498f4" />


### Features: <br>
Display all past games <br>
Split game modes to their own sections <br>
Sorted by highest score <br>

### Shows:
  Points <br>
  Username <br>
  Region <br>
  Difficulty <br>

  
## Backend
### Built with:
Node.js <br>
Express <br>
SQLite <br>

### Responsabilities
Store game results <br>
Serves country data per region <br>
Handles REST API requests <br>
Use prepared statement to prevent SQL-injections <br>

### API Endpoints: 

```text
GET  /api/gamedata       → get all scores
POST /api/gamedata       → save game result

GET  /api/europe         → get European countries
GET  /api/asia           → get Asian countries
GET  /api/africa         → get African countries
```

## Frontend
### Built with:
React <br>
React Router <br>
Material UI <br>
React Simple Maps <br>

### Responsabilities 
Game UI rendering <br>
Map interactions <br>
State management (game config, score, timer) <br>
Fetching backend data <br>

## Known issues
Small countries are hard to click <br>
Rapidly refreshing the map may temporary freeze the app <br>

## Versions
### Root
```text
"@emotion/react": "^11.14.0",
"@emotion/styled": "^11.14.1",
"@mui/material": "^9.0.0",
"leaflet": "^1.9.4",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-leaflet": "^4.2.0",
"react-router-dom": "^7.14.0",
"react-simple-maps": "^3.0.0"
```

### Backend
```text
"express": "^5.2.1",
"sqlite": "^5.1.1",
"sqlite3": "5.1.6"
```

### Frontend
```text
"leaflet": "^1.9.4",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-leaflet": "^4.2.0",
"react-router-dom": "^7.14.0",
"react-simple-maps": "^3.0.0"
"@mui/material": "^9.0.0"
```

## Dockerized
<img width="738" height="512" alt="image" src="https://github.com/user-attachments/assets/5ca1ab22-da90-47c1-9d8c-c795c02f1974" />
<img width="1281" height="509" alt="image" src="https://github.com/user-attachments/assets/6669c237-9cee-41d9-84e0-ae6f7187aa0e" />
<br>
### Build process
Uses a multi-stage docker build (frontend + backend) <br>
Frontend is built in a Node.js build stage using Vite <br>
Backend is built in a separate Node.js runtime stage <br>
Production build files are copied into the backend container <br>

### Deployment
Express serves the static frontend files from the backend (/public)
Final image contains only production-ready files (no dev dependencies)
Application runs on a single exposed port (3000)

## What happens at npm start?
"scripts": { <br>
    "start": "concurrently \"npm run start-frontend\" \"npm run start-backend\"", <br>
    "start-frontend": "npm run dev --workspace=frontend", <br>
    "start-backend": "npm start --workspace=backend" <br>

concurrently starts two processes, "npm run start-backend" and "npm run start-frontend" <br>

### "npm run start-frontend"
Starts Vite dev server on port 5173 <br>

### "npm run start-backend"
"npm run start-backend" looks at backend/package.json and finds:
"scripts": {"start": "node index.js"}<br>
index.js runs and sets up express server <br>
createConnection is imported from connection.js and this creates the persistant database <br>
gamedata table is created. It will remain empty for now. <br>
countrydata table is created and countries keyword pairs "Finland: fi" are inserted into SQL database <br>
Route handlers are registered <br>
Server starts and listens to port .env port or port 3000 <br>


## Code snippets
### Transform country keyword pairs into data-objects, which include flag img. <br>
<img width="870" height="638" alt="image" src="https://github.com/user-attachments/assets/d7cc3e75-17c7-45b6-8cbb-c7394422ef66" />
<br>
### Select difficulty and gamemode <br>
<img width="852" height="709" alt="image" src="https://github.com/user-attachments/assets/697a119e-c7de-44a1-89e5-7e7f46983c3e" />
<br>
### Generate a random list of countries using gameConfig <br>
<img width="898" height="649" alt="image" src="https://github.com/user-attachments/assets/51d5c4f9-e6f8-4817-bb62-d62f6eb21ccd" />
<br>
### Navigation bar <br>
<img width="597" height="586" alt="image" src="https://github.com/user-attachments/assets/f67b088f-a8a3-4a16-a787-f1cf00749d8b" />
<br>














