FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i --only=production

COPY . .

RUN npm run build

USER node

EXPOSE 8080

CMD ["npm", "start"]