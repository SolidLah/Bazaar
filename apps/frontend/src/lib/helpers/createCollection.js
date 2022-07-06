import { ethers } from "ethers";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { MarketplaceContractData, NFTContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";
import { db } from "../firebase";

export default async function createCollection(uid, name, symbol) {
  // deploy contract
  const signer = useEthersStore.getState().signer;
  const factory = new ethers.ContractFactory(
    NFTContractData.abi,
    NFTContractData.bytecode,
    signer
  );
  const contract = await factory.deploy(
    name,
    symbol,
    MarketplaceContractData.address
  );

  // update firestore
  await updateDoc(doc(db, "users", uid), {
    collections: arrayUnion(contract.address),
  });

  return contract.address;
}
