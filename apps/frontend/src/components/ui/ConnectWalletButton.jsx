import { Button } from "@chakra-ui/react"
import { useWeb3Context } from "../../contexts/Web3Context"

const ConnectWalletButton = () => {
  const web3Context = useWeb3Context()
  const { state, initialiseEthers } = web3Context
  const { address } = state

  return (
    <Button onClick={initialiseEthers}>
      {address
        ? `${address.slice(0, 3)}...${address.slice(38)}`
        : "Connect Wallet"}
    </Button>
  )
}

export default ConnectWalletButton
