FROM node:5.8.0

MAINTAINER "Ronei Chiarandi" <ronei.chiarandi@gmail.com>

RUN npm install -g nodemon

ADD package.json /tmp/package.json

RUN cd /tmp && npm install

RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app

ADD . /app

EXPOSE 3000

CMD ["npm", "start"]
