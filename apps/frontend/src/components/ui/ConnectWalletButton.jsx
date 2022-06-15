import { Button } from "@chakra-ui/react"
import useEthersStore from "src/stores/ethersStore"

const ConnectWalletButton = () => {
  const address = useEthersStore((state) => state.address)
  const initialiseEthers = useEthersStore((state) => state.initialiseEthers)

  return (
    <Button onClick={initialiseEthers}>
      {address
        ? `${address.slice(0, 3)}...${address.slice(38)}`
        : "Connect Wallet"}
    </Button>
  )
}

export default ConnectWalletButton
