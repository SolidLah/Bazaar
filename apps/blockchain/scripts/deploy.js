const { ethers } = require("hardhat")

async function main() {
  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy("Bazaar NFT", "BFT")

  console.log("NFT contract address: ", nft.address)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
