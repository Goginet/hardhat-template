#!/usr/bin/env bash

function afterRun()
{
    sleep 1m

    npx hardhat --network localhost getAdmin

    npx hardhat --network  localhost setAdmin 0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7

    npx hardhat --network localhost getAdmin
}

shell2http -basic-auth='unfedral:b3e08d86cb7da358' -host='0.0.0.0' -port=8080 -form \
    /api/add_money 'npx hardhat --network localhost faucet $v_to' \
    /api/set_collateral 'npx hardhat  --network localhost setCollateralFactor $v_address $v_value' \
    /api/get_collateral 'npx hardhat  --network localhost getCollateralFactor $v_address' \
    /api/restart 'kill -9 $(pgrep node)' &

afterRun &

npx hardhat node
