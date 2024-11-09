FROM node:20.4.0

WORKDIR /client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
