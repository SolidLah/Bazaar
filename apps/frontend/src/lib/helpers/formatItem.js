import axios from "axios";
import { ethers } from "ethers";

export default async function formatItem(item) {
  if (!item) {
    throw new Error("Item not found");
  }

  return {
    itemId: item.itemId?.toNumber(),
    seller: item.seller ?? null,
    owner: item.owner ?? null,
    price: item.price ? ethers.utils.formatEther(item.price) : null,
    marketPrice: item.marketPrice
      ? ethers.utils.formatEther(item.marketPrice)
      : null,
    marketPriceWei: item.marketPrice ?? null,
    active: item.active ?? null,
    collectionAddress: item.nftAddress ?? null,
    collectionName: item.nftName ?? null,
    collectionSymbol: item.nftSymbol ?? null,
    minter: item.minter ?? null,
    tokenId: item.tokenId?.toNumber(),
    tokenURI: item.tokenURI ?? null,
    nftData: (await axios.get(item.tokenURI)).data,
  };
}
