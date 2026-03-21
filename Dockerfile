# Use the official Node.js 20 image as the base image
FROM node:20

# Install build tools
RUN apt-get update && apt-get install -y python3 make g++

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install dependencies specified in package.json
RUN npm install --build-from-source

# Copy the rest of the application files to the container's working directory
COPY . .

# Expose port 3000 to allow external access to the application
EXPOSE 3000

# Define the command to run the application (starting the Node.js server)
CMD ["node", "index.js"]