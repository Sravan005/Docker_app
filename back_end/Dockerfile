# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend directory to the container
COPY . .

# Expose port 8081 to the host
EXPOSE 8081

# Start the backend server
CMD ["node", "server.js"]
