import useEthersStore from "src/stores/ethersStore";

export default function useDisconnectEthers() {
  const setSigner = useEthersStore((state) => state.setSigner);
  const setMktContract = useEthersStore((state) => state.setMktContract);
  const setAddress = useEthersStore((state) => state.setAddress);
  const setEthersInitialised = useEthersStore(
    (state) => state.setEthersInitialised
  );

  return async () => {
    if (typeof window.ethereum === "undefined")
      throw new Error("Metamask not installed");

    setSigner(null);
    setMktContract(null);
    setAddress(null);
    setEthersInitialised(false);
  };
}
