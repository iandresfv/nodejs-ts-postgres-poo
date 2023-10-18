# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Install ts-node
RUN npm install -g ts-node

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the NODE_ENV environment variable to production
ENV NODE_ENV=production

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]

