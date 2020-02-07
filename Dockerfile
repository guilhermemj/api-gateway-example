FROM node:12-alpine

WORKDIR /home/node/app

ADD . .

ENV NODE_ENV=production

RUN npm ci

USER node

EXPOSE 3000

CMD [ "node", "dist/index.js" ]
