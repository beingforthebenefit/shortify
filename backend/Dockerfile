# Use official Node.js image as base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
