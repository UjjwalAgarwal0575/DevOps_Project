FROM node:18-alpine

# Set the working directory in the container
# WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# RUN npm install

# Copy the project files to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]