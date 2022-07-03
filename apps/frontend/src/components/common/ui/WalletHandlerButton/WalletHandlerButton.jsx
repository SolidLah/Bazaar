import { Button } from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import useErrorToast from "src/lib/hooks/useErrorToast";
import useSuccessToast from "src/lib/hooks/useSuccessToast";

const WalletHandlerButton = (props) => {
  const address = useEthersStore((state) => state.address);
  const initialiseEthers = useEthersStore((state) => state.initialiseEthers);
  const errorToast = useErrorToast("Connect wallet");
  const successToast = useSuccessToast("Connect wallet");

  const buttonCallback = async () => {
    try {
      await initialiseEthers();
      successToast({
        description: "Success",
      });
    } catch (error) {
      console.log(error);
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <Button onClick={buttonCallback} {...props}>
      {address
        ? `${address.slice(0, 3)}...${address.slice(38)}`
        : "Connect Wallet"}
    </Button>
  );
};

export default WalletHandlerButton;
