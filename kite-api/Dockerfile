FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY .env /usr/src/app/

RUN apk add --update \
    python \
    make \
    build-base
RUN npm install

COPY src/ /usr/src/app/src/
COPY config/ /usr/src/app/config/

EXPOSE 3000

CMD ["npm", "start"]