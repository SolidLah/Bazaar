import { ethers } from "ethers";
import { MarketplaceContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";

export default function useConnectEthers() {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const setSigner = useEthersStore((state) => state.setSigner);
  const setAddress = useEthersStore((state) => state.setAddress);
  const setMktContract = useEthersStore((state) => state.setMktContract);
  const setEthersInitialised = useEthersStore(
    (state) => state.setEthersInitialised
  );

  return async () => {
    if (ethersInitialised) throw new Error("Wallet already connected");

    if (typeof window.ethereum === "undefined")
      throw new Error("Metamask not installed");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const mktContract = new ethers.Contract(
      MarketplaceContractData.address,
      MarketplaceContractData.abi,
      signer
    );

    setSigner(signer);
    setMktContract(mktContract);

    setAddress(address);
    setEthersInitialised(true);
  };
}
