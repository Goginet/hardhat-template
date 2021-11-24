FROM node:16

ENV APP_ROOT /app

ADD package.json ${APP_ROOT}/package.json

WORKDIR ${APP_ROOT}

RUN yarn install

ARG CONFIG=hardhat-empty.config.js

ADD ./run.sh /
ADD .env ${APP_ROOT}/.env
ADD ${CONFIG} ${APP_ROOT}/hardhat.config.js

RUN chmod +x /run.sh \
    && wget https://github.com/msoap/shell2http/releases/download/1.13/shell2http_1.13_amd64.deb \
    && dpkg -i shell2http_1.13_amd64.deb

EXPOSE 8545

CMD [ "/run.sh" ]
