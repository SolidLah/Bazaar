import { ethers } from "ethers";
import { useEffect } from "react";
import { MarketplaceContractData } from "src/contracts";
import useEthersStore from "src/stores/ethersStore";

export const Web3Provider = ({ children }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const currSigner = useEthersStore((state) => state.signer);
  const currMktContract = useEthersStore((state) => state.mktContract);
  const setSigner = useEthersStore((state) => state.setSigner);
  const setMktContract = useEthersStore((state) => state.setMktContract);

  useEffect(() => {
    const load = async () => {
      if (typeof window.ethereum === "undefined")
        throw new Error("Metamask not installed");

      if (ethersInitialised) {
        if (!currSigner && !currMktContract) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const mktContract = new ethers.Contract(
            MarketplaceContractData.address,
            MarketplaceContractData.abi,
            signer
          );

          console.log("initialised", signer, mktContract);

          if (active) {
            setSigner(signer);
            setMktContract(mktContract);
          }
        }
      } else {
        if (currSigner && currMktContract) {
          if (active) {
            setSigner(null);
            setMktContract(null);
          }
        }
      }
    };

    let active = true;
    load();
    return () => {
      active = false;
    };
  }, [
    ethersInitialised,
    currSigner,
    currMktContract,
    setSigner,
    setMktContract,
  ]);

  return <>{children}</>;
};
