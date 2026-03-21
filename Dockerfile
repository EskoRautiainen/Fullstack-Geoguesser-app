# Stage 1: Build the frontend
FROM node:20 AS frontend-builder

WORKDIR /app

# Copy package.json files first, before the source code.
# Docker caches each step (layer). If package.json hasn't changed,
# Docker reuses the cached npm install and skips it — much faster.
COPY package*.json ./
COPY frontend/package*.json frontend/

# Install dependencies for the frontend workspace
RUN npm install --workspace=frontend

# Now copy the frontend source code
COPY frontend/ frontend/

# Build the frontend for production (output goes to frontend/dist/)
RUN npm run build --workspace=frontend

# Stage 2: Build the backend and serve the frontend
FROM node:20

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json backend/

# Install only production dependencies (--omit=dev skips devDependencies
# like testing tools or linters that are not needed in production)
RUN npm install --omit=dev --workspace=backend

COPY backend/ backend/

# Copy the built frontend files from Stage 1 into the backend's
# public/ directory, where express.static serves them
COPY --from=frontend-builder /app/frontend/dist backend/public

EXPOSE 3000

CMD ["npm", "start", "--workspace=backend"]