import useEthersStore from "src/stores/ethersStore";
import toWei from "./toWei";

export default async function newListNFT(itemId, price) {
  const mktContract = useEthersStore.getState().mktContract;
  await (await mktContract.listMarketItem(itemId, toWei(price))).wait();
}
