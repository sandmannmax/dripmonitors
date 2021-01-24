FROM node:15.5.1-alpine3.10
WORKDIR /usr/src/app
COPY ["./package.json", "./package-lock.json", "./"] 
RUN npm install --production
COPY ./ ./
EXPOSE 3000
CMD npm start