FROM node:latest

# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install    

#criar .dockerignore para node-modules, visto que na instalação do npm os módulos são instalados#
#referencia do package.json#
COPY . .

EXPOSE 3000 

CMD [ "node","./dist/app" ]    