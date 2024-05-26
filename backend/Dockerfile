# Use official Node.js image as base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install Prisma CLI
RUN npm install prisma --save-dev

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Run Prisma migrations
RUN npx prisma migrate deploy

# Run linting and formatting checks
RUN npm run lint:fix
RUN npm run format

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
