import { ethers } from "ethers";
import useEthersStore from "src/stores/ethersStore";
import getWeb3Objects from "./getWeb3Objects";
import validateChain from "./validateChain";

export default function useConnectEthers() {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const setProvider = useEthersStore((state) => state.setProvider);
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

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    setProvider(provider);

    await validateChain(provider);
    const { signer, address, mktContract } = await getWeb3Objects(provider);

    setSigner(signer);
    setMktContract(mktContract);

    setAddress(address);
    setEthersInitialised(true);
  };
}
