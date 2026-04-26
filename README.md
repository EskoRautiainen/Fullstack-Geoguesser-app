# Release 1
## Fullstack Node.js + React App
### Backend (Node.js + Express):
```text
- Runs a server on port 3000
- Uses an in-memory SQLite database
- Stores simple location data (name, lat, lng)
```
### Frontend (React):
```text
- Fetches data from /api/locations http://localhost:5173/api/locations/2
- Displays locations in a list
- Displays interactive map in http://localhost:5173/
```
### Provides API endpoints:
```text
- GET /api/locations → all locations
- GET /api/locations/:id → single location
```
### Dockerized:
```text
Multi-stage build (frontend + backend)
Serves built frontend via Express
```


# Release 2
## Fullstack-geoguesser-app
This project is a fullstack geography game built with Node.js and React, where users guess countries on an interactive map.

<img width="1350" height="1098" alt="image" src="https://github.com/user-attachments/assets/3dec42e0-f8da-4b00-a5dd-2bf71da78e05" />


## Features

- Interactive map using React
- Random country guessing game
- REST API powered by Express
- In-memory SQLite database
- Monorepo setup (frontend + backend)
- Docker support


## Project structure
```text
root/
├── frontend/      # React app
├── backend/       # Express + SQLite API
├── package.json   # workspace config
```

## Setup & run

Install dependancies
```bash
npm install
```

Start from root
```bash
npm start
```


## Docker

Dockerize
```bash
docker build -t fullstack-geoguesser .
docker run -p 3000:3000 fullstack-geoguesser
```

## API endpoints

GET api/gamedata
- returns GET request for gamedata


## How it works?

```bash npm start``` starts a monorepo setup, which runs frontend and backend at the same time.
```bash npm run dev --workspace=frontend``` runs a dev script inside the frontend workspace.
```bash npm start --workspace=backend``` runs the start script inside the backend workspace

### Backend
```text
index.js runs inside backend folder and does the following:
- Import 
- Create express app
- Create database connection
- Create table for gamedata and insert sample data
- Calls for exported async function from countriesSQLite.js. This creates europe table and its inserts
- Define route for findAll
- Start listening to port 3000
- Include graceful shutdown. CTRL + C
```

### Frontend
```text
App.jsx start from main.jsx
- Fetch data from backend
- Randomly select 10 countries for the game
- Use react states clickedCountry, targetCountries, currentIndex, score etc.
- User interacts with the map by zooming and moving it
- Hovering over a country highlights it
- Clicking on a country turns it red
- React re-renders automatically using onEffect and onState
```
## Troubleshooting

Changes to app not reflecting?
- Don't run it in docker, while modifying the app. In memory-SQLite will not work as intended.
- Rebuild the image after backend changes. docker build ```bash--no-cache -t fullstack-geoguesser .```

## Future improvements
```text
- Persistent database
- Game restart
- Score history
- Difficulty levels
- UI improvements
```



# Release 3
## Routing
```text
- Use React router to navigate between pages.
- Select Difficulty, Region and Mode.
- "Start" takes you to http://localhost:5173/play and starts the game with the chosen settings.
- "Easy" mode has 10 rounds, while "Hard" mode has 30.
```

<img width="579" height="754" alt="image" src="https://github.com/user-attachments/assets/ed42449e-ef00-457e-a2c8-7e82e1fe8a91" />

## Game logic
```text
- View timer
- Keep track of score
- Keep track of rounds
- Keep track of remaining attempts
- "Click on country" prompt
- "You clicked on" feedback
- Hovering a country turns it yellow
- Clicking the correct country turns it green
- Clicking on the wrong country turns it red
- Upon guessing correctly, each remaining guess adds 60 points to total score. (Max 180 / round)
- When game ends, total score is calculated with: (prev * 5 / (time / 50 + 1)).toFixed(1))
- 10/10, 60 seconds results in 4090 points
- 10/10 30 seconds results in 5625 points
- 9/10, 30 seconds results in 5062,5 points
```
<img width="1354" height="961" alt="image" src="https://github.com/user-attachments/assets/7c6c7d16-faa7-4141-a0a9-8aa4a550ce4a" />

