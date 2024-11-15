FROM node:20.4.0

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npx", "nodemon", "-L", "app.js"]
