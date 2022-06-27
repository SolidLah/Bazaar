const { ethers } = require("hardhat")

async function main() {
  const MARKETPLACE = await ethers.getContractFactory("Marketplace")
  const marketplace = await MARKETPLACE.deploy(5)

  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy("Bazaar NFT", "BFT", marketplace.address)

  console.log("Marketplace contract address: ", marketplace.address)
  console.log("NFT contract address: ", nft.address)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
