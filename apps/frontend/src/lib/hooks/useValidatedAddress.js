import { useContext, useState } from "react";
import { userContext } from "src/contexts/userContext";
import useEthersStore from "src/stores/ethersStore";
import useErrorToast from "./useErrorToast";

export default function useValidatedAddress() {
  const errorToast = useErrorToast("Wallet address");
  const [isValidated, setValidated] = useState(false);

  // firestore address
  const { authState, firestoreHook } = useContext(userContext);
  const [user] = authState;
  const { data } = firestoreHook;
  const storedAddress = data?.walletAddress;

  // metamask address
  const metamaskAddress = useEthersStore((state) => state.address);

  // validation
  const validateAddress = () => {
    setValidated(false);

    if (!user) {
      errorToast({
        description: "Not logged in",
      });
      return;
    }

    if (!storedAddress) {
      errorToast({
        description: "No wallet address associated with this user",
      });
      return;
    }

    if (!metamaskAddress) {
      errorToast({
        description: "Metamask not connected",
      });
      return;
    }

    if (storedAddress !== metamaskAddress) {
      errorToast({
        description: "Current metamask wallet does not match user's wallet",
      });
      return;
    }

    setValidated(true);
  };

  return { isValidated, validateAddress };
}
