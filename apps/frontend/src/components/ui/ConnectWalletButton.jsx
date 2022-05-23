import { Button } from "@chakra-ui/react"
import { useWeb3Context } from "../../contexts/Web3Context"

const ConnectWalletButton = () => {
  const web3Context = useWeb3Context()
  const { initialiseEthers } = web3Context.functions
  const { currentAddress } = web3Context.accounts

  const connectWallet = async () => {
    await initialiseEthers()
  }

  return (
    <Button onClick={connectWallet}>
      {currentAddress
        ? `${currentAddress.slice(0, 3)}...${currentAddress.slice(38)}`
        : "Connect Wallet"}
    </Button>
  )
}

export default ConnectWalletButton
