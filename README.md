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
- Persistent database
- Game restart
- Score history
- UI improvements
- Audio feedback
- Include flags. Allow playing w/ flags only.




