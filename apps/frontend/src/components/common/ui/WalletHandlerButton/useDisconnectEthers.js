import useEthersStore from "src/stores/ethersStore";

export default function useDisconnectEthers() {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const setFields = useEthersStore((state) => state.setFields);

  return async () => {
    if (!ethersInitialised) throw new Error("Wallet not connected");

    if (typeof window.ethereum === "undefined")
      throw new Error("Metamask not installed");

    const updated = {
      provider: null,
      signer: null,
      address: null,
      mktContract: null,
      ethersInitialised: false,
    };

    setFields(updated);
  };
}
