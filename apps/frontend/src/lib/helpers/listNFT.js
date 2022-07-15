import { ethers } from "ethers";
import { NFTContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";
import toWei from "./toWei";

export default async function listNFT(itemId, price) {
  const mktContract = useEthersStore.getState().mktContract;
  const nftContract = new ethers.Contract(address, NFTContractData.abi, signer);

  await (await nftContract.giveApproval()).wait();
  await (await mktContract.listMarketItem(itemId, toWei(price))).wait();
}
