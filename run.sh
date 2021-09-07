#!/usr/bin/env bash

function afterRun()
{
    sleep 1m

    npx hardhat --network localhost getAdmin

    npx hardhat --network  localhost setAdmin 0x0000f0160150d0008a300bf076D02030186B06A2

    npx hardhat --network localhost getAdmin
}

shell2http -basic-auth='unfedral:b3e08d86cb7da358' -host='0.0.0.0' -port=8080 -form /api/add_money 'npx hardhat --network localhost faucet $v_to' /api/restart 'kill -9 $(pgrep node)' &

afterRun &

npx hardhat node
