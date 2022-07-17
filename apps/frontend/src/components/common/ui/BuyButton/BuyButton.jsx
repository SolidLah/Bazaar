import { Button } from "@chakra-ui/react";
import { useState } from "react";
import useEthersStore from "src/stores/ethersStore";
import useErrorToast from "src/lib/hooks/useErrorToast";
import { getWeb3 } from "src/lib/helpers";

const BuyButton = ({ item, ...props }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const mktContract = useEthersStore((state) => state.mktContract);
  const errorToast = useErrorToast("Buying NFT");
  const [loading, setLoading] = useState(false);

  const buttonCallback = async () => {
    const web3Error = getWeb3(ethersInitialised);
    if (web3Error !== "") {
      errorToast({
        description: web3Error,
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
