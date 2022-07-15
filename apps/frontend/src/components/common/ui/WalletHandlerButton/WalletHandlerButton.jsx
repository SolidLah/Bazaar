import { Button } from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import useErrorToast from "src/lib/hooks/useErrorToast";
import useSuccessToast from "src/lib/hooks/useSuccessToast";
import { useState } from "react";
import { formatAddress } from "src/lib/helpers";

const WalletHandlerButton = (props) => {
  const address = useEthersStore((state) => state.address);
  const connectEthers = useEthersStore((state) => state.connectEthers);
  const disconnectEthers = useEthersStore((state) => state.disconnectEthers);
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const errorToast = useErrorToast("Connect wallet");
  const successToast = useSuccessToast("Connect wallet");
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    try {
      setLoading(true);
      await connectEthers();
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

  const disconnect = async () => {
    try {
      setLoading(true);
      await disconnectEthers();
      successToast({
        description: "Wallet disconnected successfully",
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
    <Button
      onClick={ethersInitialised ? disconnect : connect}
      isLoading={loading}
      {...props}
    >
      {address ? formatAddress(address) : "Connect Wallet"}
    </Button>
  );
};

export default WalletHandlerButton;
