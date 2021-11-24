require('@nomiclabs/hardhat-ethers')
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
