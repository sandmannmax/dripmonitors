FROM node:15.5.1-alpine3.10 AS node

RUN apk --no-cache -U upgrade
WORKDIR mkdir -R /app/src
WORKDIR /app
COPY package*.json .
RUN npm install
COPY ./src ./src
CMD ["npm", "start"]