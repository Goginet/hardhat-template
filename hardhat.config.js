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
const { utils, BigNumber } = require('ethers');

require("@nomiclabs/hardhat-ethers");

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

task("getERSDLAdmin", "returns admin of the ersdl", async () => {
  const addr = await network.provider.request(
    {
      method: "eth_getStorageAt",
      params: [
        "0xE4cC5A22B39fFB0A56d67F94f9300db20D786a5F",
        "0x3",
      ]
    }
  );

  console.log(`current admin: ${addr}`);
});

task("getCollateralFactor", "returns collateral factor for the token").addPositionalParam("token", "The address of the token").setAction(async (args) => {
  const data = await network.provider.request(
    {
      method: "eth_call",
      params: [
        {
          "to": "0x3105D328c66d8d55092358cF595d54608178E9B5",
          "data": "0x8e8f294b" + utils.hexZeroPad(args.token, 32).substr(2),
        },
        "latest"
      ]
    }
  );

  console.log(BigNumber.from("0x" + data.substr(67, 63)).div(BigNumber.from(10).pow(16)).toString());
});

task("getMintPaused", "returns MintPaused for the token").addPositionalParam("token", "The address of the token").setAction(async (args) => {
  const data = await network.provider.request(
    {
      method: "eth_call",
      params: [
        {
          "to": "0x3105D328c66d8d55092358cF595d54608178E9B5",
          "data": "0x731f0c2b" + utils.hexZeroPad(args.token, 32).substr(2),
        },
        "latest"
      ]
    }
  );

  console.log(`current MintPaused: ${data}`);
});

task("getReserveFactor", "get reserveFactor for the token").setAction(async () => {
  const data = await network.provider.request(
    {
      method: "eth_call",
      params: [
        {
          "to": "0xE4cC5A22B39fFB0A56d67F94f9300db20D786a5F",
          "data": "0x173b9904",
        },
        "latest"
      ]
    }
  );
  const res = data / 1e0
  console.log(`current ReserveFactor: ${res}`);
});

task("getBorrowPaused", "returns BorrowPaused for the token").addPositionalParam("token", "The address of the token").setAction(async (args) => {
  const data = await network.provider.request(
    {
      method: "eth_call",
      params: [
        {
          "to": "0x3105D328c66d8d55092358cF595d54608178E9B5",
          "data": "0x6d154ea5" + utils.hexZeroPad(args.token, 32).substr(2),
        },
        "latest"
      ]
    }
  );

  console.log(`current BorrowPaused: ${data}`);
});

task("setCollateralFactor", "sets collateral factor for the specified token").addPositionalParam("token", "The address of the token").addPositionalParam("factor", "collateral factor").setAction(async ({ token, factor }) => {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7"],
  });
  await network.provider.send("hardhat_setBalance", [
    "0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7",
    "0x3635c9adc5dea00000",
  ]);

  const signer = await ethers.provider.getSigner("0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7");

  const collateralFactor = utils.hexZeroPad(BigNumber.from(factor).mul(BigNumber.from(10).pow(16)).toHexString(), 32).substr(2);

  await signer.sendTransaction({
    to: "0x3105D328c66d8d55092358cF595d54608178E9B5",
    data: "0xe4028eee" + utils.hexZeroPad(token, 32).substr(2) + collateralFactor,
  });
});

task("setReserveFactor", "sets reserveFactor for ERSDL").addPositionalParam("value", "collateral factor").setAction(async ({ value }) => {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7"],
  });
  await network.provider.send("hardhat_setBalance", [
    "0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7",
    "0x3635c9adc5dea00000",
  ]);

  const signer = await ethers.provider.getSigner("0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7");

  const newReserveFactor = utils.hexZeroPad(BigNumber.from(value).mul(BigNumber.from(10).pow(16)).toHexString(), 32).substr(2);

  await signer.sendTransaction({
    to: "0xE4cC5A22B39fFB0A56d67F94f9300db20D786a5F",
    data: "0xfca7820b" + newReserveFactor,
  });

  console.log(`newReserveFactor: ${newReserveFactor}`);
});

task("setMintPaused", "set Mint Paused for token").addPositionalParam("token", "The address of the token").addPositionalParam("value", "bool value").setAction(async ({ token, value }) => {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7"],
  });
  await network.provider.send("hardhat_setBalance", [
    "0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7",
    "0x3635c9adc5dea00000",
  ]);

  const signer = await ethers.provider.getSigner("0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7");

  const mintPausedValue = utils.hexZeroPad(BigNumber.from(value).mul(BigNumber.from(10).pow(16)).toHexString(), 32).substr(2);

  await signer.sendTransaction({
    to: "0x3105D328c66d8d55092358cF595d54608178E9B5",
    data: "0x3bcf7ec1" + utils.hexZeroPad(token, 32).substr(2) + mintPausedValue,
  });
});

task("setBorrowPaused", "set Borrow Paused for token").addPositionalParam("token", "The address of the token").addPositionalParam("value", "bool value").setAction(async ({ token, value }) => {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7"],
  });
  await network.provider.send("hardhat_setBalance", [
    "0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7",
    "0x3635c9adc5dea00000",
  ]);

  const signer = await ethers.provider.getSigner("0x350Ef1c0342Ac8D8649982960Ee31bfd75A35dC7");

  const borrowPausedValue = utils.hexZeroPad(BigNumber.from(value).mul(BigNumber.from(10).pow(16)).toHexString(), 32).substr(2);

  await signer.sendTransaction({
    to: "0x3105D328c66d8d55092358cF595d54608178E9B5",
    data: "0x18c882a5" + utils.hexZeroPad(token, 32).substr(2) + borrowPausedValue,
  });
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

task("setERSDLAdmin", "sets admin of the unitroller").addPositionalParam("address", "The address of the new admin").setAction(async ({ address }) => {
  await network.provider.request(
    {
      method: "hardhat_setStorageAt",
      params: [
        "0xE4cC5A22B39fFB0A56d67F94f9300db20D786a5F",
        "0x3",
        utils.hexZeroPad(address, 31) + "08",
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
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY_MAINNET}`,
      }
    }
  }
};
module.exports = config;
