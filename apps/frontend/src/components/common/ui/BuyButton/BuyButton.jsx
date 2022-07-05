import { Button } from "@chakra-ui/react";
import { useState } from "react";
import useEthersStore from "src/stores/ethersStore";
import useErrorToast from "src/lib/hooks/useErrorToast";

const BuyButton = ({ item, ...props }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const mktContract = useEthersStore((state) => state.mktContract);
  const errorToast = useErrorToast("Buying NFT");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await (
        await mktContract.purchaseMarketItem(item.itemId, {
          value: item.marketPriceWei,
        })
      ).wait();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast({
        description: error.message,
      });

      return;
    }
  };

  return (
    <Button
      onClick={buttonCallback}
      isLoading={loading}
      colorScheme="teal"
      {...props}
    >
      Buy
    </Button>
  );
};

export default BuyButton;
