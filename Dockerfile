FROM node:15.5.1-alpine3.10
ENV VUE_APP_BASE_URL http://localhost
ENV VUE_APP_API_URL http://localhost/api
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD npm run serve