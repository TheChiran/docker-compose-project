# Base image
FROM node:18.12.0-alpine

# SET WORK Directory
WORKDIR /server

# COPY all dependencies, like package.json src_path:dest_path
COPY /app /server

# INSTALL dependencies
RUN npm install

# COMMANDS to run the app
CMD ["node","server.js"]

EXPOSE 4001