import { useContext, useMemo } from "react";
import { userContext } from "src/contexts/userContext";
import useEthersStore from "src/stores/ethersStore";

export default function useValidatedAddress() {
  // firestore address
  const { data } = useContext(userContext);
  const storedAddress = data?.walletAddress;

  // metamask address
  const metamaskAddress = useEthersStore((state) => state.address);

  // validation
  const isValidated = useMemo(
    () => storedAddress === metamaskAddress,
    [storedAddress, metamaskAddress]
  );

  return isValidated;
}
