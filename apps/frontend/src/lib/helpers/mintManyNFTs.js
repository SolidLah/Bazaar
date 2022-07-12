import { ethers } from "ethers";
import { NFTContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";

export default async function mintManyNFTs(address, urls) {
  const signer = useEthersStore.getState().signer;
  const nftContract = new ethers.Contract(address, NFTContractData.abi, signer);

  await (await nftContract.mintMany(urls)).wait();
}
