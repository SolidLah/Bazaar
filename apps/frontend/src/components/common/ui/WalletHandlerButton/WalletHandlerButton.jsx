import { Button } from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import useErrorToast from "src/lib/hooks/useErrorToast";
import useSuccessToast from "src/lib/hooks/useSuccessToast";
import { useState } from "react";
import { formatAddress } from "src/lib/helpers";

const WalletHandlerButton = (props) => {
  const address = useEthersStore((state) => state.address);
  const initialiseEthers = useEthersStore((state) => state.initialiseEthers);
  const errorToast = useErrorToast("Connect wallet");
  const successToast = useSuccessToast("Connect wallet");
  const [loading, setLoading] = useState(false);

  const buttonCallback = async () => {
    try {
      setLoading(true);
      await initialiseEthers();
      successToast({
        description: "Wallet connected successfully",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <Button onClick={buttonCallback} isLoading={loading} {...props}>
      {address ? formatAddress(address) : "Connect Wallet"}
    </Button>
  );
};

export default WalletHandlerButton;
