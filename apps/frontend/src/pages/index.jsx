import { Center } from "@chakra-ui/react"
import { useState } from "react"
import ConnectWalletButton from "src/components/ui/ConnectWalletButton"

const Home = () => {
  const [currentAddress, setAddress] = useState("")

  return (
    <Center h="100vh" flexDirection="column">
      <ConnectWalletButton
        currentAddress={currentAddress}
        setAddress={setAddress}
      />
    </Center>
  )
}

export default Home
