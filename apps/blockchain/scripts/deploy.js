const { ethers, artifacts } = require("hardhat");

function saveToFrontend(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/src/contracts/";
  console.log(`Writing contract data to: ${contractsDir}`);

  const contractArtifact = artifacts.readArtifactSync(name);

  try {
    fs.writeFileSync(
      contractsDir + `${name}.json`,
      JSON.stringify(
        { address: contract.address, abi: contractArtifact.abi },
        undefined,
        2
      )
    );
  } catch (error) {
    console.log("Error while writing file");
  }
}

async function main() {
  const MARKETPLACE = await ethers.getContractFactory("Marketplace");
  const marketplace = await MARKETPLACE.deploy(5);

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy("Bazaar NFT", "BFT", marketplace.address);

  console.log("Marketplace contract address: ", marketplace.address);
  console.log("NFT contract address: ", nft.address);

  saveToFrontend(marketplace, "Marketplace");
  saveToFrontend(nft, "NFT");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
