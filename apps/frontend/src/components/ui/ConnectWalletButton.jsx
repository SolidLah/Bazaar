import { Button } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useWeb3Context } from "../../contexts/Web3Context"

const ConnectWalletButton = () => {
  const web3Context = useWeb3Context()
  const { currentAddress, setAddress } = web3Context.accounts
  const { provider, setProvider, signer, setSigner } = web3Context.interface

  const connectWallet = async () => {
    if (window.ethereum.isMetaMask !== undefined) {
      const tmpProvider = provider
        ? provider
        : new ethers.providers.Web3Provider(window.ethereum)
      await tmpProvider.send("eth_requestAccounts", [])
      const tmpSigner = signer ? signer : tmpProvider.getSigner()
      const address = await tmpSigner.getAddress()

      setAddress(address)
      setProvider(tmpProvider)
      setSigner(tmpSigner)
    } else {
      console.log("MetaMask not detected")
    }
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
