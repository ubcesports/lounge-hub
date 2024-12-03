FROM node:20.4.0-alpine3.18 AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /client

COPY package.json package-lock.json ./
RUN npm install

COPY . .

FROM node:20.4.0-alpine3.18 AS build
ENV API_URL=http://app:8000
WORKDIR /client
COPY --from=base /client ./
RUN npm run build

FROM node:20.4.0-alpine3.18 AS prod
WORKDIR /client

ENV NODE_ENV=production
COPY --from=base /client/package.json ./package.json
COPY --from=base /client/package-lock.json ./package-lock.json
COPY --from=base /client/node_modules ./node_modules
COPY --from=build /client/.next ./.next
COPY --from=build /client/public ./public

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:20.4.0-alpine3.18 AS dev
ENV API_URL=http://app:8000
WORKDIR /client

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
