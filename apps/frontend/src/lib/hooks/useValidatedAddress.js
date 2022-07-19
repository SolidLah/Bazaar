import { useContext, useMemo } from "react";
import { userContext } from "src/contexts/userContext";
import useEthersStore from "src/stores/ethersStore";

export default function useValidatedAddress() {
  // firestore address
  const { authState, firestoreHook } = useContext(userContext);
  const [user] = authState;
  const { data } = firestoreHook;
  const storedAddress = data?.walletAddress;

  // metamask address
  const metamaskAddress = useEthersStore((state) => state.address);

  // validation
  const isValidated = useMemo(() => {
    if (!user) return false;
    return storedAddress === metamaskAddress;
  }, [user, storedAddress, metamaskAddress]);

  return isValidated;
}
