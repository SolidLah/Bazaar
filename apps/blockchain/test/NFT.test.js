const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());

describe("NFT contract", function () {
  let NFT;
  let MARKETPLACE;
  let nft;
  let marketplace;
  let deployer;
  let URI = "Sample URI";
  let NAME = "Bazaar NFT";
  let SYMBOL = "BFT";
  let FEE_PERCENT = 5;

  beforeEach(async function () {
    // signers
    [deployer] = await ethers.getSigners();

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

  describe("Mint", async function () {
    beforeEach(async function () {
      await nft.connect(deployer).mint(URI);
      await nft.connect(deployer).mint(URI);
    });

    it("Check balance of minter", async function () {
      // balance
      expect(await nft.balanceOf(deployer.address)).to.equal(2);
    });

    it("Check details of minted NFT", async function () {
      // URI
      expect(await nft.tokenURI(1)).to.equal(URI);
      expect(await nft.owner()).to.equal(deployer.address);
    });
  });

  describe("MintMany", async function () {
    beforeEach(async function () {
      await nft.connect(deployer).mintMany([URI, URI]);
      await nft.connect(deployer).mintMany([URI, URI]);
    });

    it("Check balance of minter", async function () {
      // balance
      expect(await nft.balanceOf(deployer.address)).to.equal(4);
    });

    it("Check details of minted NFT", async function () {
      // URI
      expect(await nft.tokenURI(3)).to.equal(URI);
      expect(await nft.owner()).to.equal(deployer.address);
    });
  });

  describe("Fetch user tokens", async function () {
    it("Get correct number of unlisted items", async function () {
      await nft.connect(deployer).mintMany([URI, URI]);
      await marketplace.connect(deployer).createMarketItem(nft.address, 1);
      await marketplace.connect(deployer).listMarketItem(1, toWei(1));

      const tokens = await nft.fetchUserTokens();
      expect(tokens.length).to.equal(1);
    });
  });
});
