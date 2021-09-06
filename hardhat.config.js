/**
 * Use:
 *
 * npx hardhat node                                   # run node with fork
 *
 * npx hardhat --network localhost faucet <address>   # add some ETH, after need
 *                                                      reset account settings in MetaMask
 * npx hardhat --network localhost balance <address>  # view balance
 *
 * In MetaMask add http://127.0.0.1:8545 RPC url and reset account settings
 */

/* global network, task */
/* eslint-disable prettier/prettier */

const dotenv = require('dotenv');
const dotenvExpand = require("dotenv-expand");
const { utils } = require('ethers');

const environment = dotenv.config()
dotenvExpand(environment)

const {
  ALCHEMY_API_KEY_MAINNET,
  VUE_APP_CHAIN_ID_PRIVATE_MAINNET,
} = environment.parsed


const floatFormatter = (value, compact = false) => {
  const notation = compact ? 'compact' : void 0
  return new Intl
    .NumberFormat('ru-RU', { notation })
    .format(+value)
}

task("faucet", "Sends ETH to an address")
  .addPositionalParam("address", "The address that will receive them")
  .setAction(async ({ address }) => {
    const balance = utils.parseEther(1e6.toString())
    const balance_eth = balance.div(1e9).div(1e9)

    await network.provider.send(
      "hardhat_setBalance",
      [address, balance.toHexString()],
    );

    console.log(`Transferred ${floatFormatter(balance_eth)} ETH to ${address}`);
  });


task("balance", "Get balance ETH of address")
  .addPositionalParam("address", "The address that will receive them")
  .setAction(async ({ address }) => {
    const balance = await network.provider.send(
      "eth_getBalance",
      [address],
    );

    const balance_eth = balance / 1e9 / 1e9
    console.log(`Balance is ${floatFormatter(balance_eth)} ETH of ${address}`);
  });

task("getAdmin", "returns admin of the unitroller", async () => {
  const addr = await network.provider.request(
    {
      method: "eth_getStorageAt",
      params: [
        "0x3105D328c66d8d55092358cF595d54608178E9B5",
        "0x0",
      ]
    }
  );

  console.log(`current admin: ${addr}`);
});

task("setAdmin", "sets admin of the unitroller").addPositionalParam("address", "The address of the new admin").setAction(async ({ address }) => {
  await network.provider.request(
    {
      method: "hardhat_setStorageAt",
      params: [
        "0x3105D328c66d8d55092358cF595d54608178E9B5",
        "0x0",
        utils.hexZeroPad(address, 32),
      ]
    }
  );
});

const config = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // fix MetaMask - https://hardhat.org/metamask-issue.html
      chainId: +VUE_APP_CHAIN_ID_PRIVATE_MAINNET,
      accounts: {
        count: 1,
        accountsBalance: utils.parseEther('100001.0').toString(),
      },
      // https://hardhat.org/config/#hardhat-network
      /*
      accounts: [
        'ba8c9ff38e4179748925335a9891b969214b37dc3723a1754b8b849d3eea9ac0',
      ].map((privateKey) => ({
        privateKey,
        balance: utils.parseEther(1e6.toString()).toString(),
      })),
      */
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY_MAINNET}`,
        blockNumber: 12831680
      }
    }
  }
};

module.exports = config;
