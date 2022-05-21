const { expect } = require("chai")
const { ethers } = require("hardhat")

// 1 ether === 10^18 wei
const toWei = (num) => ethers.utils.parseEther(num.toString())
const toEth = (num) => ethers.utils.formatEther(num)

describe("NFTMarketplace", function () {
  let NFT
  let MARKETPLACE
  let nft
  let marketplace
  let deployer
  let addr1
  let addr2
  let addrs
  let URI = "Sample URI"
  let NAME = "Bazaar NFT"
  let SYMBOL = "BFT"
  let FEE_PERCENT = 5

  beforeEach(async function () {
    // signers
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners()

    // contract factories
    MARKETPLACE = await ethers.getContractFactory("Marketplace")
    NFT = await ethers.getContractFactory("NFT")

    // deploy contracts
    marketplace = await MARKETPLACE.deploy(FEE_PERCENT)
    nft = await NFT.deploy(NAME, SYMBOL, marketplace.address)
  })

  describe("Deployment", async function () {
    // NFT contract
    it("Name and symbol of collection", async function () {
      expect(await nft.name()).to.equal(NAME)
      expect(await nft.symbol()).to.equal(SYMBOL)
    })

    it("Fee percent for marketplace", async function () {
      expect(await marketplace.feePercent()).to.equal(FEE_PERCENT)
    })
  })

  describe("NFT contract testing", async function () {
    it("Check event emission, tokenURI and balance when minting", async function () {
      expect(await nft.connect(addr1).mint(URI + " 1"))
        .to.emit(nft, "Minted")
        .withArgs(NAME, SYMBOL, 0, URI)
      expect(await nft.balanceOf(addr1.address)).to.equal(1)
      expect(await nft.tokenURI(0)).to.equal(URI + " 1")

      await nft.connect(addr2).mint(URI + " 2")
      expect(await nft.balanceOf(addr2.address)).to.equal(1)
      expect(await nft.tokenURI(1)).to.equal(URI + " 2")
    })
  })

  describe("Marketplace contract testing", async function () {
    beforeEach(async function () {
      await nft.connect(addr1).mint(URI + " 1")
      await nft.connect(addr2).mint(URI + " 2")
    })

    it("Emit MarketItemCreated event", async function () {
      expect(
        await marketplace
          .connect(addr1)
          .createMarketItem(nft.address, 0, toWei(1))
      )
        .to.emit(marketplace, "MarketItemCreated")
        .withArgs(0, nft.address, 0, toWei(1), addr1.address)
    })

    it("Transfer ownership of nft", async function () {
      await marketplace
        .connect(addr1)
        .createMarketItem(nft.address, 0, toWei(1))

      // check ownership
      expect(await nft.ownerOf(0)).to.equal(marketplace.address)
    })

    it("Check details of created MarketItem", async function () {
      await marketplace
        .connect(addr1)
        .createMarketItem(nft.address, 0, toWei(1))

      // check details
      const item = await marketplace.getMarketItem(0)
      expect(item.itemId).to.equal(0)
      expect(item.nftAddress).to.equal(nft.address)
      expect(item.tokenId).to.equal(0)
      expect(item.price).to.equal(toWei(1))
      expect(item.seller).to.equal(addr1.address)
      expect(item.sold).to.equal(false)
    })

    it("Revert if price is set to zero", async function () {
      await expect(
        marketplace
          .connect(addr1)
          .createMarketItem(nft.address, 0, 0)
      ).to.be.revertedWith("Price must be greater than zero")
    })
  })
})
