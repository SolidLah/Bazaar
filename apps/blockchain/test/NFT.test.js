const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT contract", function () {
  let NFT;
  let MARKETPLACE;
  let nft;
  let marketplace;
  let deployer;
  let addr1;
  let URI = "Sample URI";
  let NAME = "Bazaar NFT";
  let SYMBOL = "BFT";
  let FEE_PERCENT = 5;

  beforeEach(async function () {
    // signers
    [deployer, addr1] = await ethers.getSigners();

    // contract factories
    MARKETPLACE = await ethers.getContractFactory("Marketplace");
    NFT = await ethers.getContractFactory("NFT");

    // deploy contracts
    marketplace = await MARKETPLACE.deploy(FEE_PERCENT);
    nft = await NFT.deploy(NAME, SYMBOL, marketplace.address);
  });

  it("Name and symbol of collection", async function () {
    expect(await nft.name()).to.equal(NAME);
    expect(await nft.symbol()).to.equal(SYMBOL);
  });

  it("Check balance of minter", async function () {
    // balance
    await nft.connect(addr1).mint(URI);
    await nft.connect(addr1).mint(URI);
    expect(await nft.balanceOf(addr1.address)).to.equal(2);
  });

  it("Check details of minted NFT", async function () {
    // URI
    await nft.connect(addr1).mint(URI);
    expect(await nft.tokenURI(1)).to.equal(URI);
    expect(await nft.deployer()).to.equal(deployer.address);
  });
});
