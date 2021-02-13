FROM node:15.5.1-alpine3.10 AS node

# Api Builder Stage

FROM node AS builder
WORKDIR /app
COPY package*.json ./
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install
COPY . .
RUN npm run build

# Final Stage

FROM node AS final
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_ENV production
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install -g pm2
COPY --chown=node:node package*.json process.yml ./
USER node
RUN npm install --only=production
COPY --chown=node:node --from=builder /app/dist ./dist
ENTRYPOINT ["pm2-runtime", "./process.yml"]