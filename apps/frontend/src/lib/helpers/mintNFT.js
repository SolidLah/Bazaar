import { ethers } from "ethers";
import { MarketplaceContractData, NFTContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";

export default async function mintNFT(address, url) {
  const signer = useEthersStore.getState().signer;
  const nftContract = new ethers.Contract(address, NFTContractData.abi, signer);
  const mktContract = new ethers.Contract(
    MarketplaceContractData.address,
    MarketplaceContractData.abi,
    signer
  );

  await (await nftContract.mint(url)).wait();
  const tokenId = await nftContract.idCounter();
  await (await mktContract.createMarketItem(tokenId)).wait();
}
