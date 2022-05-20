const { expect } = require("chai")
const { ethers } = require("hardhat")

// 1 ether === 10^18 wei
const toWei = (num) => ethers.utils.parseEther(num.toString())
const toEth = (num) => ethers.utils.formatEther(num)

describe("NFTMarketplace", function () {
  let NFT
  let nft
  let deployer
  let addr1
  let addr2
  let addrs
  let URI = "Sample URI"
  let NAME = "Bazaar NFT"
  let SYMBOL = "BFT"

  beforeEach(async function () {
    // signers
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners()

    // contract factories
    NFT = await ethers.getContractFactory("NFT")

    // deploy contracts
    nft = await NFT.deploy(NAME, SYMBOL)
  })

  describe("Deployment", async function () {
    // NFT contract
    it("Name and symbol of collection", async function () {
      expect(await nft.name()).to.equal(NAME)
      expect(await nft.symbol()).to.equal(SYMBOL)
    })
  })

  describe("Minting", async function () {
    it("check tokenURI and balance", async function () {
      await nft.connect(addr1).mint(URI + " 1")
      expect(await nft.balanceOf(addr1.address)).to.equal(1)
      expect(await nft.tokenURI(0)).to.equal(URI + " 1")

      await nft.connect(addr2).mint(URI + " 2")
      expect(await nft.balanceOf(addr2.address)).to.equal(1)
      expect(await nft.tokenURI(1)).to.equal(URI + " 2")
    })
  })
})
