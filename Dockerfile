# FROM node:18.0-alpine3.15

# WORKDIR /usr/src/app

# COPY . .
# RUN npm i

# RUN npm run build

# EXPOSE 3001

# CMD [ "npm" , "run" ,"start" ]

# Use the official Node.js 16 base image
FROM node:16-alpine3.15

# Set the working directory inside the container
WORKDIR /client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port on which the Next.js application will run (default is 3000)
EXPOSE 3001

# Start the Next.js application
CMD npm run dev -- -p 3001
# CMD npm run dev