import { Button, useToast } from "@chakra-ui/react"
import useEthersStore from "src/stores/ethersStore"
import { useCallback } from "react"

const BuyButton = ({ item }) => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised)
  const mktContract = useEthersStore((state) => state.mktContract)

  const toast = useToast()

  const buttonCallback = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "Metamask",
        description: "Metamask is not installed!",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      })
      return
    }

    if (!ethersInitialised) {
      toast({
        title: "Metamask",
        description: "Connect a Metamask wallet!",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      })
      return
    }

    // get tokenId and call purchase function
    try {
      await (
        await mktContract.purchaseMarketItem(item.marketData[0], {
          value: item.marketPrice.biggish,
        })
      ).wait()
    } catch (error) {
      if (error.code === 4001) {
        toast({
          title: "Metamask",
          description: "Transaction cancelled",
          status: "error",
          isClosable: true,
          position: "bottom-right",
        })
      }
      console.log(error)
      return
    }
  }, [ethersInitialised, mktContract, item])

  return (
    <Button onClick={buttonCallback} colorScheme="teal">
      Buy
    </Button>
  )
}

export default BuyButton
