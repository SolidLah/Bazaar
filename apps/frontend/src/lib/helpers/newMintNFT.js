import { ethers } from "ethers";
import { NFTContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";

export default async function newMintNFT(address, url) {
  const signer = useEthersStore.getState().signer;
  const nftContract = new ethers.Contract(address, NFTContractData.abi, signer);

  await (await nftContract.mint(url)).wait(); // mint NFT
  const tokenId = await nftContract.idCounter(); // get tokenId

  return tokenId;
}
