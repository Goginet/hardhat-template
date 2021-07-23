FROM node:14

ENV APP_ROOT /app

ADD ./compound-protocol/contracts ${APP_ROOT}/tmp/contracts
ADD ./run.sh /

WORKDIR ${APP_ROOT}

RUN npm install --save-dev hardhat && npx hardhat

EXPOSE 8545

CMD [ "/run.sh" ]
