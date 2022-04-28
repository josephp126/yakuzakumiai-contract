const {expect} = require('chai');
const {BN, expectRevert, ether} = require('@openzeppelin/test-helpers');
const {ethers, web3, network, upgrades} = require('hardhat');
const {hexlify, arrayify} = require('@ethersproject/bytes');
const {parseEther} = require('@ethersproject/units');
const {MerkleTree} = require('merkletreejs');

const YakuzaKumiai = artifacts.require('YakuzaKumiai');
const YakuzaKumiaiSale = artifacts.require('YakuzaKumiaiSale');
const SHA3 = require('keccak256');
const {formatEther} = require('@ethersproject/units');

contract('', function([owner, addr1, addr2, addr3, addr4, addr5, ...addrs]){
  beforeEach(async function(){
    this.nft = await YakuzaKumiai.new("0xf57b2c51ded3a29e6891aba85459d600256cf317", "https://yakuza-kumiai.com/");
    console.log(this.nft.address);
    this.sales = await YakuzaKumiaiSale.new(this.nft.address);

    console.log("nft sale address", this.sales.address);
    await this.nft.transferOwnership(this.sales.address);

    
    // Put addr1, addr2, addr3 to whitelist
    const wlLeaves = [addr1, addr2, addr3].map(x => SHA3(x));
    this.wlTree = new MerkleTree(wlLeaves, SHA3, {sortPairs: true});
    console.log("wl tree", this.wlTree.getRoot().toString('hex'));
  });

  it('Should work as expected', async function(){
    // await network.provider.send("evm_increaseTime", [432000]);
    // await network.provider.send("evm_mine")
    // Change sales uri
    await this.sales.setBaseTokenURI("https://newuri");
    expect(await this.nft.baseTokenURI()).to.equal("https://newuri");

    // Try to mint before starting the presale
    const proof = this.wlTree.getProof(SHA3(addr1)).map(p => hexlify(p.data));
    await expectRevert(this.sales.whiteListMint(proof, addr1, 2, {from: addr1, value: parseEther('1')}), "PS: Max limited per wallet");

    // Try to mint with invalid for presale
    // const proof1 = this.wlTree.getProof(SHA3("0x008435698038a639D986A485C3C56FF6D4AEefcD")).map(p => hexlify(p.data));
    // console.log('merkle proof', proof1);
    // await expectRevert(this.sales.whiteListMint(proof1, "0x008435698038a639D986A485C3C56FF6D4AEefcD", 1, {from: addr1, value: parseEther('1')}), "PS: Failed to verify WhiteList");

    //Try to update the max count per wallet
    await expectRevert(this.sales.updatePreSaleMintAmount(), "PS: Updating is available after only 2 days since startig presale is started!");
    await this.sales.updatePreSaleMintAmount();
    // console.log("presale max count-->", await this.sales.getPreSaleMintAmount());
    // expect(await this.sales.getPreSaleMintAmount()).to.be.bignumber.equal(new BN(20));

    // Try to mint for presale
    await this.sales.whiteListMint(proof, addr1, 1, {from: addr1, value: parseEther('70')});
    await expect(await this.nft.ownerOf(0)).to.equal(addr1);

    // Exceeds max mint for presale
    // await expectRevert(this.sales.whiteListMint(proof, addr1, 2, {from: addr1, value: parseEther('1')}), "PS: Max limited per wallet");


    // Try to mint for public sale
    // await expectRevert(this.sales.mint(addr1, 2, {from: addr1, value: parseEther('1')}), "PS: Public sale is not started");
    this.sales.mint(addr1, 10, {from: addr1, value: parseEther('2')})

    // Try to withdrawl to funders
    await expectRevert(this.sales.withdrawToFounders(), "PS: Marketing funds is not finished yet!");

    console.log(formatEther(await ethers.provider.getBalance(this.sales.address)));

    console.log(formatEther(await ethers.provider.getBalance(addr1)));
    // Try to withdrawl to Marketing Team;
    await this.sales.withdrawToMarketingFunder();

    console.log(formatEther(await ethers.provider.getBalance(addr1)));
    console.log(formatEther(await ethers.provider.getBalance(this.sales.address)));
    await this.sales.withdrawToFounders();
  })
});
