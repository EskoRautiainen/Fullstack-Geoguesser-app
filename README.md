# Fullstack-Geoguesser-app

# Release 1

### Fullstack Node.js + React App
```text
Backend (Node.js + Express):
- Runs a server on port 3000
- Uses an in-memory SQLite database
- Stores simple location data (name, lat, lng)
```

### Provides API endpoints:
```text
- GET /api/locations → all locations
- GET /api/locations/:id → single location
```
### Frontend (React):

```text
Backend (Node.js + Express):
- Runs a server on port 3000
- Uses an in-memory SQLite database
- Stores simple location data (name, lat, lng)
```

```text
- Fetches data from /api/locations http://localhost:5173/api/locations/2
- Displays locations in a list
- Displays interactive map in http://localhost:5173/
```

### Dockerized:
```text
Multi-stage build (frontend + backend)
Serves built frontend via Express
```
