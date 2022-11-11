FROM node:15.5.1-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6969
CMD npm run serve