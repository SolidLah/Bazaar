import { Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useWeb3Context } from "../../contexts/Web3Context"

const ConnectWalletButton = () => {
  const { currentAddress, setAddress } = useWeb3Context().accounts
  const [buttonText, updateButtonText] = useState("Connect Wallet")

  useEffect(() => {
    if (currentAddress) {
      updateButtonText(currentAddress)
    }
  }, [currentAddress])

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = provider.getSigner()
    const add = await signer.getAddress()

    setAddress(add)
  }

  return (
    <Button onClick={connectWallet}>
      {buttonText === "Connect Wallet"
        ? buttonText
        : `${buttonText.slice(0, 3)}...${buttonText.slice(38)}`}
    </Button>
  )
}

export default ConnectWalletButton
