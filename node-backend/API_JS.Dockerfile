FROM node:lts-alpine3.21

WORKDIR /app/src
COPY package*.json ./

RUN npm install express
COPY . .

CMD ["node", "app.js"]

