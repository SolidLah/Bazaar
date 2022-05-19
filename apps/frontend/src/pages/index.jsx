import { Center, Heading } from "@chakra-ui/react"
import BaseLayout from "src/components/layouts/BaseLayout"
import { useState } from "react"
import ConnectWalletButton from "src/components/ui/ConnectWalletButton"

const Home = () => {
  const [currentAddress, setAddress] = useState("")

  return (
    <BaseLayout>
      <Center h="100vh" flexDirection="column">
        <ConnectWalletButton
          currentAddress={currentAddress}
          setAddress={setAddress}
        />
      </Center>
    </BaseLayout>
  )
}

export default Home
