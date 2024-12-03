FROM node:20.4.0-alpine3.18 AS base

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8000

FROM base AS prod

ENV NODE_ENV=production

CMD ["node", "app.js"]

FROM base AS dev

CMD ["npx", "nodemon", "-L", "app.js"]
