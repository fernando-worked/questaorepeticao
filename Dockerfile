FROM node:latest

WORKDIR /dist

USER node

EXPOSE 3000

CMD [ "node ./app/dist" ] 