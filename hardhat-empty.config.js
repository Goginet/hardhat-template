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

const path = require('path')
const os = require('os')
const fs = require('fs')
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

const cachePath = path.join(os.tmpdir(), 'hardhat-cache')

const { ethers } = require('ethers')

const balance = ethers.utils.parseEther('10000').toString()
const accounts = [
  {
    privateKey: '0xe51d78bcbc44c582b83df2261a3645f8fc70b73174874aaa04878522102523b8',
    balance,
  },
  {
    privateKey: '0xfbefb8ab43a97476d5457bdf8c334b06e3f2eca9bbbcf162f591e2b4f9b40e46',
    balance,
  },
  {
    privateKey: '0xdff155c507250583c58d600fd0b5f42f2e5247b341143d36a7d08627ce1339da',
    balance,
  },
  {
    privateKey: '0x7c62ea87d60324f706a57af90ecd10909cf6a5805f06406219e1eff2035aad2b',
    balance,
  },
  {
    privateKey: '0xd0fa62562dca8ce58086423d18dfeef4a82303bbb9d5068aa310c04fa2282d3e',
    balance,
  },
  {
    privateKey: '0xee6e76bae0d2f1a22b0ff817aa6ab91f9273e0c41d6317c012c60dae541dfa1b',
    balance,
  },
  {
    privateKey: '0x7ee1466c3aa7d939152c73da8b74bbbbe0556c6d72d2934eaf9534971c410afd',
    balance,
  },
  {
    privateKey: '0xd983fc2bc1cedfd5797fcf07bccd18e73c435f11cc93428da53f2939c0ff8c0e',
    balance,
  },
  {
    privateKey: '0x30fdbca87472b5f62faef62a2164aabe157e93c6a7cab28295c227917542a6f9',
    balance,
  },
  {
    privateKey: '0x60aa0349754edb85e666a966bce274791fd12b4891e0db3341ddd45be565318b',
    balance,
  },
  {
    privateKey: '0xaa7189084104034811d6fb481cbd92a8dbb8f3f6197f60e0871e35ab2b18e510',
    balance,
  },
  {
    privateKey: '0xeed4254453684bb0c1b9b547f0741c99cc4da05688d85d798452df08812f32d9',
    balance,
  },
  {
    privateKey: '0x47162529febe3f7f643435d08421ac8c18151b9399c659bb7a885f567487fa38',
    balance,
  },
  {
    privateKey: '0x64bf4c5e591eb647b1ca1d5d56fd288e1ca3a484cf500c94190375e99c164420',
    balance,
  },
  {
    privateKey: '0x2b1438718a66d4a2d8d1717705d36aef316f3d817e6aace6f35d302449f22269',
    balance,
  },
  {
    privateKey: '0xdf01d4d538c07e1558a96c2f2921ae96809c6f77beb623698b38268fe397ee90',
    balance,
  },
  {
    privateKey: '0x626eacd4650a5d39d73339d3206a5ac516c807a71405fe4f0c272357cb5f8681',
    balance,
  },
  {
    privateKey: '0x3fdff57f8b261047e75e89965b23e747a8778a6dede08e18a86c5aa605abe19b',
    balance,
  },
  {
    privateKey: '0x25dbeea012f9c286c44cd92df2fa6934c8c98f1685324eee8bce95e43eba1deb',
    balance,
  },
  {
    privateKey: '0xd7ec3e8b97cd36c03407a9b8ba296848138179de2642c231efe4ec7a214267a0',
    balance,
  },
  {
    privateKey: '21bfd4c5dfc54c8e68748d20ad35858cf99b18a8d57bb34b273646b21f0db0e8',
    balance,
  },
]


accounts.push({
  privateKey: '21bfd4c5dfc54c8e68748d20ad35858cf99b18a8d57bb34b273646b21f0db0e8',
  balance,
})



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
  const res = data / 1e0
  console.log(`current MintPaused: ${res}`);
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
  const res = data / 1e0
  console.log(`current BorrowPaused: ${res}`);
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

  console.log("ReserveFactor changed successfully");
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

  console.log("MintPaused changed successfully");
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

  console.log("BorrowPaused changed successfully");
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
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
      accounts,
      allowUnlimitedContractSize: true,
    },
  },
}
module.exports = config
