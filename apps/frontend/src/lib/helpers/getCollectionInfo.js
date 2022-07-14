import { ethers } from "ethers";
import { NFTContractData } from "src/contracts";

export default async function getCollectionInfo(address) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.MATIC_VIGIL_RPC
  );

  const nftContractReader = new ethers.Contract(
    address,
    NFTContractData.abi,
    provider
  );

  const promises = [
    nftContractReader.name(),
    nftContractReader.symbol(),
    nftContractReader.owner(),
  ];
  const [name, symbol, owner] = await Promise.all(promises);

  return { name, symbol, owner };
}
