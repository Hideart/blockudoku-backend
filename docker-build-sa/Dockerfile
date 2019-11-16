FROM node:10.15 as build-deps

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app
COPY ./yarn.lock /usr/src/app

RUN yarn

WORKDIR /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn build:admin

# Stage 2 - the production environment
FROM nginx:1.15.9-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build/admin /usr/share/nginx/html

EXPOSE 80

CMD sed -i -e 's@API_URL_PROD@'"$API_URL"'@g' /usr/share/nginx/html/static/js/*.js && nginx -g "daemon off;"