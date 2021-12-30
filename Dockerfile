FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN npm install    

USER node

EXPOSE 3000 

#CMD [ "node app" ]    