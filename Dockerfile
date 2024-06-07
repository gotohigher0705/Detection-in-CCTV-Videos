# Use the official Node.js 14 image as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Expose the port the app runs on
EXPOSE 3030

# Command to run the application
CMD ["node", "index.js"]