require('dotenv').config();

module.exports = {
    privateKey: process.env.PRIVATE_KEY,
    rpcs: {
        homestead: process.env.MAIN_RPC,
        rinkeby: process.env.RINKEBY_RPC
    },
    proxyRegistryAddress: {
        homestead: '0xa5409ec958c83c3f309868babaca7c86dcb077c1',
        rinkeby: '0xf57b2c51ded3a29e6891aba85459d600256cf317',
        hardhat: '0xf57b2c51ded3a29e6891aba85459d600256cf317',
    },
    etherscanApiKey: process.env.ETHERSCAN_API_KEY,
}
