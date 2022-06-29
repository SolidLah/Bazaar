import { Button } from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import useErrorToast from "src/lib/hooks/useErrorToast";

const BuyButton = ({ item, ...props }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const mktContract = useEthersStore((state) => state.mktContract);
  const errorToast = useErrorToast("Buying NFT");

  const buttonCallback = async () => {
    if (typeof window.ethereum === "undefined") {
      errorToast({
        description: "Metamask is not installed",
      });

      return;
    }

    if (!ethersInitialised) {
      errorToast({
        description: "Connect a Metamask wallet",
      });

      return;
    }

    // get tokenId and call purchase function
    try {
      await (
        await mktContract.purchaseMarketItem(item.marketData[0], {
          value: item.marketPrice.biggish,
        })
      ).wait();
    } catch (error) {
      errorToast({
        description: error.message,
      });

      return;
    }
  };

  return (
    <Button onClick={buttonCallback} colorScheme="teal" {...props}>
      Buy
    </Button>
  );
};

export default BuyButton;