## Geodata
```text
- No longer uses API to fetch Geodata
- React gets Geodata from /public
- Improved map detail noticeably
- Geodata is up to date
```

## Future improvements
```text
- Persistent database
- Game restart
- Score history
- UI improvements
- Audio feedback
- Include flags. Allow playing w/ flags only.
```

# Release 4 - Release candidate
https://fullstack-geoguesser-app.onrender.com/
<img width="1351" height="997" alt="image" src="https://github.com/user-attachments/assets/628c0c5e-14fc-4993-a5f6-6fdc341c0168" />

## UI UPDATE
```text
- After guessing incorrectly 3 times, highlight target country location with blue for 1.5 seconds.
- Provide audio feedback on guesses. "tink" "brrr".
- Display target country and guessed country flags.
- Remove "result=x". User gets feedback on their clicks trough audio and colour changing on map component.
- index.html forces darkmode on browser.
- Improve the position of components.
- Audio feedback is served from public/sounds.
```

## FLAG IMG's
```text
- Serve flag images to React from public/flags.
- Countries are stored as keyword pairs in backend: Finland: "fi".
- We loop trought these keyword pairs, adding the  corresponding flag img and turning them into data-objects.
- Country flags are visible on the UI for "Click on:x" and "You clicked on:y"
```

## DOCUMENTATION
```text
- Add comprehensive comments troughout the files.
- Improve syntax.
- Remove any leftover code from previous half-baked solutions.
```
<img width="1215" height="900" alt="image" src="https://github.com/user-attachments/assets/1ffbbbc1-87bd-4825-a0b8-ff2000d2f77a" />

## SQL LOGIC
```text
- Make components for creating SQL tables and inserting reusable.
- SQL is called with "await addContinent(db, "europe");". Simple & clean.
- Include "America" gamemode
```

## KNOWN ISSUES
```text
- Refreshing the page on "http://localhost:3000/play" gets you "cannot GET /play"
- Some countries in the game are very small. They are hard to locate, and when they flash blue they're difficult to see.
- Small countries are hard to click on without a good mouse. They will likely get removed.
- Countries that don't have ISO-codes don't have their map displayed in the app.
- Need to figure out what to do with countries that are not internationally recognized as a sovereign states.
```

## FUTURE IMPROVEMENTS
```text
- Persistent database
- Game restart
- Score history
- UI improvements
- Flag only gamemode. UI is there for it, but it does not work yet.
```

## CONSIDER
```text
These will bring up the grading
- Support for different languages
- UI designed with bootstrap, or material.ui or some other
- Authentication
- TypeScript
- Incorporates a testing framework for testing RESTful APIs, for example Jest with Supertest or Mocha with Chai-http
```

# Fullstack CountryGuesser
This project is a fullstack geography game built with Node.js and React, where users guess countries on an interactive map. Project uses monorepo setup, REST API powered by Express and persistant SQL-database.
<img width="938" height="986" alt="image" src="https://github.com/user-attachments/assets/78d28209-9cee-4623-aa80-81bcfd688dbc" />

## Summary
```text
CountryGuesser is a tool for learning countries and flags.
User chooses Region, Difficulty and Gamemode and enters their Username.
User gets 3 guesses on each round and gets 60 points for each remaining guess, earning 60/120/180 points per round.
When game ends, total points are calculated with the formula:
const finalPoints = Number((newPoints * 5 / (time / 50 + 1)).toFixed(1)
Results are automatically sent to backend, from which they are served to /scores page.
Scorepage splits the two modes and sorts scores in descending order.
```

## Homepage

<img width="539" height="555" alt="image" src="https://github.com/user-attachments/assets/0dae6a54-2526-4185-ba3e-2033fb555650" />

```text
RadioButtons have custom hover color
Game can't be started if user does not enter an username.
```

## Scoreboard

<img width="1061" height="993" alt="image" src="https://github.com/user-attachments/assets/aebee42a-b61e-4542-a2c2-b58a0fb498f4" />

```text
Scores are automatically sent to backend when game ends.
Scores are separated on gamemode and sorted by points.
```







