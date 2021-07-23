FROM node:14

ENV APP_ROOT /app

ADD ./run.sh /
ADD . ${APP_ROOT}
ADD ./compound-protocol/contracts ${APP_ROOT}/contracts

WORKDIR ${APP_ROOT}

RUN yarn install

RUN chmod +x /run.sh \
    && wget https://github.com/msoap/shell2http/releases/download/1.13/shell2http_1.13_amd64.deb \
    && dpkg -i shell2http_1.13_amd64.deb

EXPOSE 8545

CMD [ "/run.sh" ]
