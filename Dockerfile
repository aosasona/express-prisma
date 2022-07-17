FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn --only=production

COPY . .

RUN npx prisma deploy

RUN npx prisma generate

RUN yarn build

USER node

EXPOSE 8080

CMD ["yarn", "start"]