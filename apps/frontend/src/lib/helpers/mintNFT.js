import useEthersStore from "src/stores/ethersStore";

export default async function mintNFT(nftURI) {
  const nftContract = useEthersStore.getState().nftContract;

  await (await nftContract.mint(nftURI)).wait(); // mint NFT
  const tokenId = await nftContract.idCounter(); // get tokenId

  return tokenId;
}
