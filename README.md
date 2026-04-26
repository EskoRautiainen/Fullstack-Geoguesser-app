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
Player gets 3 guesses on each round and gets 60 points for each remaining guess, earning 60/120/180 points per round. <

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
Play audio effect on correct/wrong guesses <br>
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
```

## How data moves around?

Load target countries:
<img width="587" height="175" alt="image" src="https://github.com/user-attachments/assets/7817caf0-b085-4a60-9453-21956513033f" />

Data objects:
<img width="879" height="645" alt="image" src="https://github.com/user-attachments/assets/6315f5c1-ac98-44a9-9029-4247e9a54072" />








