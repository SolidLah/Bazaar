import { Button } from "@chakra-ui/react"
import useEthersStore from "src/stores/ethersStore"
import { db } from "src/functions/firebase"

const ConnectWalletToAccountButton = (props) => {
  const address = useEthersStore((state) => state.address)
  const initialiseEthers = useEthersStore((state) => state.initialiseEthers)
  const connectWallet = () => {
    initialiseEthers

  }

  return (
    <Button onClick={initialiseEthers} {...props}>
      {address
        ? `${address.slice(0, 3)}...${address.slice(38)}`
        : "Connect your wallet to your account!"}
    </Button>
  )
}

export default ConnectWalletToAccountButton
