# Use an official Node.js runtime as the base image
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app to the working directory
COPY . .

# Build the app
RUN npm run build

# Use an official Nginx runtime as the base image
FROM nginx:1.21-alpine

# Copy the built app from the previous stage to the Nginx default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which the app will run
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]