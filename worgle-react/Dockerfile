# Use an official Node.js runtime as a parent image
FROM node:14-alpine

WORKDIR /worgle-react

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Install 'serve' to serve the production build
RUN npm install -g serve

# Set the command to run the app
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000
