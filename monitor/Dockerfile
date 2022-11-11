FROM node:15.5.1-alpine3.10 AS node

RUN apk --no-cache -U upgrade
WORKDIR mkdir -R /app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]