import { ethers } from "ethers";
import { MarketplaceContractData } from "src/contracts";

export default async function getWeb3Objects(provider = null) {
  const _provider =
    provider ?? new ethers.providers.Web3Provider(window.ethereum, "any");
  await _provider.send("eth_requestAccounts", []);
  const signer = _provider.getSigner();
  const address = await signer.getAddress();
  const mktContract = new ethers.Contract(
    MarketplaceContractData.address,
    MarketplaceContractData.abi,
    signer
  );

  return { provider: _provider, signer, address, mktContract };
}
