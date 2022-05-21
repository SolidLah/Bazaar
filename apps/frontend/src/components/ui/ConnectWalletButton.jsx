import { Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useWeb3Context } from "../../contexts/Web3Context"

const ConnectWalletButton = () => {
  const { withMetamaskConnection } = useWeb3Context().functions
  const { currentAddress, setAddress } = useWeb3Context().accounts
  const [buttonText, updateButtonText] = useState("Connect Wallet")

  useEffect(() => {
    if (currentAddress) {
      updateButtonText(currentAddress)
    }
  }, [currentAddress])

  const connectWallet = withMetamaskConnection(async (provider, signer) => {
    const add = await signer.getAddress()

    setAddress(add)
  })

  return (
    <Button onClick={connectWallet}>
      {buttonText === "Connect Wallet"
        ? buttonText
        : `${buttonText.slice(0, 3)}...${buttonText.slice(38)}`}
    </Button>
  )
}

export default ConnectWalletButton
