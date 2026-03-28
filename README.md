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

## Features

- Interactive map using React
- Random country guessing game
- REST API powered by Express
- In-memory SQLite database
- Monorepo setup (frontend + backend)
- Docker support


## Project strukture
root/
├── frontend/      # React app
├── backend/       # Express + SQLite API
├── package.json   # workspace config

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

GET api/gata
- returns current game state


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
- Persistent database
- Game restart
- Score history
- Difficulty levels
- UI improvements

