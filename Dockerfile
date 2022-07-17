FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i --only=production

COPY . .

RUN npx prisma migrate deploy

RUN npx prisma generate

RUN npm run build

USER node

EXPOSE 8080

CMD ["npm", "start"]