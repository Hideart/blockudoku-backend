FROM node:10.16-alpine

WORKDIR /usr/src/app

COPY . .
RUN apk add --no-cache git

RUN yarn
RUN yarn build

CMD yarn start:prod