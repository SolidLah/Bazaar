import { ethers } from "ethers";
import { MarketplaceContractData } from "src/contracts";
import formatItem from "./formatItem";

export default async function getCollectionListed(address) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.MATIC_VIGIL_RPC
  );

  const mktContractReader = new ethers.Contract(
    MarketplaceContractData.address,
    MarketplaceContractData.abi,
    provider
  );

  let listed = await mktContractReader.fetchCollectionItems(address);
  listed = await Promise.all(
    listed.map(async (token) => await formatItem(token))
  );

  return listed;
}
