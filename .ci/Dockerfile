FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Grab source code and install dependencies
COPY . .
RUN npm install

# Build source code
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start"]
