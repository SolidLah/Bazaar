import { Button } from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import useSuccessToast from "src/lib/hooks/useSuccessToast";
import { formatAddress } from "src/lib/helpers";
import { useToastedCallback } from "src/lib/hooks";
import { useEffect, useState } from "react";
import {
  useConnectEthers,
  useDisconnectEthers,
} from "src/contexts/web3Context";

const WalletHandlerButton = (props) => {
  const address = useEthersStore((state) => state.address);
  const [myAddress, setMyAddress] = useState("");
  useEffect(() => {
    setMyAddress(address);
  }, [address]);

  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const successToast = useSuccessToast("Handle wallet");
  const connect = useConnectEthers();
  const disconnect = useDisconnectEthers();

  const callBack = async () => {
    if (ethersInitialised) {
      await disconnect();
      successToast({
        description: "Wallet disconnected successfully",
      });
    } else {
      await connect();
      successToast({
        description: "Wallet connected successfully",
      });
    }
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Handle wallet",
    callBack,
    false
  );

  return (
    <Button onClick={toastedCallback} isLoading={loading} {...props}>
      {myAddress ? formatAddress(myAddress) : "Connect Wallet"}
    </Button>
  );
};

export default WalletHandlerButton;
