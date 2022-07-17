import { ethers } from "ethers";
import { NFTContractData } from "src/contracts";
import formatItem from "./formatItem";

export default async function getCollectionUnlisted(address) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.MATIC_VIGIL_RPC
  );

  const nftContractReader = new ethers.Contract(
    address,
    NFTContractData.abi,
    provider
  );

  let unlisted = await nftContractReader.fetchUserTokens();
  unlisted = await Promise.all(
    unlisted.map(async (token) => await formatItem(token))
  );

  return unlisted;
}
