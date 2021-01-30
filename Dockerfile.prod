FROM node:15.5.1-alpine3.10 AS node

# Builder Stage

FROM node AS builder
WORKDIR /app
RUN npm install -g @vue/cli
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Final Stage

FROM node AS final
ENV NODE_ENV production
RUN apk --no-cache -U upgrade
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install -g pm2
COPY --chown=node:node package*.json process.yml server.js ./
USER node
RUN npm install --only=production
COPY --chown=node:node --from=builder /app/dist ./dist
EXPOSE 3001
ENTRYPOINT ["pm2-runtime", "./process.yml"]