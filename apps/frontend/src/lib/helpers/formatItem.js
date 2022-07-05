import axios from "axios";
import { ethers } from "ethers";

export default async function formatItem(item) {
  if (!item) {
    throw new Error("Item not found");
  }

  return {
    itemId: item.itemId.toNumber(),
    seller: item.seller,
    owner: item.owner,
    price: ethers.utils.formatEther(item.price),
    marketPrice: ethers.utils.formatEther(item.marketPrice),
    marketPriceWei: item.marketPrice,
    sold: item.sold,
    nftAddress: item.nftAddress,
    minter: item.minter,
    tokenId: item.tokenId.toNumber(),
    tokenURI: item.tokenURI,
    nftData: (await axios.get(item.tokenURI)).data,
  };
}
