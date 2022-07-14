import { ethers } from "ethers";
import { MarketplaceContractData, NFTContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";

export default async function mintManyNFTs(address, urls) {
  const signer = useEthersStore.getState().signer;
  const nftContract = new ethers.Contract(address, NFTContractData.abi, signer);
  const mktContract = new ethers.Contract(
    MarketplaceContractData.address,
    MarketplaceContractData.abi,
    signer
  );

  const beforeTokenId = await nftContract.idCounter();
  await (await nftContract.mintMany(urls)).wait();
  const afterTokenId = await nftContract.idCounter();

  let tokenIds = [];
  for (i = 1; i <= afterTokenId; i++) {
    tokenIds.push(i + beforeTokenId);
  }

  await (await mktContract.createManyMarketItems(tokenIds)).wait();
}
