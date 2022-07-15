import { ethers } from "ethers";
import { NFTContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";

export default async function mintNFT(address, url) {
  const signer = useEthersStore.getState().signer;
  const mktContract = useEthersStore.getState().mktContract;
  const nftContract = new ethers.Contract(address, NFTContractData.abi, signer);

  // await (await nftContract.mint(url)).wait();
  // const tokenId = await nftContract.idCounter();
  // console.log("tokenId:", tokenId);
  await (await mktContract.createMarketItem(address, 2)).wait();
}
