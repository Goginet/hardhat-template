#!/usr/bin/env bash

shell2http -basic-auth='unfedral:b3e08d86cb7da358' -host='0.0.0.0' -port=8080 -form /api/add_money 'npx hardhat --network localhost faucet $v_to' /api/restart 'kill -9 $(pgrep node)' &

npx hardhat node
