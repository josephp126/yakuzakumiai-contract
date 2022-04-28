const Config = require('./config');
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

let accounts = []

//console.log(process.env);
if (Config.privateKey) {
  accounts = [`0x${Config.privateKey}`, ...accounts];
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  defaultNetwork: 'rinkeby',
  networks: {
    rinkeby: {
      url: Config.rpcs.rinkeby,
      accounts
    },
    homestead: {
      url: Config.rpcs.homestead,
      accounts
    },
  },
  etherscan: {
    apiKey: Config.etherscanApiKey
  }
};
