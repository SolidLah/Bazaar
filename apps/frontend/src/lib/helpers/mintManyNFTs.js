import { ethers } from "ethers";
import { NFTContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";

export default async function mintManyNFTs(address, urls) {
  const signer = useEthersStore.getState().signer;
  const mktContract = useEthersStore.getState().mktContract;
  const nftContract = new ethers.Contract(address, NFTContractData.abi, signer);

  const beforeTokenId = Number(await nftContract.idCounter());
  await (await nftContract.mintMany(urls)).wait();
  const afterTokenId = Number(await nftContract.idCounter());

  let tokenIds = [];
  for (let i = beforeTokenId + 1; i <= afterTokenId; i++) {
    tokenIds.push(i);
  }

  console.log("tokenIds:", tokenIds);

  await (await mktContract.createManyMarketItems(address, tokenIds)).wait();
}
