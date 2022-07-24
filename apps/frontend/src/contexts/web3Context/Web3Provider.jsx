import { ethers } from "ethers";
import { useEffect } from "react";
import { useErrorToast } from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";
import getWeb3Objects from "./getWeb3Objects";
import useDisconnectEthers from "./useDisconnectEthers";
import validateChain from "./validateChain";

const Web3Provider = ({ children }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const currProvider = useEthersStore((state) => state.provider);

  const setProvider = useEthersStore((state) => state.setProvider);
  const setSigner = useEthersStore((state) => state.setSigner);
  const setAddress = useEthersStore((state) => state.setAddress);
  const setMktContract = useEthersStore((state) => state.setMktContract);

  const disconnect = useDisconnectEthers();
  const errorToast = useErrorToast("Handle wallet");

  // act on local storage
  useEffect(() => {
    const load = async () => {
      if (typeof window.ethereum === "undefined")
        throw new Error("Metamask not installed");

      const provider =
        currProvider ??
        new ethers.providers.Web3Provider(window.ethereum, "any");

      const isValidated = await validateChain(provider, false);

      if (ethersInitialised && isValidated) {
        const {
          provider: validProvider,
          signer,
          address,
          mktContract,
        } = await getWeb3Objects(provider);

        if (active) {
          setProvider(validProvider);
          setSigner(signer);
          setAddress(address);
          setMktContract(mktContract);
        }
      } else {
        if (active) {
          await disconnect();

          if (!isValidated)
            errorToast({
              description: "Not on Mumbai. Change network and connect again.",
            });
        }
      }
    };

    let active = true;
    load();
    return () => {
      active = false;
    };
  }, [ethersInitialised]);

  // subscribe to network changes
  useEffect(() => {
    if (currProvider) {
      currProvider.on("network", (newNetwork, oldNetwork) => {
        console.log("network change");

        if (oldNetwork) {
          if (newNetwork.chainId === 80001) {
            console.log("skip");
            return;
          }

          console.log("store change");
          disconnect();
        }
      });

      return () => {
        currProvider.off("network");
      };
    }
  }, [currProvider]);

  return <>{children}</>;
};

export default Web3Provider;
